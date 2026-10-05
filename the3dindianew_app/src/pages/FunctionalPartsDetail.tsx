import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Cog,
  FileUp,
  Layers,
  LayoutGrid,
  MessageCircle,
  MessagesSquare,
  PlugZap,
  Printer,
  Puzzle,
  Repeat2,
  Settings2,
  Truck,
  Wrench,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const IMG = '/images/functional-parts';

/* -------------------------------------------------------------------------- */
/*  Honest wording only — no certification, load-rating, safety-critical,      */
/*  guaranteed-replacement or "industrial-grade" claims.                       */
/* -------------------------------------------------------------------------- */

const heroCapabilities = ['Custom Designs', 'Multiple Materials', 'Small-Batch Production', 'Prototype Friendly'];

const whatWeCreate = [
  { no: '01', title: 'Brackets & Mounts', icon: Wrench, desc: 'Custom brackets, mounts and structural components.', ex: 'Wall mounts, camera mounts, equipment brackets, custom holders.', img: `${IMG}/create-brackets.jpg`, alt: 'Custom 3D printed brackets and mounts' },
  { no: '02', title: 'Enclosures & Housings', icon: Boxes, desc: 'Custom cases and housings for electronics and other devices.', ex: 'Electronics enclosure, sensor housing, project box, controller case.', img: `${IMG}/create-enclosures.jpg`, alt: '3D printed electronics enclosures and housings' },
  { no: '03', title: 'Clips & Adapters', icon: PlugZap, desc: 'Custom clips, adapters and connectors for specific requirements.', ex: 'Snap clips, custom adapters, connectors and fittings.', img: `${IMG}/create-clips.jpg`, alt: '3D printed clips and adapters' },
  { no: '04', title: 'Organizers & Holders', icon: LayoutGrid, desc: 'Desk organizers, tool holders, cable organizers and storage solutions.', ex: 'Desk trays, tool holders, cable organizers, storage.', img: `${IMG}/create-organizers.jpg`, alt: '3D printed organizers and holders' },
  { no: '05', title: 'Replacement Parts', icon: Repeat2, desc: 'Replacement plastic components for existing products where suitable.', ex: 'Recreated clips, knobs, brackets and small plastic parts.', img: `${IMG}/create-replacement.jpg`, alt: '3D printed replacement plastic parts' },
  { no: '06', title: 'Custom Utility Products', icon: Puzzle, desc: 'Practical products designed around your specific requirement.', ex: 'Project-specific tools, fittings and utility items.', img: `${IMG}/create-custom.jpg`, alt: 'Custom 3D printed utility products' },
];

const featured = [
  { name: 'Camera Mount', tag: 'Custom Bracket', img: `${IMG}/featured-camera.jpg`, alt: '3D printed camera mount bracket' },
  { name: 'Electronics Enclosure', tag: 'Device Housing', img: `${IMG}/featured-enclosure.jpg`, alt: '3D printed electronics enclosure' },
  { name: 'Gear / Mechanical Part', tag: 'Replacement Component', img: `${IMG}/featured-gear.jpg`, alt: '3D printed mechanical gear part' },
  { name: 'Phone Holder', tag: 'Desk Accessory', img: `${IMG}/featured-phone.jpg`, alt: '3D printed desk phone holder' },
  { name: 'Cable Organizer', tag: 'Utility Product', img: `${IMG}/featured-cable.jpg`, alt: '3D printed cable organizer' },
  { name: 'Custom Adapter', tag: 'Functional Part', img: `${IMG}/featured-adapter.jpg`, alt: '3D printed custom adapter' },
];

const problemSolution = [
  { broken: 'Broken Plastic Clip', design: 'Recreated Design', printed: 'Replacement Clip' },
  { broken: 'Specific Mount Needed', design: 'Custom CAD Model', printed: 'Printed Mount' },
];

const processSteps = [
  { no: '01', icon: FileUp, title: 'Share Your Idea', desc: 'Send a 3D model, drawing, dimensions or reference image.' },
  { no: '02', icon: MessagesSquare, title: 'Discussion & Planning', desc: 'We understand your requirements and suggest an appropriate approach.' },
  { no: '03', icon: Printer, title: '3D Printing', desc: 'Your part is printed using the selected material and settings.' },
  { no: '04', icon: Settings2, title: 'Post Processing', desc: 'Supports are removed and the part is cleaned and finished where required.' },
  { no: '05', icon: Truck, title: 'Delivery', desc: 'Your finished part is prepared for collection or shipping.' },
];

const materials = [
  { name: 'PLA', note: 'Most Common', img: `${IMG}/material-pla.jpg`, alt: 'PLA filament beside printed utility parts', accent: '#f78e00', points: ['Easy to print', 'Good for everyday utility products', 'Suitable for prototypes', 'Multiple colour options'] },
  { name: 'PETG', note: '', img: `${IMG}/material-petg.jpg`, alt: 'PETG filament beside a functional part', accent: '#2563eb', points: ['Stronger and more durable', 'Better heat resistance than PLA', 'Suitable for many functional parts', 'Good layer adhesion'] },
  { name: 'TPU', note: '', img: `${IMG}/material-tpu.jpg`, alt: 'TPU filament beside a flexible printed part', accent: '#dc2626', points: ['Flexible and impact resistant', 'Ideal for grips and covers', 'Useful for protective parts', 'Bendable and durable'] },
];

const whyPoints = [
  'Custom design as per requirement',
  'Useful for low-volume production',
  'Fast design iterations',
  'No traditional tooling required for many projects',
  'Wide range of applications',
  'Suitable for prototypes and utility products',
];

const applications = [
  { no: '01', title: 'Home & Office', ex: 'Organizers, holders, mounts, storage accessories.', img: `${IMG}/app-home.jpg`, alt: 'Home and office 3D printed products' },
  { no: '02', title: 'Electronics', ex: 'Enclosures, brackets, project boxes, cable management.', img: `${IMG}/app-electronics.jpg`, alt: 'Electronics 3D printed parts' },
  { no: '03', title: 'Automotive', ex: 'Clips, brackets, custom accessories.', img: `${IMG}/app-automotive.jpg`, alt: 'Automotive 3D printed accessories' },
  { no: '04', title: 'Industrial', ex: 'Jigs, fixtures, brackets, prototypes.', img: `${IMG}/app-industrial.jpg`, alt: 'Industrial 3D printed jigs and fixtures' },
  { no: '05', title: 'Hobby & DIY', ex: 'Custom tools, project components, hobby accessories.', img: `${IMG}/app-hobby.jpg`, alt: 'Hobby and DIY 3D printed components' },
  { no: '06', title: 'Product Development', ex: 'Prototypes, concept validation, design iterations.', img: `${IMG}/app-product.jpg`, alt: 'Product development 3D printed prototypes' },
];

const projects = [
  { name: 'Custom Bracket', category: 'Brackets & Mounts', desc: 'Functional mounting part', img: `${IMG}/project-bracket.jpg`, alt: 'Custom 3D printed bracket' },
  { name: 'Electronics Case', category: 'Enclosures', desc: 'Device housing', img: `${IMG}/project-case.jpg`, alt: '3D printed electronics case' },
  { name: 'Phone Holder', category: 'Organizers & Holders', desc: 'Desk accessory', img: `${IMG}/project-phone.jpg`, alt: '3D printed phone holder' },
  { name: 'Gear Replacement', category: 'Replacement Parts', desc: 'Mechanical component', img: `${IMG}/project-gear.jpg`, alt: '3D printed gear replacement' },
  { name: 'Cable Clip', category: 'Clips & Adapters', desc: 'Utility product', img: `${IMG}/project-clip.jpg`, alt: '3D printed cable clip' },
  { name: 'Custom Mount', category: 'Brackets & Mounts', desc: 'Functional part', img: `${IMG}/project-mount.jpg`, alt: 'Custom 3D printed mount' },
];

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

export function FunctionalPartsDetail() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Functional Parts & Utility Products | The3DIndia';

    const metas: { selector: string; attr: 'name' | 'property'; key: string; content: string }[] = [
      {
        selector: 'meta[name="description"]',
        attr: 'name',
        key: 'description',
        content:
          'Get custom 3D printed functional parts, replacement components, brackets, enclosures, holders, adapters and utility products from The3DIndia.',
      },
      { selector: 'meta[property="og:title"]', attr: 'property', key: 'og:title', content: 'Functional Parts & Utility Products | The3DIndia' },
      {
        selector: 'meta[property="og:description"]',
        attr: 'property',
        key: 'og:description',
        content: 'Custom 3D printed parts for everyday use, prototypes, replacements and specialized requirements.',
      },
      { selector: 'meta[property="og:type"]', attr: 'property', key: 'og:type', content: 'website' },
      { selector: 'meta[property="og:image"]', attr: 'property', key: 'og:image', content: `${IMG}/hero.jpg` },
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
      <section className="relative isolate overflow-hidden bg-[#0b0b0c] text-white">
        <div className="absolute inset-0 fp-cad-grid fp-cad-grid-animated opacity-70" aria-hidden="true" />
        <Cog className="fp-gear-spin absolute -right-16 -top-16 h-72 w-72 text-[#f78e00]/10" aria-hidden="true" />
        <div className="absolute -left-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[#f78e00]/18 blur-[130px]" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0b0b0c]" aria-hidden="true" />

        <div className="container01 relative mx-auto px-4 pb-16 pt-6 lg:pb-24 lg:pt-8">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-400">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link to="/" className="transition-colors hover:text-[#f9a030]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/services" className="transition-colors hover:text-[#f9a030]">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-200" aria-current="page">Functional Parts &amp; Utility Products</li>
            </ol>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial="hidden" animate="show" variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#f78e00]/40 bg-[#f78e00]/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-[#f9a030]">
                <Wrench className="h-3.5 w-3.5" />
                3D PRINTING SERVICES
              </span>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Functional Parts &amp;
                <br />
                <span className="text-[#f78e00]">Utility Products</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg text-gray-300">
                Custom 3D printed parts for everyday use, prototypes, replacements and specialized requirements.
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
                  Explore Products
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

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* corner measurement brackets */}
              <div className="absolute -right-4 -top-4 hidden h-20 w-20 border-r-2 border-t-2 border-[#f78e00]/70 sm:block" aria-hidden="true" />
              <div className="absolute -bottom-4 -left-4 hidden h-20 w-20 border-b-2 border-l-2 border-[#f78e00]/70 sm:block" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
                <ImageWithFallback
                  src={`${IMG}/hero.jpg`}
                  alt="Functional 3D printed parts arranged on an engineering workbench"
                  className="h-[320px] w-full object-cover sm:h-[430px] lg:h-[520px]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0b0b0c]/55 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-4 left-4 rounded-lg border border-white/15 bg-black/60 px-4 py-2 backdrop-blur-sm">
                <div className="text-[0.65rem] uppercase tracking-widest text-[#f9a030]">On the bench</div>
                <div className="text-sm font-medium text-white">Brackets · Mounts · Enclosures</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. WHAT WE CREATE  (+ 3. callout)                                  */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <motion.div className="max-w-2xl" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">WHAT WE CREATE</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Practical Solutions for <span className="text-[#f78e00]">Real Needs</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                From simple brackets to custom enclosures, we create functional 3D printed parts and utility products for
                home, office, industry and personal projects.
              </p>
            </motion.div>

            {/* custom requirement callout */}
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
                  <Cog className="h-5 w-5 text-[#f78e00]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Have a specific requirement?</h3>
                  <p className="mt-1.5 text-sm text-gray-600">
                    Share your idea, drawing or reference image. We'll help you explore a suitable 3D printed solution.
                  </p>
                  <Link to="/contact" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#f78e00] hover:text-[#e07e00]">
                    Discuss Your Requirement
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whatWeCreate.map((card, i) => (
              <motion.article
                key={card.title}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-xl"
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
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-[#f78e00]" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2">
                    <card.icon className="h-4 w-4 text-[#f78e00]" />
                    <h3 className="font-semibold text-gray-900">{card.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{card.desc}</p>
                  <p className="mt-3 border-t border-gray-100 pt-3 text-xs text-gray-500">{card.ex}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. FEATURED FUNCTIONAL PARTS (dark)                                */}
      {/* ================================================================== */}
      <section id="featured" className="relative overflow-hidden bg-[#0b0b0c] py-16 text-white lg:py-24">
        <div className="absolute inset-0 fp-cad-grid opacity-60" aria-hidden="true" />
        <div className="container01 relative mx-auto px-4">
          <motion.div
            className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Featured Functional Parts</h2>
              <p className="mt-4 text-lg text-gray-300">
                Examples of functional and utility products that can be created with 3D printing.
              </p>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#f78e00] hover:text-[#f9a030]"
            >
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:thin]">
            {featured.map((p, i) => (
              <motion.article
                key={p.name}
                className="group relative w-[80%] flex-shrink-0 snap-start overflow-hidden rounded-lg bg-[#141416] ring-1 ring-white/10 sm:w-[46%] lg:w-[31%]"
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
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-white">{p.name}</h3>
                  <div className="mt-0.5 text-sm text-[#f9a030]">{p.tag}</div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 5. PROBLEM → SOLUTION                                              */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Have a Problem With a Part?</h2>
          </motion.div>

          {/* visual transformation */}
          <motion.div
            className="mx-auto mt-10 flex max-w-4xl flex-col items-center justify-center gap-3 text-sm font-semibold tracking-wide text-gray-500 sm:flex-row"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
          >
            <span className="rounded-full bg-gray-200 px-4 py-2">BROKEN / MISSING PART</span>
            <ArrowRight className="h-4 w-4 rotate-90 text-[#f78e00] sm:rotate-0" />
            <span className="rounded-full bg-[#fff3e0] px-4 py-2 text-[#e07e00]">CUSTOM DESIGN</span>
            <ArrowRight className="h-4 w-4 rotate-90 text-[#f78e00] sm:rotate-0" />
            <span className="rounded-full bg-[#f78e00] px-4 py-2 text-white">3D PRINTED SOLUTION</span>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {problemSolution.map((row, i) => (
              <motion.div
                key={row.broken}
                className="grid grid-cols-3 items-stretch gap-3 rounded-xl border border-gray-200 bg-white p-4"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                {[
                  { img: `${IMG}/ps-broken.jpg`, label: row.broken, alt: 'Broken plastic part' },
                  { img: `${IMG}/ps-design.jpg`, label: row.design, alt: 'Custom CAD design of the part' },
                  { img: `${IMG}/ps-printed.jpg`, label: row.printed, alt: 'Printed replacement part' },
                ].map((cell, idx) => (
                  <div key={cell.label} className="relative flex flex-col">
                    <div className="aspect-square overflow-hidden rounded-lg">
                      <ImageWithFallback src={cell.img} alt={cell.alt} loading="lazy" className="h-full w-full object-cover" />
                    </div>
                    <span className="mt-2 text-center text-xs font-medium text-gray-700">{cell.label}</span>
                    {idx < 2 && (
                      <ArrowRight className="absolute -right-2.5 top-[32%] z-10 h-4 w-4 text-[#f78e00]" aria-hidden="true" />
                    )}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 6. OUR PROCESS                                                     */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="max-w-2xl" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">OUR PROCESS</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              From Idea to <span className="text-[#f78e00]">Functional Part</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A simple and transparent process to turn your requirement into a physical part.
            </p>
          </motion.div>

          {/* desktop horizontal */}
          <div className="relative mt-16 hidden lg:block">
            <div className="absolute left-0 right-0 top-7 h-[3px] fp-process-line" aria-hidden="true" />
            <div className="grid grid-cols-5 gap-4">
              {processSteps.map((s, i) => (
                <motion.div key={s.no} className="relative text-center" initial="hidden" whileInView="show" viewport={viewport} custom={i} variants={fadeUp}>
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

          {/* mobile vertical */}
          <div className="relative mt-12 space-y-8 lg:hidden">
            <div className="absolute bottom-6 left-[27px] top-6 w-[3px] fp-process-line-v" aria-hidden="true" />
            {processSteps.map((s, i) => (
              <motion.div key={s.no} className="relative flex items-start gap-5" initial="hidden" whileInView="show" viewport={viewport} custom={i} variants={fadeUp}>
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
      {/* 7. MATERIALS                                                       */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Materials We Use</h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose a material based on the intended use, required strength, flexibility and appearance.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {materials.map((m, i) => (
              <motion.article
                key={m.name}
                className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
                      <span className="rounded-full bg-[#fff3e0] px-2.5 py-0.5 text-xs font-semibold text-[#e07e00]">{m.note}</span>
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
      {/* 8. WHY CHOOSE 3D PRINTED PARTS (split)                             */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              className="relative overflow-hidden rounded-2xl shadow-lg"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp}
            >
              <ImageWithFallback
                src={`${IMG}/why-collage.jpg`}
                alt="A collage of functional 3D printed parts"
                loading="lazy"
                className="h-full max-h-[460px] w-full object-cover"
              />
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={viewport} custom={1} variants={fadeUp}>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Why Choose 3D Printed Parts?</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {whyPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-gray-700">
                    <Layers className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#f78e00]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 9. APPLICATIONS                                                    */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Where Functional 3D Printing Helps</h2>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {applications.map((a, i) => (
              <motion.article
                key={a.title}
                className="group relative overflow-hidden rounded-xl"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={a.img}
                    alt={a.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="text-xs font-bold tracking-widest text-[#f9a030]">{a.no}</div>
                  <h3 className="mt-0.5 text-lg font-semibold text-white">{a.title}</h3>
                  <p className="mt-1 text-sm text-gray-200">{a.ex}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 10. REAL PROJECTS                                                  */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
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
                Functional Parts by <span className="text-[#f78e00]">The3DIndia</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Examples of custom parts and utility products created for different requirements.
              </p>
            </div>
            <Link to="/portfolio" className="inline-flex flex-shrink-0 items-center gap-2 font-semibold text-[#f78e00] transition-colors hover:text-[#e07e00]">
              View Full Gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <motion.article
                key={p.name}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-xl"
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
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{p.name}</h3>
                  <div className="mt-1 text-xs font-medium text-[#e07e00]">{p.category}</div>
                  <p className="mt-2 text-sm text-gray-600">{p.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 11. CUSTOM QUOTE                                                   */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Get a <span className="text-[#f78e00]">Custom Quote</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Upload your 3D model or tell us what you want to make. We'll review the requirement and help you determine
              the next step.
            </p>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-6 lg:grid-cols-2">
            {/* path A */}
            <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
              <Link
                to="/contact"
                className="group flex h-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-10 text-center transition-colors hover:border-[#f78e00] hover:bg-[#fff8f0]"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f78e00]/10 transition-colors group-hover:bg-[#f78e00]/20">
                  <FileUp className="h-7 w-7 text-[#f78e00]" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-gray-900">Already Have a 3D Model?</h3>
                <div className="mt-3 flex gap-2">
                  {['STL', 'OBJ', '3MF'].map((f) => (
                    <span key={f} className="rounded border border-gray-300 bg-white px-2.5 py-1 text-xs font-semibold text-gray-600">{f}</span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#f78e00] px-6 py-3 font-semibold text-white transition-colors group-hover:bg-[#e07e00]">
                  Get a Quote
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>

            {/* path B */}
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
              <h3 className="mt-5 text-xl font-semibold text-gray-900">Don't Have a 3D Model?</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Share your sketch, dimensions, reference image or simply describe the problem.
              </p>
              <Link
                to="/contact"
                className="mx-auto mt-6 inline-flex items-center gap-2 rounded-lg border border-[#f78e00] px-6 py-3 font-semibold text-[#f78e00] transition-colors hover:bg-[#f78e00] hover:text-white"
              >
                Discuss Your Idea
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 12. FINAL CTA (upper footer, dark engineering)                     */}
      {/* ================================================================== */}
      <section className="relative isolate overflow-hidden bg-[#0b0b0c] text-white">
        <div className="absolute inset-0" aria-hidden="true">
          <ImageWithFallback
            src={`${IMG}/cta.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0c] via-[#0b0b0c]/88 to-[#0b0b0c]/40" />
          <div className="absolute inset-0 fp-cad-grid opacity-50" />
          <div className="absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-[#f78e00]/22 blur-[120px]" />
        </div>

        <div className="container01 relative mx-auto px-4 py-16 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-3">
            <motion.div className="lg:col-span-2" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
              <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Let's Build Your <span className="text-[#f78e00]">Functional Solution</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg text-gray-300">
                From a simple replacement part to a custom utility product, let's turn your idea into something useful.
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
              {['Custom Parts', 'Replacement Components', 'Enclosures & Holders', 'Prototypes & Product Development'].map((c) => (
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
