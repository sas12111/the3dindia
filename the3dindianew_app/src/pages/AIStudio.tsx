import { useState } from 'react';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import {
  ArrowLeft, ArrowUpRight, Box, Check, ChevronRight, CircleHelp, Cuboid,
  Download, FileBox, FolderOpen, Gauge, Layers3, Maximize2, Move3D, Plus,
  Rotate3D, ScanLine, Settings2, ShieldCheck, Sparkles, WandSparkles,
  type LucideIcon,
} from 'lucide-react';
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
  { title: 'Front', hint: 'Required', required: true },
  { title: 'Back', hint: 'Required', required: true },
  { title: 'Left', hint: 'Required', required: true },
  { title: 'Right', hint: 'Required', required: true },
  { title: 'Top', hint: 'Optional', required: false },
  { title: 'Bottom', hint: 'Optional', required: false },
];

function PhotoReferences() {
  return (
    <Card className="gap-0 overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm shadow-slate-200/40">
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">Photo references</h2>
          <p className="mt-1 text-xs text-slate-500">Capture the object from each side.</p>
        </div>
        <Badge variant="outline" className="shrink-0 rounded-full border-slate-200 text-[10px] font-semibold text-slate-500">0 / 4 added</Badge>
      </div>
      <div className="grid grid-cols-2 gap-2.5 p-4">
        {photoViews.map(({ title, hint, required }) => (
          <div key={title} className={`group relative flex min-h-[88px] flex-col items-center justify-center rounded-xl border border-dashed ${required ? 'border-slate-300 bg-slate-50/70' : 'border-slate-200 bg-white'} px-2 py-3 text-center`}>
            <div className="mb-1.5 flex size-7 items-center justify-center rounded-lg bg-white text-slate-400 shadow-sm ring-1 ring-slate-100">
              <Plus size={15} />
            </div>
            <span className="text-xs font-semibold text-slate-700">{title}</span>
            <span className="mt-0.5 text-[10px] text-slate-400">{hint}</span>
          </div>
        ))}
      </div>
      <div className="mx-4 mb-4 flex items-start gap-2.5 rounded-xl bg-orange-50/70 px-3 py-3">
        <ShieldCheck size={16} className="mt-0.5 shrink-0 text-[#dd7900]" />
        <p className="text-[11px] leading-relaxed text-slate-600">Use a plain background and even lighting. Photo upload will be enabled in the next build phase.</p>
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

function GenerationSettings() {
  const [output, setOutput] = useState<'textured' | 'printable'>('textured');

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

        <Button disabled className="h-10 w-full rounded-xl bg-[#f78e00] text-xs font-bold text-white hover:bg-[#e07e00]">
          <Sparkles size={15} /> Generate 3D model
        </Button>
        <p className="text-center text-[10px] text-slate-400">Generation will be connected in a later phase.</p>
      </div>
    </Card>
  );
}

function CreateModelPage() {
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
        <div className="space-y-4"><PhotoReferences />
          <div className="hidden items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 xl:flex">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500"><Settings2 size={16} /></div>
            <div><p className="text-xs font-semibold text-slate-700">Better results</p><p className="mt-0.5 text-[10px] text-slate-400">Keep the camera at object height.</p></div>
          </div>
        </div>
        <ModelViewport />
        <GenerationSettings />
      </div>

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
