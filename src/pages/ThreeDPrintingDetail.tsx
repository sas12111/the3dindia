import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Building2,
  Cog,
  Cpu,
  FileUp,
  Layers,
  MessageCircle,
  PencilRuler,
  Puzzle,
  Ruler,
  ScanLine,
  Settings2,
  ShieldCheck,
  Sparkles,
  Truck,
  Upload,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const IMG = '/images/3d-printing';

/* -------------------------------------------------------------------------- */
/*  Verified data only — no invented statistics or claims.                     */
/* -------------------------------------------------------------------------- */

const whatWePrint = [
  {
    title: 'Functional Parts',
    desc: 'Brackets, mounts, adapters, clips and replacement components.',
    img: `${IMG}/card-functional.jpg`,
    alt: 'Black and orange 3D printed mechanical bracket',
  },
  {
    title: 'Prototypes',
    desc: 'Validate size, shape and fit before moving to production.',
    img: `${IMG}/card-prototype.jpg`,
    alt: 'Orange 3D printed prototype component',
  },
  {
    title: 'Enclosures',
    desc: 'Custom housings for electronics and other projects.',
    img: `${IMG}/card-enclosure.jpg`,
    alt: 'Black PETG 3D printed electronics enclosure',
  },
  {
    title: 'Models & Miniatures',
    desc: 'Figurines, scale models, decorative objects and collectibles.',
    img: `${IMG}/card-miniature.jpg`,
    alt: 'Detailed 3D printed figurine',
  },
  {
    title: 'Architectural Models',
    desc: 'Physical models for presentation, education and visualization.',
    img: `${IMG}/card-architecture.jpg`,
    alt: 'White 3D printed architectural scale model',
  },
  {
    title: 'Small-Batch Production',
    desc: 'Produce limited quantities without expensive tooling.',
    img: `${IMG}/card-smallbatch.jpg`,
    alt: 'Several identical 3D printed parts arranged together',
  },
];

const processSteps = [
  { no: '01', icon: FileUp, title: 'Send Your Idea', desc: 'STL, 3MF, OBJ, sketch or reference image.' },
  { no: '02', icon: ScanLine, title: 'Design Review', desc: 'We check dimensions, orientation and printability.' },
  { no: '03', icon: Layers, title: 'Choose Material', desc: 'Select the material based on the intended use.' },
  { no: '04', icon: Cog, title: '3D Printing', desc: 'Your part is printed layer by layer.' },
  { no: '05', icon: Settings2, title: 'Finishing', desc: 'Supports are removed and the part is cleaned.' },
  { no: '06', icon: Truck, title: 'Delivery', desc: 'Your finished part is ready for collection or shipping.' },
];

const materials = [
  {
    name: 'PLA',
    img: `${IMG}/material-pla.jpg`,
    alt: 'PLA filament spool with a printed sample',
    accent: '#f78e00',
    uses: ['Prototypes', 'Models', 'Miniatures', 'Decorative products'],
    character: 'Fine detail, clean surface finish',
  },
  {
    name: 'PETG',
    img: `${IMG}/material-petg.jpg`,
    alt: 'PETG filament spool with a functional printed part',
    accent: '#2563eb',
    uses: ['Functional parts', 'Brackets', 'Enclosures', 'Everyday-use components'],
    character: 'Tough, durable, impact resistant',
  },
  {
    name: 'TPU',
    img: `${IMG}/material-tpu.jpg`,
    alt: 'Flexible TPU filament spool with a flexible printed sample',
    accent: '#dc2626',
    uses: ['Flexible parts', 'Grips', 'Covers', 'Protective components'],
    character: 'Flexible, rubber-like and durable',
  },
];

/* Printer specification — Bambu Lab A1 (build volume verified against existing
   project data: 256 x 256 x 256 mm, min layer height 0.05 mm). */
const printerSpecs = [
  { icon: Cpu, label: 'Technology', value: 'FDM / FFF' },
  { icon: Boxes, label: 'Build Volume', value: '256 × 256 × 256 mm' },
  { icon: Layers, label: 'Layer Height', value: '0.08 – 0.28 mm' },
  { icon: Ruler, label: 'Nozzle Size', value: '0.4 mm (Standard)' },
  { icon: Puzzle, label: 'Supported Materials', value: 'PLA, PETG, TPU' },
  { icon: ShieldCheck, label: 'Print Quality', value: 'High-detail & consistent results' },
];

const applications = [
  { title: 'Engineering', desc: 'Jigs, fixtures and functional components.', img: `${IMG}/app-engineering.jpg`, alt: 'Engineering 3D printed part' },
  { title: 'Electronics', desc: 'Custom enclosures and mounts.', img: `${IMG}/app-electronics.jpg`, alt: 'Electronics 3D printed enclosure' },
  { title: 'Automotive', desc: 'Replacement parts and prototypes.', img: `${IMG}/app-automotive.jpg`, alt: 'Automotive 3D printed component' },
  { title: 'Architecture', desc: 'Scale and presentation models.', img: `${IMG}/app-architecture.jpg`, alt: 'Architecture 3D printed model' },
  { title: 'Education', desc: 'Teaching aids and visual models.', img: `${IMG}/app-education.jpg`, alt: 'Educational 3D printed model' },
  { title: 'Hobby & Collectibles', desc: 'Figurines, props and custom pieces.', img: `${IMG}/app-hobby.jpg`, alt: 'Hobby 3D printed collectible' },
];

const portfolio = [
  { title: 'Custom Bracket', tag: 'PETG · Functional Part', img: `${IMG}/portfolio-1.jpg`, alt: 'Custom 3D printed bracket' },
  { title: 'Electronics Enclosure', tag: 'PETG · Prototype', img: `${IMG}/portfolio-2.jpg`, alt: '3D printed electronics enclosure' },
  { title: 'Statue / Figurine', tag: 'PLA · Detailed Model', img: `${IMG}/portfolio-3.jpg`, alt: '3D printed statue figurine' },
  { title: 'Architectural Model', tag: 'PLA · Scale Model', img: `${IMG}/portfolio-4.jpg`, alt: '3D printed architectural model' },
  { title: 'Replacement Part', tag: 'PETG · Custom Component', img: `${IMG}/portfolio-5.jpg`, alt: '3D printed replacement part' },
  { title: 'Custom Nameplate', tag: 'PLA · Personalised Product', img: `${IMG}/portfolio-6.jpg`, alt: '3D printed custom nameplate' },
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

export function ThreeDPrintingDetail() {
  // SEO: title, meta description and Open Graph tags (no helmet lib in project).
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Custom FDM 3D Printing Services in India | The3DIndia';

    const metas: { selector: string; attr: 'name' | 'property'; key: string; content: string }[] = [
      {
        selector: 'meta[name="description"]',
        attr: 'name',
        key: 'description',
        content:
          'Custom FDM 3D printing by The3DIndia for prototypes, functional parts, models and small-batch production. Upload your STL, 3MF or OBJ and get a quote.',
      },
      { selector: 'meta[property="og:title"]', attr: 'property', key: 'og:title', content: 'Custom FDM 3D Printing Services | The3DIndia' },
      {
        selector: 'meta[property="og:description"]',
        attr: 'property',
        key: 'og:description',
        content: 'From digital model to physical part — FDM 3D printing for prototypes, functional parts, models and small-batch products.',
      },
      { selector: 'meta[property="og:type"]', attr: 'property', key: 'og:type', content: 'website' },
      { selector: 'meta[property="og:image"]', attr: 'property', key: 'og:image', content: `${IMG}/hero-printer.jpg` },
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
      <section className="relative isolate overflow-hidden bg-[#0d0d0f] text-white">
        {/* technical grid + glow */}
        <div className="absolute inset-0 tdp-tech-grid opacity-60" aria-hidden="true" />
        <div
          className="absolute -top-24 -right-24 h-[32rem] w-[32rem] rounded-full bg-[#f78e00]/25 blur-[120px] tdp-glow-pulse"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0d0d0f]" aria-hidden="true" />

        <div className="container01 relative mx-auto px-4 py-16 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* copy */}
            <motion.div initial="hidden" animate="show" variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#f78e00]/40 bg-[#f78e00]/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-[#f9a030]">
                <Sparkles className="h-3.5 w-3.5" />
                3D PRINTING SERVICES
              </span>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                From Digital Model
                <br />
                to <span className="text-[#f78e00]">Physical Part.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg text-gray-300">
                Custom FDM 3D printing for prototypes, functional parts, models and small-batch products.
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
                  href="#real-prints"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-7 py-3.5 font-semibold text-white transition-colors hover:border-[#f78e00] hover:text-[#f9a030]"
                >
                  View Our Prints
                </a>
              </div>

              {/* technical info chips (not statistics) */}
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-gray-300">
                {['FDM Technology', 'High Precision', 'Reliable & Consistent', 'Ideal for Prototypes & Functional Parts'].map((t) => (
                  <span key={t} className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f78e00]" />
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* layered image composition */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute -inset-4 rounded-2xl border border-white/10" aria-hidden="true" />
              <div className="absolute -right-5 -top-5 hidden h-24 w-24 border-l-2 border-t-2 border-[#f78e00]/70 sm:block" aria-hidden="true" />
              <div className="absolute -bottom-5 -left-5 hidden h-24 w-24 border-b-2 border-r-2 border-[#f78e00]/70 sm:block" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
                <ImageWithFallback
                  src={`${IMG}/hero-printer.jpg`}
                  alt="Desktop FDM 3D printer actively printing an orange object in a workshop"
                  className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[500px]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0d0d0f]/60 via-transparent to-transparent" />
              </div>

              {/* floating spec badge */}
              <div className="absolute bottom-4 left-4 rounded-lg border border-white/15 bg-black/60 px-4 py-2 backdrop-blur-sm">
                <div className="text-[0.65rem] uppercase tracking-widest text-[#f9a030]">Now printing</div>
                <div className="text-sm font-medium text-white">FDM · Orange filament</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. WHAT CAN WE PRINT                                               */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
          >
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              What Can We <span className="text-[#f78e00]">Print?</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              From a single prototype to a small batch of functional components, 3D printing makes it possible to create
              physical parts without traditional tooling.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whatWePrint.map((card, i) => (
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
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-[#f78e00]" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{card.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. FROM FILE TO FINISHED PART (process timeline)                   */}
      {/* ================================================================== */}
      <section className="relative bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
          >
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              From File to <span className="text-[#f78e00]">Finished Part</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A simple and transparent process from your idea to a physical product.
            </p>
          </motion.div>

          {/* desktop horizontal timeline */}
          <div className="relative mt-16 hidden lg:block">
            <div className="absolute left-0 right-0 top-7 h-[3px] tdp-filament-line" aria-hidden="true" />
            <div className="grid grid-cols-6 gap-4">
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
                  <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#f78e00] bg-white shadow-sm">
                    <s.icon className="h-6 w-6 text-[#f78e00]" />
                  </div>
                  <div className="mt-4 text-xs font-bold tracking-widest text-[#f78e00]">{s.no}</div>
                  <h3 className="mt-1 font-semibold text-gray-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* mobile / tablet vertical timeline */}
          <div className="relative mt-12 space-y-8 lg:hidden">
            <div className="absolute bottom-6 left-[27px] top-6 w-[3px] tdp-filament-line-v" aria-hidden="true" />
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
                <div className="relative z-10 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#f78e00] bg-white shadow-sm">
                  <s.icon className="h-6 w-6 text-[#f78e00]" />
                </div>
                <div className="pt-1">
                  <div className="text-xs font-bold tracking-widest text-[#f78e00]">{s.no}</div>
                  <h3 className="mt-1 font-semibold text-gray-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. MATERIALS                                                       */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
          >
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Choose the Right <span className="text-[#f78e00]">Material</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We select materials based on the strength, flexibility, appearance and intended use of your part.
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
                    <span className="h-8 w-1.5 rounded-full" style={{ backgroundColor: m.accent }} />
                    <h3 className="text-2xl font-semibold text-gray-900">{m.name}</h3>
                  </div>
                  <p className="mt-1 text-sm font-medium text-gray-500">Great for</p>
                  <ul className="mt-3 space-y-2">
                    {m.uses.map((u) => (
                      <li key={u} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: m.accent }} />
                        {u}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-5">
                    <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      {m.character}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <p className="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2 text-center text-sm text-gray-500">
            <PencilRuler className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#f78e00]" />
            Not sure which material to choose? Tell us how your part will be used and we'll help you pick the most
            suitable option.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 5. TECHNICAL SETUP (dark)                                          */}
      {/* ================================================================== */}
      <section className="relative overflow-hidden bg-[#0d0d0f] py-16 text-white lg:py-24">
        <div className="absolute inset-0 tdp-tech-grid opacity-50" aria-hidden="true" />
        <div className="container01 relative mx-auto px-4">
          <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp} className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Our 3D Printing <span className="text-[#f78e00]">Setup</span>
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              We use a modern FDM printing setup to produce detailed and reliable parts.
            </p>
          </motion.div>

          <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-5">
            {/* printer image */}
            <motion.div
              className="relative lg:col-span-2"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp}
            >
              <div className="relative h-full min-h-[260px] overflow-hidden rounded-xl ring-1 ring-white/10">
                <ImageWithFallback
                  src={`${IMG}/printer-setup.jpg`}
                  alt="The3DIndia FDM 3D printer setup"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 tdp-layer-lines" aria-hidden="true" />
                <div className="absolute bottom-4 left-4 rounded-md border border-white/15 bg-black/60 px-3 py-1.5 backdrop-blur-sm">
                  <span className="text-sm font-medium">Bambu Lab A1</span>
                  <span className="ml-2 text-xs text-[#f9a030]">FDM / FFF</span>
                </div>
              </div>
            </motion.div>

            {/* spec grid */}
            <div className="grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:col-span-3">
              {printerSpecs.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  className="flex items-start gap-4 bg-[#141418] p-6"
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  custom={i}
                  variants={fadeUp}
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-[#f78e00]/15">
                    <spec.icon className="h-5 w-5 text-[#f78e00]" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-gray-400">{spec.label}</div>
                    <div className="mt-1 font-semibold text-white">{spec.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 6. APPLICATIONS                                                    */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
          >
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              One Printer. <span className="text-[#f78e00]">Many Possibilities.</span>
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((app, i) => (
              <motion.article
                key={app.title}
                className="group relative overflow-hidden rounded-sm"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={app.img}
                    alt={app.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-lg font-semibold text-white">{app.title}</h3>
                  <p className="mt-1 text-sm text-gray-200">{app.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 7. REAL PRINTS / PORTFOLIO                                         */}
      {/* ================================================================== */}
      <section id="real-prints" className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div
            className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Real Prints by <span className="text-[#f78e00]">The3DIndia</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Examples of parts and products created for prototypes, projects and custom requirements.
              </p>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex flex-shrink-0 items-center gap-2 font-semibold text-[#f78e00] transition-colors hover:text-[#e07e00]"
            >
              View Full Portfolio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {portfolio.map((p, i) => (
              <motion.article
                key={p.title}
                className="group relative overflow-hidden rounded-sm shadow-sm"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={p.img}
                    alt={p.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4 sm:p-5">
                  <div className="text-xs font-medium text-[#f9a030]">{p.tag}</div>
                  <div className="mt-0.5 text-sm font-semibold text-white sm:text-base">{p.title}</div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 8. CUSTOM QUOTE                                                    */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
          >
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Get a <span className="text-[#f78e00]">Custom Quote</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Upload your 3D model or tell us what you want to make. We'll review it and provide a quote.
            </p>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-6 lg:grid-cols-5">
            {/* upload card */}
            <motion.div
              className="lg:col-span-3"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp}
            >
              <Link
                to="/contact"
                className="group flex h-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-10 text-center transition-colors hover:border-[#f78e00] hover:bg-[#fff8f0]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f78e00]/10 transition-colors group-hover:bg-[#f78e00]/20">
                  <Upload className="h-7 w-7 text-[#f78e00]" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-gray-900">Upload Your 3D Model</h3>
                <div className="mt-3 flex gap-2">
                  {['STL', '3MF', 'OBJ'].map((f) => (
                    <span key={f} className="rounded border border-gray-300 bg-white px-2.5 py-1 text-xs font-semibold text-gray-600">
                      {f}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#f78e00] px-6 py-3 font-semibold text-white transition-colors group-hover:bg-[#e07e00]">
                  Get Quote
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>

            {/* design help card */}
            <motion.div
              className="flex flex-col justify-center rounded-xl border border-gray-200 bg-white p-8 lg:col-span-2"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              custom={1}
              variants={fadeUp}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f78e00]/10">
                <PencilRuler className="h-6 w-6 text-[#f78e00]" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-gray-900">Don't have a 3D model?</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Share your sketch, dimensions or idea. We can help with 3D modelling.
              </p>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-[#f78e00] transition-colors hover:text-[#e07e00]"
              >
                Request Design Help
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 9. FINAL CTA (upper footer, dark cinematic)                        */}
      {/* ================================================================== */}
      <section className="relative isolate overflow-hidden bg-[#0d0d0f] text-white">
        <div className="absolute inset-0" aria-hidden="true">
          <ImageWithFallback
            src={`${IMG}/cta-closeup.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-30 tdp-cta-pan"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0d0f] via-[#0d0d0f]/85 to-[#0d0d0f]/40" />
          <div className="absolute inset-0 tdp-layer-lines opacity-60" />
          <div className="absolute -bottom-20 left-1/4 h-80 w-80 rounded-full bg-[#f78e00]/25 blur-[120px] tdp-glow-pulse" />
        </div>

        <div className="container01 relative mx-auto px-4 py-16 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-3">
            <motion.div
              className="lg:col-span-2"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp}
            >
              <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Have Something You Want to <span className="text-[#f78e00]">Print?</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg text-gray-300">
                Send us your model, sketch or idea and let's turn it into a physical product.
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

            {/* capability list */}
            <motion.ul
              className="space-y-3 lg:border-l lg:border-white/10 lg:pl-8"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              custom={1}
              variants={fadeUp}
            >
              {[
                'Prototypes & Functional Parts',
                'Custom Models & Miniatures',
                'Enclosures & Replacement Parts',
                'Small-Batch Production',
              ].map((c) => (
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
