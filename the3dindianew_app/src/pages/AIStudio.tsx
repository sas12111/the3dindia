import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import {
  ArrowLeft, ArrowUpRight, Box, Check, ChevronRight, CircleHelp, Cuboid,
  Download, FileBox, FolderOpen, Gauge, Layers3, LoaderCircle, Maximize2,
  Move3D, Plus, Rotate3D, ScanLine, Settings2, ShieldCheck, Sparkles,
  WandSparkles, X,
  type LucideIcon,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API, apiUrl } from '../utils/api';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

type StudioNavItem = { to: string; label: string; icon: LucideIcon; end?: boolean };

const studioNav: StudioNavItem[] = [
  { to: '/studio', label: 'Create model', icon: WandSparkles, end: true },
  { to: '/studio/models', label: 'My models', icon: FolderOpen },
  { to: '/studio/printability', label: 'Printability', icon: ScanLine },
];

function StudioSidebar() {
  return (
    <aside className="hidden w-[248px] shrink-0 border-r border-slate-200 bg-white md:flex md:flex-col">
      <div className="px-5 pb-5 pt-6">
        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">Workspace</p>
        <nav aria-label="Studio navigation" className="space-y-1">
          {studioNav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-orange-50 text-[#d97706]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Icon size={17} strokeWidth={1.8} />
              {label}
              {label === 'My models' && <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500">0</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mx-5 mt-auto mb-5 rounded-2xl border border-orange-100 bg-orange-50/70 p-4">
        <div className="mb-2 flex size-8 items-center justify-center rounded-lg bg-white text-[#e58200] shadow-sm">
          <CircleHelp size={17} />
        </div>
        <p className="text-sm font-semibold text-slate-800">New to 3D modeling?</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">A few clear photos help create a more complete shape.</p>
        <Link to="/learn" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#c76b00] hover:underline">
          Learn the basics <ArrowUpRight size={13} />
        </Link>
      </div>
    </aside>
  );
}

function StudioHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-[62px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link to="/" aria-label="Back to The3DIndia" className="flex items-center gap-2 rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">
            <ArrowLeft size={17} />
            <span className="hidden text-xs font-medium sm:inline">Website</span>
          </Link>
          <span className="h-6 w-px bg-slate-200" />
          <div className="flex size-8 items-center justify-center rounded-[10px] bg-[#f78e00] text-white shadow-sm shadow-orange-200">
            <Cuboid size={18} strokeWidth={1.9} />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-bold tracking-tight text-slate-900">The3DIndia <span className="font-medium text-slate-400">Studio</span></p>
            <p className="hidden text-[10px] font-medium text-slate-400 sm:block">AI MODEL WORKSPACE</p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Badge variant="outline" className="hidden rounded-full border-slate-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500 sm:inline-flex">
            <Sparkles size={12} className="mr-1 text-[#e58200]" /> Preview
          </Badge>
          <Button variant="outline" size="sm" asChild className="h-8 rounded-lg border-slate-200 px-3 text-xs">
            <Link to="/contact">Get help</Link>
          </Button>
        </div>
      </div>
      <nav aria-label="Mobile studio navigation" className="flex gap-1 overflow-x-auto border-t border-slate-100 px-3 py-2 md:hidden">
        {studioNav.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold ${isActive ? 'bg-orange-50 text-[#d97706]' : 'text-slate-500 hover:bg-slate-50'}`}>
            <Icon size={15} />{label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

const photoViews = [
  { view: 'front', title: 'Front', hint: 'Required', required: true },
  { view: 'back', title: 'Back', hint: 'Recommended', required: true },
  { view: 'left', title: 'Left', hint: 'Recommended', required: true },
  { view: 'right', title: 'Right', hint: 'Recommended', required: true },
  { view: 'top', title: 'Top', hint: 'Coming later', required: false },
  { view: 'bottom', title: 'Bottom', hint: 'Coming later', required: false },
];

type ImageView = 'front' | 'left' | 'back' | 'right';
type SelectedImage = { file: File; preview: string; width: number; height: number };
type SelectedImages = Partial<Record<ImageView, SelectedImage>>;
type StudioTask = {
  taskId: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'SUCCEEDED' | 'FAILED' | 'CANCELED';
  progress: number;
  thumbnailUrl: string | null;
  modelUrl: string | null;
  outputType: 'textured' | 'printable';
  createdAt: string;
  error: string | null;
};

const imageMimeByExtension: Record<string, string> = {
  jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp',
};

function readImageDimensions(preview: string) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => reject(new Error('This file could not be decoded as an image.'));
    image.src = preview;
  });
}

function PhotoReferences({
  images,
  errors,
  onSelect,
  onRemove,
}: {
  images: SelectedImages;
  errors: Partial<Record<ImageView, string>>;
  onSelect: (view: ImageView, file?: File) => void;
  onRemove: (view: ImageView) => void;
}) {
  const selectedCount = Object.keys(images).length;
  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm shadow-slate-200/40">
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Photo references</h2>
          <p className="mt-1 text-xs text-slate-500">Capture the object from each side.</p>
        </div>
        <Badge variant="outline" className="shrink-0 rounded-full border-slate-200 text-[10px] font-semibold text-slate-500">{selectedCount} / 4 added</Badge>
      </div>
      <div className="grid grid-cols-2 gap-2.5 p-4">
        {photoViews.map(({ view, title, hint, required }) => {
          if (!required) return (
            <div key={view} className="flex min-h-[88px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white px-2 py-3 text-center opacity-60">
              <div className="mb-1.5 flex size-7 items-center justify-center rounded-lg bg-slate-50 text-slate-400"><Plus size={15} /></div>
              <span className="text-xs font-semibold text-slate-500">{title}</span>
              <span className="mt-0.5 text-[10px] text-slate-400">{hint}</span>
            </div>
          );
          const typedView = view as ImageView;
          const image = images[typedView];
          return (
            <div key={view} className="min-w-0">
              <div className={`group relative h-[112px] overflow-hidden rounded-xl border ${image ? 'border-slate-200 bg-slate-900' : errors[typedView] ? 'border-red-300 bg-red-50' : 'border-dashed border-slate-300 bg-slate-50/70'}`}>
                {image ? <>
                  <img src={image.preview} alt={`${title} reference`} className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/75 to-transparent px-2.5 pb-2 pt-6 text-white">
                    <span className="text-[11px] font-semibold">{title}</span>
                    <button type="button" aria-label={`Remove ${title.toLowerCase()} image`} onClick={() => onRemove(typedView)} className="flex size-6 items-center justify-center rounded-md bg-white/20 transition hover:bg-white/35"><X size={14} /></button>
                  </div>
                  <label className="absolute inset-x-0 top-0 flex cursor-pointer justify-center bg-black/45 py-1.5 text-[10px] font-semibold text-white opacity-0 transition group-hover:opacity-100 focus-within:opacity-100">Replace image<input type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" className="sr-only" onChange={event => { onSelect(typedView, event.target.files?.[0]); event.currentTarget.value = ''; }} /></label>
                </> : <label className="flex h-full cursor-pointer flex-col items-center justify-center px-2 text-center">
                  <input type="file" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp" className="sr-only" onChange={event => { onSelect(typedView, event.target.files?.[0]); event.currentTarget.value = ''; }} />
                  <span className="mb-1.5 flex size-7 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm ring-1 ring-slate-100"><Plus size={15} /></span>
                  <span className="text-xs font-semibold text-slate-700">{title} view</span>
                  <span className="mt-0.5 text-[10px] text-slate-400">{hint} · Add photo</span>
                </label>}
              </div>
              {image && <p className="mt-1 truncate text-[10px] text-slate-400">{image.width} × {image.height}px · {image.file.name}</p>}
              {errors[typedView] && <p role="alert" className="mt-1 text-[10px] leading-snug text-red-600">{errors[typedView]}</p>}
            </div>
          );
        })}
      </div>
      <div className="mx-4 mb-4 flex items-start gap-2.5 rounded-xl bg-orange-50/70 px-3 py-3">
        <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#dd7900]" />
        <p className="text-[11px] leading-relaxed text-slate-600">JPG, PNG or WebP, up to 20 MB each. One front image is enough; all four views are recommended.</p>
      </div>
    </Card>
  );
}

function ModelViewport() {
  return (
    <section aria-label="3D model preview" className="relative flex min-h-[370px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-[#f1f3f6] shadow-sm shadow-slate-200/40 lg:min-h-0">
      <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.12) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="relative z-10 flex items-center justify-between border-b border-slate-200/70 bg-white/65 px-4 py-3 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600"><Move3D size={15} /> Model preview</div>
        <div className="flex items-center gap-1.5">
          <button type="button" aria-label="Rotate model" disabled className="flex size-7 items-center justify-center rounded-md text-slate-400 hover:bg-white disabled:cursor-not-allowed"><Rotate3D size={15} /></button>
          <button type="button" aria-label="Fit model to view" disabled className="flex size-7 items-center justify-center rounded-md text-slate-400 hover:bg-white disabled:cursor-not-allowed"><Maximize2 size={14} /></button>
        </div>
      </div>
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
        <div className="relative mb-5 flex size-24 items-center justify-center rounded-[28px] border border-white bg-white/80 text-slate-300 shadow-lg shadow-slate-300/20">
          <Box size={43} strokeWidth={1.1} />
          <span className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-xl border-2 border-[#f1f3f6] bg-[#f78e00] text-white"><Sparkles size={15} /></span>
        </div>
        <h2 className="text-base font-bold text-slate-800">Your model will appear here</h2>
        <p className="mt-2 max-w-[270px] text-xs leading-relaxed text-slate-500">Add reference photos to create a 3D preview you can rotate and inspect.</p>
      </div>
      <div className="relative z-10 flex items-center justify-between border-t border-slate-200/70 bg-white/65 px-4 py-2.5 text-[10px] text-slate-400 backdrop-blur-sm">
        <span className="inline-flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-slate-300" /> Viewer ready</span>
        <span>Drag to rotate · Scroll to zoom</span>
      </div>
    </section>
  );
}

function GenerationSettings({
  output,
  setOutput,
  onGenerate,
  generating,
  canGenerate,
  signedIn,
}: {
  output: 'textured' | 'printable';
  setOutput: (value: 'textured' | 'printable') => void;
  onGenerate: () => void;
  generating: boolean;
  canGenerate: boolean;
  signedIn: boolean;
}) {

  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm shadow-slate-200/40">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="text-sm font-bold text-slate-900">Generation setup</h2>
        <p className="mt-1 text-xs text-slate-500">Choose what you want to create.</p>
      </div>
      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Model type</p>
          <button type="button" onClick={() => setOutput('textured')} className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${output === 'textured' ? 'border-orange-300 bg-orange-50/60 ring-1 ring-orange-100' : 'border-slate-200 hover:border-slate-300'}`}>
            <span className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg ${output === 'textured' ? 'bg-white text-[#d97706]' : 'bg-slate-100 text-slate-500'}`}><Layers3 size={16} /></span>
            <span><span className="block text-xs font-semibold text-slate-800">Realistic, textured</span><span className="mt-1 block text-[10px] leading-relaxed text-slate-500">Detailed appearance for digital previews.</span></span>
            {output === 'textured' && <Check size={15} className="ml-auto mt-0.5 shrink-0 text-[#d97706]" />}
          </button>
          <button type="button" onClick={() => setOutput('printable')} className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${output === 'printable' ? 'border-orange-300 bg-orange-50/60 ring-1 ring-orange-100' : 'border-slate-200 hover:border-slate-300'}`}>
            <span className={`mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg ${output === 'printable' ? 'bg-white text-[#d97706]' : 'bg-slate-100 text-slate-500'}`}><FileBox size={16} /></span>
            <span><span className="block text-xs font-semibold text-slate-800">3D-printable mesh</span><span className="mt-1 block text-[10px] leading-relaxed text-slate-500">Closed geometry prepared for printing.</span></span>
            {output === 'printable' && <Check size={15} className="ml-auto mt-0.5 shrink-0 text-[#d97706]" />}
          </button>
        </div>

        <div className="space-y-2 border-t border-slate-100 pt-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Output formats</p>
          <div className="flex gap-2">{['GLB', 'STL', '3MF'].map(format => <span key={format} className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] font-bold tracking-wide text-slate-500">{format}</span>)}</div>
          <p className="text-[10px] leading-relaxed text-slate-400">Available exports depend on the generated model type.</p>
        </div>

        <Button disabled={!canGenerate || generating} onClick={onGenerate} className="h-10 w-full rounded-xl bg-[#f78e00] text-xs font-bold text-white hover:bg-[#e07e00]">
          {generating ? <LoaderCircle size={15} className="animate-spin" /> : <Sparkles size={15} />}
          {generating ? 'Starting generation…' : 'Generate 3D model'}
        </Button>
        {!signedIn ? <p className="text-center text-[11px] text-slate-500"><Link to="/login" state={{ from: '/studio' }} className="font-semibold text-[#c76b00] hover:underline">Sign in</Link> to generate a model.</p> : !canGenerate && <p className="text-center text-[10px] text-slate-400">Add a front-view photo to continue.</p>}
      </div>
    </Card>
  );
}

function CreateModelPage() {
  const { token, user, loading: authLoading } = useAuth();
  const [images, setImages] = useState<SelectedImages>({});
  const [imageErrors, setImageErrors] = useState<Partial<Record<ImageView, string>>>({});
  const [output, setOutput] = useState<'textured' | 'printable'>('textured');
  const [generating, setGenerating] = useState(false);
  const [generationError, setGenerationError] = useState('');
  const [activeTask, setActiveTask] = useState<StudioTask | null>(null);
  const [pollingError, setPollingError] = useState('');
  const [pollingTimedOut, setPollingTimedOut] = useState(false);
  const [pollVersion, setPollVersion] = useState(0);
  const objectUrls = useRef(new Set<string>());
  const signedIn = Boolean(token && user);

  useEffect(() => () => {
    objectUrls.current.forEach(url => URL.revokeObjectURL(url));
    objectUrls.current.clear();
  }, []);

  const handleImageSelect = async (view: ImageView, file?: File) => {
    if (!file) return;
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    if (!imageMimeByExtension[extension] || file.type !== imageMimeByExtension[extension]) {
      setImageErrors(previous => ({ ...previous, [view]: 'Choose a JPG, JPEG, PNG or WebP image.' }));
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setImageErrors(previous => ({ ...previous, [view]: 'Each image must be 20 MB or smaller.' }));
      return;
    }

    const preview = URL.createObjectURL(file);
    try {
      const { width, height } = await readImageDimensions(preview);
      if (width < 32 || height < 32) throw new Error('Images must be at least 32 × 32 pixels.');
      if (width * height > 178956970) throw new Error('This image exceeds the supported pixel dimensions.');
      const previousUrl = images[view]?.preview;
      if (previousUrl) { URL.revokeObjectURL(previousUrl); objectUrls.current.delete(previousUrl); }
      objectUrls.current.add(preview);
      setImages(previous => ({ ...previous, [view]: { file, preview, width, height } }));
      setImageErrors(previous => ({ ...previous, [view]: '' }));
    } catch (error) {
      URL.revokeObjectURL(preview);
      const message = error instanceof Error ? error.message : 'This image could not be validated.';
      setImageErrors(previous => ({ ...previous, [view]: message }));
    }
  };

  const handleImageRemove = (view: ImageView) => {
    const preview = images[view]?.preview;
    if (preview) { URL.revokeObjectURL(preview); objectUrls.current.delete(preview); }
    setImages(previous => { const next = { ...previous }; delete next[view]; return next; });
    setImageErrors(previous => ({ ...previous, [view]: '' }));
  };

  const handleGenerate = async () => {
    if (!token || !images.front || generating) return;
    if (!API && !['localhost', '127.0.0.1'].includes(window.location.hostname)) {
      setGenerationError('Configure VITE_API_URL to point to the Express backend before uploading images from production.');
      return;
    }
    setGenerating(true);
    setGenerationError('');
    setPollingError('');
    setPollingTimedOut(false);
    const selectedViews = (['front', 'back', 'left', 'right'] as const).filter(view => images[view]);
    const payload = new FormData();
    selectedViews.forEach(view => payload.append('images', images[view]!.file, images[view]!.file.name));
    payload.append('views', JSON.stringify(selectedViews));
    payload.append('outputType', output);
    try {
      const response = await fetch(apiUrl('/api/ai-studio/generate'), {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        const message = data.code === 'insufficient_credits'
          ? 'The generation service has insufficient credits. Please contact support.'
          : data.error || 'Could not start generation. Please try again.';
        throw new Error(message);
      }
      setActiveTask(data.task as StudioTask);
    } catch (error) {
      setGenerationError(error instanceof Error ? error.message : 'Could not start generation. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    if (!activeTask || !token || ['SUCCEEDED', 'FAILED', 'CANCELED'].includes(activeTask.status)) return;
    let stopped = false;
    let timer: number | undefined;
    const startedAt = Date.now();

    const poll = async () => {
      if (stopped) return;
      if (Date.now() - startedAt >= 30 * 60 * 1000) {
        setPollingTimedOut(true);
        return;
      }
      try {
        const response = await fetch(apiUrl(`/api/ai-studio/tasks/${encodeURIComponent(activeTask.taskId)}`), {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.error || 'Status check failed.');
        if (stopped) return;
        setActiveTask(data.task as StudioTask);
        setPollingError('');
        if (['SUCCEEDED', 'FAILED', 'CANCELED'].includes(data.task.status)) return;
      } catch (error) {
        if (!stopped) setPollingError(error instanceof Error ? error.message : 'Could not check task status.');
      }
      if (!stopped) timer = window.setTimeout(poll, 5000);
    };

    timer = window.setTimeout(poll, 5000);
    return () => { stopped = true; if (timer) window.clearTimeout(timer); };
  }, [activeTask?.taskId, activeTask?.status, token, pollVersion]);

  const canGenerate = Boolean(images.front && signedIn && !generating && (!activeTask || ['SUCCEEDED', 'FAILED', 'CANCELED'].includes(activeTask.status)));

  return (
    <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[11px] font-medium text-slate-400"><span>Studio</span><ChevronRight size={13} /><span className="text-slate-600">Create model</span></div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[28px]">From photos to 3D</h1>
          <p className="mt-1.5 text-sm text-slate-500">Build a digital model of your object from a few clear views.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500"><span className="flex size-6 items-center justify-center rounded-full bg-orange-100 text-[#d97706]"><Sparkles size={13} /></span>Powered by AI reconstruction</div>
      </div>

      <div className="grid items-stretch gap-4 xl:grid-cols-[310px_minmax(300px,1fr)_300px] 2xl:gap-5">
        <div className="space-y-4"><PhotoReferences images={images} errors={imageErrors} onSelect={handleImageSelect} onRemove={handleImageRemove} />
          <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 xl:flex">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500"><Settings2 size={16} /></div>
            <div><p className="text-xs font-semibold text-slate-700">Better results</p><p className="mt-0.5 text-[10px] text-slate-400">Keep the camera at object height.</p></div>
          </div>
        </div>
        <ModelViewport />
        <GenerationSettings output={output} setOutput={setOutput} onGenerate={handleGenerate} generating={generating || authLoading} canGenerate={canGenerate} signedIn={signedIn} />
      </div>

      {generationError && <div role="alert" className="mt-4 flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700"><span>{generationError}</span><button type="button" onClick={() => setGenerationError('')} aria-label="Dismiss error"><X size={15} /></button></div>}

      {activeTask && <Card className="mt-4 gap-0 rounded-2xl border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {activeTask.thumbnailUrl ? <img src={activeTask.thumbnailUrl} alt="Generated model thumbnail" className="size-20 rounded-xl border border-slate-200 bg-slate-50 object-cover" /> : <div className="flex size-20 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400"><Box size={28} /></div>}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2"><h2 className="text-sm font-bold text-slate-800">{activeTask.status === 'SUCCEEDED' ? 'Your model is ready' : activeTask.status === 'FAILED' ? 'Generation failed' : activeTask.status === 'CANCELED' ? 'Generation canceled' : 'Generating your model'}</h2><Badge variant="outline" className="rounded-full border-slate-200 text-[10px] font-semibold text-slate-500">{activeTask.status.replace('_', ' ')}</Badge></div>
            {['PENDING', 'IN_PROGRESS'].includes(activeTask.status) && <><p className="mt-1 text-xs text-slate-500">Meshy is processing your photos. This can take a few minutes.</p><div className="mt-3 flex items-center gap-3"><div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#f78e00] transition-[width] duration-500" style={{ width: `${activeTask.progress}%` }} /></div><span className="w-9 text-right text-[11px] font-semibold tabular-nums text-slate-500">{activeTask.progress}%</span></div></>}
            {activeTask.error && <p role="alert" className="mt-1 text-xs text-red-600">{activeTask.error}</p>}
            {pollingError && <p role="alert" className="mt-1 text-xs text-amber-700">{pollingError}</p>}
            {pollingTimedOut && <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-amber-700"><span>Status polling reached its 30-minute limit.</span><button type="button" className="font-semibold underline" onClick={() => { setPollingTimedOut(false); setPollVersion(value => value + 1); }}>Check again</button></div>}
          </div>
          {activeTask.status === 'SUCCEEDED' && activeTask.modelUrl && <Button asChild className="h-9 shrink-0 rounded-lg bg-[#f78e00] px-4 text-xs font-bold text-white hover:bg-[#e07e00]"><a href={activeTask.modelUrl} target="_blank" rel="noreferrer"><Download size={14} /> Download GLB</a></Button>}
          {['FAILED', 'CANCELED'].includes(activeTask.status) && <Button onClick={handleGenerate} disabled={!canGenerate} variant="outline" className="h-9 shrink-0 rounded-lg border-slate-200 text-xs">Try again</Button>}
        </div>
      </Card>}

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { icon: Rotate3D, title: 'Inspect in 3D', copy: 'Rotate and zoom your model in the interactive viewer.' },
          { icon: Gauge, title: 'Check printability', copy: 'Review mesh health and dimensions before export.' },
          { icon: Download, title: 'Export your files', copy: 'Download a format that fits your next step.' },
        ].map(({ icon: Icon, title, copy }) => (
          <div key={title} className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white/75 px-4 py-3.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500"><Icon size={16} /></span>
            <div><p className="text-xs font-semibold text-slate-700">{title}</p><p className="mt-1 text-[11px] leading-relaxed text-slate-400">{copy}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EmptyStudioPage({ kind }: { kind: 'models' | 'printability' }) {
  const models = kind === 'models';
  const Icon = models ? FolderOpen : ScanLine;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mb-7 flex items-center gap-2 text-[11px] font-medium text-slate-400"><span>Studio</span><ChevronRight size={13} /><span className="text-slate-600">{models ? 'My models' : 'Printability'}</span></div>
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div><h1 className="text-2xl font-bold tracking-tight text-slate-900">{models ? 'My models' : 'Printability analysis'}</h1><p className="mt-1.5 text-sm text-slate-500">{models ? 'Your generated models and recent work.' : 'Review mesh health and configure dimensions for printing.'}</p></div>
        {models && <Button asChild className="h-9 rounded-lg bg-[#f78e00] px-4 text-xs font-bold text-white hover:bg-[#e07e00]"><Link to="/studio"><Plus size={15} /> Create a model</Link></Button>}
      </div>
      {models ? (
        <Card className="items-center gap-0 rounded-2xl border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-orange-50 text-[#dd7900]"><Icon size={25} strokeWidth={1.6} /></div>
          <h2 className="text-sm font-bold text-slate-800">Your model library is ready</h2>
          <p className="mt-2 max-w-sm text-xs leading-relaxed text-slate-500">Once you generate a model, it will be saved here with its preview and export files.</p>
          <Button asChild variant="outline" className="mt-5 h-9 rounded-lg border-slate-200 text-xs"><Link to="/studio">Start with photos <ChevronRight size={14} /></Link></Button>
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Card className="gap-0 rounded-2xl border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-xl bg-orange-50 text-[#dd7900]"><ScanLine size={18} /></span><div><h2 className="text-sm font-bold text-slate-800">Mesh health</h2><p className="mt-0.5 text-[11px] text-slate-400">Analysis appears after a mesh is generated.</p></div></div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[['Watertight mesh', '—'], ['Surface integrity', '—'], ['Print orientation', '—']].map(([title, value]) => <div key={title} className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"><p className="text-[11px] font-medium text-slate-500">{title}</p><p className="mt-3 text-lg font-bold text-slate-300">{value}</p></div>)}
            </div>
            <div className="mt-5 rounded-xl border border-dashed border-slate-200 p-5 text-center"><p className="text-xs font-semibold text-slate-500">No mesh selected</p><p className="mt-1 text-[11px] text-slate-400">Generate a printable model to see its analysis here.</p></div>
          </Card>
          <Card className="gap-0 rounded-2xl border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500"><Settings2 size={17} /></span><div><h2 className="text-sm font-bold text-slate-800">Part dimensions</h2><p className="mt-0.5 text-[11px] text-slate-400">Configure final model size.</p></div></div>
            <div className="space-y-3">{['Width', 'Height', 'Depth'].map(axis => <label key={axis} className="block text-[11px] font-semibold text-slate-500">{axis}<span className="mt-1.5 flex h-9 items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 font-normal text-slate-400">— <span className="text-[10px]">mm</span></span></label>)}</div>
            <Button disabled variant="outline" className="mt-4 h-9 w-full rounded-lg text-xs">Apply dimensions</Button>
          </Card>
        </div>
      )}
    </div>
  );
}

export function AIStudio() {
  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-900">
      <StudioHeader />
      <div className="flex min-h-[calc(100vh-62px)]">
        <StudioSidebar />
        <main className="min-w-0 flex-1">
          <Routes>
            <Route index element={<CreateModelPage />} />
            <Route path="models" element={<EmptyStudioPage kind="models" />} />
            <Route path="printability" element={<EmptyStudioPage kind="printability" />} />
            <Route path="*" element={<CreateModelPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
