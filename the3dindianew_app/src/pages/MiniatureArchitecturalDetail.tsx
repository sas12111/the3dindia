import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  ChevronRight,
  FileUp,
  GraduationCap,
  Home,
  Landmark,
  Layers,
  MessageCircle,
  MessagesSquare,
  Package2,
  PaintBucket,
  Palette,
  PencilRuler,
  Ruler,
  Scaling,
  Sofa,
  Sparkles,
  Store,
  Trees,
  Upload,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const IMG = '/images/architectural-models';

/* -------------------------------------------------------------------------- */
/*  Verified / honest content only — no invented accuracy, turnaround or       */
/*  project-volume claims, and no unverified min/max sizes.                     */
/* -------------------------------------------------------------------------- */

const heroCapabilities = [
  'Detailed & Realistic Models',
  'Custom Sizes & Scales',
  'High-Quality Finish',
  'Presentation & Visualization',
];

const whatWeCreate = [
  {
    no: '01',
    title: 'Residential Models',
    desc: 'Detailed houses and villa models for presentation and client discussions.',
    img: `${IMG}/create-residential.jpg`,
    alt: '3D printed residential villa scale model',
    icon: Home,
  },
  {
    no: '02',
    title: 'Commercial Buildings',
    desc: 'Office buildings, complexes, retail spaces and mixed-use developments.',
    img: `${IMG}/create-commercial.jpg`,
    alt: '3D printed commercial building scale model',
    icon: Building2,
  },
  {
    no: '03',
    title: 'Interior Layouts',
    desc: 'Detailed interior models to show space planning, furniture and design elements.',
    img: `${IMG}/create-interior.jpg`,
    alt: '3D printed interior layout model with furniture',
    icon: Sofa,
  },
  {
    no: '04',
    title: 'Landscape Models',
    desc: 'Site layouts, landscaping, roads, greenery and outdoor elements.',
    img: `${IMG}/create-landscape.jpg`,
    alt: '3D printed landscape site model with roads and greenery',
    icon: Trees,
  },
  {
    no: '05',
    title: 'Educational Models',
    desc: 'Models for educational institutions, exhibitions and learning purposes.',
    img: `${IMG}/create-educational.jpg`,
    alt: '3D printed educational architectural model',
    icon: GraduationCap,
  },
];

const featured = [
  { title: 'Modern Residential Villa', tag: 'Scale Model · Detailed Exterior', img: `${IMG}/featured-villa.jpg`, alt: 'Modern residential villa architectural scale model' },
  { title: 'Commercial Building Complex', tag: 'Scale Model · Site Layout', img: `${IMG}/featured-commercial.jpg`, alt: 'Commercial building complex scale model' },
  { title: 'Interior Floor Plan', tag: 'Detailed Interior · Furniture', img: `${IMG}/featured-interior.jpg`, alt: 'Interior floor plan architectural model' },
  { title: 'Temple / Cultural Model', tag: 'Scale Model · Presentation', img: `${IMG}/featured-cultural.jpg`, alt: 'Temple cultural architectural scale model' },
  { title: 'Landscape / Site Model', tag: 'Site Planning · Visualization', img: `${IMG}/featured-landscape.jpg`, alt: 'Landscape and site planning architectural model' },
];

const processSteps = [
  { no: '01', icon: FileUp, title: 'Share Your Design', desc: 'Send drawings, 3D models or reference images.' },
  { no: '02', icon: MessagesSquare, title: 'Discussion & Planning', desc: 'We understand your requirements and suggest the best approach.' },
  { no: '03', icon: Package2, title: '3D Printing', desc: 'Your model is printed using the selected material and settings.' },
  { no: '04', icon: PaintBucket, title: 'Post Processing', desc: 'Supports are removed and the model is cleaned and finished.' },
  { no: '05', icon: ArrowUpRight, title: 'Delivery', desc: 'Your finished model is prepared for collection or shipping.' },
];

const customization = [
  { icon: Scaling, title: 'Scale', desc: 'Custom model scale based on project requirements.' },
  { icon: Ruler, title: 'Size', desc: 'From small tabletop models to larger presentation models.' },
  { icon: Layers, title: 'Detail', desc: 'Exterior, interiors, landscaping and architectural elements.' },
  { icon: Palette, title: 'Finish', desc: 'Raw printed, cleaned, painted or enhanced finish depending on requirements.' },
];

const materials = [
  {
    name: 'PLA',
    note: 'Most Common',
    img: `${IMG}/material-pla.jpg`,
    alt: 'PLA filament spools beside a white architectural miniature',
    accent: '#f78e00',
    points: ['Smooth finish', 'Great for detailed models', 'Multiple colour options', 'Ideal for presentation models'],
  },
  {
    name: 'PETG',
    note: '',
    img: `${IMG}/material-petg.jpg`,
    alt: 'PETG filament beside a larger durable architectural model',
    accent: '#2563eb',
    points: ['Stronger and durable', 'Suitable for larger models', 'Useful for functional elements'],
  },
  {
    name: 'Custom Finishes',
    note: '',
    img: `${IMG}/material-finishes.jpg`,
    alt: 'Architectural model being hand finished and painted',
    accent: '#6b7280',
    points: ['Sanded and cleaned', 'Painted where required', 'Multi-colour finishing', 'Enhanced detailing'],
  },
];

const applications = [
  { icon: PencilRuler, title: 'Architects', desc: 'Design presentations and client meetings.' },
  { icon: Store, title: 'Real Estate', desc: 'Marketing and sales displays.' },
  { icon: GraduationCap, title: 'Educational Institutions', desc: 'Learning and study models.' },
  { icon: Sofa, title: 'Interior Designers', desc: 'Interior concepts and visualization.' },
  { icon: Landmark, title: 'Government & Public Projects', desc: 'Urban planning and infrastructure models.' },
  { icon: Sparkles, title: 'Exhibitions & Events', desc: 'Display and promotional purposes.' },
];

const gallery = [
  { name: 'Modern Villa', type: 'Architectural Scale Model', material: 'PLA', purpose: 'Presentation Model', img: `${IMG}/gallery-villa.jpg`, alt: 'Modern villa architectural scale model' },
  { name: 'Commercial Complex', type: 'Building Scale Model', material: 'PLA', purpose: 'Real Estate Presentation', img: `${IMG}/gallery-commercial.jpg`, alt: 'Commercial complex building scale model' },
  { name: 'Interior Layout', type: 'Interior Model', material: 'PLA', purpose: 'Design Visualization', img: `${IMG}/gallery-interior.jpg`, alt: 'Interior layout architectural model' },
];

/* -------------------------------------------------------------------------- */
/*  Motion helpers                                                            */
/* -------------------------------------------------------------------------- */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const viewport = { once: true, amount: 0.2 } as const;

/* -------------------------------------------------------------------------- */

export function MiniatureArchitecturalDetail() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Miniature & Architectural Models | The3DIndia';

    const metas: { selector: string; attr: 'name' | 'property'; key: string; content: string }[] = [
      {
        selector: 'meta[name="description"]',
        attr: 'name',
        key: 'description',
        content:
          'Create detailed miniature and architectural models with The3DIndia. Custom 3D printed building, interior, landscape and presentation models.',
      },
      { selector: 'meta[property="og:title"]', attr: 'property', key: 'og:title', content: 'Miniature & Architectural Models | The3DIndia' },
      {
        selector: 'meta[property="og:description"]',
        attr: 'property',
        key: 'og:description',
        content: 'We turn architectural drawings, CAD files and ideas into detailed physical miniature models.',
      },
      { selector: 'meta[property="og:type"]', attr: 'property', key: 'og:type', content: 'website' },
      { selector: 'meta[property="og:image"]', attr: 'property', key: 'og:image', content: `${IMG}/hero-model.jpg` },
    ];

    const created: HTMLMetaElement[] = [];
    const originals: { el: HTMLMetaElement; content: string | null }[] = [];

    metas.forEach(({ selector, attr, key, content }) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (el) {
        originals.push({ el, content: el.getAttribute('content') });
      } else {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
        created.push(el);
      }
      el.setAttribute('content', content);
    });

    return () => {
      document.title = prevTitle;
      originals.forEach(({ el, content }) => {
        if (content === null) el.removeAttribute('content');
        else el.setAttribute('content', content);
      });
      created.forEach((el) => el.remove());
    };
  }, []);

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      {/* ================================================================== */}
      {/* 1. HERO                                                            */}
      {/* ================================================================== */}
      <section className="relative isolate overflow-hidden bg-[#0e0e10] text-white">
        <div className="absolute inset-0 arc-blueprint-grid arc-blueprint-grid-animated opacity-70" aria-hidden="true" />
        <div className="absolute -left-32 top-1/3 h-[30rem] w-[30rem] rounded-full bg-[#f78e00]/20 blur-[130px]" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#0e0e10]" aria-hidden="true" />

        <div className="container01 relative mx-auto px-4 pb-16 pt-6 lg:pb-24 lg:pt-8">
          {/* breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-400">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link to="/" className="transition-colors hover:text-[#f9a030]">Home</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
              <li><Link to="/services" className="transition-colors hover:text-[#f9a030]">Services</Link></li>
              <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
              <li className="text-gray-200" aria-current="page">Miniature &amp; Architectural Models</li>
            </ol>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial="hidden" animate="show" variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#f78e00]/40 bg-[#f78e00]/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-[#f9a030]">
                <Building2 className="h-3.5 w-3.5" />
                3D PRINTING SERVICES
              </span>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Miniature &amp;
                <br />
                <span className="text-[#f78e00]">Architectural Models</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg text-gray-300">
                Bring your ideas and designs to life with detailed, realistic and high-quality architectural models.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f78e00] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#e07e00]"
                >
                  Get a Quote
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="#featured"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-7 py-3.5 font-semibold text-white transition-colors hover:border-[#f78e00] hover:text-[#f9a030]"
                >
                  View Our Work
                </a>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-gray-300 sm:flex sm:flex-wrap">
                {heroCapabilities.map((t) => (
                  <span key={t} className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f78e00]" />
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* layered model image with dimension marks */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* dimension line (top) */}
              <div className="absolute -top-6 left-0 right-0 hidden items-center gap-2 text-[#f78e00]/70 sm:flex" aria-hidden="true">
                <span className="h-2 w-px bg-[#f78e00]/70" />
                <span className="h-px flex-1 bg-[#f78e00]/40" />
                <Ruler className="h-3.5 w-3.5" />
                <span className="h-px flex-1 bg-[#f78e00]/40" />
                <span className="h-2 w-px bg-[#f78e00]/70" />
              </div>
              <div className="relative overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
                <ImageWithFallback
                  src={`${IMG}/hero-model.jpg`}
                  alt="Detailed modern residential architectural miniature on a presentation base"
                  className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[500px]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0e0e10]/55 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-4 left-4 rounded-lg border border-white/15 bg-black/60 px-4 py-2 backdrop-blur-sm">
                <div className="text-[0.65rem] uppercase tracking-widest text-[#f9a030]">Scale model</div>
                <div className="text-sm font-medium text-white">Residential · Presentation base</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. WHAT WE CREATE  (+ 3. custom callout)                           */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <motion.div className="max-w-2xl" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">WHAT WE CREATE</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Detailed Models for <span className="text-[#f78e00]">Real Ideas</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We create miniature and architectural models for residential, commercial and public spaces. Our 3D
                printed models help visualize designs, communicate ideas and present projects with impact.
              </p>
            </motion.div>

            {/* custom project callout */}
            <motion.div
              className="w-full max-w-sm flex-shrink-0 rounded-xl border border-gray-200 bg-gray-50 p-6"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              custom={1}
              variants={fadeUp}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#f78e00]/10">
                  <Building2 className="h-5 w-5 text-[#f78e00]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Have a custom requirement?</h3>
                  <p className="mt-1.5 text-sm text-gray-600">
                    Share your drawings, 3D model or reference images. We'll suggest the best approach for your model.
                  </p>
                  <Link to="/contact" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#f78e00] hover:text-[#e07e00]">
                    Discuss Your Project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {whatWeCreate.map((card, i) => (
              <motion.article
                key={card.title}
                className="group overflow-hidden border border-gray-200 bg-white transition-shadow hover:shadow-xl"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={card.img}
                    alt={card.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded bg-black/60 px-2 py-0.5 text-xs font-bold tracking-widest text-[#f9a030] backdrop-blur-sm">
                    {card.no}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2">
                    <card.icon className="h-4 w-4 text-[#f78e00]" />
                    <h3 className="font-semibold text-gray-900">{card.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{card.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. FEATURED ARCHITECTURAL MODELS (dark)                            */}
      {/* ================================================================== */}
      <section id="featured" className="relative overflow-hidden bg-[#0e0e10] py-16 text-white lg:py-24">
        <div className="absolute inset-0 arc-blueprint-grid opacity-60" aria-hidden="true" />
        <div className="container01 relative mx-auto px-4">
          <motion.div
            className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Featured Architectural Models</h2>
              <p className="mt-4 text-lg text-gray-300">
                A look at some of the miniature and architectural models created for different requirements.
              </p>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#f78e00] hover:text-[#f9a030]"
            >
              View Full Portfolio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* horizontal scroll gallery */}
          <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:thin]">
            {featured.map((p, i) => (
              <motion.article
                key={p.title}
                className="group relative w-[85%] flex-shrink-0 snap-start overflow-hidden rounded-lg ring-1 ring-white/10 sm:w-[48%] lg:w-[32%]"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={p.img}
                    alt={p.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5">
                  <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                  <div className="mt-0.5 text-sm text-[#f9a030]">{p.tag}</div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 5. OUR PROCESS                                                     */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="max-w-2xl" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">OUR PROCESS</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              From Drawings to <span className="text-[#f78e00]">Detailed Models</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We follow a simple and collaborative process to create detailed physical models.
            </p>
          </motion.div>

          {/* desktop horizontal timeline */}
          <div className="relative mt-16 hidden lg:block">
            <div className="absolute left-0 right-0 top-8 h-[3px] arc-process-line" aria-hidden="true" />
            <div className="grid grid-cols-5 gap-4">
              {processSteps.map((s, i) => (
                <motion.div
                  key={s.no}
                  className="relative text-center"
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  custom={i}
                  variants={fadeUp}
                >
                  <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f78e00] text-white shadow-lg">
                    <s.icon className="h-6 w-6" />
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#0e0e10] text-[0.6rem] font-bold">
                      {s.no}
                    </span>
                  </div>
                  <h3 className="mt-5 font-semibold text-gray-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* mobile / tablet vertical timeline */}
          <div className="relative mt-12 space-y-8 lg:hidden">
            <div className="absolute bottom-8 left-[31px] top-8 w-[3px] arc-process-line-v" aria-hidden="true" />
            {processSteps.map((s, i) => (
              <motion.div
                key={s.no}
                className="relative flex items-start gap-5"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[#f78e00] text-white shadow-lg">
                  <s.icon className="h-6 w-6" />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#0e0e10] text-[0.6rem] font-bold">
                    {s.no}
                  </span>
                </div>
                <div className="pt-2">
                  <h3 className="font-semibold text-gray-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 6. SCALE & CUSTOMIZATION                                           */}
      {/* ================================================================== */}
      <section className="relative bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-3xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Built Around Your Design</h2>
            <p className="mt-4 text-lg text-gray-600">
              Every architectural model can be customized according to the purpose, size and level of detail required.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {customization.map((c, i) => (
              <motion.div
                key={c.title}
                className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f78e00]/10">
                  <c.icon className="h-5 w-5 text-[#f78e00]" />
                </div>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-widest text-gray-900">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{c.desc}</p>
                <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-[#f78e00]/5" aria-hidden="true" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 7. MATERIALS & FINISHES                                            */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-3xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Materials &amp; <span className="text-[#f78e00]">Finishes</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We select materials and finishing methods based on the model's size, detail level and presentation
              requirements.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {materials.map((m, i) => (
              <motion.article
                key={m.name}
                className="group flex flex-col overflow-hidden border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <ImageWithFallback
                    src={m.img}
                    alt={m.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3">
                    <span className="h-7 w-1.5 rounded-full" style={{ backgroundColor: m.accent }} />
                    <h3 className="text-xl font-semibold text-gray-900">{m.name}</h3>
                    {m.note && (
                      <span className="rounded-full bg-[#fff3e0] px-2.5 py-0.5 text-xs font-semibold text-[#e07e00]">
                        {m.note}
                      </span>
                    )}
                  </div>
                  <ul className="mt-4 space-y-2">
                    {m.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: m.accent }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 8. APPLICATIONS                                                    */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-3xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Where Architectural Models Are Used</h2>
            <p className="mt-4 text-lg text-gray-600">Architectural models are widely used across different industries and purposes.</p>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((a, i) => (
              <motion.div
                key={a.title}
                className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#f78e00]/10">
                  <a.icon className="h-6 w-6 text-[#f78e00]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{a.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{a.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 9. REAL PROJECT GALLERY                                            */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-3xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Models Made by <span className="text-[#f78e00]">The3DIndia</span>
            </h2>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {gallery.map((g, i) => (
              <motion.article
                key={g.name}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-xl"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={g.img}
                    alt={g.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{g.name}</h3>
                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
                      <dt className="text-gray-500">Model type</dt>
                      <dd className="text-right font-medium text-gray-800">{g.type}</dd>
                    </div>
                    <div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
                      <dt className="text-gray-500">Material</dt>
                      <dd className="text-right font-medium text-gray-800">{g.material}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-500">Purpose</dt>
                      <dd className="text-right font-medium text-gray-800">{g.purpose}</dd>
                    </div>
                  </dl>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 10. CUSTOM QUOTE                                                   */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-3xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Have a Model in <span className="text-[#f78e00]">Mind?</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Share your architectural drawing, 3D model, sketch or reference image. We'll help you plan the right model.
            </p>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-6 lg:grid-cols-2">
            {/* path 1: upload */}
            <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
              <Link
                to="/contact"
                className="group flex h-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-10 text-center transition-colors hover:border-[#f78e00] hover:bg-[#fff8f0]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f78e00]/10 transition-colors group-hover:bg-[#f78e00]/20">
                  <Upload className="h-7 w-7 text-[#f78e00]" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-gray-900">Already Have a 3D Model?</h3>
                <div className="mt-3 flex gap-2">
                  {['STL', '3MF', 'OBJ'].map((f) => (
                    <span key={f} className="rounded border border-gray-300 bg-white px-2.5 py-1 text-xs font-semibold text-gray-600">
                      {f}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#f78e00] px-6 py-3 font-semibold text-white transition-colors group-hover:bg-[#e07e00]">
                  Get a Quote
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>

            {/* path 2: discuss */}
            <motion.div
              className="flex flex-col justify-center rounded-xl border border-gray-200 bg-white p-10 text-center"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              custom={1}
              variants={fadeUp}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f78e00]/10">
                <MessagesSquare className="h-7 w-7 text-[#f78e00]" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-gray-900">Only Have Drawings or an Idea?</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                We can discuss your requirements and help determine the best way to create the model.
              </p>
              <Link
                to="/contact"
                className="mx-auto mt-6 inline-flex items-center gap-2 rounded-lg border border-[#f78e00] px-6 py-3 font-semibold text-[#f78e00] transition-colors hover:bg-[#f78e00] hover:text-white"
              >
                Discuss Your Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 11. FINAL CTA (upper footer, dark architectural)                   */}
      {/* ================================================================== */}
      <section className="relative isolate overflow-hidden bg-[#0e0e10] text-white">
        <div className="absolute inset-0" aria-hidden="true">
          <ImageWithFallback
            src={`${IMG}/cta-model.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e10] via-[#0e0e10]/85 to-[#0e0e10]/35" />
          <div className="absolute inset-0 arc-blueprint-grid opacity-50" />
          <div className="absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-[#f78e00]/25 blur-[120px]" />
        </div>

        <div className="container01 relative mx-auto px-4 py-16 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-3">
            <motion.div className="lg:col-span-2" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
              <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Let's Create Your <span className="text-[#f78e00]">Architectural Model</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg text-gray-300">
                Share your drawings, 3D model or idea. We'll help turn it into a detailed and realistic physical model.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f78e00] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#e07e00]"
                >
                  Get a Quote
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="https://wa.me/917905620142"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#1ebe59]"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Us
                </a>
              </div>
            </motion.div>

            <motion.ul
              className="space-y-3 lg:border-l lg:border-white/10 lg:pl-8"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              custom={1}
              variants={fadeUp}
            >
              {['Residential Models', 'Commercial Models', 'Interior & Site Models', 'Custom Scale Models'].map((c) => (
                <li key={c} className="flex items-center gap-3 text-gray-200">
                  <ArrowUpRight className="h-5 w-5 flex-shrink-0 text-[#f78e00]" />
                  <span>{c}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>
    </div>
  );
}
