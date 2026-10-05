import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import {
  ArrowRight,
  Cake,
  Gift,
  Heart,
  Home,
  Image as ImageIcon,
  Lightbulb,
  MessageCircle,
  MousePointerClick,
  Package2,
  PartyPopper,
  PenLine,
  Printer,
  Sparkles,
  Boxes,
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const IMG = '/images/customized-gifts';

/* -------------------------------------------------------------------------- */
/*  Honest content only — no delivery-time, order-volume, customer-count or    */
/*  pricing claims; no guaranteed facial likeness.                             */
/* -------------------------------------------------------------------------- */

const heroCapabilities = ['Personalized Designs', 'Made to Order', 'Unique Gift Ideas', 'Custom Names & Messages'];

const whatWeCreate = [
  { no: '01', title: 'Personalized Statues', desc: 'Turn a person, couple or special memory into a unique 3D printed keepsake.', img: `${IMG}/create-statue.jpg`, alt: 'Personalized 3D printed couple figurine', icon: Heart },
  { no: '02', title: 'Tabletop Name Plates', desc: 'Personalized name plates for desks, rooms, offices and special occasions.', img: `${IMG}/create-nameplate.jpg`, alt: 'Personalized tabletop name plate', icon: PenLine },
  { no: '03', title: 'Custom Pen Stands', desc: 'Functional desk accessories personalized with names, initials or messages.', img: `${IMG}/create-penstand.jpg`, alt: 'Personalized 3D printed pen stand', icon: Package2 },
  { no: '04', title: 'Photo-Based Figurines', desc: 'Create custom figurines inspired by your photographs.', img: `${IMG}/create-figurine.jpg`, alt: '3D printed figurine inspired by a photograph', icon: ImageIcon },
  { no: '05', title: 'Personalized Keychains', desc: 'Names, initials, symbols and custom shapes designed as memorable everyday gifts.', img: `${IMG}/create-keychain.jpg`, alt: 'Personalized 3D printed keychain', icon: Sparkles },
  { no: '06', title: 'Custom Décor', desc: 'Create decorative pieces for homes, offices, celebrations and special occasions.', img: `${IMG}/create-decor.jpg`, alt: 'Personalized 3D printed decorative object', icon: Home },
];

const occasions = [
  { title: 'Birthday', desc: 'Make their birthday gift truly personal.', img: `${IMG}/occasion-birthday.jpg`, alt: 'Personalized birthday gift' },
  { title: 'Anniversary', desc: 'Celebrate your story with something made just for you.', img: `${IMG}/occasion-anniversary.jpg`, alt: 'Personalized anniversary keepsake' },
  { title: 'Wedding', desc: 'Personalized gifts for couples and special celebrations.', img: `${IMG}/occasion-wedding.jpg`, alt: 'Personalized wedding gift' },
  { title: 'Housewarming', desc: 'Unique décor and personalized pieces for a new home.', img: `${IMG}/occasion-housewarming.jpg`, alt: 'Personalized housewarming décor' },
  { title: 'Corporate', desc: 'Custom gifts for employees, clients and teams.', img: `${IMG}/occasion-corporate.jpg`, alt: 'Personalized corporate gift' },
  { title: 'Festivals', desc: 'Personalized gifts for Diwali, Christmas and other celebrations.', img: `${IMG}/occasion-festival.jpg`, alt: 'Personalized festive gift' },
];

const featured = [
  { name: 'Personalized Couple Figurine', desc: 'Custom 3D printed keepsake', img: `${IMG}/featured-couple.jpg`, alt: 'Personalized couple figurine' },
  { name: 'Tabletop Name Plate', desc: 'Personalized desk & office décor', img: `${IMG}/featured-nameplate.jpg`, alt: 'Tabletop personalized name plate' },
  { name: 'Custom Pen Stand', desc: 'Functional personalized desk accessory', img: `${IMG}/featured-penstand.jpg`, alt: 'Custom personalized pen stand' },
  { name: 'Family Figurine', desc: 'A keepsake made around your family', img: `${IMG}/featured-family.jpg`, alt: 'Personalized family figurine' },
  { name: 'Personalized Keychain', desc: 'A small, memorable everyday gift', img: `${IMG}/featured-keychain.jpg`, alt: 'Personalized keychain' },
  { name: 'Decorative Gift', desc: 'A personalized piece for any space', img: `${IMG}/featured-decor.jpg`, alt: 'Personalized decorative gift' },
];

const personalizeSteps = [
  { no: '01', icon: MousePointerClick, title: 'Choose', desc: 'Select the type of gift or product.' },
  { no: '02', icon: PenLine, title: 'Personalize', desc: 'Add names, dates, messages, initials or other details.' },
  { no: '03', icon: Sparkles, title: 'Preview', desc: 'Confirm the design before printing.' },
  { no: '04', icon: Printer, title: 'Print', desc: 'We turn the approved design into a physical product.' },
];

const finishes = [
  { title: 'Classic', desc: 'Clean and minimal', swatch: '#e5e7eb' },
  { title: 'Bold', desc: 'Bright and colourful', swatch: '#f78e00' },
  { title: 'Premium', desc: 'Elegant darker tones', swatch: '#1f2937' },
  { title: 'Multi-Colour', desc: 'Multiple colours for selected designs', swatch: 'conic-gradient(from 180deg, #f78e00, #dc2626, #2563eb, #16a34a, #f78e00)' },
];

const perfectFor = [
  { title: 'Birthdays', img: `${IMG}/perfect-birthday.jpg`, alt: 'Birthday personalized gift' },
  { title: 'Anniversaries', img: `${IMG}/perfect-anniversary.jpg`, alt: 'Anniversary personalized gift' },
  { title: 'Weddings', img: `${IMG}/perfect-wedding.jpg`, alt: 'Wedding personalized gift' },
  { title: 'Corporate Gifts', img: `${IMG}/perfect-corporate.jpg`, alt: 'Corporate personalized gift' },
  { title: 'Festive Gifts', img: `${IMG}/perfect-festive.jpg`, alt: 'Festive personalized gift' },
  { title: 'Return Gifts', img: `${IMG}/perfect-return.jpg`, alt: 'Return personalized gift' },
  { title: 'Desk Accessories', img: `${IMG}/perfect-desk.jpg`, alt: 'Personalized desk accessory' },
  { title: 'Home Décor', img: `${IMG}/perfect-decor.jpg`, alt: 'Personalized home décor' },
];

const portfolio = [
  { title: 'Couple Figurine', tag: 'Personalized Keepsake', img: `${IMG}/portfolio-couple.jpg`, alt: 'Personalized couple figurine' },
  { title: 'Custom Name Plate', tag: 'Desk & Office', img: `${IMG}/portfolio-nameplate.jpg`, alt: 'Custom personalized name plate' },
  { title: 'Pen Stand', tag: 'Desk Accessory', img: `${IMG}/portfolio-penstand.jpg`, alt: 'Personalized pen stand' },
  { title: 'Family Figurine', tag: 'Personalized Keepsake', img: `${IMG}/portfolio-family.jpg`, alt: 'Personalized family figurine' },
  { title: 'Keychain', tag: 'Everyday Gift', img: `${IMG}/portfolio-keychain.jpg`, alt: 'Personalized keychain' },
  { title: 'Custom Décor', tag: 'Decorative Gift', img: `${IMG}/portfolio-decor.jpg`, alt: 'Custom decorative gift' },
];

const photoFlow = [
  { label: 'Photo', note: 'Your favourite reference', img: `${IMG}/photo-reference.jpg`, alt: 'Framed photo reference' },
  { label: '3D Model', note: 'Designed into a figurine', img: `${IMG}/photo-model.jpg`, alt: '3D model concept of a figurine' },
  { label: 'Printed Figurine', note: 'A physical keepsake', img: `${IMG}/photo-printed.jpg`, alt: 'Physical 3D printed figurine' },
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

export function CustomizedGiftsDetail() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Customized Gifts & Personalized 3D Printed Items | The3DIndia';

    const metas: { selector: string; attr: 'name' | 'property'; key: string; content: string }[] = [
      {
        selector: 'meta[name="description"]',
        attr: 'name',
        key: 'description',
        content:
          'Create personalized 3D printed gifts including custom statues, tabletop name plates, pen stands, figurines, keychains and unique gifts with The3DIndia.',
      },
      { selector: 'meta[property="og:title"]', attr: 'property', key: 'og:title', content: 'Customized Gifts & Personalized 3D Printed Items | The3DIndia' },
      {
        selector: 'meta[property="og:description"]',
        attr: 'property',
        key: 'og:description',
        content: 'Turn memories, names, people and ideas into personalized physical gifts, 3D printed by The3DIndia.',
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
    <div className="bg-[#fdfbf8] text-gray-900 overflow-x-hidden">
      {/* ================================================================== */}
      {/* 1. HERO                                                            */}
      {/* ================================================================== */}
      <section className="relative isolate overflow-hidden bg-[#17120e] text-white">
        <div className="absolute -right-24 top-10 h-[32rem] w-[32rem] gift-warm-glow gift-glow-breathe" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#17120e]" aria-hidden="true" />

        <div className="container01 relative mx-auto px-4 pb-16 pt-6 lg:pb-24 lg:pt-8">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-gray-400">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link to="/" className="transition-colors hover:text-[#f9a030]">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/services" className="transition-colors hover:text-[#f9a030]">Services</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-200" aria-current="page">Customized Gifts &amp; Personalized Items</li>
            </ol>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial="hidden" animate="show" variants={fadeUp}>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#f78e00]/40 bg-[#f78e00]/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-[#f9a030]">
                <Gift className="h-3.5 w-3.5" />
                CUSTOMIZED 3D PRINTING
              </span>

              {/* H1 holds the full service name for SEO; the display headline follows */}
              <h1 className="sr-only">Customized Gifts &amp; Personalized Items</h1>
              <p className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl" aria-hidden="true">
                Make It <span className="text-[#f78e00]">Personal.</span>
                <br />
                Make It Yours.
              </p>

              <p className="mt-6 max-w-xl text-lg text-gray-300">
                Create unique 3D printed gifts and personalized products designed especially for the people and moments
                that matter.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f78e00] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#e07e00]"
                >
                  Create Your Gift
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="#gift-ideas"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 font-semibold text-white transition-colors hover:border-[#f78e00] hover:text-[#f9a030]"
                >
                  Explore Gift Ideas
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
              <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                <ImageWithFallback
                  src={`${IMG}/hero.jpg`}
                  alt="A collection of personalized 3D printed gifts arranged on a desk"
                  className="h-[320px] w-full object-cover sm:h-[430px] lg:h-[520px]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#17120e]/55 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/55 px-4 py-2 backdrop-blur-sm">
                <span className="text-sm font-medium text-white">Personalized &amp; Made to Order</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 2. WHAT CAN WE CREATE                                              */}
      {/* ================================================================== */}
      <section id="gift-ideas" className="py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">GIFT IDEAS</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Something Made Just for Them</h2>
            <p className="mt-4 text-lg text-gray-600">
              Choose a design, personalize it with a name, message or idea, and create a gift that feels truly personal.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whatWeCreate.map((card, i) => (
              <motion.article
                key={card.title}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-xl"
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-bold text-[#e07e00]">
                    {card.no}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2">
                    <card.icon className="h-4 w-4 text-[#f78e00]" />
                    <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{card.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 3. OCCASIONS                                                       */}
      {/* ================================================================== */}
      <section className="bg-[#fbf3ea] py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <span className="text-xs font-semibold tracking-[0.2em] text-[#f78e00]">FOR EVERY OCCASION</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Made for Moments That Matter</h2>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {occasions.map((o, i) => (
              <motion.article
                key={o.title}
                className="group relative overflow-hidden rounded-2xl"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <ImageWithFallback
                    src={o.img}
                    alt={o.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-lg font-semibold text-white">{o.title}</h3>
                  <p className="mt-1 text-sm text-gray-200">{o.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 4. FEATURED PRODUCTS (dark)                                        */}
      {/* ================================================================== */}
      <section className="relative overflow-hidden bg-[#17120e] py-16 text-white lg:py-24">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 gift-warm-glow" aria-hidden="true" />
        <div className="container01 relative mx-auto px-4">
          <motion.div
            className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
          >
            <div className="max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Made to Be Remembered</h2>
              <p className="mt-4 text-lg text-gray-300">
                Explore some of the personalized products you can create with The3DIndia.
              </p>
            </div>
            <Link
              to="/portfolio"
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#f78e00] hover:text-[#f9a030]"
            >
              View More Ideas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <motion.article
                key={p.name}
                className="group overflow-hidden rounded-2xl bg-[#211a14] ring-1 ring-white/10"
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
      {/* 5. PERSONALIZATION                                                 */}
      {/* ================================================================== */}
      <section className="py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Your Idea. <span className="text-[#f78e00]">Your Design.</span>
            </h2>
          </motion.div>

          {/* transformation strip */}
          <motion.div
            className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center gap-3 text-sm font-semibold tracking-wide text-gray-500 sm:flex-row"
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            variants={fadeUp}
          >
            <span className="rounded-full bg-gray-100 px-4 py-2">BLANK PRODUCT</span>
            <ArrowRight className="h-4 w-4 rotate-90 text-[#f78e00] sm:rotate-0" />
            <span className="rounded-full bg-[#fff3e0] px-4 py-2 text-[#e07e00]">PERSONALIZED DESIGN</span>
            <ArrowRight className="h-4 w-4 rotate-90 text-[#f78e00] sm:rotate-0" />
            <span className="rounded-full bg-[#f78e00] px-4 py-2 text-white">3D PRINTED PRODUCT</span>
          </motion.div>

          {/* desktop step row */}
          <div className="relative mt-14 hidden lg:block">
            <div className="absolute left-0 right-0 top-8 h-[3px] gift-flow-line" aria-hidden="true" />
            <div className="grid grid-cols-4 gap-6">
              {personalizeSteps.map((s, i) => (
                <motion.div key={s.no} className="relative text-center" initial="hidden" whileInView="show" viewport={viewport} custom={i} variants={fadeUp}>
                  <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f78e00] text-white shadow-lg">
                    <s.icon className="h-6 w-6" />
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#17120e] text-[0.6rem] font-bold">
                      {s.no}
                    </span>
                  </div>
                  <h3 className="mt-5 font-semibold text-gray-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* mobile vertical steps */}
          <div className="relative mt-12 space-y-8 lg:hidden">
            <div className="absolute bottom-8 left-[31px] top-8 w-[3px] gift-flow-line-v" aria-hidden="true" />
            {personalizeSteps.map((s, i) => (
              <motion.div key={s.no} className="relative flex items-start gap-5" initial="hidden" whileInView="show" viewport={viewport} custom={i} variants={fadeUp}>
                <div className="relative z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[#f78e00] text-white shadow-lg">
                  <s.icon className="h-6 w-6" />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-[#17120e] text-[0.6rem] font-bold">
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
      {/* 6. PHOTO TO 3D FIGURINE (warm dark)                                */}
      {/* ================================================================== */}
      <section className="relative overflow-hidden bg-[#211a14] py-16 text-white lg:py-24">
        <div className="absolute inset-0 gift-warm-glow opacity-50" aria-hidden="true" />
        <div className="container01 relative mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Turn a Photo Into a Keepsake</h2>
            <p className="mt-4 text-lg text-gray-300">
              Have a favorite photo? Turn a memorable person, couple or moment into a personalized 3D printed figurine.
            </p>
          </motion.div>

          <div className="mt-12 flex flex-col items-stretch gap-6 lg:flex-row lg:items-center lg:justify-center">
            {photoFlow.map((f, i) => (
              <div key={f.label} className="flex flex-col items-center gap-6 lg:flex-row">
                <motion.figure
                  className="group w-full max-w-xs overflow-hidden rounded-2xl bg-[#17120e] ring-1 ring-white/10"
                  initial="hidden"
                  whileInView="show"
                  viewport={viewport}
                  custom={i}
                  variants={fadeUp}
                >
                  <div className="aspect-square overflow-hidden">
                    <ImageWithFallback
                      src={f.img}
                      alt={f.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="p-4 text-center">
                    <div className="font-semibold text-white">{f.label}</div>
                    <div className="mt-0.5 text-sm text-gray-400">{f.note}</div>
                  </figcaption>
                </motion.figure>
                {i < photoFlow.length - 1 && (
                  <ArrowRight className="h-6 w-6 flex-shrink-0 rotate-90 text-[#f78e00] lg:rotate-0" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f78e00] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#e07e00]"
            >
              Create a Custom Figurine
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="mt-4 text-sm text-gray-400">Each figurine is designed inspired by your photograph.</p>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 7. MATERIALS & FINISHES                                            */}
      {/* ================================================================== */}
      <section className="py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Choose the Look</h2>
            <p className="mt-4 text-lg text-gray-600">
              Different colours and finishes can change the character of your personalized gift.
            </p>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {finishes.map((f, i) => (
              <motion.div
                key={f.title}
                className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm"
                initial="hidden"
                whileInView="show"
                viewport={viewport}
                custom={i}
                variants={fadeUp}
              >
                <span
                  className="h-14 w-14 rounded-full ring-4 ring-black/5"
                  style={f.swatch.startsWith('conic') ? { background: f.swatch } : { backgroundColor: f.swatch }}
                  aria-hidden="true"
                />
                <h3 className="mt-4 font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-gray-500">
            Available colours and finishes depend on the chosen design and material.
          </p>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 8. PERFECT FOR                                                     */}
      {/* ================================================================== */}
      <section className="bg-[#fbf3ea] py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Perfect For</h2>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {perfectFor.map((p, i) => (
              <motion.article
                key={p.title}
                className="group relative overflow-hidden rounded-2xl"
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
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 to-transparent p-4">
                  <h3 className="text-sm font-semibold text-white sm:text-base">{p.title}</h3>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 9. REAL PRODUCTS / PORTFOLIO                                       */}
      {/* ================================================================== */}
      <section className="py-16 lg:py-24">
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
                Made by <span className="text-[#f78e00]">The3DIndia</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Real personalized products created for special moments and everyday spaces.
              </p>
            </div>
            <Link to="/portfolio" className="inline-flex flex-shrink-0 items-center gap-2 font-semibold text-[#f78e00] transition-colors hover:text-[#e07e00]">
              View Full Gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {portfolio.map((p, i) => (
              <motion.article
                key={p.title}
                className="group relative overflow-hidden rounded-2xl shadow-sm"
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
      {/* 10. CUSTOM ORDER                                                   */}
      {/* ================================================================== */}
      <section className="bg-[#fbf3ea] py-16 lg:py-24">
        <div className="container01 mx-auto px-4">
          <motion.div className="mx-auto max-w-2xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Have Something Special in Mind?</h2>
            <p className="mt-4 text-lg text-gray-600">
              Tell us what you want to create. Share a photo, sketch, reference or simply describe your idea.
            </p>
          </motion.div>

          <div className="mx-auto mt-12 grid max-w-4xl items-stretch gap-6 md:grid-cols-2">
            <motion.div
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              variants={fadeUp}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f78e00]/10">
                <Gift className="h-6 w-6 text-[#f78e00]" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-gray-900">Choose a Product</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                Start with a name plate, figurine, pen stand or another gift idea.
              </p>
              <a href="#gift-ideas" className="mt-5 inline-flex items-center gap-2 font-semibold text-[#f78e00] hover:text-[#e07e00]">
                Explore Gift Ideas
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              custom={1}
              variants={fadeUp}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f78e00]/10">
                <Lightbulb className="h-6 w-6 text-[#f78e00]" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-gray-900">Have Your Own Idea?</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                Tell us what you want to create and we'll help you explore the possibilities.
              </p>
              <Link to="/contact" className="mt-5 inline-flex items-center gap-2 font-semibold text-[#f78e00] hover:text-[#e07e00]">
                Discuss Your Idea
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* 11. FINAL CTA (upper footer, warm charcoal)                        */}
      {/* ================================================================== */}
      <section className="relative isolate overflow-hidden bg-[#17120e] text-white">
        <div className="absolute inset-0" aria-hidden="true">
          <ImageWithFallback
            src={`${IMG}/cta.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-30 gift-cta-pan"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#17120e] via-[#17120e]/85 to-[#17120e]/35" />
          <div className="absolute -bottom-20 right-1/4 h-80 w-80 gift-warm-glow gift-glow-breathe" />
        </div>

        <div className="container01 relative mx-auto px-4 py-16 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-3">
            <motion.div className="lg:col-span-2" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
              <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Give Something They <span className="text-[#f78e00]">Won't Forget</span>
              </h2>
              <p className="mt-5 max-w-xl text-lg text-gray-300">
                Create a personalized gift made around their name, their story or their special moment.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f78e00] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#e07e00]"
                >
                  Create Your Gift
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href="https://wa.me/917905620142"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#1ebe59]"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Us
                </a>
              </div>
              <p className="mt-6 text-sm tracking-wide text-[#f9a030]">Personalized • Made to Order • Designed for You</p>
            </motion.div>

            <motion.div
              className="hidden items-center justify-center gap-3 lg:flex"
              initial="hidden"
              whileInView="show"
              viewport={viewport}
              custom={1}
              variants={fadeUp}
            >
              <div className="grid grid-cols-2 gap-3 text-gray-200">
                {[
                  { icon: Cake, label: 'Birthdays' },
                  { icon: Heart, label: 'Anniversaries' },
                  { icon: PartyPopper, label: 'Celebrations' },
                  { icon: Boxes, label: 'Corporate' },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm">
                    <c.icon className="h-4 w-4 flex-shrink-0 text-[#f78e00]" />
                    {c.label}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
