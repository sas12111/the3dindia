import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Building2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Factory,
  Gift,
  Layers,
  PencilRuler,
  Printer,
  Rocket,
  ShieldCheck,
  Sparkles,
  Truck,
  Upload,
  Wallet,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const IMG = '/images/home';

/* -------------------------------------------------------------------------- */
/*  Hero slides — one per core service. Honest copy, no invented statistics.   */
/* -------------------------------------------------------------------------- */

type Slide = {
  key: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  alt: string;
  icon: typeof Printer;
  primary: { label: string; to: string };
  secondary: { label: string; to: string };
};

const slides: Slide[] = [
  {
    key: 'printing',
    eyebrow: '3D PRINTING SERVICES',
    title: 'From Digital Ideas to',
    highlight: 'Physical Reality',
    description: 'Professional 3D printing for functional parts, prototypes, miniatures and custom products.',
    image: `${IMG}/hero-printing.jpg`,
    alt: 'Industrial FDM 3D printer producing a detailed component',
    icon: Printer,
    primary: { label: 'Get a Quote', to: '/contact' },
    secondary: { label: 'Explore Services', to: '/services' },
  },
  {
    key: 'cad',
    eyebrow: '3D DESIGNING / CAD MODELING',
    title: 'Your Ideas,',
    highlight: 'Precisely Designed',
    description: 'Transform sketches, concepts and existing parts into detailed 3D CAD models ready for production.',
    image: `${IMG}/hero-cad.jpg`,
    alt: 'CAD workstation displaying a mechanical model',
    icon: PencilRuler,
    primary: { label: 'Start Your Design', to: '/contact' },
    secondary: { label: 'View Services', to: '/services' },
  },
  {
    key: 'prototyping',
    eyebrow: 'PROTOTYPING & PRODUCT DEVELOPMENT',
    title: 'Prototype. Test.',
    highlight: 'Improve.',
    description: 'Turn early-stage concepts into tangible prototypes and refine your product before manufacturing.',
    image: `${IMG}/hero-prototyping.jpg`,
    alt: 'Mechanical prototypes on an engineering workbench',
    icon: Rocket,
    primary: { label: 'Discuss Your Project', to: '/contact' },
    secondary: { label: 'View Portfolio', to: '/portfolio' },
  },
  {
    key: 'gifts',
    eyebrow: 'CUSTOMIZED GIFTS & MINIATURES',
    title: 'Personalized Creations,',
    highlight: 'Made for You',
    description: 'Customized 3D-printed figurines, statues, nameplates, pen stands, miniatures and memorable gifts.',
    image: `${IMG}/hero-gifts.jpg`,
    alt: 'Customized 3D printed figurines and desk accessories',
    icon: Gift,
    primary: { label: 'Explore Custom Gifts', to: '/services/customized-gifts' },
    secondary: { label: 'Request a Quote', to: '/contact' },
  },
  {
    key: 'bulk',
    eyebrow: 'BULK MANUFACTURING',
    title: 'From One Prototype to',
    highlight: 'Production Batches',
    description: 'Scale your product requirements with repeatable 3D-printed parts, organized production and quality checks.',
    image: `${IMG}/hero-bulk.jpg`,
    alt: 'Batch of 3D printed parts on a production workbench',
    icon: Factory,
    primary: { label: 'Request Bulk Quote', to: '/contact' },
    secondary: { label: 'Explore Capabilities', to: '/services/bulk-manufacturing' },
  },
];

const thumbs = [
  { key: 'printing', label: '3D Printing' },
  { key: 'cad', label: 'CAD Modeling' },
  { key: 'prototyping', label: 'Prototyping' },
  { key: 'gifts', label: 'Custom Gifts' },
  { key: 'bulk', label: 'Bulk Manufacturing' },
];

/* -------------------------------------------------------------------------- */

const serviceCards = [
  { title: '3D Printing Services', desc: 'FDM printing for functional parts, prototypes and custom prints.', img: `${IMG}/service-printing.jpg`, alt: '3D printed brackets, gears and mounts', icon: Printer, to: '/services/3d-printing' },
  { title: '3D Designing / CAD Modeling', desc: 'CAD modeling, design optimization and product geometry.', img: `${IMG}/service-cad.jpg`, alt: 'Exploded CAD gearbox assembly', icon: PencilRuler, to: '/services/cad-modeling' },
  { title: 'Prototyping & Product Development', desc: 'Concept validation, testing and design iteration.', img: `${IMG}/service-prototyping.jpg`, alt: 'Assembled 3D printed prototype', icon: Rocket, to: '/services/prototyping-product-development' },
  { title: 'Customized Gifts & Miniatures', desc: 'Personalized 3D-printed gifts, figurines, statues and miniatures.', img: `${IMG}/service-gifts.jpg`, alt: 'Personalized 3D printed figurines', icon: Gift, to: '/services/customized-gifts' },
  { title: 'Bulk Manufacturing', desc: 'Repeatable production of components and custom parts.', img: `${IMG}/service-bulk.jpg`, alt: 'Batch of black 3D printed parts', icon: Factory, to: '/services/bulk-manufacturing' },
];

const benefits = [
  { icon: ShieldCheck, title: 'High-Quality Prints', desc: 'Clean, accurate and consistent results across every part.' },
  { icon: PencilRuler, title: 'Expert Design Support', desc: 'Guidance on design, material and printability.' },
  { icon: Wallet, title: 'Transparent Pricing', desc: 'Clear quotes with no hidden costs.' },
  { icon: Truck, title: 'Reliable Delivery', desc: 'Dependable production and secure delivery.' },
];

const processSteps = [
  { no: '01', icon: Upload, title: 'Share Your Design', desc: 'Share a 3D file, drawing, sketch or project requirements.' },
  { no: '02', icon: ClipboardCheck, title: 'Review Your Quote', desc: 'Review the material, manufacturing approach, cost and timeline.' },
  { no: '03', icon: Printer, title: 'We Make & Deliver', desc: 'The approved part is produced, checked and prepared for delivery.' },
];

const portfolio = [
  { title: 'Functional Bracket', tag: 'Mechanical Part', img: `${IMG}/portfolio-1.jpg`, alt: '3D printed heavy-duty bracket' },
  { title: 'Electronics Enclosure', tag: 'CAD-Designed Product', img: `${IMG}/portfolio-2.jpg`, alt: '3D printed electronics enclosure' },
  { title: 'Architectural Miniature', tag: 'Scale Model', img: `${IMG}/portfolio-3.jpg`, alt: '3D printed architectural scale model' },
  { title: 'Custom Figurine', tag: 'Personalized Gift', img: `${IMG}/portfolio-4.jpg`, alt: 'Personalized 3D printed figurine' },
  { title: 'Anatomical Model', tag: 'Educational Model', img: `${IMG}/portfolio-5.jpg`, alt: '3D printed anatomical skull model' },
  { title: 'Batch Components', tag: 'Bulk Manufacturing', img: `${IMG}/portfolio-6.jpg`, alt: 'Batch of 3D printed mounts' },
];

const helpCreate = [
  { icon: Boxes, title: 'Functional Parts', desc: 'Brackets, mounts, enclosures and replacement components.' },
  { icon: Layers, title: 'Prototypes', desc: 'Concept, functional and iteration models.' },
  { icon: Building2, title: 'Architectural Models', desc: 'Scale and presentation models for projects.' },
  { icon: Gift, title: 'Personalized Gifts', desc: 'Figurines, nameplates, pen stands and keepsakes.' },
  { icon: Sparkles, title: 'Miniatures & Décor', desc: 'Detailed miniatures and decorative pieces.' },
  { icon: Factory, title: 'Small-Batch Production', desc: 'Repeatable parts without expensive tooling.' },
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
const AUTOPLAY_MS = 6000;

/* -------------------------------------------------------------------------- */

export function Home() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((i: number) => setActive(((i % slides.length) + slides.length) % slides.length), []);
  const next = useCallback(() => setActive((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setActive((p) => (p - 1 + slides.length) % slides.length), []);

  // Autoplay — paused on hover/focus and when the user prefers reduced motion.
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || paused) return;

    timerRef.current = setInterval(next, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, next]);

  // Touch gestures
  const touchX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchX.current = null;
  };

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      {/* ================================================================== */}
      {/* HERO CAROUSEL                                                      */}
      {/* ================================================================== */}
      <section
        aria-roledescription="carousel"
        aria-label="The3DIndia services"
        className="relative isolate overflow-hidden bg-[#0d1016] text-white"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="absolute inset-0 home-hero-grid opacity-60" aria-hidden="true" />
        <div className="absolute -right-24 top-1/4 h-[30rem] w-[30rem] rounded-full bg-[#f78e00]/18 blur-[130px]" aria-hidden="true" />

        <div className="container01 relative mx-auto px-4">
          <div className="relative min-h-[520px] py-14 lg:min-h-[560px] lg:py-20">
            {slides.map((slide, i) => {
              const Icon = slide.icon;
              const isActive = i === active;
              return (
                <div
                  key={slide.key}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${slides.length}: ${slide.eyebrow}`}
                  aria-hidden={!isActive}
                  className={`home-slide ${isActive ? 'is-active' : ''} ${isActive ? 'relative' : 'pointer-events-none absolute inset-0'}`}
                >
                  <div className="grid items-center gap-10 lg:grid-cols-2">
                    {/* copy */}
                    <div>
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#f78e00]/40 bg-[#f78e00]/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-[#f9a030]">
                        <Icon className="h-3.5 w-3.5" />
                        {slide.eyebrow}
                      </span>
                      <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                        {slide.title}
                        <br />
                        <span className="text-[#f78e00]">{slide.highlight}</span>
                      </h1>
                      <p className="mt-6 max-w-xl text-lg text-gray-300">{slide.description}</p>
                      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                        <Link
                          to={slide.primary.to}
                          tabIndex={isActive ? 0 : -1}
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f78e00] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#e07e00]"
                        >
                          {slide.primary.label}
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                        <Link
                          to={slide.secondary.to}
                          tabIndex={isActive ? 0 : -1}
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-7 py-3.5 font-semibold text-white transition-colors hover:border-[#f78e00] hover:text-[#f9a030]"
                        >
                          {slide.secondary.label}
                        </Link>
                      </div>
                    </div>

                    {/* image */}
                    <div className="relative">
                      <div className="absolute -right-4 -top-4 hidden h-20 w-20 border-r-2 border-t-2 border-[#f78e00]/70 sm:block" aria-hidden="true" />
                      <div className="absolute -bottom-4 -left-4 hidden h-20 w-20 border-b-2 border-l-2 border-[#f78e00]/70 sm:block" aria-hidden="true" />
                      <div className="relative overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10">
                        <ImageWithFallback
                          src={slide.image}
                          alt={slide.alt}
                          loading={i === 0 ? 'eager' : 'lazy'}
                          className={`h-[260px] w-full object-cover sm:h-[360px] lg:h-[440px] ${isActive ? 'home-kenburns' : ''}`}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0d1016]/55 via-transparent to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-[#f78e00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f78e00] lg:left-0"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-[#f78e00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f78e00] lg:right-0"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* dots */}
          <div className="relative flex justify-center gap-2 pb-6" role="tablist" aria-label="Choose slide">
            {slides.map((s, i) => (
              <button
                key={s.key}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to slide ${i + 1}: ${s.eyebrow}`}
                onClick={() => go(i)}
                className={`h-2.5 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#f78e00] ${
                  i === active ? 'w-8 bg-[#f78e00]' : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* thumbnail / category strip */}
        <div className="relative border-t border-white/10 bg-black/30">
          <div className="container01 mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {thumbs.map((t, i) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => go(i)}
                  aria-pressed={i === active}
                  className={`flex-shrink-0 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    i === active ? 'bg-[#f78e00] text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SERVICES                                                           */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">OUR SERVICES</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Complete 3D Solutions for <span className="text-[#f78e00]">Every Need</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              From design to delivery, we provide end-to-end 3D printing and manufacturing services.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {serviceCards.map((s, i) => (
              <motion.article
                key={s.title}
                className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-xl"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={s.img}
                    alt={s.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-[#f78e00]">
                    <s.icon className="h-4 w-4" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-semibold text-gray-900">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{s.desc}</p>
                  <Link
                    to={s.to}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#f78e00] transition-colors hover:text-[#e07e00]"
                  >
                    Learn More
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* BENEFITS                                                           */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">WHY CHOOSE THE3DINDIA</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Precision. Expertise. Reliability.</h2>
            <p className="mt-4 text-lg text-gray-600">
              We combine technology, experience and customer focus to deliver the best results.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
      {/* PROCESS                                                            */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">HOW IT WORKS</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A Simple 3-Step Process</h2>
          </motion.div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
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
                  <s.icon className="h-7 w-7" />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#0d1016] text-[0.6rem] font-bold">
                    {s.no}
                  </span>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="absolute left-[calc(50%+2.5rem)] right-[calc(-50%+2.5rem)] top-8 hidden h-[2px] bg-gradient-to-r from-[#f78e00] to-[#f78e00]/20 md:block" aria-hidden="true" />
                )}
                <h3 className="mt-5 text-lg font-semibold text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* PORTFOLIO                                                          */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div
            className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
          >
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">OUR WORK</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Real Projects. <span className="text-[#f78e00]">Real Results.</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">A glimpse of parts and products created across different categories.</p>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-lg bg-[#f78e00] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e07e00]"
            >
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {portfolio.map((p, i) => (
              <motion.article
                key={p.title}
                className="group relative overflow-hidden rounded-xl shadow-sm"
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
      {/* WHAT WE HELP YOU CREATE  (honest alternative to fake testimonials) */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">WHAT WE HELP YOU CREATE</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Built for Creators, Startups and Businesses</h2>
            <p className="mt-4 text-lg text-gray-600">
              From a single idea to a batch of parts, here's what you can make with The3DIndia.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {helpCreate.map((h, i) => (
              <motion.div
                key={h.title}
                className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#f78e00]/10">
                  <h.icon className="h-6 w-6 text-[#f78e00]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{h.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{h.desc}</p>
                </div>
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
                Have an Idea? Let's Build It Together!
              </h2>
              <p className="mt-4 max-w-xl text-lg text-white/90">
                Get support with 3D printing, CAD design, prototyping and manufacturing for your next project.
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
                  to="/portfolio"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  View Portfolio
                </Link>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/90">
                {['3D Printing', 'CAD Design', 'Prototyping', 'Bulk Manufacturing'].map((c) => (
                  <li key={c} className="inline-flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4" />
                    {c}
                  </li>
                ))}
              </ul>
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
                  alt="A set of 3D printed parts"
                  loading="lazy"
                  className="h-[220px] w-full object-cover sm:h-[280px]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
