import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Factory,
  MessageCircle,
  MessagesSquare,
  Scaling,
  Settings2,
  ShieldCheck,
  Truck,
  Wallet,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const IMG = '/images/bulk-manufacturing';

/* -------------------------------------------------------------------------- */
/*  Honest wording only — no certification, guaranteed capacity, or materials  */
/*  the business does not actually provide. Verified materials: PLA, PETG, TPU.*/
/* -------------------------------------------------------------------------- */

const heroCapabilities = ['Consistent Quality', 'Cost Effective', 'Scalable Production', 'On-Time Delivery'];

const benefits = [
  { icon: Wallet, title: 'Lower Cost Per Unit', desc: 'Optimized production workflow to reduce per-part cost.' },
  { icon: ShieldCheck, title: 'Consistent Quality', desc: 'Same accuracy and finish across all units.' },
  { icon: Scaling, title: 'Flexible Quantities', desc: 'From small batches to large-volume production.' },
  { icon: Clock, title: 'Faster Turnaround', desc: 'Quick and reliable delivery for your projects.' },
];

const capabilityPoints = [
  'Batch production with consistent quality',
  'Functional prototypes and end-use parts',
  'Custom design and material selection',
  'Post-processing, finishing and assembly support',
  'Reliable production and delivery scheduling',
];

const processSteps = [
  { no: '01', icon: MessagesSquare, title: 'Consultation', desc: 'Share your requirements, quantity and specifications.' },
  { no: '02', icon: ClipboardCheck, title: 'Design & Validation', desc: 'We optimize your design for manufacturability.' },
  { no: '03', icon: Factory, title: 'Production', desc: 'High-quality 3D printing with quality checks.' },
  { no: '04', icon: Settings2, title: 'Post-Processing', desc: 'Finishing, assembly and packaging.' },
  { no: '05', icon: Truck, title: 'Delivery', desc: 'On-time delivery to your location.' },
];

const materials = [
  { name: 'PLA', note: 'Most Common', img: `${IMG}/05_materials_filament_spools.jpg`, alt: 'PLA batch 3D printed parts', accent: '#f78e00', desc: 'Cost-effective and versatile.' },
  { name: 'PETG', note: '', img: `${IMG}/03_white_parts_batch.jpg`, alt: 'PETG 3D printed parts', accent: '#2563eb', desc: 'Tough and chemical resistant.' },
  { name: 'TPU', note: '', img: `${IMG}/18_multicolor_lattice_parts.jpg`, alt: 'Flexible TPU 3D printed parts', accent: '#dc2626', desc: 'Flexible and impact resistant.' },
];

const industries = [
  { title: 'Consumer Products', img: `${IMG}/13_consumer_utility_products.jpg`, alt: 'Consumer products batch' },
  { title: 'Automotive', img: `${IMG}/08_automotive_components.jpg`, alt: 'Automotive parts batch' },
  { title: 'Electronics', img: `${IMG}/09_electronics_housings.jpg`, alt: 'Electronics enclosures batch' },
  { title: 'Industrial & Machinery', img: `${IMG}/10_mechanical_gears.jpg`, alt: 'Industrial and machinery parts' },
  { title: 'Medical & Healthcare', img: `${IMG}/11_medical_anatomical_models.jpg`, alt: 'Medical and healthcare models' },
  { title: 'Architecture & Models', img: `${IMG}/12_architectural_scale_model.jpg`, alt: 'Architecture and models batch' },
  { title: 'Education & Research', img: `${IMG}/16_white_cylindrical_components.jpg`, alt: 'Education and research batch' },
];

const gallery = [
  { img: `${IMG}/02_black_parts_batch.jpg`, alt: 'Batch of black 3D printed parts' },
  { img: `${IMG}/14_white_brackets_batch.jpg`, alt: 'Batch of white printed brackets' },
  { img: `${IMG}/17_black_mounts_batch.jpg`, alt: 'Batch of black printed mounts' },
  { img: `${IMG}/04_warehouse_inventory.jpg`, alt: 'Warehouse inventory of printed parts' },
  { img: `${IMG}/07_black_enclosures_closeup.jpg`, alt: 'Close-up of black printed enclosures' },
  { img: `${IMG}/15_black_brackets_batch.jpg`, alt: 'Batch of black printed brackets' },
  { img: `${IMG}/21_inspection_white_components.jpg`, alt: 'Inspection of white printed components' },
  { img: `${IMG}/19_drone_frame.jpg`, alt: '3D printed drone frame' },
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

export function BulkManufacturingDetail() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Bulk Manufacturing & Volume 3D Printing | The3DIndia';

    const metas: { selector: string; attr: 'name' | 'property'; key: string; content: string }[] = [
      {
        selector: 'meta[name="description"]',
        attr: 'name',
        key: 'description',
        content:
          'Scale your production with The3DIndia bulk manufacturing — small-batch to large-volume 3D printing with consistent quality, competitive pricing and reliable delivery.',
      },
      { selector: 'meta[property="og:title"]', attr: 'property', key: 'og:title', content: 'Bulk Manufacturing & Volume 3D Printing | The3DIndia' },
      {
        selector: 'meta[property="og:description"]',
        attr: 'property',
        key: 'og:description',
        content: 'From prototypes to high-volume production — reliable, cost-effective and consistent 3D printed parts for your business.',
      },
      { selector: 'meta[property="og:type"]', attr: 'property', key: 'og:type', content: 'website' },
      { selector: 'meta[property="og:image"]', attr: 'property', key: 'og:image', content: `${IMG}/01_hero_printer_farm.jpg` },
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
      <section className="relative isolate overflow-hidden bg-[#0d1016] text-white">
        <div className="absolute inset-0 bm-grid-dark bm-grid-animated opacity-60" aria-hidden="true" />
        <div className="absolute -right-24 top-1/4 h-[30rem] w-[30rem] rounded-full bg-[#f78e00]/18 blur-[130px]" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0d1016]" aria-hidden="true" />

        <div className="container01 relative mx-auto px-4 pb-16 pt-6 lg:pb-24 lg:pt-8">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-400">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link to="/" className="transition-colors hover:text-[#f9a030]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/services" className="transition-colors hover:text-[#f9a030]">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-200" aria-current="page">Bulk Manufacturing</li>
            </ol>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial="hidden" animate="show" variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#f78e00]/40 bg-[#f78e00]/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-[#f9a030]">
                <Factory className="h-3.5 w-3.5" />
                BULK MANUFACTURING
              </span>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Scale Your Ideas
                <br />
                with <span className="text-[#f78e00]">Reliable Bulk Manufacturing.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg text-gray-300">
                From prototypes to high-volume production, we deliver high-quality, cost-effective and consistent 3D
                printed parts for your business needs.
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
                  href="#gallery"
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
                  src={`${IMG}/01_hero_printer_farm.jpg`}
                  alt="Shelves of identical 3D printed parts produced at scale"
                  className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[500px]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0d1016]/55 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. WHY CHOOSE                                                      */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">WHY CHOOSE OUR BULK MANUFACTURING</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Reliable Production for <span className="text-[#f78e00]">Growing Businesses</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We combine advanced 3D printing technology, quality control and optimized workflows to deliver parts at
              scale without compromising quality.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                className="rounded-xl border border-gray-200 bg-white p-6"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f78e00]/10">
                  <b.icon className="h-6 w-6 text-[#f78e00]" />
                </div>
                <h3 className="mt-5 font-semibold text-gray-900">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. HIGH-VOLUME CAPABILITY (split)                                  */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">OUR CAPABILITIES</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                High-Volume <span className="text-[#f78e00]">3D Printing</span> &amp; Production Support
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We manufacture functional, durable parts in batches for a wide range of applications using FDM 3D
                printing.
              </p>
              <ul className="mt-6 space-y-3">
                {capabilityPoints.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#f78e00]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              custom={1}
              variants={fadeUp}
            >
              <ImageWithFallback
                src={`${IMG}/20_production_workshop.jpg`}
                alt="Rows of 3D printers producing batches of parts"
                loading="lazy"
                className="h-full max-h-[440px] w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. OUR PROCESS                                                     */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">OUR PROCESS</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">From Order to Delivery</h2>
            <p className="mt-4 text-lg text-gray-600">A simple and transparent process for bulk manufacturing.</p>
          </motion.div>

          {/* desktop horizontal */}
          <div className="relative mt-16 hidden lg:block">
            <div className="absolute left-0 right-0 top-7 h-[3px] bm-process-line" aria-hidden="true" />
            <div className="grid grid-cols-5 gap-6">
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
            <div className="absolute bottom-6 left-[27px] top-6 w-[3px] bm-process-line-v" aria-hidden="true" />
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
      {/* 5. MATERIALS                                                       */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">MATERIAL OPTIONS</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Materials for <span className="text-[#f78e00]">Your Needs</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose the right material for strength, durability, flexibility and aesthetics.
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
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">{m.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-gray-500">
            Other materials may be available on request depending on your project requirements.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 6. INDUSTRIES                                                      */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">INDUSTRIES WE SERVE</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Bulk Manufacturing for <span className="text-[#f78e00]">Every Industry</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">We supply high-quality 3D printed parts for a wide range of applications.</p>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 sm:gap-6">
            {industries.map((a, i) => (
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
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/15 to-transparent p-4">
                  <h3 className="text-sm font-semibold text-white sm:text-base">{a.title}</h3>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 7. PRODUCTION GALLERY                                              */}
      {/* ================================================================== */}
      <section id="gallery" className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">OUR PRODUCTION GALLERY</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Real Projects. <span className="text-[#f78e00]">Real Results.</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">A glimpse of our bulk manufacturing projects.</p>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {gallery.map((g, i) => (
              <motion.div
                key={g.img}
                className="group overflow-hidden rounded-xl shadow-sm"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i % 4}
                variants={fadeUp}
              >
                <div className="aspect-square overflow-hidden">
                  <ImageWithFallback
                    src={g.img}
                    alt={g.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 8. FINAL CTA                                                       */}
      {/* ================================================================== */}
      <section className="relative isolate overflow-hidden bg-[#0d1016] text-white">
        <div className="absolute inset-0" aria-hidden="true">
          <ImageWithFallback
            src={`${IMG}/24_dispatch_logistics.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1016] via-[#0d1016]/90 to-[#0d1016]/45" />
          <div className="absolute inset-0 bm-grid-dark opacity-60" />
          <div className="absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-[#f78e00]/22 blur-[120px]" />
        </div>

        <div className="container01 relative mx-auto px-4 py-16 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-3">
            <motion.div className="lg:col-span-2" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#f9a030]">READY TO SCALE YOUR PRODUCTION?</span>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Let's Manufacture <span className="text-[#f78e00]">Your Ideas in Bulk</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg text-gray-300">
                Get a custom quote for your bulk 3D printing requirements. Our team will help you find the best solution
                for your project.
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
              {['Expert Support for Your Project', 'Competitive Pricing', 'Consistent Quality', 'On-Time Delivery'].map((c) => (
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
