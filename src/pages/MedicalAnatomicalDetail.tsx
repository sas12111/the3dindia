import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bone,
  Brain,
  CheckCircle2,
  ClipboardList,
  Eye,
  FileSearch,
  FileUp,
  GraduationCap,
  Heart,
  MessageCircle,
  MessagesSquare,
  Microscope,
  Package2,
  Presentation,
  Printer,
  Ruler,
  ScanLine,
  Sparkles,
  Stethoscope,
  Truck,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const IMG = '/images/medical-models';

/* -------------------------------------------------------------------------- */
/*  Safety: educational / visualization language only. No clinical,            */
/*  diagnostic, surgical, implant or "medical grade" claims.                   */
/* -------------------------------------------------------------------------- */

const heroCapabilities = [
  'Detailed Anatomical Models',
  'Educational & Training Use',
  'Custom Model Requirements',
  'Physical 3D Visualization',
];

const benefits = [
  { no: '01', icon: GraduationCap, title: 'Learn', desc: 'Make complex anatomical structures easier to explore and understand.' },
  { no: '02', icon: Presentation, title: 'Teach', desc: 'Useful as physical teaching aids for classrooms, demonstrations and training.' },
  { no: '03', icon: Eye, title: 'Visualize', desc: 'Turn complex digital or reference information into a tangible 3D form.' },
  { no: '04', icon: Microscope, title: 'Present', desc: 'Use detailed models for demonstrations, exhibitions and educational presentations.' },
];

const categories = [
  { no: '01', title: 'Skeletal Models', icon: Bone, examples: 'Examples include skull, spine, vertebrae, bones and joints.', img: `${IMG}/cat-skeletal.jpg`, alt: '3D printed skeletal anatomical model' },
  { no: '02', title: 'Organ Models', icon: Heart, examples: 'Examples include heart, lungs, kidneys, liver and other structures.', img: `${IMG}/cat-organ.jpg`, alt: '3D printed organ anatomical model' },
  { no: '03', title: 'Brain & Nervous System', icon: Brain, examples: 'Examples include brain models, brain sections and neurological teaching models.', img: `${IMG}/cat-brain.jpg`, alt: '3D printed brain and nervous system model' },
  { no: '04', title: 'Dental Models', icon: Activity, examples: 'Examples include teeth, jaw, dental anatomy and educational dental models.', img: `${IMG}/cat-dental.jpg`, alt: '3D printed dental anatomical model' },
  { no: '05', title: 'Joint & Orthopedic Models', icon: Bone, examples: 'Examples include knee, hip, shoulder and bone structures.', img: `${IMG}/cat-joint.jpg`, alt: '3D printed joint and orthopedic model' },
  { no: '06', title: 'Custom Anatomical Models', icon: Sparkles, examples: 'Models created according to a specific educational, visualization or project requirement.', img: `${IMG}/cat-custom.jpg`, alt: 'Custom 3D printed anatomical model' },
];

const featured = [
  { name: 'Human Skull', desc: 'Detailed skeletal anatomy model', img: `${IMG}/featured-skull.jpg`, alt: '3D printed human skull anatomy model' },
  { name: 'Heart', desc: 'Physical model for anatomical visualization', img: `${IMG}/featured-heart.jpg`, alt: '3D printed heart anatomy model' },
  { name: 'Brain', desc: 'Educational model of brain structure', img: `${IMG}/featured-brain.jpg`, alt: '3D printed brain anatomy model' },
  { name: 'Spine', desc: 'Vertebrae and spinal structure', img: `${IMG}/featured-spine.jpg`, alt: '3D printed spine anatomy model' },
  { name: 'Knee Joint', desc: '3D representation of joint structure', img: `${IMG}/featured-knee.jpg`, alt: '3D printed knee joint anatomy model' },
  { name: 'Human Anatomy Model', desc: 'Full anatomical teaching model', img: `${IMG}/featured-anatomy.jpg`, alt: '3D printed full human anatomy model' },
];

const detailPoints = [
  'Fine anatomical features',
  'Layer-by-layer fabrication',
  'Custom scale options',
  'Multiple colour options where appropriate',
  'Physical hands-on reference',
];

const educationUses = [
  { icon: Stethoscope, title: 'Medical Education', desc: 'Classroom demonstrations and anatomy learning.' },
  { icon: ClipboardList, title: 'Nursing & Paramedical Training', desc: 'Physical reference models for teaching and discussion.' },
  { icon: Microscope, title: 'Science & Healthcare Exhibitions', desc: 'Interactive physical models for educational displays.' },
];

const dataFlow = [
  { label: 'Data / 3D File', icon: FileUp },
  { label: 'Model Preparation', icon: FileSearch },
  { label: '3D Printing', icon: Printer },
  { label: 'Physical Model', icon: Package2 },
];

const materials = [
  { name: 'PLA', note: 'Most Common', img: `${IMG}/material-pla.jpg`, alt: 'PLA filament beside an anatomical model', accent: '#f78e00', points: ['Good for educational models', 'Available in multiple colours', 'Suitable for detailed shapes'] },
  { name: 'PETG', note: '', img: `${IMG}/material-petg.jpg`, alt: 'PETG filament beside a larger model', accent: '#2563eb', points: ['Durable material', 'Useful for larger or frequently handled models'] },
  { name: 'Custom Finish', note: '', img: `${IMG}/material-finish.jpg`, alt: 'Anatomical model being cleaned and finished', accent: '#6b7280', points: ['Cleaning', 'Support removal', 'Colour selection', 'Additional finishing where available'] },
];

const scales = [
  { title: 'Small', desc: 'Compact demonstration models', icon: Ruler },
  { title: 'Standard', desc: 'Tabletop educational models', icon: Package2 },
  { title: 'Large', desc: 'Presentation and teaching models', icon: Presentation },
  { title: 'Custom', desc: 'Project-specific requirements', icon: Sparkles },
];

const processSteps = [
  { no: '01', icon: ClipboardList, title: 'Share Your Requirement', desc: 'Tell us what anatomical structure or model you need.' },
  { no: '02', icon: FileSearch, title: 'Review the Reference', desc: 'We review the supplied model, reference or requirements.' },
  { no: '03', icon: ScanLine, title: 'Prepare for Printing', desc: 'The model is checked and prepared for 3D printing.' },
  { no: '04', icon: Printer, title: 'Print', desc: 'The model is produced layer by layer.' },
  { no: '05', icon: CheckCircle2, title: 'Clean & Inspect', desc: 'Supports are removed and the printed model is checked.' },
  { no: '06', icon: Truck, title: 'Deliver', desc: 'The completed model is prepared for collection or delivery.' },
];

const portfolio = [
  { name: 'Human Skull', category: 'Anatomy Education', purpose: 'Physical teaching model', img: `${IMG}/portfolio-skull.jpg`, alt: '3D printed human skull educational model' },
  { name: 'Heart Model', category: 'Anatomical Visualization', purpose: 'Educational reference', img: `${IMG}/portfolio-heart.jpg`, alt: '3D printed heart educational model' },
  { name: 'Brain Model', category: 'Anatomy Education', purpose: 'Teaching aid', img: `${IMG}/portfolio-brain.jpg`, alt: '3D printed brain educational model' },
  { name: 'Spine Model', category: 'Anatomical Visualization', purpose: 'Demonstration model', img: `${IMG}/portfolio-spine.jpg`, alt: '3D printed spine educational model' },
  { name: 'Knee Joint', category: 'Orthopedic Model', purpose: 'Educational reference', img: `${IMG}/portfolio-knee.jpg`, alt: '3D printed knee joint educational model' },
  { name: 'Dental Model', category: 'Dental Education', purpose: 'Teaching aid', img: `${IMG}/portfolio-dental.jpg`, alt: '3D printed dental educational model' },
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

export function MedicalAnatomicalDetail() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Medical & Anatomical 3D Printed Models | The3DIndia';

    const metas: { selector: string; attr: 'name' | 'property'; key: string; content: string }[] = [
      {
        selector: 'meta[name="description"]',
        attr: 'name',
        key: 'description',
        content:
          'Explore 3D printed medical and anatomical models for education, training, visualization and presentations. Custom anatomical models by The3DIndia.',
      },
      { selector: 'meta[property="og:title"]', attr: 'property', key: 'og:title', content: 'Medical & Anatomical 3D Printed Models | The3DIndia' },
      {
        selector: 'meta[property="og:description"]',
        attr: 'property',
        key: 'og:description',
        content: 'Detailed 3D printed anatomical models designed for medical education, training, visualization and presentation.',
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
      <section className="relative isolate overflow-hidden bg-[#0d1016] text-white">
        <div className="absolute inset-0 med-grid med-grid-animated opacity-70" aria-hidden="true" />
        <div className="absolute -right-24 top-1/4 h-[30rem] w-[30rem] rounded-full bg-[#f78e00]/18 blur-[130px]" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0d1016]" aria-hidden="true" />

        <div className="container01 relative mx-auto px-4 pb-16 pt-6 lg:pb-24 lg:pt-8">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-400">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link to="/" className="transition-colors hover:text-[#f9a030]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/services" className="transition-colors hover:text-[#f9a030]">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-200" aria-current="page">Medical &amp; Anatomical Models</li>
            </ol>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial="hidden" animate="show" variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#f78e00]/40 bg-[#f78e00]/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-[#f9a030]">
                <Stethoscope className="h-3.5 w-3.5" />
                3D PRINTED MEDICAL MODELS
              </span>

              <h1 className="sr-only">Medical &amp; Anatomical Models</h1>
              <p className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl" aria-hidden="true">
                Complex Anatomy.
                <br />
                <span className="text-[#f78e00]">Made Easier to Understand.</span>
              </p>

              <p className="mt-6 max-w-xl text-lg text-gray-300">
                Detailed 3D printed anatomical models designed for medical education, training, visualization and
                presentation.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f78e00] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#e07e00]"
                >
                  Discuss Your Model
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="#models"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-7 py-3.5 font-semibold text-white transition-colors hover:border-[#f78e00] hover:text-[#f9a030]"
                >
                  Explore Models
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
              {/* measurement marks */}
              <div className="absolute -left-6 top-0 bottom-0 hidden flex-col items-center justify-between py-6 text-[#f78e00]/60 sm:flex" aria-hidden="true">
                <span className="h-px w-3 bg-[#f78e00]/60" />
                <span className="w-px flex-1 bg-[#f78e00]/30 my-2" />
                <span className="h-px w-3 bg-[#f78e00]/60" />
              </div>
              <div className="relative overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10 med-scan-line">
                <ImageWithFallback
                  src={`${IMG}/hero.jpg`}
                  alt="Detailed 3D printed anatomical model in a clean educational studio"
                  className="h-[320px] w-full object-cover sm:h-[430px] lg:h-[520px]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0d1016]/55 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-4 left-4 rounded-lg border border-white/15 bg-black/60 px-4 py-2 backdrop-blur-sm">
                <div className="text-[0.65rem] uppercase tracking-widest text-[#f9a030]">Educational model</div>
                <div className="text-sm font-medium text-white">3D printed · For visualization</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. WHY PHYSICAL ANATOMICAL MODELS                                  */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">WHY 3D PRINTED MODELS?</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">See Anatomy in Three Dimensions</h2>
            <p className="mt-4 text-lg text-gray-600">
              Physical models can provide a tangible way to study structures, explain concepts and support hands-on
              learning.
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
      {/* 3. WHAT WE CAN CREATE                                              */}
      {/* ================================================================== */}
      <section id="models" className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Anatomical Models We Can Create</h2>
            <p className="mt-4 text-lg text-gray-600">
              From individual anatomical structures to detailed educational models, requirements can be tailored to the
              intended use.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c, i) => (
              <motion.article
                key={c.title}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-xl"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback
                    src={c.img}
                    alt={c.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded bg-black/60 px-2 py-0.5 text-xs font-bold tracking-widest text-[#f9a030] backdrop-blur-sm">
                    {c.no}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2">
                    <c.icon className="h-4 w-4 text-[#f78e00]" />
                    <h3 className="font-semibold text-gray-900">{c.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{c.examples}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. FEATURED ANATOMICAL MODELS (dark)                               */}
      {/* ================================================================== */}
      <section className="relative overflow-hidden bg-[#0d1016] py-16 text-white lg:py-24">
        <div className="absolute inset-0 med-grid opacity-60" aria-hidden="true" />
        <div className="container01 relative mx-auto px-4">
          <motion.div
            className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Explore the Details</h2>
              <p className="mt-4 text-lg text-gray-300">
                Detailed physical models can make complex structures easier to examine from different angles.
              </p>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#f78e00] hover:text-[#f9a030]"
            >
              View All Models
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <motion.article
                key={p.name}
                className="group overflow-hidden rounded-xl bg-[#141922] ring-1 ring-white/10"
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
                  <p className="mt-1 text-sm text-gray-400">{p.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 5. DETAIL / CLOSE-UP (split)                                       */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              className="relative overflow-hidden rounded-2xl shadow-lg med-scan-line"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp}
            >
              <ImageWithFallback
                src={`${IMG}/closeup.jpg`}
                alt="Macro close-up of a 3D printed anatomical model showing fine detail"
                loading="lazy"
                className="h-full max-h-[460px] w-full object-cover"
              />
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={viewport} custom={1} variants={fadeUp}>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">DETAIL MATTERS</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Designed to <span className="text-[#f78e00]">Show the Structure</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                3D printing allows anatomical forms to be represented as physical objects that can be examined from
                multiple angles.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {detailPoints.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-gray-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#f78e00]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 6. EDUCATION & TRAINING                                            */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Built for Learning</h2>
            <p className="mt-4 text-lg text-gray-600">
              Physical anatomical models can complement traditional textbooks, digital resources and demonstrations.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {educationUses.map((u, i) => (
              <motion.div
                key={u.title}
                className="rounded-xl border border-gray-200 bg-white p-7"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f78e00]/10">
                  <u.icon className="h-6 w-6 text-[#f78e00]" />
                </div>
                <h3 className="mt-5 font-semibold text-gray-900">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{u.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 7. CUSTOM / DATA-BASED MODELS                                      */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Have a Specific Model Requirement?</h2>
            <p className="mt-4 text-lg text-gray-600">
              If you have a 3D model, reference data or project requirement, we can discuss the feasibility of producing
              a physical visualization model.
            </p>
          </motion.div>

          {/* data flow */}
          <div className="mx-auto mt-12 flex max-w-4xl flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center">
            {dataFlow.map((d, i) => (
              <div key={d.label} className="flex flex-col items-center gap-4 sm:flex-row">
                <motion.div
                  className="flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 sm:w-auto"
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  custom={i}
                  variants={fadeUp}
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#f78e00]/10">
                    <d.icon className="h-5 w-5 text-[#f78e00]" />
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{d.label}</span>
                </motion.div>
                {i < dataFlow.length - 1 && (
                  <ArrowRight className="h-5 w-5 flex-shrink-0 rotate-90 text-[#f78e00] sm:rotate-0" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-[#f78e00]/20 bg-[#fff8f0] p-6 text-center">
            <p className="text-sm text-gray-700">
              Possible input formats include <span className="font-semibold">STL</span>,{' '}
              <span className="font-semibold">OBJ</span> and <span className="font-semibold">3MF</span>. Scan-derived or
              patient-data-based work is produced only as a visualization model based on the supplied data — not as a
              diagnostic, clinical or surgical model.
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 8. MATERIALS & FINISHES                                            */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Choose the Right Material</h2>
            <p className="mt-4 text-lg text-gray-600">
              Material selection can depend on the required detail, size, appearance and intended educational use.
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
      {/* 9. SCALE & CUSTOMIZATION                                           */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Built to the Scale You Need</h2>
            <p className="mt-4 text-lg text-gray-600">
              Anatomical models can be produced at different scales depending on the educational or presentation
              requirement.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {scales.map((s, i) => (
              <motion.div
                key={s.title}
                className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f78e00]/10">
                  <s.icon className="h-5 w-5 text-[#f78e00]" />
                </div>
                <h3 className="mt-4 text-sm font-bold uppercase tracking-widest text-gray-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.desc}</p>
                <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full bg-[#f78e00]/5" aria-hidden="true" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 10. HOW IT WORKS                                                   */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">From Anatomy to Physical Model</h2>
          </motion.div>

          {/* desktop horizontal */}
          <div className="relative mt-16 hidden lg:block">
            <div className="absolute left-0 right-0 top-7 h-[3px] med-process-line" aria-hidden="true" />
            <div className="grid grid-cols-6 gap-4">
              {processSteps.map((s, i) => (
                <motion.div key={s.no} className="relative text-center" initial="hidden" whileInView="show" viewport={viewport} custom={i} variants={fadeUp}>
                  <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#f78e00] bg-white shadow-sm">
                    <s.icon className="h-6 w-6 text-[#f78e00]" />
                  </div>
                  <div className="mt-4 text-xs font-bold tracking-widest text-[#f78e00]">{s.no}</div>
                  <h3 className="mt-1 text-sm font-semibold text-gray-900">{s.title}</h3>
                  <p className="mt-2 text-xs text-gray-600">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* mobile vertical */}
          <div className="relative mt-12 space-y-8 lg:hidden">
            <div className="absolute bottom-6 left-[27px] top-6 w-[3px] med-process-line-v" aria-hidden="true" />
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
      {/* 11. PORTFOLIO                                                      */}
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
                Medical &amp; Anatomical Models by <span className="text-[#f78e00]">The3DIndia</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Examples of physical models created for educational, visualization and demonstration purposes.
              </p>
            </div>
            <Link to="/portfolio" className="inline-flex flex-shrink-0 items-center gap-2 font-semibold text-[#f78e00] transition-colors hover:text-[#e07e00]">
              View Full Gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {portfolio.map((p, i) => (
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
                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
                      <dt className="text-gray-500">Category</dt>
                      <dd className="text-right font-medium text-gray-800">{p.category}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-gray-500">Purpose</dt>
                      <dd className="text-right font-medium text-gray-800">{p.purpose}</dd>
                    </div>
                  </dl>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 12. CUSTOM MODEL REQUEST                                           */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Looking for a Specific Anatomical Model?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Share your requirements, reference image, 3D file or project details. We'll discuss the most suitable
              approach.
            </p>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-4xl items-stretch gap-6 md:grid-cols-2">
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
                  Discuss Your Model
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </motion.div>

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
              <h3 className="mt-5 text-xl font-semibold text-gray-900">Need Help With the Model?</h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Share your reference or requirements and we'll discuss the modelling and printing possibilities.
              </p>
              <Link
                to="/contact"
                className="mx-auto mt-6 inline-flex items-center gap-2 rounded-lg border border-[#f78e00] px-6 py-3 font-semibold text-[#f78e00] transition-colors hover:bg-[#f78e00] hover:text-white"
              >
                Start a Conversation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 13. FINAL CTA (upper footer, dark scientific)                      */}
      {/* ================================================================== */}
      <section className="relative isolate overflow-hidden bg-[#0d1016] text-white">
        <div className="absolute inset-0" aria-hidden="true">
          <ImageWithFallback
            src={`${IMG}/cta.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1016] via-[#0d1016]/88 to-[#0d1016]/45" />
          <div className="absolute inset-0 med-grid opacity-50" />
          <div className="absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-[#f78e00]/22 blur-[120px]" />
        </div>

        <div className="container01 relative mx-auto px-4 py-16 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-3">
            <motion.div className="lg:col-span-2" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
              <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Bring Complex Anatomy Into the <span className="text-[#f78e00]">Real World</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg text-gray-300">
                Whether you're creating a teaching aid, educational model or custom visualization, let's discuss your
                requirement.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f78e00] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#e07e00]"
                >
                  Discuss Your Model
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
              <p className="mt-6 text-sm tracking-wide text-[#f9a030]">Educational • Visualization • Training • Custom Models</p>
            </motion.div>

            <motion.ul
              className="space-y-3 lg:border-l lg:border-white/10 lg:pl-8"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              custom={1}
              variants={fadeUp}
            >
              {['Educational Models', 'Training & Teaching Aids', 'Custom Anatomical Models', 'Physical 3D Visualization'].map((c) => (
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
