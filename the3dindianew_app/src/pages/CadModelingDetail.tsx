import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  Building2,
  CheckCircle2,
  Clock,
  Cpu,
  FileStack,
  Layers,
  MessageCircle,
  MessagesSquare,
  PencilRuler,
  Target,
  Users,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const IMG = '/images/cad-modeling';

/* -------------------------------------------------------------------------- */
/*  Honest wording only — describe design/modelling capability, no claims of   */
/*  guaranteed manufacturability, certification or simulation unless offered.  */
/* -------------------------------------------------------------------------- */

const heroCapabilities = ['High Accuracy', 'Manufacturing Ready', 'Custom Solutions', 'File Formats for Every Need'];

const services = [
  { no: '01', title: 'Product Design', desc: 'Concept to detailed product design with precise dimensions and manufacturability considerations.', img: `${IMG}/06_consumer_product_mouse.jpg`, alt: 'Product design CAD model', icon: Box },
  { no: '02', title: 'Mechanical Design', desc: 'Complex mechanical components, assemblies and functional designs.', img: `${IMG}/04_exploded_gearbox_assembly.jpg`, alt: 'Mechanical design CAD assembly', icon: Cpu },
  { no: '03', title: 'Industrial Design', desc: 'Aesthetic and ergonomic designs for real-world products.', img: `${IMG}/03_precision_machined_cad_part.jpg`, alt: 'Industrial product design', icon: PencilRuler },
  { no: '04', title: 'Architectural Modeling', desc: '3D models for buildings, interiors, exteriors and scale models.', img: `${IMG}/11_modern_architecture_model.jpg`, alt: 'Architectural CAD model', icon: Building2 },
];

const processSteps = [
  { no: '01', icon: MessagesSquare, title: 'Share Your Requirements', desc: 'Share your ideas, sketches, images or reference files.' },
  { no: '02', icon: PencilRuler, title: 'We Design', desc: 'Our experts create a detailed and accurate 3D model.' },
  { no: '03', icon: CheckCircle2, title: 'Review & Feedback', desc: 'Review the design and suggest changes if needed.' },
  { no: '04', icon: Box, title: 'Final Delivery', desc: 'Get the 3D model in your preferred file format.' },
];

const whyPoints = [
  { icon: Users, title: 'Experienced Designers', desc: 'Years of CAD expertise.' },
  { icon: Target, title: 'Precision & Accuracy', desc: 'Dimensionally accurate models.' },
  { icon: FileStack, title: 'Multiple File Formats', desc: 'STL, STEP, OBJ, STP and more.' },
  { icon: Clock, title: 'Fast Turnaround', desc: 'Quick delivery without compromising quality.' },
];

const industries = [
  { title: 'Consumer Products', img: `${IMG}/06_consumer_product_mouse.jpg`, alt: 'Consumer product CAD model' },
  { title: 'Automotive', img: `${IMG}/15_automotive_wireframe.jpg`, alt: 'Automotive CAD component' },
  { title: 'Industrial & Machinery', img: `${IMG}/18_cad_software_turbine_model.jpg`, alt: 'Industrial machinery CAD part' },
  { title: 'Medical & Healthcare', img: `${IMG}/17_anatomical_cad_visualization.jpg`, alt: 'Medical CAD model' },
  { title: 'Architecture & Real Estate', img: `${IMG}/13_residential_complex_model.jpg`, alt: 'Architecture CAD model' },
  { title: 'Education & Research', img: `${IMG}/10_dental_model.jpg`, alt: 'Education and research CAD model' },
];

const tools = ['SolidWorks', 'Fusion 360', 'AutoCAD', 'Inventor', 'Blender', 'Rhino', 'Creo', 'SketchUp'];

const work = [
  { title: 'Wireframe Mechanical Model', img: `${IMG}/02_wireframe_mechanical_model.jpg`, alt: 'CAD wireframe mechanical model' },
  { title: 'Gear Housing', img: `${IMG}/05_mechanical_gear_housing.jpg`, alt: 'CAD modeled gear housing' },
  { title: 'Electronics Enclosure', img: `${IMG}/08_electronics_enclosure.jpg`, alt: 'CAD modeled electronics enclosure' },
  { title: 'Interior Floor Plan', img: `${IMG}/12_interior_floor_plan.jpg`, alt: 'CAD modeled interior floor plan' },
  { title: 'Prototype Model', img: `${IMG}/19_3d_printing_prototype.jpg`, alt: 'CAD modeled prototype' },
  { title: 'Custom Pipe Fitting', img: `${IMG}/09_custom_pipe_fitting.jpg`, alt: 'CAD modeled custom pipe fitting' },
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

export function CadModelingDetail() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = '3D Designing & CAD Modeling | The3DIndia';

    const metas: { selector: string; attr: 'name' | 'property'; key: string; content: string }[] = [
      {
        selector: 'meta[name="description"]',
        attr: 'name',
        key: 'description',
        content:
          'Professional 3D designing and CAD modeling by The3DIndia — product design, mechanical and industrial design, and architectural models, delivered in multiple file formats.',
      },
      { selector: 'meta[property="og:title"]', attr: 'property', key: 'og:title', content: '3D Designing & CAD Modeling | The3DIndia' },
      {
        selector: 'meta[property="og:description"]',
        attr: 'property',
        key: 'og:description',
        content: 'From ideas to precise 3D models — professional CAD modeling for prototypes, manufacturing and visualization.',
      },
      { selector: 'meta[property="og:type"]', attr: 'property', key: 'og:type', content: 'website' },
      { selector: 'meta[property="og:image"]', attr: 'property', key: 'og:image', content: `${IMG}/01_cad_workspace_hero.jpg` },
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
      <section className="relative isolate overflow-hidden bg-[#f6f7f9]">
        <div className="absolute inset-0 cad-grid cad-grid-animated opacity-80" aria-hidden="true" />
        <div className="absolute -right-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-[#f78e00]/10 blur-[120px]" aria-hidden="true" />

        <div className="container01 relative mx-auto px-4 pb-16 pt-6 lg:pb-24 lg:pt-8">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-500">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link to="/" className="transition-colors hover:text-[#f78e00]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/services" className="transition-colors hover:text-[#f78e00]">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-700" aria-current="page">3D Designing &amp; CAD Modeling</li>
            </ol>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial="hidden" animate="show" variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#f78e00]/40 bg-[#f78e00]/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-[#e07e00]">
                <PencilRuler className="h-3.5 w-3.5" />
                3D DESIGNING / CAD MODELING
              </span>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                From Ideas to
                <br />
                <span className="text-[#f78e00]">Precise 3D Models.</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg text-gray-600">
                Professional 3D designing and CAD modeling services for prototypes, manufacturing and visualization.
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
                  href="#work"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-7 py-3.5 font-semibold text-gray-800 transition-colors hover:border-[#f78e00] hover:text-[#e07e00]"
                >
                  View Our Work
                </a>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-gray-200 pt-6 text-sm text-gray-600 sm:flex sm:flex-wrap">
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
              <div className="absolute -right-4 -top-4 hidden h-20 w-20 border-r-2 border-t-2 border-[#f78e00]/60 sm:block" aria-hidden="true" />
              <div className="absolute -bottom-4 -left-4 hidden h-20 w-20 border-b-2 border-l-2 border-[#f78e00]/60 sm:block" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/5">
                <ImageWithFallback
                  src={`${IMG}/01_cad_workspace_hero.jpg`}
                  alt="CAD model on a monitor beside a 3D printed part on a design desk"
                  className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[500px]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. 3D DESIGN SERVICES                                              */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">OUR 3D DESIGN SERVICES</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              End-to-End <span className="text-[#f78e00]">3D Design Solutions</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              From concept to production-ready models, we create accurate, functional and optimized 3D designs for a wide
              range of applications.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <motion.article
                key={s.title}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-xl"
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
                  <span className="absolute left-3 top-3 rounded bg-black/60 px-2 py-0.5 text-xs font-bold tracking-widest text-[#f9a030] backdrop-blur-sm">
                    {s.no}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2">
                    <s.icon className="h-4 w-4 text-[#f78e00]" />
                    <h3 className="font-semibold text-gray-900">{s.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. HOW IT WORKS                                                    */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">OUR PROCESS</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">
              A simple and transparent process to turn your idea into a high-quality 3D model.
            </p>
          </motion.div>

          {/* desktop horizontal */}
          <div className="relative mt-16 hidden lg:block">
            <div className="absolute left-0 right-0 top-7 h-[3px] cad-process-line" aria-hidden="true" />
            <div className="grid grid-cols-4 gap-6">
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
            <div className="absolute bottom-6 left-[27px] top-6 w-[3px] cad-process-line-v" aria-hidden="true" />
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
      {/* 4. WHY CHOOSE US (split)                                           */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp}
            >
              <ImageWithFallback
                src={`${IMG}/16_product_sketch_and_cad.jpg`}
                alt="A product sketch alongside its CAD model"
                loading="lazy"
                className="h-full max-h-[460px] w-full object-cover"
              />
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={viewport} custom={1} variants={fadeUp}>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">WHY CHOOSE US</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Accurate. Detailed. <span className="text-[#f78e00]">Manufacturing Ready.</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                We create high-quality 3D models that are prepared for 3D printing, CNC machining and other manufacturing
                processes.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {whyPoints.map((w) => (
                  <div key={w.title} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                    <div className="flex items-center gap-2">
                      <w.icon className="h-5 w-5 text-[#f78e00]" />
                      <h3 className="font-semibold text-gray-900">{w.title}</h3>
                    </div>
                    <p className="mt-1.5 text-sm text-gray-600">{w.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 5. INDUSTRIES                                                      */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">INDUSTRIES WE SERVE</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              3D Design for <span className="text-[#f78e00]">Every Industry</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">Custom CAD models for a wide range of industries and applications.</p>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
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
      {/* 6. CAD TOOLS                                                       */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">SOFTWARE WE USE</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Industry-Standard CAD Tools</h2>
            <p className="mt-4 text-lg text-gray-600">
              We work with modern CAD software to deliver high-quality and consistent 3D models.
            </p>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {tools.map((t, i) => (
              <motion.div
                key={t}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-5 text-center font-semibold text-gray-800 transition-colors hover:border-[#f78e00] hover:text-[#e07e00]"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <Layers className="h-4 w-4 flex-shrink-0 text-[#f78e00]" />
                {t}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 7. RECENT WORK                                                     */}
      {/* ================================================================== */}
      <section id="work" className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div
            className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
          >
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">SAMPLE 3D DESIGNS</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Our Recent <span className="text-[#f78e00]">CAD Modeling Work</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                A glimpse of our custom 3D design projects across different categories.
              </p>
            </div>
            <Link to="/portfolio" className="inline-flex flex-shrink-0 items-center gap-2 font-semibold text-[#f78e00] transition-colors hover:text-[#e07e00]">
              View Full Portfolio
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {work.map((p, i) => (
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
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 to-transparent p-4">
                  <h3 className="text-sm font-semibold text-white sm:text-base">{p.title}</h3>
                </div>
              </motion.article>
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
            src={`${IMG}/20_technical_drawing_and_part.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1016] via-[#0d1016]/90 to-[#0d1016]/45" />
          <div className="absolute inset-0 cad-grid-dark opacity-60" />
          <div className="absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-[#f78e00]/22 blur-[120px]" />
        </div>

        <div className="container01 relative mx-auto px-4 py-16 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-3">
            <motion.div className="lg:col-span-2" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#f9a030]">HAVE A PROJECT IN MIND?</span>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Let's Bring <span className="text-[#f78e00]">Your Ideas to Life</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg text-gray-300">
                Get a custom 3D design tailored to your needs. Share your requirements and we'll help you with the best
                solution.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f78e00] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#e07e00]"
                >
                  Get a Free Quote
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
              {['Product & Mechanical Design', 'Architectural Modeling', 'Manufacturing-Ready Files', 'Fast Response Within 24 Hours'].map((c) => (
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
