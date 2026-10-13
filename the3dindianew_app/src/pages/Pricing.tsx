import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  CheckCircle,
  ChevronDown,
  FileText,
  Gauge,
  Layers,
  Receipt,
  ShieldCheck,
  Sparkles,
  Wallet,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const IMG = '/images/pricing';

/* -------------------------------------------------------------------------- */
/*  Pricing data — indicative examples, matching the values already used in    */
/*  the project. Final pricing depends on material, volume, complexity, etc.    */
/* -------------------------------------------------------------------------- */

const plans = [
  {
    name: 'Hobbyist',
    description: 'Perfect for personal projects and learning',
    price: '₹50',
    unit: 'per part',
    popular: false,
    features: ['PLA and PETG materials', 'Standard resolution', 'Ideal for small parts', 'Cost-effective for personal projects'],
    cta: 'Get Started',
    to: '/contact',
  },
  {
    name: 'Professional',
    description: 'Best for small businesses and prototyping',
    price: '₹500',
    unit: 'per part',
    popular: true,
    features: ['Multiple material options', 'High-quality finish', 'Complex geometries', 'Design support'],
    cta: 'Get Started',
    to: '/contact',
  },
  {
    name: 'Enterprise',
    description: 'For large-scale production needs',
    price: 'Custom',
    unit: 'quote',
    popular: false,
    features: ['Volume discounts where available', 'Dedicated project coordination', 'Custom material requirements', 'Production planning'],
    cta: 'Contact Us',
    to: '/contact',
  },
];

const materials = [
  { name: 'PLA', range: '₹8–12 per gram', desc: 'Most economical option', img: `${IMG}/material-pla.jpg`, alt: 'PLA filament spool and a printed part' },
  { name: 'PETG', range: '₹10–15 per gram', desc: 'Strong and versatile', img: `${IMG}/material-petg.jpg`, alt: 'PETG spool and a printed component' },
  { name: 'ABS', range: '₹12–18 per gram', desc: 'Heat resistant', img: `${IMG}/material-abs.jpg`, alt: 'ABS filament and a functional printed component' },
  { name: 'TPU', range: '₹20–30 per gram', desc: 'Flexible material', img: `${IMG}/material-tpu.jpg`, alt: 'Flexible filament and a flexible printed part' },
  { name: 'Nylon', range: '₹25–35 per gram', desc: 'Durable engineering material', img: `${IMG}/material-nylon.jpg`, alt: 'Nylon filament and a mechanical component' },
  { name: 'Resin', range: '₹30–50 per gram', desc: 'High-detail prints', img: `${IMG}/material-resin.jpg`, alt: 'Resin and a detailed resin print' },
];

const whyPricing = [
  { icon: Receipt, title: 'No Hidden Fees', desc: 'Understand your quote before production begins.' },
  { icon: Layers, title: 'Quality Materials', desc: "Choose suitable materials for your project's needs." },
  { icon: Wallet, title: 'Competitive Rates', desc: 'Find a practical solution for personal and business projects.' },
  { icon: Sparkles, title: 'Custom Solutions', desc: 'Get a tailored quote for specialized requirements.' },
];

const heroBenefits = [
  { icon: ShieldCheck, label: 'Clear & Transparent' },
  { icon: Layers, label: 'Quality Materials' },
  { icon: Gauge, label: 'Competitive Rates' },
  { icon: FileText, label: 'Custom Quotes' },
];

/* FAQ — reuses the project's existing verified answers; the bulk-quote answer
   is conservative and points to the contact route. */
const faqs = [
  { q: 'What file formats do you accept?', a: 'We accept all major 3D file formats including STL, OBJ, STEP, 3MF and IGES. If you have a different format, contact us and we\u2019ll help you convert it.' },
  { q: 'What is the typical delivery time?', a: 'Standard delivery is 3\u20135 business days for most orders. We also offer express delivery (24\u201348 hours) for urgent projects at an additional cost.' },
  { q: 'What materials are available?', a: 'We offer a range of materials including PLA, PETG, ABS, TPU, Nylon and resin. Each material has different properties suited for specific applications.' },
  { q: 'Do you offer design assistance?', a: 'Yes. We provide design corrections and optimization to help your model print well, and our team can also create custom 3D designs from scratch.' },
  { q: 'What are your payment options?', a: 'We accept major payment methods including UPI, credit/debit cards, net banking and bank transfers. Payment is required before we begin printing.' },
  { q: 'Can I see my model before printing?', a: 'Yes. After you share your file we review it and send a quote; you can request modifications before we proceed.' },
  { q: 'Do you ship internationally?', a: 'We currently ship across India. For international orders, please contact us directly to discuss options and costs.' },
  { q: 'What is your minimum order quantity?', a: 'There is no minimum order quantity. Whether you need a single prototype or a larger batch, we\u2019re happy to help.' },
  { q: 'How do I get a custom quote for bulk orders?', a: 'Share your model or requirements and quantity through our contact page, and we\u2019ll review the project and provide a tailored quote.' },
];

/* -------------------------------------------------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const } }),
};
const viewport = { once: true, amount: 0.15 } as const;

/* -------------------------------------------------------------------------- */

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <div className={`overflow-hidden rounded-xl border bg-white transition-colors ${open ? 'border-[#f78e00]' : 'border-gray-200'}`}>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f78e00]"
        >
          <span className={`font-medium ${open ? 'text-[#e07e00]' : 'text-gray-900'}`}>{q}</span>
          <ChevronDown className={`h-5 w-5 flex-shrink-0 text-[#f78e00] transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-gray-600">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const col1 = faqs.filter((_, i) => i % 2 === 0);
  const col2 = faqs.filter((_, i) => i % 2 === 1);

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      {/* ================================================================== */}
      {/* HERO                                                               */}
      {/* ================================================================== */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-[#fff8f0] to-[#fff1e0]">
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#f78e00]/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" aria-hidden="true" />

        <div className="container01 relative mx-auto px-4 py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[#f78e00]" />
                <span className="text-xs font-semibold tracking-[0.22em] text-[#e07e00]">TRANSPARENT PRICING</span>
              </div>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Simple, Fair Pricing <span className="text-[#f78e00]">for Your Ideas</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-gray-600">
                High-quality 3D printing and manufacturing at competitive rates. Pay only for what you need — no hidden
                fees.
              </p>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:flex-wrap sm:gap-x-8">
                {heroBenefits.map((b) => (
                  <li key={b.label} className="flex items-center gap-3">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#fff3e0]">
                      <b.icon className="h-5 w-5 text-[#f78e00]" />
                    </span>
                    <span className="text-sm font-medium leading-tight text-gray-800">{b.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
                <div className="h-64 w-64 rounded-full bg-gradient-to-tr from-[#f78e00]/15 to-orange-300/20 blur-2xl lg:h-80 lg:w-80" />
              </div>
              <ImageWithFallback
                src={`${IMG}/pricing-hero-products.jpg`}
                alt="A curated arrangement of 3D printed parts — mechanical brackets, gears, a lattice print and a precision enclosure"
                loading="eager"
                className="mx-auto w-full max-w-xl rounded-2xl object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* PRICING PLANS                                                      */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Our Pricing Plans</h2>
            <p className="mt-4 text-lg text-gray-600">Choose the plan that best fits your project needs.</p>
          </motion.div>

          <div className="mx-auto mt-14 grid max-w-6xl items-stretch gap-6 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl p-8 ${
                  plan.popular ? 'border-2 border-[#f78e00] bg-[#fff8f0] shadow-xl lg:-mt-2 lg:mb-2' : 'border border-gray-200 bg-white'
                }`}
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#f78e00] px-4 py-1 text-xs font-semibold text-white shadow">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                <p className="mt-1.5 text-sm text-gray-600">{plan.description}</p>
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold text-gray-900">{plan.price}</span>
                  <span className="text-gray-500">{plan.unit}</span>
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#f78e00]" />
                      <span className="text-sm text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={plan.to}
                  className={`mt-8 inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f78e00] ${
                    plan.popular ? 'bg-[#f78e00] text-white hover:bg-[#e07e00]' : 'border border-[#f78e00] text-[#f78e00] hover:bg-[#f78e00] hover:text-white'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-gray-500">
            Prices shown are indicative starting points, not guaranteed quotations. Final pricing depends on material,
            model volume, complexity, finishing, quantity and production requirements.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* MATERIAL PRICING                                                   */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Material Pricing</h2>
            <p className="mt-4 text-lg text-gray-600">Transparent pricing based on material, weight and type.</p>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                  <h3 className="font-semibold text-gray-900">{m.name}</h3>
                  <div className="mt-0.5 font-semibold text-[#f78e00]">{m.range}</div>
                  <p className="mt-0.5 text-sm text-gray-500">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-gray-500">
            Material rates are indicative examples. Actual print quotations may differ and can also include printing
            time, design work, machine setup, post-processing and quantity.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* WHY OUR PRICING WORKS                                              */}
      {/* ================================================================== */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Why Our Pricing Works</h2>
            <p className="mt-4 text-lg text-gray-600">Get the best value without compromising on quality.</p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyPricing.map((w, i) => (
              <motion.div
                key={w.title}
                className="rounded-xl border border-gray-200 bg-white p-6"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f78e00]/10">
                  <w.icon className="h-6 w-6 text-[#f78e00]" />
                </div>
                <h3 className="mt-5 font-semibold text-gray-900">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* QUOTE CTA                                                          */}
      {/* ================================================================== */}
      <section className="bg-white pb-16 lg:pb-24">
        <div className="container01 mx-auto px-4">
          <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#f78e00] to-[#e07e00] px-6 py-12 sm:px-10 lg:px-14">
            <div className="grid items-center gap-8 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Get a Custom Quote</h2>
                <p className="mt-3 max-w-xl text-lg text-white/90">
                  Share your 3D file or project requirements and we'll review it and provide a price estimate.
                </p>
                <Link
                  to="/contact"
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 font-semibold text-[#e07e00] transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Request a Quote
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
              <div className="lg:col-span-2">
                <div className="relative overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/10">
                  <ImageWithFallback
                    src={`${IMG}/instant-quote-products.jpg`}
                    alt="An arrangement of black, white and orange 3D printed components"
                    loading="lazy"
                    className="h-[200px] w-full object-cover sm:h-[240px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FAQ                                                                */}
      {/* ================================================================== */}
      <section className="bg-gray-50 py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-gray-600">Everything you need to know about our pricing and services.</p>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-2 md:gap-x-6">
            <div className="space-y-4">
              {col1.map((f) => {
                const idx = faqs.indexOf(f);
                return <FaqItem key={idx} q={f.q} a={f.a} open={openFaq === idx} onToggle={() => setOpenFaq(openFaq === idx ? null : idx)} />;
              })}
            </div>
            <div className="space-y-4">
              {col2.map((f) => {
                const idx = faqs.indexOf(f);
                return <FaqItem key={idx} q={f.q} a={f.a} open={openFaq === idx} onToggle={() => setOpenFaq(openFaq === idx ? null : idx)} />;
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
