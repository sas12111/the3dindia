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
  Eye,
  FileUp,
  FlaskConical,
  Gauge,
  GraduationCap,
  Lightbulb,
  MessageCircle,
  MessagesSquare,
  PenTool,
  Puzzle,
  RefreshCcw,
  Rocket,
  Scan,
  Settings2,
  Sparkles,
  TrendingUp,
  Users,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const IMG = '/images/prototyping';

/* -------------------------------------------------------------------------- */
/*  Honest wording only — no production/engineering certification,             */
/*  guaranteed manufacturability/performance, patent approval, mass-production  */
/*  or "engineering/industrial grade" claims. "Refined prototype", not         */
/*  "final product".                                                           */
/* -------------------------------------------------------------------------- */

const heroCapabilities = ['Concept to Prototype', 'Design Iterations', 'Functional Testing', 'Small-Batch Prototypes'];

const benefits = [
  { no: '01', icon: Eye, title: 'Visualize', desc: 'See and hold your idea as a physical object.' },
  { no: '02', icon: Scan, title: 'Test', desc: 'Check dimensions, fit, assembly and usability.' },
  { no: '03', icon: TrendingUp, title: 'Improve', desc: 'Identify design changes before final production.' },
  { no: '04', icon: Users, title: 'Present', desc: 'Communicate your product concept to stakeholders, teams or customers.' },
];

const prototypeTypes = [
  { no: '01', icon: Lightbulb, title: 'Concept Models', desc: 'Physical models for exploring product form and appearance.', ex: 'Product concepts, design studies, shape exploration.', img: `${IMG}/cat-concept.jpg`, alt: 'Physical product concept model prototype' },
  { no: '02', icon: Cog, title: 'Functional Prototypes', desc: 'Prototypes designed to explore how a product or component works.', ex: 'Moving parts, housings, mechanisms, assemblies.', img: `${IMG}/cat-functional.jpg`, alt: 'Functional 3D printed prototype' },
  { no: '03', icon: Boxes, title: 'Product Enclosures', desc: 'Custom housings and cases for electronics and devices.', ex: 'Device cases, sensor housings, project boxes.', img: `${IMG}/cat-enclosure.jpg`, alt: '3D printed product enclosure prototype' },
  { no: '04', icon: Settings2, title: 'Mechanical Prototypes', desc: 'Prototype components for mechanical and engineering projects.', ex: 'Gears, brackets, mechanical assemblies.', img: `${IMG}/cat-mechanical.jpg`, alt: 'Mechanical 3D printed prototype' },
  { no: '05', icon: Puzzle, title: 'Consumer Product Prototypes', desc: 'Physical prototypes for products intended for everyday users.', ex: 'Consumer product concepts and models.', img: `${IMG}/cat-consumer.jpg`, alt: 'Consumer product prototype' },
  { no: '06', icon: Rocket, title: 'Startup & Inventor Projects', desc: 'Prototype development for early-stage product ideas and independent projects.', ex: 'Early-stage products, inventor concepts.', img: `${IMG}/cat-startup.jpg`, alt: 'Startup product prototype' },
];

const ideaFlow = [
  { no: '1', label: 'Concept', note: 'Sketch / early product idea', img: `${IMG}/flow-concept.jpg`, alt: 'Product concept sketch' },
  { no: '2', label: '3D Design', note: 'CAD model / digital design', img: `${IMG}/flow-cad.jpg`, alt: 'CAD model digital design' },
  { no: '3', label: 'Prototype', note: 'Real printed product', img: `${IMG}/flow-prototype.jpg`, alt: 'Physical 3D printed prototype' },
];

const processSteps = [
  { no: '01', icon: MessagesSquare, title: 'Understand', desc: 'Discuss the idea, requirements and intended use.' },
  { no: '02', icon: Lightbulb, title: 'Concept', desc: 'Explore the product form and basic design direction.' },
  { no: '03', icon: PenTool, title: '3D Design', desc: 'Create or refine the digital model.' },
  { no: '04', icon: Boxes, title: 'Prototype', desc: 'Turn the digital design into a physical prototype.' },
  { no: '05', icon: Scan, title: 'Test & Review', desc: 'Evaluate fit, appearance, usability and other relevant requirements.' },
  { no: '06', icon: RefreshCcw, title: 'Refine', desc: 'Make design changes and produce another iteration when needed.' },
];

const iterations = [
  { v: 'V1', label: 'Initial prototype', img: `${IMG}/iter-v1.jpg`, alt: 'Prototype version 1' },
  { v: 'V2', label: 'Improved shape', img: `${IMG}/iter-v2.jpg`, alt: 'Prototype version 2' },
  { v: 'V3', label: 'Improved fit', img: `${IMG}/iter-v3.jpg`, alt: 'Prototype version 3' },
  { v: 'V4', label: 'Refined prototype', img: `${IMG}/iter-v4.jpg`, alt: 'Prototype version 4' },
];

const validation = [
  { title: 'Form', desc: 'Does the product look and feel right?' },
  { title: 'Fit', desc: 'Do components fit together as expected?' },
  { title: 'Function', desc: 'Does the concept behave as intended?' },
  { title: 'Usability', desc: 'Is the product practical to use?' },
];

const industries = [
  { no: '01', icon: Rocket, title: 'Startups', desc: 'Turn early ideas into tangible prototypes.', img: `${IMG}/app-startups.jpg`, alt: 'Startup product development' },
  { no: '02', icon: PenTool, title: 'Product Designers', desc: 'Build physical versions of digital concepts.', img: `${IMG}/app-designers.jpg`, alt: 'Product designer workspace' },
  { no: '03', icon: Cog, title: 'Engineers', desc: 'Explore components, assemblies and design iterations.', img: `${IMG}/app-engineers.jpg`, alt: 'Engineering components and assemblies' },
  { no: '04', icon: Lightbulb, title: 'Inventors', desc: 'Visualize and refine new product ideas.', img: `${IMG}/app-inventors.jpg`, alt: 'Inventor refining a product idea' },
  { no: '05', icon: GraduationCap, title: 'Students & Projects', desc: 'Create physical models for academic and engineering projects.', img: `${IMG}/app-students.jpg`, alt: 'Student academic project models' },
  { no: '06', icon: Building2, title: 'Small Businesses', desc: 'Develop custom products and prototypes before larger production decisions.', img: `${IMG}/app-business.jpg`, alt: 'Small business custom product' },
];

const materials = [
  { name: 'PLA', note: 'Most Common', img: `${IMG}/material-pla.jpg`, alt: 'PLA filament beside a concept prototype', accent: '#f78e00', desc: 'Good for concept and visual prototypes.' },
  { name: 'PETG', note: '', img: `${IMG}/material-petg.jpg`, alt: 'PETG filament beside a durable prototype', accent: '#2563eb', desc: 'Useful when greater durability is required.' },
  { name: 'TPU', note: '', img: `${IMG}/material-tpu.jpg`, alt: 'TPU filament beside a flexible prototype', accent: '#dc2626', desc: 'Useful for flexible prototypes and components.' },
];

const showcase = [
  { name: 'Product Enclosure', tag: 'Enclosure Prototype', img: `${IMG}/showcase-1.jpg`, alt: 'Product enclosure prototype' },
  { name: 'Consumer Product Concept', tag: 'Concept Model', img: `${IMG}/showcase-2.jpg`, alt: 'Consumer product concept prototype' },
  { name: 'Mechanical Component', tag: 'Functional Prototype', img: `${IMG}/showcase-3.jpg`, alt: 'Mechanical component prototype' },
  { name: 'Electronics Housing', tag: 'Device Housing', img: `${IMG}/showcase-4.jpg`, alt: 'Electronics housing prototype' },
  { name: 'Functional Assembly', tag: 'Assembly Prototype', img: `${IMG}/showcase-5.jpg`, alt: 'Functional assembly prototype' },
  { name: 'Device Stand', tag: 'Product Concept', img: `${IMG}/showcase-6.jpg`, alt: 'Device stand prototype' },
];

const cadFlow = [
  { label: 'CAD Model', note: 'Digital design', img: `${IMG}/cad-screen.jpg`, alt: 'CAD model on screen' },
  { label: 'Material Selection', note: 'Sliced for printing', img: `${IMG}/cad-sliced.jpg`, alt: 'Sliced model preview' },
  { label: 'Printing', note: 'Layer by layer', img: `${IMG}/cad-printing.jpg`, alt: 'Prototype being printed' },
  { label: 'Physical Prototype', note: 'Finished part', img: `${IMG}/cad-finished.jpg`, alt: 'Finished printed prototype' },
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

export function PrototypingDetail() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Prototyping & Product Development | The3DIndia';

    const metas: { selector: string; attr: 'name' | 'property'; key: string; content: string }[] = [
      {
        selector: 'meta[name="description"]',
        attr: 'name',
        key: 'description',
        content:
          'Turn product ideas into physical prototypes with The3DIndia. Explore concept models, CAD development, functional prototypes, product enclosures and design iterations.',
      },
      { selector: 'meta[property="og:title"]', attr: 'property', key: 'og:title', content: 'Prototyping & Product Development | The3DIndia' },
      {
        selector: 'meta[property="og:description"]',
        attr: 'property',
        key: 'og:description',
        content: 'From early concepts to functional prototypes, we help transform ideas into physical products you can see, hold and refine.',
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
      <section className="relative isolate overflow-hidden bg-[#0c0e12] text-white">
        <div className="absolute inset-0 pt-dev-grid pt-dev-grid-animated opacity-70" aria-hidden="true" />
        <div className="absolute -right-24 top-1/4 h-[30rem] w-[30rem] rounded-full bg-[#f78e00]/18 blur-[130px]" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0c0e12]" aria-hidden="true" />

        <div className="container01 relative mx-auto px-4 pb-16 pt-6 lg:pb-24 lg:pt-8">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-400">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link to="/" className="transition-colors hover:text-[#f9a030]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/services" className="transition-colors hover:text-[#f9a030]">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-200" aria-current="page">Prototyping &amp; Product Development</li>
            </ol>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial="hidden" animate="show" variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#f78e00]/40 bg-[#f78e00]/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-[#f9a030]">
                <Rocket className="h-3.5 w-3.5" />
                PROTOTYPING &amp; PRODUCT DEVELOPMENT
              </span>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Turn Your Idea
                <br />
                Into a <span className="text-[#f78e00]">Real Prototype</span>
              </h1>

              <p className="mt-6 max-w-xl text-lg text-gray-300">
                From early concepts to functional prototypes, we help transform ideas into physical products you can
                see, hold and refine.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f78e00] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#e07e00]"
                >
                  Start Your Project
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="#showcase"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-7 py-3.5 font-semibold text-white transition-colors hover:border-[#f78e00] hover:text-[#f9a030]"
                >
                  Explore Prototypes
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
                  src={`${IMG}/hero.jpg`}
                  alt="Product development workspace with a CAD model, prototype and iterations"
                  className="h-[320px] w-full object-cover sm:h-[430px] lg:h-[520px]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0c0e12]/55 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-4 left-4 rounded-lg border border-white/15 bg-black/60 px-4 py-2 backdrop-blur-sm">
                <div className="text-[0.65rem] uppercase tracking-widest text-[#f9a030]">In development</div>
                <div className="text-sm font-medium text-white">Concept · CAD · Prototype</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. THE PROTOTYPING VALUE                                           */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">WHY PROTOTYPE?</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Build It Before You Commit to Production</h2>
            <p className="mt-4 text-lg text-gray-600">
              A physical prototype helps you understand form, fit, usability and design before moving further into
              product development.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                className="relative rounded-xl border border-gray-200 bg-white p-6"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <span className="text-xs font-bold tracking-widest text-gray-300">{b.no}</span>
                <div className="mt-2 flex h-11 w-11 items-center justify-center rounded-lg bg-[#f78e00]/10">
                  <b.icon className="h-5 w-5 text-[#f78e00]" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. WHAT WE CAN HELP YOU BUILD                                      */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">PROTOTYPE TYPES</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              From Simple Concepts to <span className="text-[#f78e00]">Functional Prototypes</span>
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {prototypeTypes.map((card, i) => (
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
      {/* 4. IDEA → PROTOTYPE SHOWCASE (dark)                                */}
      {/* ================================================================== */}
      <section className="relative overflow-hidden bg-[#0c0e12] py-16 text-white lg:py-24">
        <div className="absolute inset-0 pt-dev-grid opacity-60" aria-hidden="true" />
        <div className="container01 relative mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">From Digital Design to Physical Product</h2>
            <p className="mt-4 text-lg text-gray-300">See how a digital concept can become a physical prototype.</p>
          </motion.div>

          <div className="mt-12 flex flex-col items-stretch gap-6 lg:flex-row lg:items-center lg:justify-center">
            {ideaFlow.map((f, i) => (
              <div key={f.label} className="flex flex-col items-center gap-6 lg:flex-row">
                <motion.figure
                  className="group w-full overflow-hidden rounded-2xl bg-[#141821] ring-1 ring-white/10 lg:w-80"
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  custom={i}
                  variants={fadeUp}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={f.img}
                      alt={f.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#f78e00] text-sm font-bold text-white">
                      {f.no}
                    </span>
                  </div>
                  <figcaption className="p-5">
                    <div className="font-semibold text-white">{f.label}</div>
                    <div className="mt-0.5 text-sm text-gray-400">{f.note}</div>
                  </figcaption>
                </motion.figure>
                {i < ideaFlow.length - 1 && (
                  <ArrowRight className="h-7 w-7 flex-shrink-0 rotate-90 text-[#f78e00] lg:rotate-0" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 5. PRODUCT DEVELOPMENT PROCESS                                     */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="max-w-2xl" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">OUR PROCESS</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              From Idea to <span className="text-[#f78e00]">Prototype</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A simple and transparent process to turn your requirement into a physical product.
            </p>
          </motion.div>

          {/* desktop horizontal */}
          <div className="relative mt-16 hidden lg:block">
            <div className="absolute left-0 right-0 top-7 h-[3px] pt-process-line" aria-hidden="true" />
            <div className="grid grid-cols-6 gap-4">
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
            <div className="absolute bottom-6 left-[27px] top-6 w-[3px] pt-process-line-v" aria-hidden="true" />
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
      {/* 6. ITERATION                                                       */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Great Products Are Refined</h2>
            <p className="mt-4 text-lg text-gray-600">Prototype → Review → Improve → Prototype Again.</p>
          </motion.div>

          <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:thin] lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible">
            {iterations.map((it, i) => (
              <div key={it.v} className="flex w-[70%] flex-shrink-0 snap-start items-center gap-4 sm:w-[45%] lg:w-auto">
                <motion.article
                  className="group w-full overflow-hidden rounded-xl border border-gray-200 bg-white"
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  custom={i}
                  variants={fadeUp}
                >
                  <div className="aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={it.img}
                      alt={it.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <div className="text-lg font-bold text-[#f78e00]">{it.v}</div>
                    <div className="mt-0.5 text-sm text-gray-600">{it.label}</div>
                  </div>
                </motion.article>
                {i < iterations.length - 1 && (
                  <ArrowRight className="hidden h-5 w-5 flex-shrink-0 text-[#f78e00] lg:block" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm font-medium tracking-wide text-gray-500">
            PROTOTYPE 01 → FEEDBACK → PROTOTYPE 02 → REFINEMENT → REFINED PROTOTYPE
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 7. FORM, FIT & FUNCTION (split)                                    */}
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
                src={`${IMG}/fff-measure.jpg`}
                alt="A prototype being measured with a digital caliper"
                loading="lazy"
                className="h-full max-h-[460px] w-full object-cover"
              />
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={viewport} custom={1} variants={fadeUp}>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">PROTOTYPE VALIDATION</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Check the Things That Matter</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {validation.map((v) => (
                  <div key={v.title} className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                    <div className="flex items-center gap-2">
                      <Gauge className="h-4 w-4 text-[#f78e00]" />
                      <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">{v.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{v.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 8. INDUSTRIES & APPLICATIONS                                       */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Who We Help</h2>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="flex items-center gap-2 text-[#f9a030]">
                    <a.icon className="h-4 w-4" />
                    <span className="text-xs font-bold tracking-widest">{a.no}</span>
                  </div>
                  <h3 className="mt-1 text-lg font-semibold text-white">{a.title}</h3>
                  <p className="mt-1 text-sm text-gray-200">{a.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 9. MATERIALS                                                       */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Choose the Right Prototype Material</h2>
            <p className="mt-4 text-lg text-gray-600">
              Material selection depends on the prototype's purpose, appearance and intended testing.
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
            We'll recommend a suitable material based on your prototype's purpose and intended testing.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 10. PROTOTYPE SHOWCASE (dark)                                      */}
      {/* ================================================================== */}
      <section id="showcase" className="relative overflow-hidden bg-[#0c0e12] py-16 text-white lg:py-24">
        <div className="absolute inset-0 pt-dev-grid opacity-60" aria-hidden="true" />
        <div className="container01 relative mx-auto px-4">
          <motion.div
            className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Prototype Work</h2>
              <p className="mt-4 text-lg text-gray-300">Explore examples of concepts transformed into physical prototypes.</p>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#f78e00] hover:text-[#f9a030]"
            >
              View All Prototypes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {showcase.map((p, i) => (
              <motion.article
                key={p.name}
                className="group overflow-hidden rounded-xl bg-[#141821] ring-1 ring-white/10"
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
      {/* 11. CAD + 3D PRINTING                                              */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              From CAD to <span className="text-[#f78e00]">Physical Prototype</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A professional product-development workflow — from digital model to a part you can hold.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {cadFlow.map((f, i) => (
              <motion.figure
                key={f.label}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={f.img}
                    alt={f.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[#f78e00] text-sm font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <figcaption className="p-5">
                  <div className="font-semibold text-gray-900">{f.label}</div>
                  <div className="mt-0.5 text-sm text-gray-500">{f.note}</div>
                </figcaption>
              </motion.figure>
            ))}
          </div>

          <p className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-2 text-center text-sm text-gray-500">
            <FlaskConical className="h-4 w-4 flex-shrink-0 text-[#f78e00]" />
            Supported input formats include STL, OBJ and 3MF.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 12. CUSTOM PROJECT                                                 */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Have a Product Idea?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Whether you have a sketch, CAD model, reference image or simply an idea, let's discuss how it can become a
              physical prototype.
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
                <h3 className="mt-5 text-xl font-semibold text-gray-900">I Already Have a 3D Model</h3>
                <p className="mt-2 text-sm text-gray-600">Send your STL, OBJ or 3MF file for review.</p>
                <div className="mt-3 flex gap-2">
                  {['STL', 'OBJ', '3MF'].map((f) => (
                    <span key={f} className="rounded border border-gray-300 bg-white px-2.5 py-1 text-xs font-semibold text-gray-600">{f}</span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#f78e00] px-6 py-3 font-semibold text-white transition-colors group-hover:bg-[#e07e00]">
                  Discuss My Prototype
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
                <Sparkles className="h-7 w-7 text-[#f78e00]" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-gray-900">I Only Have an Idea</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Share your sketch, reference image or product concept.
              </p>
              <Link
                to="/contact"
                className="mx-auto mt-6 inline-flex items-center gap-2 rounded-lg border border-[#f78e00] px-6 py-3 font-semibold text-[#f78e00] transition-colors hover:bg-[#f78e00] hover:text-white"
              >
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 13. FINAL CTA (upper footer, dark innovation)                      */}
      {/* ================================================================== */}
      <section className="relative isolate overflow-hidden bg-[#0c0e12] text-white">
        <div className="absolute inset-0" aria-hidden="true">
          <ImageWithFallback
            src={`${IMG}/cta.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0e12] via-[#0c0e12]/88 to-[#0c0e12]/40" />
          <div className="absolute inset-0 pt-dev-grid opacity-50" />
          <div className="absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-[#f78e00]/22 blur-[120px]" />
        </div>

        <div className="container01 relative mx-auto px-4 py-16 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-3">
            <motion.div className="lg:col-span-2" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
              <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Have an Idea?
                <br />
                Let's Build the <span className="text-[#f78e00]">First Version.</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg text-gray-300">
                Turn your concept into something you can see, hold, test and improve.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f78e00] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#e07e00]"
                >
                  Start Your Project
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
              <p className="mt-6 text-sm tracking-wide text-[#f9a030]">Concepts • CAD • Prototypes • Iteration</p>
            </motion.div>

            <motion.ul
              className="space-y-3 lg:border-l lg:border-white/10 lg:pl-8"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              custom={1}
              variants={fadeUp}
            >
              {['Concepts & Design Support', 'Functional Prototypes', 'Design Iterations', 'Custom Parts & Enclosures'].map((c) => (
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
