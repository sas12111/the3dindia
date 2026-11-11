const { after, before, test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const jwt = require('jsonwebtoken');
const { once } = require('events');

const testDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'the3dindia-ai-test-'));
process.env.NODE_ENV = 'test';
process.env.MESHY_API_KEY = 'unit-test-key';
process.env.AI_STUDIO_TASKS_FILE = path.join(testDataDir, 'tasks.json');
process.env.AI_STUDIO_TEMP_DIR = path.join(testDataDir, 'private-uploads');

const app = require('../server');
const tokenSecret = process.env.JWT_SECRET || 'development-only-secret-change-me';
const originalFetch = global.fetch;
let server;
let baseUrl;
let createStatus = 200;
let createResult = 'meshy-task-123';
let taskStatus = 'IN_PROGRESS';
let taskProgress = 37;
let taskGlb = null;
let providerGetCalls = 0;
let lastCreateBody;

function png(width = 32, height = 32, marker = 0) {
  const data = Buffer.alloc(25);
  data.set([137, 80, 78, 71, 13, 10, 26, 10], 0);
  data.writeUInt32BE(13, 8);
  data.write('IHDR', 12, 'ascii');
  data.writeUInt32BE(width, 16);
  data.writeUInt32BE(height, 20);
  data[24] = marker;
  return data;
}

function userToken(id) {
  return jwt.sign({ id, email: `${id}@example.test`, name: id }, tokenSecret, { expiresIn: '1h' });
}

async function postImages({ userId = 'upload-user', views = ['front'], files = [], outputType = 'textured', token = userToken(userId) } = {}) {
  const body = new FormData();
  files.forEach(({ view, data = png(32, 32, views.indexOf(view)), type = 'image/png', name = `${view}.png` }) => {
    body.append('images', new Blob([data], { type }), name);
  });
  if (views.length || files.length) body.append('views', JSON.stringify(views));
  body.append('outputType', outputType);
  return fetch(`${baseUrl}/api/ai-studio/generate`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body,
  });
}

before(async () => {
  global.fetch = async (url, options = {}) => {
    if (!String(url).startsWith('https://api.meshy.ai/')) return originalFetch(url, options);
    assert.equal(options.headers?.Authorization, 'Bearer unit-test-key');
    if (String(url) === 'https://api.meshy.ai/openapi/v1/multi-image-to-3d') {
      lastCreateBody = JSON.parse(options.body);
      return Response.json(createStatus === 200 ? { result: createResult } : { message: createStatus === 402 ? 'Insufficient credits' : 'Meshy test failure' }, { status: createStatus });
    }
    if (String(url).startsWith('https://api.meshy.ai/openapi/v1/multi-image-to-3d/')) {
      providerGetCalls += 1;
      return Response.json({
        status: taskStatus,
        progress: taskProgress,
        thumbnail_url: 'https://assets.meshy.ai/test/preview.png',
        model_urls: taskGlb ? { glb: taskGlb } : {},
        task_error: taskStatus === 'FAILED' ? { message: 'Provider test failure' } : null,
      });
    }
    throw new Error(`Unexpected upstream URL: ${url}`);
  };
  server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  global.fetch = originalFetch;
  await new Promise(resolve => server.close(resolve));
  await fs.remove(testDataDir);
});

test('rejects missing and invalid authentication', async () => {
  const missing = await postImages({ token: null });
  assert.equal(missing.status, 401);
  const invalid = await postImages({ token: 'not-a-jwt' });
  assert.equal(invalid.status, 401);
});

test('rejects a missing front image', async () => {
  const response = await postImages({ userId: 'missing-front', views: ['left'], files: [{ view: 'left' }] });
  const data = await response.json();
  assert.equal(response.status, 400);
  assert.equal(data.code, 'missing_front_image');
});

test('rejects unsupported MIME and invalid image contents', async () => {
  const badMime = await postImages({ userId: 'invalid-mime', views: ['front'], files: [{ view: 'front', type: 'text/plain', name: 'front.txt', data: Buffer.from('not an image') }] });
  assert.equal(badMime.status, 400);
  assert.equal((await badMime.json()).code, 'invalid_upload');

  const badContents = await postImages({ userId: 'invalid-contents', views: ['front'], files: [{ view: 'front', data: Buffer.from('not a PNG') }] });
  assert.equal(badContents.status, 400);
  assert.equal((await badContents.json()).code, 'invalid_image');
});

test('rejects images below Meshy minimum dimensions', async () => {
  const response = await postImages({ userId: 'small-image', views: ['front'], files: [{ view: 'front', data: png(31, 32) }] });
  assert.equal(response.status, 400);
  assert.equal((await response.json()).code, 'invalid_dimensions');
});

test('rejects an image over 20 MB', async () => {
  const tooLarge = Buffer.alloc(20 * 1024 * 1024 + 1);
  const response = await postImages({ userId: 'oversized', views: ['front'], files: [{ view: 'front', data: tooLarge }] });
  assert.equal(response.status, 413);
  assert.equal((await response.json()).code, 'file_too_large');
});

test('creates a single-front-image task and sends the required Meshy schema', async () => {
  const response = await postImages({ userId: 'single-image', views: ['front'], files: [{ view: 'front', data: png(32, 32, 7) }] });
  const data = await response.json();
  assert.equal(response.status, 202);
  assert.equal(data.task.status, 'PENDING');
  assert.equal(data.task.progress, 0);
  assert.equal(lastCreateBody.image_urls.length, 1);
  assert.match(lastCreateBody.image_urls[0], /^data:image\/png;base64,/);
  assert.equal(lastCreateBody.ai_model, 'meshy-7.1');
  assert.equal(lastCreateBody.geometry_resolution, '2k');
  assert.equal(lastCreateBody.should_texture, true);
  assert.equal(lastCreateBody.enable_pbr, true);
  assert.deepEqual(lastCreateBody.target_formats, ['glb']);
});

test('creates a four-image task in the submitted view order with front first', async () => {
  const views = ['front', 'right', 'left', 'back'];
  const response = await postImages({
    userId: 'four-images', views,
    files: views.map((view, index) => ({ view, data: png(32, 32, index + 1) })),
  });
  const responseData = await response.json();
  assert.equal(response.status, 202, JSON.stringify(responseData));
  assert.equal(lastCreateBody.image_urls.length, 4);
  assert.equal(Buffer.from(lastCreateBody.image_urls[0].split(',')[1], 'base64')[24], 1);
  assert.equal(Buffer.from(lastCreateBody.image_urls[1].split(',')[1], 'base64')[24], 2);
});

test('proxies Meshy API failure and insufficient credits clearly', async () => {
  createStatus = 500;
  const failed = await postImages({ userId: 'provider-failure', views: ['front'], files: [{ view: 'front' }] });
  assert.equal(failed.status, 502);
  assert.equal((await failed.json()).code, 'provider_error');

  createStatus = 402;
  const credits = await postImages({ userId: 'no-credits', views: ['front'], files: [{ view: 'front' }] });
  assert.equal(credits.status, 402);
  assert.equal((await credits.json()).code, 'insufficient_credits');
  createStatus = 200;
});

test('polls status, returns the GLB URL, and blocks access by another user', async () => {
  const created = await postImages({ userId: 'task-owner', views: ['front'], files: [{ view: 'front' }] });
  const task = (await created.json()).task;
  const beforeUnauthorized = providerGetCalls;

  const unauthorized = await fetch(`${baseUrl}/api/ai-studio/tasks/${task.taskId}`, { headers: { Authorization: `Bearer ${userToken('different-user')}` } });
  assert.equal(unauthorized.status, 404);
  assert.equal(providerGetCalls, beforeUnauthorized);

  taskStatus = 'IN_PROGRESS'; taskProgress = 43; taskGlb = null;
  const pending = await fetch(`${baseUrl}/api/ai-studio/tasks/${task.taskId}`, { headers: { Authorization: `Bearer ${userToken('task-owner')}` } });
  const pendingData = await pending.json();
  assert.equal(pendingData.task.status, 'IN_PROGRESS');
  assert.equal(pendingData.task.progress, 43);

  taskStatus = 'SUCCEEDED'; taskProgress = 100; taskGlb = 'https://assets.meshy.ai/test/model.glb';
  const succeeded = await fetch(`${baseUrl}/api/ai-studio/tasks/${task.taskId}`, { headers: { Authorization: `Bearer ${userToken('task-owner')}` } });
  const succeededData = await succeeded.json();
  assert.equal(succeededData.task.status, 'SUCCEEDED');
  assert.equal(succeededData.task.modelUrl, taskGlb);
  assert.equal(succeededData.task.thumbnailUrl, 'https://assets.meshy.ai/test/preview.png');
  taskStatus = 'FAILED'; taskProgress = 100; taskGlb = null;
  const failed = await fetch(`${baseUrl}/api/ai-studio/tasks/${task.taskId}`, { headers: { Authorization: `Bearer ${userToken('task-owner')}` } });
  const failedData = await failed.json();
  assert.equal(failedData.task.status, 'FAILED');
  assert.equal(failedData.task.error, 'Provider test failure');
  taskStatus = 'CANCELED';
  const canceled = await fetch(`${baseUrl}/api/ai-studio/tasks/${task.taskId}`, { headers: { Authorization: `Bearer ${userToken('task-owner')}` } });
  assert.equal((await canceled.json()).task.status, 'CANCELED');
  assert.equal((await fs.readJson(process.env.AI_STUDIO_TASKS_FILE)).find(entry => entry.id === task.taskId).userId, 'task-owner');
});

test('rejects malformed task IDs', async () => {
  const response = await fetch(`${baseUrl}/api/ai-studio/tasks/not-a-uuid`, { headers: { Authorization: `Bearer ${userToken('bad-task-id')}` } });
  assert.equal(response.status, 400);
  assert.equal((await response.json()).code, 'invalid_task_id');
});

test('rate limits generation attempts per authenticated user', async () => {
  for (let i = 0; i < 3; i += 1) {
    const response = await postImages({ userId: 'rate-limited', views: [], files: [] });
    assert.equal(response.status, 400);
  }
  const limited = await postImages({ userId: 'rate-limited', views: [], files: [] });
  assert.equal(limited.status, 429);
  assert.equal((await limited.json()).code, 'rate_limited');
});
