import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Boxes,
  Eye,
  Headphones,
  Layers,
  Lightbulb,
  PencilRuler,
  Printer,
  Repeat,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const IMG = '/images/about';

const heroValues = [
  { icon: Lightbulb, label: 'Innovation Driven' },
  { icon: ShieldCheck, label: 'Quality Focused' },
  { icon: Users, label: 'Customer Centric' },
  { icon: Sparkles, label: 'Trusted Partner' },
];

/* No verified business metrics — qualitative highlights instead of invented numbers. */
const highlights = [
  { icon: Sparkles, title: 'Custom Solutions', desc: 'Tailored to your specific requirement.' },
  { icon: Layers, title: 'Material Options', desc: 'Suitable materials for each project.' },
  { icon: PencilRuler, title: 'Design Support', desc: 'Help from idea to printable model.' },
  { icon: Printer, title: 'Manufacturing Services', desc: 'From single pieces to small batches.' },
];

const values = [
  { icon: Target, title: 'Precision', desc: 'We focus on dimensional accuracy and careful execution.' },
  { icon: Zap, title: 'Speed', desc: 'We work toward practical timelines without overlooking quality.' },
  { icon: ShieldCheck, title: 'Quality', desc: 'We select suitable materials and processes for each project.' },
  { icon: Users, title: 'Customer Focus', desc: 'We listen to requirements and tailor solutions to customer needs.' },
];

/* Team info is not verified, so we present capabilities rather than invented people. */
const expertise = [
  { icon: PencilRuler, title: 'Design & CAD', desc: 'Turning sketches, references and ideas into printable 3D models.' },
  { icon: Wrench, title: 'Engineering', desc: 'Functional parts, assemblies and design-for-print optimization.' },
  { icon: Printer, title: '3D Printing', desc: 'FDM production with suitable materials and settings.' },
  { icon: Headphones, title: 'Customer Support', desc: 'Guidance from first enquiry through to delivery.' },
];

const materials = [
  { name: 'PLA', badge: 'General Purpose', desc: 'Easy to print and suitable for prototypes and decorative products.', img: `${IMG}/material-pla.jpg`, alt: 'PLA filament and printed samples' },
  { name: 'ABS', badge: 'Functional', desc: 'A material for selected functional applications.', img: `${IMG}/material-abs.jpg`, alt: 'ABS printed functional parts' },
  { name: 'PETG', badge: 'Durable', desc: 'A versatile option for many functional components.', img: `${IMG}/material-petg.jpg`, alt: 'PETG printed components' },
  { name: 'Resin', badge: 'High Detail', desc: 'Suitable for detailed prints, depending on resin type.', img: `${IMG}/material-resin.jpg`, alt: 'Detailed resin print' },
  { name: 'TPU', badge: 'Flexible', desc: 'Flexible material for suitable applications.', img: `${IMG}/material-tpu.jpg`, alt: 'Flexible TPU printed part' },
  { name: 'Nylon', badge: 'Engineering', desc: 'Engineering material for demanding applications where appropriate.', img: `${IMG}/material-nylon.jpg`, alt: 'Nylon mechanical component' },
];

const capabilities = [
  { icon: Boxes, title: 'Multiple Materials', desc: 'Choose the right material for the job.' },
  { icon: Layers, title: 'Functional Prototypes', desc: 'Parts you can test, fit and refine.' },
  { icon: Repeat, title: 'Custom Part Geometry', desc: 'Complex shapes without dedicated tooling.' },
];

/* No verified awards/ratings — focus areas instead of fabricated achievements. */
const focus = [
  { icon: Lightbulb, title: 'Practical Innovation', desc: 'Real-world solutions, not just concepts.' },
  { icon: PencilRuler, title: 'Thoughtful Design', desc: 'Careful design and material choices for each project.' },
  { icon: Headphones, title: 'Reliable Support', desc: 'Clear communication from enquiry to delivery.' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const } }),
};
const viewport = { once: true, amount: 0.15 } as const;

export function About() {
  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      {/* ================================================================== */}
      {/* HERO                                                               */}
      {/* ================================================================== */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-[#fff8f0] to-[#fff1e0]">
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#f78e00]/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" aria-hidden="true" />

        <div className="container01 relative mx-auto px-4 py-14 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[#f78e00]" />
                <span className="text-xs font-semibold tracking-[0.22em] text-[#e07e00]">ABOUT THE3DINDIA</span>
              </div>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Turning Ideas into <span className="text-[#f78e00]">Real Possibilities</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-gray-600">
                Leading the way in 3D printing innovation, delivering quality and precision through practical,
                customized manufacturing solutions.
              </p>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:flex-wrap sm:gap-x-8">
                {heroValues.map((v) => (
                  <li key={v.label} className="flex items-center gap-3">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#fff3e0]">
                      <v.icon className="h-5 w-5 text-[#f78e00]" />
                    </span>
                    <span className="text-sm font-medium leading-tight text-gray-800">{v.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
                <div className="h-64 w-64 rounded-full bg-gradient-to-tr from-[#f78e00]/15 to-orange-300/20 blur-2xl lg:h-80 lg:w-80" />
              </div>
              <ImageWithFallback
                src={`${IMG}/about-hero-3d-printed-products.jpg`}
                alt="A composition of 3D printed products — black brackets and gears, white components and a lattice print"
                loading="eager"
                className="mx-auto w-full max-w-xl rounded-2xl object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* OUR STORY                                                          */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
              <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">OUR STORY</span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">From Idea to Finished Product</h2>
              <div className="mt-5 space-y-4 text-lg text-gray-600">
                <p>
                  Founded in 2018, The3DIndia began with a simple mission: to make 3D printing accessible for
                  individuals, businesses, designers and innovators.
                </p>
                <p>
                  From early concepts and functional prototypes to customized products and manufacturing requirements,
                  we help transform ideas into physical objects through 3D design and printing solutions.
                </p>
                <p>
                  Our focus is on practical problem-solving, suitable material selection, thoughtful design and helping
                  customers move from an initial idea toward a finished product.
                </p>
              </div>
              <Link
                to="/services"
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#f78e00] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#e07e00]"
              >
                Explore Our Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute -right-4 -top-4 hidden h-20 w-20 border-r-2 border-t-2 border-[#f78e00]/60 sm:block" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
                <ImageWithFallback
                  src={`${IMG}/about-workshop-3d-printer.jpg`}
                  alt="A technician's FDM 3D printer in the workshop"
                  loading="lazy"
                  className="h-full max-h-[460px] w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* HIGHLIGHTS (qualitative — no invented numbers)                     */}
      {/* ================================================================== */}
      <section className="bg-[#fff8f0] py-12">
        <div className="container01 mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                className="flex items-start gap-4"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                  <h.icon className="h-6 w-6 text-[#f78e00]" />
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900">{h.title}</h3>
                  <p className="mt-0.5 text-sm text-gray-600">{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* MISSION & VISION                                                   */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <motion.div className="rounded-2xl border border-gray-100 bg-[#fff8f0] p-8" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff3e0]">
                <Target className="h-7 w-7 text-[#f78e00]" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-gray-900">Our Mission</h3>
              <p className="mt-3 leading-relaxed text-gray-600">
                To make 3D design and printing solutions accessible, practical and useful for individuals and businesses,
                helping turn ideas into tangible products.
              </p>
            </motion.div>
            <motion.div className="rounded-2xl border border-gray-100 bg-gray-50 p-8" initial="hidden" whileInView="show" viewport={viewport} custom={1} variants={fadeUp}>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#fff3e0]">
                <Eye className="h-7 w-7 text-[#f78e00]" />
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-gray-900">Our Vision</h3>
              <p className="mt-3 leading-relaxed text-gray-600">
                To become a trusted partner for 3D printing and product development by delivering thoughtful solutions,
                reliable service and opportunities for innovation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* OUR VALUES                                                         */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Our Values</h2>
            <p className="mt-4 text-lg text-gray-600">The principles that guide everything we do.</p>
          </motion.div>
          <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div key={v.title} className="rounded-xl border border-gray-200 bg-white p-6 text-center" initial="hidden" whileInView="show" viewport={viewport} custom={i} variants={fadeUp}>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fff3e0]">
                  <v.icon className="h-7 w-7 text-[#f78e00]" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{v.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* OUR EXPERTISE (replaces unverified team)                           */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Our Expertise</h2>
            <p className="mt-4 text-lg text-gray-600">The capabilities behind The3DIndia.</p>
          </motion.div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {expertise.map((e, i) => (
              <motion.div key={e.title} className="rounded-xl border border-gray-200 bg-white p-6" initial="hidden" whileInView="show" viewport={viewport} custom={i} variants={fadeUp}>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f78e00]/10">
                  <e.icon className="h-6 w-6 text-[#f78e00]" />
                </div>
                <h3 className="mt-5 font-semibold text-gray-900">{e.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* MATERIALS & TECHNOLOGIES                                           */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Materials &amp; Technologies We Use</h2>
            <p className="mt-4 text-lg text-gray-600">Explore materials suited to different applications and project requirements.</p>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {materials.map((m, i) => (
              <motion.div
                key={m.name}
                className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i % 3}
                variants={fadeUp}
              >
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                  <ImageWithFallback src={m.img} alt={m.alt} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{m.name}</h3>
                    <span className="rounded-full bg-[#fff3e0] px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-[#e07e00]">{m.badge}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* qualitative capabilities (no invented specs) */}
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-3">
            {capabilities.map((c, i) => (
              <motion.div key={c.title} className="rounded-xl border border-gray-200 bg-white p-6 text-center" initial="hidden" whileInView="show" viewport={viewport} custom={i} variants={fadeUp}>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#f78e00]/10">
                  <c.icon className="h-6 w-6 text-[#f78e00]" />
                </div>
                <h3 className="mt-4 font-semibold text-gray-900">{c.title}</h3>
                <p className="mt-1.5 text-sm text-gray-600">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* WHAT WE FOCUS ON (replaces unverified achievements)                */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">What We Focus On</h2>
            <p className="mt-4 text-lg text-gray-600">The things that matter most in every project.</p>
          </motion.div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-3">
            {focus.map((f, i) => (
              <motion.div key={f.title} className="rounded-xl border border-gray-100 bg-[#fff8f0] p-8 text-center" initial="hidden" whileInView="show" viewport={viewport} custom={i} variants={fadeUp}>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                  <f.icon className="h-7 w-7 text-[#f78e00]" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FINAL CTA                                                          */}
      {/* ================================================================== */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#f78e00] to-[#e07e00]">
        <div className="container01 relative mx-auto px-4 py-14 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-5">
            <motion.div className="lg:col-span-3" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
              <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
                Have a Project in Mind?
              </h2>
              <p className="mt-4 max-w-xl text-lg text-white/90">
                Let's turn your ideas into high-quality 3D-printed products. Get in touch with our team today.
              </p>
              <Link
                to="/contact"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 font-semibold text-[#e07e00] transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Contact Us
                <ArrowRight className="h-5 w-5" />
              </Link>
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
                  src={`${IMG}/about-hero-3d-printed-products.jpg`}
                  alt="An arrangement of 3D printed components"
                  loading="lazy"
                  className="h-[200px] w-full object-cover sm:h-[240px]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
