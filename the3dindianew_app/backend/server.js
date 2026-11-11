const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || (process.env.NODE_ENV === 'production' ? '' : 'development-only-secret-change-me');
const usersFile  = path.join(__dirname, 'users.json');
const ordersFile = path.join(__dirname, 'orders.json');
const aiStudioTasksFile = process.env.AI_STUDIO_TASKS_FILE || path.join(__dirname, 'ai-studio-tasks.json');
const aiStudioTempDir = process.env.AI_STUDIO_TEMP_DIR || path.join(os.tmpdir(), 'the3dindia-ai-studio');
const aiStudioRateLimits = new Map();
let aiStudioTaskWriteQueue = Promise.resolve();
const AI_STUDIO_MAX_IMAGE_BYTES = 20 * 1024 * 1024;
const AI_STUDIO_MAX_TOTAL_BYTES = 80 * 1024 * 1024;
const AI_STUDIO_ALLOWED_MIMES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const AI_STUDIO_ALLOWED_VIEWS = ['front', 'left', 'back', 'right'];

// In-memory OTP store: email -> { otp, expiresAt, userData }
const pendingOtps = new Map();
const adminLoginFailures = new Map();

// ── Auth middleware ───────────────────────────────────────────────────────────
function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ success: false, error: 'Not authenticated' });
  try {
    req.user = jwt.verify(header.slice(7), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ success: false, error: 'Invalid or expired token' });
  }
}

function adminMiddleware(req, res, next) {
  authMiddleware(req, res, () => {
    if (req.user?.role !== 'admin') return res.status(403).json({ success: false, error: 'Admin access required' });
    next();
  });
}

function aiStudioUserMiddleware(req, res, next) {
  authMiddleware(req, res, () => {
    if (!req.user?.id) return res.status(401).json({ success: false, error: 'A customer account is required.' });
    next();
  });
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function inspectImage(buffer) {
  const isPng = buffer.length >= 24 && buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (isPng && buffer.toString('ascii', 12, 16) === 'IHDR') {
    return { mime: 'image/png', width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }

  const isJpeg = buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8;
  if (isJpeg) {
    let offset = 2;
    const frameMarkers = new Set([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf]);
    while (offset + 4 < buffer.length) {
      if (buffer[offset] !== 0xff) { offset += 1; continue; }
      while (buffer[offset] === 0xff) offset += 1;
      const marker = buffer[offset++];
      if (marker === 0xd9 || marker === 0xda) break;
      if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
      if (offset + 2 > buffer.length) break;
      const segmentLength = buffer.readUInt16BE(offset);
      if (segmentLength < 2 || offset + segmentLength > buffer.length) break;
      if (frameMarkers.has(marker) && segmentLength >= 7) {
        return { mime: 'image/jpeg', height: buffer.readUInt16BE(offset + 3), width: buffer.readUInt16BE(offset + 5) };
      }
      offset += segmentLength;
    }
  }

  const isWebp = buffer.length >= 30 && buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP';
  if (isWebp) {
    const chunk = buffer.toString('ascii', 12, 16);
    if (chunk === 'VP8X') {
      return {
        mime: 'image/webp',
        width: 1 + buffer.readUIntLE(24, 3),
        height: 1 + buffer.readUIntLE(27, 3),
      };
    }
    if (chunk === 'VP8L' && buffer[20] === 0x2f) {
      return {
        mime: 'image/webp',
        width: 1 + buffer[21] + ((buffer[22] & 0x3f) << 8),
        height: 1 + ((buffer[22] >> 6) & 0x03) + (buffer[23] << 2) + ((buffer[24] & 0x0f) << 10),
      };
    }
    if (chunk === 'VP8 ' && buffer.length >= 30 && buffer[23] === 0x9d && buffer[24] === 0x01 && buffer[25] === 0x2a) {
      return { mime: 'image/webp', width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
    }
  }
  return null;
}

async function readAiStudioTasks() {
  if (!await fs.pathExists(aiStudioTasksFile)) return [];
  return fs.readJson(aiStudioTasksFile);
}

function saveAiStudioTask(task) {
  const writeTask = async () => {
    const tasks = await readAiStudioTasks();
    const index = tasks.findIndex(entry => entry.id === task.id);
    if (index < 0) tasks.push(task);
    else tasks[index] = task;
    await fs.ensureDir(path.dirname(aiStudioTasksFile));
    await fs.writeJson(aiStudioTasksFile, tasks, { spaces: 2 });
  };
  const write = aiStudioTaskWriteQueue.then(writeTask, writeTask);
  aiStudioTaskWriteQueue = write.catch(() => {});
  return write;
}

function aiStudioRateLimit(req, res, next) {
  const now = Date.now();
  const userId = String(req.user.id);
  for (const [id, timestamps] of aiStudioRateLimits) {
    if (!timestamps.length || now - timestamps[timestamps.length - 1] >= 60 * 60 * 1000) aiStudioRateLimits.delete(id);
  }
  const previous = (aiStudioRateLimits.get(userId) || []).filter(timestamp => now - timestamp < 60 * 60 * 1000);
  if (previous.length >= 3) {
    return res.status(429).json({ success: false, code: 'rate_limited', error: 'You have reached the model generation limit. Try again in an hour.' });
  }
  previous.push(now);
  aiStudioRateLimits.set(userId, previous);
  next();
}

const aiStudioUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => fs.ensureDir(aiStudioTempDir).then(() => callback(null, aiStudioTempDir), callback),
    filename: (req, file, callback) => callback(null, `${crypto.randomUUID()}.upload`),
  }),
  limits: { fileSize: AI_STUDIO_MAX_IMAGE_BYTES, files: 4, fields: 2, fieldSize: 1024, parts: 8 },
  fileFilter: (req, file, callback) => {
    if (!AI_STUDIO_ALLOWED_MIMES.has(file.mimetype)) {
      const error = new Error('Upload JPG, PNG, or WebP images only.');
      error.code = 'INVALID_IMAGE_TYPE';
      return callback(error);
    }
    callback(null, true);
  },
});

function receiveAiStudioImages(req, res, next) {
  aiStudioUpload.array('images', 4)(req, res, async error => {
    if (!error) return next();
    await Promise.all((req.files || []).map(file => fs.remove(file.path).catch(() => {})));
    const tooLarge = error.code === 'LIMIT_FILE_SIZE';
    const tooMany = error.code === 'LIMIT_FILE_COUNT' || error.code === 'LIMIT_UNEXPECTED_FILE';
    res.status(tooLarge ? 413 : 400).json({
      success: false,
      code: tooLarge ? 'file_too_large' : tooMany ? 'too_many_files' : 'invalid_upload',
      error: tooLarge ? 'Each image must be 20 MB or smaller.' : tooMany ? 'Upload no more than four images.' : error.code === 'INVALID_IMAGE_TYPE' ? error.message : (error.message || 'Could not process the uploaded images.').slice(0, 200),
    });
  });
}

if (process.env.NODE_ENV === 'production' && !JWT_SECRET) {
  throw new Error('JWT_SECRET must be configured in production');
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// CORS configuration: allow production Vercel frontend and localhost during development
const allowedOrigins = [
  'https://the3dindia.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g., server-to-server, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
    return callback(new Error('CORS policy: This origin is not allowed'));
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
    return res.status(503).json({ success: false, error: 'Admin credentials are not configured' });
  }
  const clientKey = req.ip;
  const attempts = adminLoginFailures.get(clientKey);
  if (attempts && attempts.blockedUntil > Date.now()) {
    return res.status(429).json({ success: false, error: 'Too many attempts. Try again later.' });
  }
  if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
    const failures = attempts && attempts.blockedUntil <= Date.now() ? 0 : (attempts?.failures || 0);
    const nextFailures = failures + 1;
    adminLoginFailures.set(clientKey, {
      failures: nextFailures,
      blockedUntil: nextFailures >= 5 ? Date.now() + 15 * 60 * 1000 : 0,
    });
    return res.status(401).json({ success: false, error: 'Invalid admin credentials' });
  }
  adminLoginFailures.delete(clientKey);
  const token = jwt.sign({ role: 'admin', username }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ success: true, token });
});

// Create uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
fs.ensureDirSync(uploadsDir);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(uploadsDir, new Date().toISOString().split('T')[0]);
    fs.ensureDirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const sanitizedName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${timestamp}_${sanitizedName}`);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
    files: 5
  }
});

// Configure email — uses configured SMTP if set, otherwise Ethereal (test) SMTP
let transporter = null;
let etherealUser = null;

async function initEmail() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  const isConfigured = smtpHost && smtpUser && smtpPass
    && smtpPass !== 'your-brevo-smtp-key-here';

  if (!isConfigured) {
    console.log('ℹ️  SMTP not fully configured in .env; using Ethereal test inbox.');
  }

  if (isConfigured) {
    try {
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });
      await transporter.verify();
      console.log(`📧 SMTP configured: ${smtpHost} (${smtpUser})`);
    } catch (err) {
      console.log('⚠️  SMTP auth failed:', err.message);
      transporter = null;
    }
  }

  if (!transporter) {
    try {
      const testAccount = await nodemailer.createTestAccount();
      etherealUser = testAccount.user;
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
      console.log('📧 Dev email (Ethereal) ready — OTP previews will be logged below');
      console.log(`   Ethereal inbox: https://ethereal.email/messages  (login: ${testAccount.user})`);
    } catch (err) {
      console.log('⚠️  Could not create Ethereal account:', err.message);
    }
  }
}
if (process.env.NODE_ENV !== 'test') initEmail();

// Contact form endpoint
app.post('/api/contact', upload.array('files', 5), async (req, res) => {
  try {
    const { name, email, mobile, service, message } = req.body;
    const files = req.files || [];

    // Save submission
    const submissionDate = new Date().toISOString().split('T')[0];
    const submissionData = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      name, email, mobile, service, message,
      files: files.map(f => ({
        originalName: f.originalname,
        filename: f.filename,
        size: f.size,
        path: f.path,
        date: submissionDate // Add date for download URL
      }))
    };

    // Save to JSON file
    const submissionsFile = path.join(__dirname, 'submissions.json');
    let submissions = [];
    if (await fs.pathExists(submissionsFile)) {
      submissions = await fs.readJson(submissionsFile);
    }
    submissions.push(submissionData);
    await fs.writeJson(submissionsFile, submissions, { spaces: 2 });

    // Send email (if configured)
    if (transporter) {
      try {
        const emailHtml = `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Mobile:</strong> ${escapeHtml(mobile)}</p>
          <p><strong>Service:</strong> ${escapeHtml(service)}</p>
          <p><strong>Message:</strong> ${escapeHtml(message)}</p>
          <p><strong>Files:</strong> ${files.length} file(s)</p>
        `;

        await transporter.sendMail({
          from: process.env.EMAIL_FROM || process.env.SMTP_USER || etherealUser,
          to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_FROM || process.env.SMTP_USER || etherealUser,
          subject: `New Contact: ${name}`,
          html: emailHtml,
          attachments: files.map(f => ({ filename: f.originalname, path: f.path }))
        });
        
        console.log('📧 Email notification sent');
      } catch (emailError) {
        console.log('⚠️  Email sending failed:', emailError.message);
      }
    } else {
      console.log('⚠️  Email not configured - skipping email notification');
    }

    res.json({ success: true, message: 'Form submitted successfully' });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create an asynchronous Meshy Multi-Image to 3D task from private temporary uploads.
app.post('/api/ai-studio/generate', aiStudioUserMiddleware, aiStudioRateLimit, (req, res, next) => {
  if (!process.env.MESHY_API_KEY) {
    return res.status(503).json({ success: false, code: 'provider_not_configured', error: '3D generation is not configured yet.' });
  }
  next();
}, receiveAiStudioImages, async (req, res) => {
  const files = req.files || [];
  try {
    if (files.length < 1) return res.status(400).json({ success: false, code: 'missing_front_image', error: 'Add a front-view image to continue.' });
    let views;
    try { views = JSON.parse(req.body.views || '[]'); }
    catch { return res.status(400).json({ success: false, code: 'invalid_views', error: 'The selected image views are invalid.' }); }
    if (!Array.isArray(views) || views.length !== files.length || views.some(view => !AI_STUDIO_ALLOWED_VIEWS.includes(view)) || new Set(views).size !== views.length) {
      return res.status(400).json({ success: false, code: 'invalid_views', error: 'Provide one unique view label for each image.' });
    }
    if (views[0] !== 'front') return res.status(400).json({ success: false, code: 'missing_front_image', error: 'The first image must be the front view.' });

    const totalBytes = files.reduce((total, file) => total + file.size, 0);
    if (totalBytes > AI_STUDIO_MAX_TOTAL_BYTES) return res.status(413).json({ success: false, code: 'request_too_large', error: 'The combined images must be 80 MB or smaller.' });

    const imageUrls = [];
    for (const file of files) {
      const buffer = await fs.readFile(file.path);
      const image = inspectImage(buffer);
      if (!image || !AI_STUDIO_ALLOWED_MIMES.has(image.mime) || image.mime !== file.mimetype) {
        return res.status(400).json({ success: false, code: 'invalid_image', error: 'An uploaded file is not a valid JPG, PNG, or WebP image.' });
      }
      if (!Number.isInteger(image.width) || !Number.isInteger(image.height) || image.width < 32 || image.height < 32 || image.width * image.height > 178956970) {
        return res.status(400).json({ success: false, code: 'invalid_dimensions', error: 'Each image must be at least 32 × 32 pixels and no larger than Meshy’s supported image dimensions.' });
      }
      imageUrls.push(`data:${image.mime};base64,${buffer.toString('base64')}`);
    }

    const outputType = req.body.outputType || 'textured';
    if (!['textured', 'printable'].includes(outputType)) {
      return res.status(400).json({ success: false, code: 'invalid_output_type', error: 'Choose a supported output type.' });
    }

    let meshyResponse;
    try {
      meshyResponse = await fetch('https://api.meshy.ai/openapi/v1/multi-image-to-3d', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.MESHY_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_urls: imageUrls,
          ai_model: 'meshy-7.1',
          geometry_resolution: '2k',
          should_texture: true,
          enable_pbr: true,
          target_formats: ['glb'],
        }),
        signal: AbortSignal.timeout(120000),
      });
    } catch {
      return res.status(502).json({ success: false, code: 'provider_unavailable', error: 'Could not reach the 3D generation service. Please try again.' });
    }

    let providerData = {};
    try { providerData = await meshyResponse.json(); } catch { /* Provider may return an empty or non-JSON error. */ }
    if (!meshyResponse.ok) {
      const providerMessage = providerData.message || providerData.error || providerData.detail;
      const insufficientCredits = meshyResponse.status === 402;
      const providerRateLimited = meshyResponse.status === 429;
      return res.status(insufficientCredits ? 402 : providerRateLimited ? 429 : 502).json({
        success: false,
        code: insufficientCredits ? 'insufficient_credits' : providerRateLimited ? 'provider_rate_limited' : 'provider_error',
        error: insufficientCredits ? 'The generation service has insufficient credits. Please contact support.' : typeof providerMessage === 'string' ? providerMessage.slice(0, 500) : 'The generation service could not start this task.',
      });
    }

    if (typeof providerData.result !== 'string' || !providerData.result) {
      return res.status(502).json({ success: false, code: 'invalid_provider_response', error: 'The generation service returned an invalid task response.' });
    }

    const task = {
      id: crypto.randomUUID(),
      userId: String(req.user.id),
      meshyTaskId: providerData.result,
      outputType,
      status: 'PENDING',
      progress: 0,
      createdAt: new Date().toISOString(),
      thumbnailUrl: null,
      modelUrl: null,
      error: null,
    };
    await saveAiStudioTask(task);
    return res.status(202).json({ success: true, task: {
      taskId: task.id, status: task.status, progress: task.progress,
      thumbnailUrl: task.thumbnailUrl, modelUrl: task.modelUrl,
      outputType: task.outputType, createdAt: task.createdAt, error: task.error,
    } });
  } catch {
    return res.status(500).json({ success: false, code: 'generation_error', error: 'Could not create the generation task. Please try again.' });
  } finally {
    await Promise.all(files.map(file => fs.remove(file.path).catch(() => {})));
  }
});

// The internal task ID is opaque; ownership is checked before contacting Meshy.
app.get('/api/ai-studio/tasks/:taskId', aiStudioUserMiddleware, async (req, res) => {
  const taskId = req.params.taskId;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(taskId)) {
    return res.status(400).json({ success: false, code: 'invalid_task_id', error: 'Task ID is invalid.' });
  }
  if (!process.env.MESHY_API_KEY) return res.status(503).json({ success: false, code: 'provider_not_configured', error: '3D generation is not configured yet.' });

  try {
    const tasks = await readAiStudioTasks();
    const task = tasks.find(entry => entry.id === taskId && entry.userId === String(req.user.id));
    if (!task) return res.status(404).json({ success: false, code: 'task_not_found', error: 'Task not found.' });

    let providerResponse;
    try {
      providerResponse = await fetch(`https://api.meshy.ai/openapi/v1/multi-image-to-3d/${encodeURIComponent(task.meshyTaskId)}`, {
        headers: { Authorization: `Bearer ${process.env.MESHY_API_KEY}` },
        signal: AbortSignal.timeout(30000),
      });
    } catch {
      return res.status(502).json({ success: false, code: 'provider_unavailable', error: 'Could not check generation status. Please retry.' });
    }

    let providerData = {};
    try { providerData = await providerResponse.json(); } catch { /* Handled as a provider error below. */ }
    if (!providerResponse.ok) {
      return res.status(providerResponse.status === 429 ? 429 : 502).json({ success: false, code: 'provider_error', error: 'Could not retrieve generation status.' });
    }

    const statuses = new Set(['PENDING', 'IN_PROGRESS', 'SUCCEEDED', 'FAILED', 'CANCELED']);
    if (!statuses.has(providerData.status)) return res.status(502).json({ success: false, code: 'invalid_provider_response', error: 'The generation service returned an unknown task status.' });
    task.status = providerData.status;
    task.progress = Number.isFinite(providerData.progress) ? Math.max(0, Math.min(100, providerData.progress)) : task.progress;
    task.thumbnailUrl = typeof providerData.thumbnail_url === 'string' ? providerData.thumbnail_url : task.thumbnailUrl;
    task.modelUrl = typeof providerData.model_urls?.glb === 'string' ? providerData.model_urls.glb : task.modelUrl;
    task.error = task.status === 'FAILED' || task.status === 'CANCELED'
      ? (typeof providerData.task_error?.message === 'string' ? providerData.task_error.message.slice(0, 500) : typeof providerData.task_error === 'string' ? providerData.task_error.slice(0, 500) : task.status === 'CANCELED' ? 'Generation was canceled.' : 'Generation failed.')
      : null;
    task.updatedAt = new Date().toISOString();
    await saveAiStudioTask(task);

    return res.json({ success: true, task: {
      taskId: task.id, status: task.status, progress: task.progress,
      thumbnailUrl: task.thumbnailUrl, modelUrl: task.modelUrl,
      outputType: task.outputType, createdAt: task.createdAt, error: task.error,
    } });
  } catch {
    return res.status(500).json({ success: false, code: 'task_status_error', error: 'Could not retrieve task status.' });
  }
});

// Get submissions
app.get('/api/submissions', adminMiddleware, async (req, res) => {
  try {
    const submissionsFile = path.join(__dirname, 'submissions.json');
    if (await fs.pathExists(submissionsFile)) {
      const submissions = await fs.readJson(submissionsFile);
      res.json({ success: true, submissions: submissions.reverse() });
    } else {
      res.json({ success: true, submissions: [] });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve admin dashboard
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Also support the API-prefixed path used by the Vercel rewrite
app.get('/api/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Download file endpoint
app.get('/api/download/:date/:filename', adminMiddleware, (req, res) => {
  try {
    const { date, filename } = req.params;
    const filePath = path.join(uploadsDir, date, filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Security check - ensure the file is within uploads directory
    const resolvedPath = path.resolve(filePath);
    const uploadsPath = path.resolve(uploadsDir);
    
    const relativePath = path.relative(uploadsPath, resolvedPath);
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Get original filename from the stored filename
    const originalName = filename.substring(filename.indexOf('_') + 1);
    
    // Set appropriate headers
    res.setHeader('Content-Disposition', `attachment; filename="${originalName}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    
    // Send file
    res.download(filePath, originalName, (err) => {
      if (err) {
        console.error('Download error:', err);
        if (!res.headersSent) {
          res.status(500).json({
            success: false,
            message: 'Error downloading file'
          });
        }
      }
    });
    
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Bulk download endpoint - download all files from a submission as ZIP
app.get('/api/download-submission/:submissionId', adminMiddleware, async (req, res) => {
  try {
    const submissionId = req.params.submissionId;
    const submissionsFile = path.join(__dirname, 'submissions.json');
    
    if (!await fs.pathExists(submissionsFile)) {
      return res.status(404).json({ success: false, message: 'No submissions found' });
    }
    
    const submissions = await fs.readJson(submissionsFile);
    const submission = submissions.find(s => s.id.toString() === submissionId);
    
    if (!submission) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }
    
    if (!submission.files || submission.files.length === 0) {
      return res.status(404).json({ success: false, message: 'No files in this submission' });
    }
    
    // For now, just return the first file (you can implement ZIP functionality later)
    const firstFile = submission.files[0];
    const date = firstFile.date || new Date(submission.timestamp).toISOString().split('T')[0];
    const filePath = path.join(uploadsDir, date, firstFile.filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: 'File not found' });
    }
    
    const originalName = firstFile.filename.substring(firstFile.filename.indexOf('_') + 1);
    res.download(filePath, originalName);
    
  } catch (error) {
    console.error('Bulk download error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// ─── Products API ────────────────────────────────────────────────────────────

const productsFile = path.join(__dirname, 'products.json');

app.use('/product-images', express.static(path.join(__dirname, 'uploads', 'products')));

app.get('/api/products', (req, res, next) => req.query.admin === 'true' ? adminMiddleware(req, res, next) : next(), async (req, res) => {
  try {
    let products = [];
    if (await fs.pathExists(productsFile)) products = await fs.readJson(productsFile);
    const adminMode = req.query.admin === 'true';
    const result = adminMode ? products : products.filter(p => p.active !== false);
    res.json({ success: true, products: result });
  } catch (error) { res.status(500).json({ success: false, error: error.message }); }
});

app.post('/api/products', adminMiddleware, async (req, res) => {
  try {
    let products = [];
    if (await fs.pathExists(productsFile)) products = await fs.readJson(productsFile);
    const { name, category, price, rating, reviews, badge, description, fullDesc, material, dimensions, printTime, tags, image, images, active } = req.body;
    if (!name || !category) return res.status(400).json({ success: false, error: 'Name and category are required' });
    const newProduct = {
      id: Date.now().toString(),
      name, category,
      price: Number(price) || 0,
      rating: Number(rating) || 5,
      reviews: Number(reviews) || 0,
      badge: badge || '',
      description: description || '',
      fullDesc: fullDesc || '',
      material: material || '',
      dimensions: dimensions || '',
      printTime: printTime || '',
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : []),
      image: image || '',
      images: (typeof images === 'string') ? (images ? JSON.parse(images) : {}) : (images || {}),
      active: active !== false && active !== 'false',
      createdAt: new Date().toISOString(),
    };
    products.push(newProduct);
    await fs.writeJson(productsFile, products, { spaces: 2 });
    res.json({ success: true, product: newProduct });
  } catch (error) { res.status(500).json({ success: false, error: error.message }); }
});

app.put('/api/products/:id', adminMiddleware, async (req, res) => {
  try {
    let products = [];
    if (await fs.pathExists(productsFile)) products = await fs.readJson(productsFile);
    const idx = products.findIndex(p => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Product not found' });
    const { name, category, price, rating, reviews, badge, description, fullDesc, material, dimensions, printTime, tags, image, images, active } = req.body;
    products[idx] = {
      ...products[idx],
      ...(name !== undefined && { name }),
      ...(category !== undefined && { category }),
      ...(price !== undefined && { price: Number(price) }),
      ...(rating !== undefined && { rating: Number(rating) }),
      ...(reviews !== undefined && { reviews: Number(reviews) }),
      ...(badge !== undefined && { badge }),
      ...(description !== undefined && { description }),
      ...(fullDesc !== undefined && { fullDesc }),
      ...(material !== undefined && { material }),
      ...(dimensions !== undefined && { dimensions }),
      ...(printTime !== undefined && { printTime }),
      ...(tags !== undefined && { tags: Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()).filter(Boolean) }),
      ...(image !== undefined && { image }),
      ...(images !== undefined && { images: (typeof images === 'string') ? (images ? JSON.parse(images) : {}) : images }),
      ...(active !== undefined && { active: active !== false && active !== 'false' }),
      updatedAt: new Date().toISOString(),
    };
    await fs.writeJson(productsFile, products, { spaces: 2 });
    res.json({ success: true, product: products[idx] });
  } catch (error) { res.status(500).json({ success: false, error: error.message }); }
});

app.delete('/api/products/:id', adminMiddleware, async (req, res) => {
  try {
    let products = [];
    if (await fs.pathExists(productsFile)) products = await fs.readJson(productsFile);
    const filtered = products.filter(p => p.id !== req.params.id);
    if (filtered.length === products.length) return res.status(404).json({ success: false, error: 'Product not found' });
    await fs.writeJson(productsFile, filtered, { spaces: 2 });
    res.json({ success: true });
  } catch (error) { res.status(500).json({ success: false, error: error.message }); }
});

const productImgStorage = multer.diskStorage({
  destination: (req, file, cb) => { const dir = path.join(__dirname, 'uploads', 'products'); fs.ensureDirSync(dir); cb(null, dir); },
  filename: (req, file, cb) => { cb(null, `product_${Date.now()}${path.extname(file.originalname)}`); }
});
const productUpload = multer({ storage: productImgStorage, limits: { fileSize: 10 * 1024 * 1024 } });

// Single-image upload (legacy)
app.post('/api/products/upload-image', adminMiddleware, productUpload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, error: 'No file uploaded' });
  res.json({ success: true, url: `/product-images/${req.file.filename}` });
});

// Multi-image upload for product views (front/back/left/right/top/bottom/isometric)
const allowedViews = ['front', 'back', 'left', 'right', 'top', 'bottom', 'isometric'];
app.post('/api/products/upload-images', adminMiddleware, productUpload.fields(allowedViews.map(v => ({ name: v, maxCount: 1 }))), (req, res) => {
  try {
    const files = req.files || {};
    const images = {};
    Object.keys(files).forEach(view => {
      const fileArr = files[view];
      if (fileArr && fileArr[0]) images[view] = `/product-images/${fileArr[0].filename}`;
    });
    res.json({ success: true, images });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────

// ─── Portfolio API ───────────────────────────────────────────────────────────

const portfolioFile = path.join(__dirname, 'portfolio.json');

// Serve uploaded portfolio images
app.use('/portfolio-images', express.static(path.join(__dirname, 'uploads', 'portfolio')));

// GET all projects (active only by default, all for admin)
app.get('/api/portfolio', (req, res, next) => req.query.admin === 'true' ? adminMiddleware(req, res, next) : next(), async (req, res) => {
  try {
    let projects = [];
    if (await fs.pathExists(portfolioFile)) {
      projects = await fs.readJson(portfolioFile);
    }
    const adminMode = req.query.admin === 'true';
    const result = adminMode ? projects : projects.filter(p => p.active !== false);
    res.json({ success: true, projects: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create project
app.post('/api/portfolio', adminMiddleware, async (req, res) => {
  try {
    let projects = [];
    if (await fs.pathExists(portfolioFile)) {
      projects = await fs.readJson(portfolioFile);
    }
    const { title, category, description, fullDescription, client, duration, materials, tags, image, active } = req.body;
    if (!title || !category) {
      return res.status(400).json({ success: false, error: 'Title and category are required' });
    }
    const newProject = {
      id: Date.now().toString(),
      title,
      category,
      description: description || '',
      fullDescription: fullDescription || '',
      client: client || '',
      duration: duration || '',
      materials: Array.isArray(materials) ? materials : (materials ? materials.split(',').map(m => m.trim()).filter(Boolean) : []),
      tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : []),
      image: image || '',
      active: active !== false && active !== 'false',
      createdAt: new Date().toISOString(),
    };
    projects.push(newProject);
    await fs.writeJson(portfolioFile, projects, { spaces: 2 });
    res.json({ success: true, project: newProject });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT update project
app.put('/api/portfolio/:id', adminMiddleware, async (req, res) => {
  try {
    let projects = [];
    if (await fs.pathExists(portfolioFile)) {
      projects = await fs.readJson(portfolioFile);
    }
    const idx = projects.findIndex(p => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Project not found' });

    const { title, category, description, fullDescription, client, duration, materials, tags, image, active } = req.body;
    projects[idx] = {
      ...projects[idx],
      ...(title !== undefined && { title }),
      ...(category !== undefined && { category }),
      ...(description !== undefined && { description }),
      ...(fullDescription !== undefined && { fullDescription }),
      ...(client !== undefined && { client }),
      ...(duration !== undefined && { duration }),
      ...(materials !== undefined && { materials: Array.isArray(materials) ? materials : materials.split(',').map(m => m.trim()).filter(Boolean) }),
      ...(tags !== undefined && { tags: Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()).filter(Boolean) }),
      ...(image !== undefined && { image }),
      ...(active !== undefined && { active: active !== false && active !== 'false' }),
      updatedAt: new Date().toISOString(),
    };
    await fs.writeJson(portfolioFile, projects, { spaces: 2 });
    res.json({ success: true, project: projects[idx] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE project
app.delete('/api/portfolio/:id', adminMiddleware, async (req, res) => {
  try {
    let projects = [];
    if (await fs.pathExists(portfolioFile)) {
      projects = await fs.readJson(portfolioFile);
    }
    const filtered = projects.filter(p => p.id !== req.params.id);
    if (filtered.length === projects.length) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    await fs.writeJson(portfolioFile, filtered, { spaces: 2 });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST upload portfolio image
const portfolioImgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads', 'portfolio');
    fs.ensureDirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `portfolio_${Date.now()}${ext}`);
  }
});
const portfolioUpload = multer({ storage: portfolioImgStorage, limits: { fileSize: 10 * 1024 * 1024 } });

app.post('/api/portfolio/upload-image', adminMiddleware, portfolioUpload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, error: 'No file uploaded' });
  const url = `/portfolio-images/${req.file.filename}`;
  res.json({ success: true, url });
});

// ─────────────────────────────────────────────────────────────────────────────

// ─── Services API ────────────────────────────────────────────────────────────

const servicesFile = path.join(__dirname, 'services.json');

// Serve uploaded service images
app.use('/service-images', express.static(path.join(__dirname, 'uploads', 'services')));

// GET all services (public — active only by default, all for admin)
app.get('/api/services', (req, res, next) => req.query.admin === 'true' ? adminMiddleware(req, res, next) : next(), async (req, res) => {
  try {
    let services = [];
    if (await fs.pathExists(servicesFile)) {
      services = await fs.readJson(servicesFile);
    }
    const adminMode = req.query.admin === 'true';
    const result = adminMode ? services : services.filter(s => s.active !== false);
    res.json({ success: true, services: result.sort((a, b) => (a.order || 0) - (b.order || 0)) });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST create service
app.post('/api/services', adminMiddleware, async (req, res) => {
  try {
    let services = [];
    if (await fs.pathExists(servicesFile)) {
      services = await fs.readJson(servicesFile);
    }
    const { title, description, features, image, icon, active } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, error: 'Title and description are required' });
    }
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newService = {
      id: slug + '-' + Date.now(),
      icon: icon || 'Package',
      title,
      description,
      features: Array.isArray(features) ? features : (features ? features.split('\n').map(f => f.trim()).filter(Boolean) : []),
      image: image || '',
      order: services.length + 1,
      active: active !== false && active !== 'false',
      createdAt: new Date().toISOString(),
    };
    services.push(newService);
    await fs.writeJson(servicesFile, services, { spaces: 2 });
    res.json({ success: true, service: newService });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT update service
app.put('/api/services/:id', adminMiddleware, async (req, res) => {
  try {
    let services = [];
    if (await fs.pathExists(servicesFile)) {
      services = await fs.readJson(servicesFile);
    }
    const idx = services.findIndex(s => s.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Service not found' });

    const { title, description, features, image, icon, active, order } = req.body;
    services[idx] = {
      ...services[idx],
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(features !== undefined && {
        features: Array.isArray(features) ? features : features.split('\n').map(f => f.trim()).filter(Boolean)
      }),
      ...(image !== undefined && { image }),
      ...(icon !== undefined && { icon }),
      ...(active !== undefined && { active: active !== false && active !== 'false' }),
      ...(order !== undefined && { order: Number(order) }),
      updatedAt: new Date().toISOString(),
    };
    await fs.writeJson(servicesFile, services, { spaces: 2 });
    res.json({ success: true, service: services[idx] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE service
app.delete('/api/services/:id', adminMiddleware, async (req, res) => {
  try {
    let services = [];
    if (await fs.pathExists(servicesFile)) {
      services = await fs.readJson(servicesFile);
    }
    const filtered = services.filter(s => s.id !== req.params.id);
    if (filtered.length === services.length) {
      return res.status(404).json({ success: false, error: 'Service not found' });
    }
    await fs.writeJson(servicesFile, filtered, { spaces: 2 });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST upload service image
const serviceImgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, 'uploads', 'services');
    fs.ensureDirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `service_${Date.now()}${ext}`);
  }
});
const serviceUpload = multer({ storage: serviceImgStorage, limits: { fileSize: 10 * 1024 * 1024 } });

app.post('/api/services/upload-image', adminMiddleware, serviceUpload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, error: 'No file uploaded' });
  const url = `/service-images/${req.file.filename}`;
  res.json({ success: true, url });
});

// ─────────────────────────────────────────────────────────────────────────────

// ─── Auth & Orders API ───────────────────────────────────────────────────────

// POST /api/auth/register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ success: false, error: 'Name, email and password are required' });

    let users = await fs.pathExists(usersFile) ? await fs.readJson(usersFile) : [];
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
      return res.status(409).json({ success: false, error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const userData = { name, email: email.toLowerCase(), mobile: mobile || '', password: hashed };

    // Generate 6-digit OTP, valid for 10 minutes
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    pendingOtps.set(email.toLowerCase(), { otp, expiresAt, userData });

    // Send OTP email
    if (transporter) {
      try {
        const info = await transporter.sendMail({
          from: `"The3DIndia" <${process.env.EMAIL_FROM || process.env.SMTP_USER || etherealUser}>`,
          to: email,
          subject: 'Your The3DIndia verification code',
          html: `
            <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#f8fafc;border-radius:12px">
              <h2 style="color:#1e293b;margin-bottom:8px">Verify your account</h2>
              <p style="color:#475569;margin-bottom:24px">Hi ${name}, use the code below to complete your registration. It expires in <strong>10 minutes</strong>.</p>
              <div style="background:#fff;border:2px solid #e2e8f0;border-radius:10px;padding:24px;text-align:center;margin-bottom:24px">
                <span style="font-size:40px;font-weight:700;letter-spacing:12px;color:#2563eb">${otp}</span>
              </div>
              <p style="color:#94a3b8;font-size:13px">If you did not create an account, please ignore this email.</p>
            </div>
          `,
        });
        if (etherealUser) {
          console.log(`📧 OTP email preview: ${nodemailer.getTestMessageUrl(info)}`);
        }
      } catch (emailErr) {
        console.log('⚠️  OTP email failed:', emailErr.message);
      }
    } else {
      console.log(`📧 [DEV] OTP for ${email}: ${otp}`);
    }

    res.json({ success: true, requiresVerification: true, email: email.toLowerCase() });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

// POST /api/auth/verify-otp
app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ success: false, error: 'Email and OTP are required' });

    const pending = pendingOtps.get(email.toLowerCase());
    if (!pending)
      return res.status(400).json({ success: false, error: 'No pending verification for this email. Please register again.' });

    if (Date.now() > pending.expiresAt)
      return res.status(400).json({ success: false, error: 'OTP has expired. Please request a new one.' });

    if (pending.otp !== otp.toString().trim())
      return res.status(400).json({ success: false, error: 'Invalid OTP. Please try again.' });

    // OTP is valid — create user
    let users = await fs.pathExists(usersFile) ? await fs.readJson(usersFile) : [];
    if (users.find(u => u.email === pending.userData.email))
      return res.status(409).json({ success: false, error: 'Email already registered' });

    const user = {
      id: Date.now().toString(),
      ...pending.userData,
      isVerified: true,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    await fs.writeJson(usersFile, users, { spaces: 2 });
    pendingOtps.delete(email.toLowerCase());

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email, mobile: user.mobile } });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

// POST /api/auth/resend-otp
app.post('/api/auth/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ success: false, error: 'Email is required' });

    const pending = pendingOtps.get(email.toLowerCase());
    if (!pending)
      return res.status(400).json({ success: false, error: 'No pending verification for this email. Please register again.' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000;
    pendingOtps.set(email.toLowerCase(), { ...pending, otp, expiresAt });

    if (transporter) {
      try {
        const info = await transporter.sendMail({
          from: `"The3DIndia" <${process.env.EMAIL_FROM || process.env.SMTP_USER || etherealUser}>`,
          to: email,
          subject: 'Your new The3DIndia verification code',
          html: `
            <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#f8fafc;border-radius:12px">
              <h2 style="color:#1e293b;margin-bottom:8px">New verification code</h2>
              <p style="color:#475569;margin-bottom:24px">Here is your new code. It expires in <strong>10 minutes</strong>.</p>
              <div style="background:#fff;border:2px solid #e2e8f0;border-radius:10px;padding:24px;text-align:center;margin-bottom:24px">
                <span style="font-size:40px;font-weight:700;letter-spacing:12px;color:#2563eb">${otp}</span>
              </div>
            </div>
          `,
        });
        if (etherealUser) {
          console.log(`📧 Resend OTP email preview: ${nodemailer.getTestMessageUrl(info)}`);
        }
      } catch (emailErr) {
        console.log('⚠️  Resend OTP email failed:', emailErr.message);
      }
    } else {
      console.log(`📧 [DEV] Resent OTP for ${email}: ${otp}`);
    }

    res.json({ success: true });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

// POST /api/auth/login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, error: 'Email and password are required' });

    const users = await fs.pathExists(usersFile) ? await fs.readJson(usersFile) : [];
    const user  = users.find(u => u.email === email.toLowerCase());
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ success: false, error: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email, mobile: user.mobile } });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

// GET /api/auth/me
app.get('/api/auth/me', authMiddleware, async (req, res) => {
  try {
    const users = await fs.pathExists(usersFile) ? await fs.readJson(usersFile) : [];
    const user  = users.find(u => u.id === req.user.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, mobile: user.mobile, createdAt: user.createdAt } });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

// POST /api/auth/google  — Google OAuth login/register
app.post('/api/auth/google', async (req, res) => {
  try {
    const { email, name, picture } = req.body;
    if (!email || !name)
      return res.status(400).json({ success: false, error: 'Email and name are required' });

    let users = await fs.pathExists(usersFile) ? await fs.readJson(usersFile) : [];
    let user = users.find(u => u.email === email.toLowerCase());

    if (!user) {
      user = {
        id: Date.now().toString(),
        name,
        email: email.toLowerCase(),
        mobile: '',
        picture: picture || '',
        oauthProvider: 'google',
        password: '',
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      await fs.writeJson(usersFile, users, { spaces: 2 });
    } else {
      user.picture = picture || user.picture;
      user.oauthProvider = 'google';
      await fs.writeJson(usersFile, users, { spaces: 2 });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email, mobile: user.mobile } });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

// POST /api/auth/github  — GitHub OAuth login/register
app.post('/api/auth/github', async (req, res) => {
  try {
    const { email, name, login, avatar_url } = req.body;
    if (!email || !login)
      return res.status(400).json({ success: false, error: 'Email and login are required' });

    let users = await fs.pathExists(usersFile) ? await fs.readJson(usersFile) : [];
    let user = users.find(u => u.email === email.toLowerCase());

    if (!user) {
      user = {
        id: Date.now().toString(),
        name: name || login,
        email: email.toLowerCase(),
        mobile: '',
        picture: avatar_url || '',
        oauthProvider: 'github',
        password: '',
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      await fs.writeJson(usersFile, users, { spaces: 2 });
    } else {
      user.picture = avatar_url || user.picture;
      user.oauthProvider = 'github';
      await fs.writeJson(usersFile, users, { spaces: 2 });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email, mobile: user.mobile } });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

// POST /api/auth/github/token  — Exchange GitHub code for access token
app.post('/api/auth/github/token', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ success: false, error: 'Code is required' });

    const GITHUB_CLIENT_ID = '0ecf1bc06b3e7a75c2a9';
    const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || 'github_secret_not_configured';

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();
    if (tokenData.error) return res.status(400).json({ success: false, error: tokenData.error });

    res.json({ success: true, access_token: tokenData.access_token });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

// GET /api/orders  — user's own orders
app.get('/api/orders', authMiddleware, async (req, res) => {
  try {
    const orders = await fs.pathExists(ordersFile) ? await fs.readJson(ordersFile) : [];
    res.json({ success: true, orders: orders.filter(o => o.userId === req.user.id).reverse() });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

// POST /api/orders  — place an order
app.post('/api/orders', authMiddleware, async (req, res) => {
  try {
    const { productId, quantity, note, shippingAddress } = req.body;
    const productList = await fs.pathExists(productsFile) ? await fs.readJson(productsFile) : [];
    const product = productList.find(p => String(p.id) === String(productId) && p.active !== false);
    const qty = Number(quantity);
    if (!product) return res.status(404).json({ success: false, error: 'Product is unavailable' });
    if (!Number.isInteger(qty) || qty < 1 || qty > 100) return res.status(400).json({ success: false, error: 'Quantity must be between 1 and 100' });

    const orders = await fs.pathExists(ordersFile) ? await fs.readJson(ordersFile) : [];
    const order  = {
      id: Date.now().toString(),
      userId: req.user.id,
      userName: req.user.name,
      userEmail: req.user.email,
      productId: String(product.id), productName: product.name, productImage: product.image || '',
      category: product.category || '',
      price: Number(product.price),
      quantity: qty,
      total: Number(product.price) * qty,
      note: note || '',
      shippingAddress: shippingAddress || null,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    orders.push(order);
    await fs.writeJson(ordersFile, orders, { spaces: 2 });
    res.json({ success: true, order });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

// DELETE /api/orders/:id  — cancel an order (only if Pending)
app.delete('/api/orders/:id', authMiddleware, async (req, res) => {
  try {
    let orders = await fs.pathExists(ordersFile) ? await fs.readJson(ordersFile) : [];
    const idx  = orders.findIndex(o => o.id === req.params.id && o.userId === req.user.id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Order not found' });
    if (orders[idx].status !== 'Pending')
      return res.status(400).json({ success: false, error: 'Only pending orders can be cancelled' });
    orders[idx].status = 'Cancelled';
    await fs.writeJson(ordersFile, orders, { spaces: 2 });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

// GET /api/admin/orders  — all orders for admin
app.get('/api/admin/orders', adminMiddleware, async (req, res) => {
  try {
    const orders = await fs.pathExists(ordersFile) ? await fs.readJson(ordersFile) : [];
    res.json({ success: true, orders: orders.reverse() });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

// PUT /api/admin/orders/:id/status  — update order status
app.put('/api/admin/orders/:id/status', adminMiddleware, async (req, res) => {
  try {
    let orders = await fs.pathExists(ordersFile) ? await fs.readJson(ordersFile) : [];
    const idx  = orders.findIndex(o => o.id === req.params.id);
    if (idx === -1) return res.status(404).json({ success: false, error: 'Order not found' });
    const allowedStatuses = ['Pending', 'Confirmed', 'Processing', 'In Production', 'Shipped', 'Delivered', 'Completed', 'Cancelled'];
    if (!allowedStatuses.includes(req.body.status)) return res.status(400).json({ success: false, error: 'Invalid order status' });
    orders[idx].status = req.body.status;
    orders[idx].updatedAt = new Date().toISOString();
    await fs.writeJson(ordersFile, orders, { spaces: 2 });
    res.json({ success: true, order: orders[idx] });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

// ─── Admin Users API ─────────────────────────────────────────────────────────

// GET /api/admin/users  — all users for admin
app.get('/api/admin/users', adminMiddleware, async (req, res) => {
  try {
    const users = await fs.pathExists(usersFile) ? await fs.readJson(usersFile) : [];
    res.json({ success: true, users: users.map(({ password, ...user }) => user) });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

// DELETE /api/admin/users/:id  — delete a user (admin only)
app.delete('/api/admin/users/:id', adminMiddleware, async (req, res) => {
  try {
    let users = await fs.pathExists(usersFile) ? await fs.readJson(usersFile) : [];
    const filtered = users.filter(u => u.id !== req.params.id);
    if (filtered.length === users.length) return res.status(404).json({ success: false, error: 'User not found' });
    await fs.writeJson(usersFile, filtered, { spaces: 2 });
    res.json({ success: true });
  } catch (e) { res.status(500).json({ success: false, error: e.message }); }
});

// ─────────────────────────────────────────────────────────────────────────────

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Admin Dashboard: http://localhost:${PORT}/admin`);
    console.log(`🔗 API Health Check: http://localhost:${PORT}/api/health`);
    console.log(`📁 Uploads directory: ${uploadsDir}`);
  });
}

module.exports = app;
