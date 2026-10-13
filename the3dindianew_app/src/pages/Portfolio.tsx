import { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { apiUrl } from '../utils/api';
import {
  ArrowRight,
  Boxes,
  Clock,
  Gift,
  Layers,
  Loader2,
  PackageCheck,
  Search,
  ShieldCheck,
  Sparkles,
  Tag,
  User,
  Wrench,
  X,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const IMG = '/images/portfolio';

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  client: string;
  duration: string;
  materials: string[];
  tags: string[];
  fullDescription: string;
  active: boolean;
}

/* Fallback mirrors backend/portfolio.json so the page works without the API. */
const FALLBACK_PROJECTS: Project[] = [
  { id: '1', title: 'Engineering Prototypes', category: 'Industrial', image: `${IMG}/engineering-prototypes.jpg`, description: 'Precision-engineered prototypes for automotive and industrial applications.', client: '', duration: '', materials: ['PETG', 'PLA', 'TPU'], tags: ['Automotive', 'Functional Part', 'FDM'], fullDescription: 'An example of high-precision prototypes such as bracket assemblies, housing covers and functional test parts, printed with tight tolerances and post-processed for fit-and-function testing.', active: true },
  { id: '2', title: 'Custom Miniatures', category: 'Gifts', image: `${IMG}/custom-miniatures.jpg`, description: 'Detailed miniature figurines and customized decorative models.', client: '', duration: '', materials: ['PLA', 'PETG'], tags: ['Miniatures', 'Figurines', 'Customized'], fullDescription: 'Highly detailed miniature figurines and decorative models, printed for fine surface detail and hand-finished where required.', active: true },
  { id: '3', title: 'Product Development', category: 'Design', image: `${IMG}/product-development.jpg`, description: 'Product design, CAD modeling and engineering from concept to final model.', client: '', duration: '', materials: ['PLA', 'TPU', 'PETG'], tags: ['CAD', 'Product Design', 'Iteration'], fullDescription: 'End-to-end product development: CAD modeling from sketches, iterative prototypes for testing and design refinement across multiple revision cycles.', active: true },
  { id: '4', title: '3D Printed Models', category: 'Prototyping', image: `${IMG}/3d-printed-models.jpg`, description: 'Architectural and conceptual models for visualization and testing.', client: '', duration: '', materials: ['PLA', 'PETG'], tags: ['Architecture', 'Scale Model', 'Concept'], fullDescription: 'Conceptual and architectural scale models for presentation and visualization, printed in multiple parts and finished to match the design intent.', active: true },
  { id: '5', title: 'Industrial Components', category: 'Manufacturing', image: `${IMG}/industrial-components.jpg`, description: 'Batch production of functional parts and custom industrial components.', client: '', duration: '', materials: ['PETG', 'PLA', 'TPU'], tags: ['Bulk', 'Industrial', 'Quality Control'], fullDescription: 'Batch production of functional components such as jigs, fixtures and end-use parts, with a consistent quality-control process keeping dimensions repeatable across the batch.', active: true },
  { id: '6', title: 'Custom Keychains', category: 'Gifts', image: `${IMG}/custom-keychains.jpg`, description: 'Personalized keychains for corporate events and individual orders.', client: '', duration: '', materials: ['PLA', 'TPU'], tags: ['Corporate', 'Custom Design', 'Personalized'], fullDescription: 'Custom branded keychains with raised-relief logos and flexible loops, handled from logo vectorization to print and finishing.', active: true },
  { id: '7', title: 'Mechanical Parts', category: 'Industrial', image: `${IMG}/mechanical-parts.jpg`, description: 'Custom mechanical components and assemblies for various applications.', client: '', duration: '', materials: ['PETG', 'PLA'], tags: ['Mechanical', 'Assembly', 'Functional Part'], fullDescription: 'Custom mechanical components including gears, brackets and housing assemblies, printed in durable materials and post-processed for final assembly.', active: true },
  { id: '8', title: 'Architectural Models', category: 'Design', image: `${IMG}/architectural-models.jpg`, description: 'Scale models for architectural presentations and real estate projects.', client: '', duration: '', materials: ['PLA', 'PETG'], tags: ['Architecture', 'Presentation', 'Scale'], fullDescription: 'Detailed scale architectural models for presentations and real estate visualization, printed in parts and finished for display.', active: true },
  { id: '9', title: 'Functional Prototypes', category: 'Prototyping', image: `${IMG}/functional-prototypes.jpg`, description: 'Working prototypes for product validation and iterative development.', client: '', duration: '', materials: ['PETG', 'TPU', 'PLA'], tags: ['Functional', 'Validation', 'Testing'], fullDescription: 'Working prototypes and educational models for validation and demonstration, used for user testing with feedback informing the final design.', active: true },
];

const CATEGORIES = ['All', 'Design', 'Gifts', 'Industrial', 'Manufacturing', 'Prototyping'];
const PAGE_SIZE = 6;

const highlights = [
  { icon: Boxes, title: 'Functional & Prototype Parts', desc: 'Brackets, enclosures, gears and working prototypes.' },
  { icon: Sparkles, title: 'Custom Designs & Miniatures', desc: 'Personalized figurines, keepsakes and detailed models.' },
  { icon: PackageCheck, title: 'Single Pieces to Bulk', desc: 'From one-off prints to repeatable batch production.' },
  { icon: ShieldCheck, title: 'Consistent Quality', desc: 'Clean, accurate and reliable results every time.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const } }),
};
const viewport = { once: true, amount: 0.15 } as const;

/* -------------------------------------------------------------------------- */
/*  Project detail modal (preserved, lightly restyled)                         */
/* -------------------------------------------------------------------------- */

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project) {
      if (!dialog.open) dialog.showModal();
      document.body.style.overflow = 'hidden';
    } else {
      if (dialog.open) dialog.close();
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  if (!project) return null;

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onCancel={(e) => { e.preventDefault(); onClose(); }}
      aria-label={`${project.title} details`}
      className="w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-2xl p-0 backdrop:bg-black/60"
    >
      <div className="max-h-[90vh] overflow-y-auto">
        <div className="relative h-56 overflow-hidden sm:h-64">
          <ImageWithFallback src={project.image} alt={project.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
          <span className="absolute bottom-4 left-6 rounded-full bg-[#f78e00] px-3 py-1 text-sm font-medium text-white">
            {project.category}
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow transition-colors hover:bg-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900">{project.title}</h2>
          <p className="mb-6 text-gray-600">{project.description}</p>

          {(project.client || project.duration) && (
            <div className="mb-6 grid grid-cols-2 gap-4">
              {project.client && (
                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                  <User size={20} className="text-[#f78e00]" />
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-wide text-gray-400">Client</p>
                    <p className="text-sm font-medium text-gray-800">{project.client}</p>
                  </div>
                </div>
              )}
              {project.duration && (
                <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                  <Clock size={20} className="text-[#f78e00]" />
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-wide text-gray-400">Duration</p>
                    <p className="text-sm font-medium text-gray-800">{project.duration}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {project.fullDescription && (
            <div className="mb-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-700">Project Overview</p>
              <p className="leading-7 text-gray-600">{project.fullDescription}</p>
            </div>
          )}

          {project.materials?.length > 0 && (
            <div className="mb-5">
              <div className="mb-2 flex items-center gap-2">
                <Layers size={16} className="text-[#f78e00]" />
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-700">Materials Used</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.materials.map((mat) => (
                  <span key={mat} className="rounded-full border border-[#fff3e0] bg-[#fff8f0] px-3 py-1 text-sm text-[#e07e00]">{mat}</span>
                ))}
              </div>
            </div>
          )}

          {project.tags?.length > 0 && (
            <div className="mb-6">
              <div className="mb-2 flex items-center gap-2">
                <Tag size={16} className="text-[#f78e00]" />
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-700">Tags</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-600">#{tag}</span>
                ))}
              </div>
            </div>
          )}

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-[#f78e00] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#e07e00]"
          >
            Discuss a Similar Project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </dialog>
  );
}

/* -------------------------------------------------------------------------- */

export function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    let done = false;
    fetch(apiUrl('/api/portfolio'))
      .then((r) => r.json())
      .then((data) => {
        if (done) return;
        if (data.success && Array.isArray(data.projects) && data.projects.length > 0) setProjects(data.projects);
        else setProjects(FALLBACK_PROJECTS);
      })
      .catch(() => { if (!done) setProjects(FALLBACK_PROJECTS); })
      .finally(() => { if (!done) setLoading(false); });
    return () => { done = true; };
  }, []);

  // Reset pagination when filter/search change.
  useEffect(() => { setVisible(PAGE_SIZE); }, [category, query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (category !== 'All' && p.category !== category) return false;
      if (!q) return true;
      const haystack = [p.title, p.description, p.category, ...(p.tags || []), ...(p.materials || [])]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [projects, category, query]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      {/* ================================================================== */}
      {/* HERO                                                               */}
      {/* ================================================================== */}
      <section className="relative isolate overflow-hidden bg-[#0d1016] text-white">
        <div className="absolute -left-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[#f78e00]/18 blur-[130px]" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#0d1016]" aria-hidden="true" />

        <div className="container01 relative mx-auto px-4 py-14 lg:py-20">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-400">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link to="/" className="transition-colors hover:text-[#f9a030]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-200" aria-current="page">Portfolio</li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div initial="hidden" animate="show" variants={fadeUp}>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#f9a030]">OUR PORTFOLIO</span>
              <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Real Projects.
                <br />
                <span className="text-[#f78e00]">Real Possibilities.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-gray-300">
                Explore our diverse portfolio of 3D printing, CAD design, prototyping and manufacturing projects across
                various industries and applications.
              </p>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-gray-300">
                {[
                  { icon: Wrench, label: 'Functional Parts & Prototypes' },
                  { icon: Gift, label: 'Custom Designs & Miniatures' },
                  { icon: Boxes, label: 'Single Pieces to Bulk Production' },
                ].map((h) => (
                  <li key={h.label} className="inline-flex items-center gap-2">
                    <h.icon className="h-4 w-4 text-[#f78e00]" />
                    {h.label}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute -right-4 -top-4 hidden h-20 w-20 border-r-2 border-t-2 border-[#f78e00]/70 sm:block" aria-hidden="true" />
              <div className="absolute -bottom-4 -left-4 hidden h-20 w-20 border-b-2 border-l-2 border-[#f78e00]/70 sm:block" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
                <ImageWithFallback
                  src={`${IMG}/hero.jpg`}
                  alt="A composition of 3D printed parts, enclosures and functional components"
                  className="h-[260px] w-full object-cover sm:h-[340px] lg:h-[420px]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0d1016]/55 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FILTER + SEARCH TOOLBAR                                            */}
      {/* ================================================================== */}
      <section className="sticky top-0 z-20 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="container01 mx-auto px-4 py-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div
              role="group"
              aria-label="Filter projects by category"
              className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`flex-shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f78e00] ${
                    category === c ? 'bg-[#f78e00] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <label htmlFor="portfolio-search" className="sr-only">Search projects</label>
              <input
                id="portfolio-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects..."
                className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-3 text-sm outline-none transition-colors focus:border-[#f78e00] focus:ring-2 focus:ring-[#f78e00]/30"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* GRID                                                               */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="container01 mx-auto px-4">
          {loading && (
            <div className="flex items-center justify-center gap-3 py-24 text-gray-400">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading projects…</span>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {shown.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewport}
                    custom={i % 3}
                    variants={fadeUp}
                  >
                    <button
                      type="button"
                      onClick={() => setSelected(project)}
                      className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f78e00]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <ImageWithFallback
                          src={project.image}
                          alt={project.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <span className="absolute left-3 top-3 rounded-full bg-[#f78e00] px-2.5 py-0.5 text-xs font-semibold text-white">
                          {project.category}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{project.description}</p>
                        {project.tags?.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1.5">
                            {project.tags.slice(0, 3).map((t) => (
                              <span key={t} className="rounded border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-500">{t}</span>
                            ))}
                          </div>
                        )}
                        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#f78e00] group-hover:text-[#e07e00]">
                          View Details
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </button>
                  </motion.div>
                ))}
              </div>

              {hasMore && (
                <div className="mt-12 text-center">
                  <button
                    type="button"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#f78e00] px-7 py-3 font-semibold text-[#f78e00] transition-colors hover:bg-[#f78e00] hover:text-white"
                  >
                    Load More Projects
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          )}

          {!loading && filtered.length === 0 && (
            <div className="mx-auto max-w-md py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f78e00]/10">
                <Search className="h-6 w-6 text-[#f78e00]" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-gray-900">No matching projects</h3>
              <p className="mt-2 text-gray-600">
                Try a different category or search term.
              </p>
              {(category !== 'All' || query) && (
                <button
                  type="button"
                  onClick={() => { setCategory('All'); setQuery(''); }}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#f78e00] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e07e00]"
                >
                  Clear filters
                </button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ================================================================== */}
      {/* HIGHLIGHTS (qualitative — no invented numbers)                     */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container01 mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#f78e00]/10">
                  <h.icon className="h-6 w-6 text-[#f78e00]" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{h.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FINAL CTA                                                          */}
      {/* ================================================================== */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#f78e00] to-[#e07e00]">
        <div className="container01 relative mx-auto px-4 py-14 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-5">
            <motion.div className="lg:col-span-3" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Have a Project in Mind?
              </h2>
              <p className="mt-4 max-w-xl text-lg text-white/90">
                Let's turn your ideas into high-quality 3D-printed products.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 font-semibold text-[#e07e00] transition-colors hover:bg-gray-100"
                >
                  Get a Quote
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Discuss Your Project
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/10">
                <ImageWithFallback
                  src={`${IMG}/cta.jpg`}
                  alt="An arrangement of 3D printed mechanical parts and product samples"
                  loading="lazy"
                  className="h-[220px] w-full object-cover sm:h-[280px]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
