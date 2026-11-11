import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight,
  Box,
  Boxes,
  Clock,
  Layers,
  Maximize,
  PaintBucket,
  Ruler,
  Scaling,
  Settings2,
  SquareStack,
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const IMG = '/images/learn-3d-printing';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const } }),
};
const viewport = { once: true, amount: 0.15 } as const;

/* ========================================================================== */
/*  1. HOW 3D PRINTING WORKS — 5-step workflow                                */
/* ========================================================================== */

const steps = [
  { no: '01', title: 'Create or Obtain a 3D Model', desc: 'Start with a CAD model, a downloaded 3D file, or a design created for your project.', img: `${IMG}/printing-workflow-cad-model.jpg`, alt: 'A CAD model displayed on a computer screen' },
  { no: '02', title: 'Prepare the File', desc: 'Export the model in a supported format and prepare it using slicing software.', img: `${IMG}/printing-workflow-slicing.jpg`, alt: 'A 3D model with visible print layers in a slicing preview' },
  { no: '03', title: 'Configure the Printer', desc: 'Choose a suitable material, layer height, orientation, supports and print settings.', img: `${IMG}/printing-workflow-printer-setup.jpg`, alt: 'Filament loaded on a printer being prepared' },
  { no: '04', title: 'Print the Object', desc: 'The printer builds the object layer by layer using the selected manufacturing process.', img: `${IMG}/printing-workflow-active-print.jpg`, alt: 'A 3D printer producing a real object' },
  { no: '05', title: 'Finish and Inspect', desc: 'Remove supports where needed, perform appropriate finishing, and check the completed part.', img: `${IMG}/printing-workflow-finished-part.jpg`, alt: 'A finished printed component being inspected' },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-20">
      <div className="container01 mx-auto px-4">
        <motion.div className="mx-auto max-w-3xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900">How Does 3D Printing Work?</h2>
          <p className="mt-4 text-xl text-gray-600">A digital design becomes a physical object through a series of carefully planned steps.</p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <motion.div key={s.no} className="relative" initial="hidden" whileInView="show" viewport={viewport} custom={i} variants={fadeUp}>
              {/* connector (desktop) */}
              {i < steps.length - 1 && (
                <div className="absolute right-[-0.9rem] top-24 z-10 hidden lg:block" aria-hidden="true">
                  <ArrowRight className="h-5 w-5 text-[#f78e00]" />
                </div>
              )}
              <div className="h-full overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ImageWithFallback src={s.img} alt={s.alt} loading="lazy" className="h-full w-full object-cover" />
                  <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#f78e00] text-sm font-bold text-white">
                    {s.no}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{s.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-gray-500">
          The exact layer-building mechanism and finishing steps vary by technology and material.
        </p>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*  2. TECHNOLOGY COMPARISON — 3 cards + table                                 */
/* ========================================================================== */

const techCards = [
  {
    name: 'FDM — Fused Deposition Modeling',
    img: `${IMG}/technology-fdm.jpg`,
    alt: 'FDM printed functional parts',
    offered: true,
    best: 'Functional parts, prototypes, brackets, enclosures and larger practical components.',
    advantages: ['Often cost-effective for many parts', 'Broad thermoplastic material choices', 'Suitable for functional prototypes'],
    considerations: ['Visible layer lines may occur', 'Surface finish depends on settings and orientation'],
  },
  {
    name: 'SLA / Resin Printing',
    img: `${IMG}/technology-resin.jpg`,
    alt: 'Detailed resin printed model',
    offered: false,
    best: 'Detailed miniatures, intricate models and parts requiring fine surface detail.',
    advantages: ['Fine details and smooth surfaces are possible', 'Suitable for small, intricate designs'],
    considerations: ['Resin handling and post-curing may be required', 'Material properties depend on the selected resin'],
  },
  {
    name: 'SLS — Selective Laser Sintering',
    img: `${IMG}/technology-sls.jpg`,
    alt: 'Complex powder-bed printed parts',
    offered: false,
    best: 'Complex engineering components and geometries that benefit from powder-bed printing.',
    advantages: ['Supports complex geometries', 'Can produce functional polymer parts'],
    considerations: ['Equipment and production costs may be higher', 'Material and availability depend on the service provider'],
  },
];

const tableRows = [
  { tech: 'FDM', strength: 'Good for functional parts', detail: 'Visible layer lines', apps: 'Prototypes, brackets, enclosures, jigs', cost: 'Lower' },
  { tech: 'SLA / Resin', strength: 'Depends on resin type', detail: 'Fine, smooth detail', apps: 'Miniatures, detailed models', cost: 'Medium' },
  { tech: 'SLS', strength: 'Good for functional parts', detail: 'Matte, uniform surface', apps: 'Complex engineering geometries', cost: 'Higher' },
];

export function TechComparison() {
  return (
    <section className="bg-white py-20">
      <div className="container01 mx-auto px-4">
        <motion.div className="mx-auto max-w-3xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900">Which 3D Printing Technology Is Right for You?</h2>
          <p className="mt-4 text-xl text-gray-600">Different printing technologies suit different requirements for detail, strength, materials and budget.</p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {techCards.map((t, i) => (
            <motion.article key={t.name} className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white" initial="hidden" whileInView="show" viewport={viewport} custom={i} variants={fadeUp}>
              <div className="relative aspect-[16/10] overflow-hidden">
                <ImageWithFallback src={t.img} alt={t.alt} loading="lazy" className="h-full w-full object-cover" />
                <span className={`absolute left-3 top-3 rounded-full px-2.5 py-0.5 text-xs font-semibold ${t.offered ? 'bg-[#f78e00] text-white' : 'bg-white/90 text-gray-700'}`}>
                  {t.offered ? 'Offered by The3DIndia' : 'General comparison'}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-gray-900">{t.name}</h3>
                <p className="mt-2 text-sm text-gray-600"><span className="font-medium text-gray-800">Best for:</span> {t.best}</p>
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Advantages</p>
                  <ul className="mt-2 space-y-1.5">
                    {t.advantages.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#f78e00]" />{a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Considerations</p>
                  <ul className="mt-2 space-y-1.5">
                    {t.considerations.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-300" />{c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* availability note */}
        <p className="mx-auto mt-6 max-w-3xl rounded-lg border border-[#f78e00]/20 bg-[#fff8f0] p-4 text-center text-sm text-gray-700">
          The3DIndia currently specializes in <span className="font-semibold">FDM</span> printing. SLA/Resin and SLS are
          included here as a general technology comparison and may be available through confirmed partners on request.
        </p>

        {/* comparison table */}
        <div className="mt-8 overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">Comparison of FDM, SLA/Resin and SLS 3D printing technologies</caption>
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Technology</th>
                <th scope="col" className="px-4 py-3 font-semibold">Typical Strength</th>
                <th scope="col" className="px-4 py-3 font-semibold">Surface Detail</th>
                <th scope="col" className="px-4 py-3 font-semibold">Common Applications</th>
                <th scope="col" className="px-4 py-3 font-semibold">Relative Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tableRows.map((r) => (
                <tr key={r.tech} className="bg-white">
                  <th scope="row" className="px-4 py-3 font-semibold text-[#e07e00]">{r.tech}</th>
                  <td className="px-4 py-3 text-gray-700">{r.strength}</td>
                  <td className="px-4 py-3 text-gray-700">{r.detail}</td>
                  <td className="px-4 py-3 text-gray-700">{r.apps}</td>
                  <td className="px-4 py-3 text-gray-700">{r.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-center text-xs text-gray-500">
          Qualitative guidance only — results depend on the machine, material, geometry and print settings.
        </p>

        <div className="mt-8 text-center">
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-[#f78e00] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#e07e00]">
            Need Help Choosing? Contact Us
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*  3. DESIGN GUIDELINES — 6 cards                                             */
/* ========================================================================== */

const guidelines = [
  { icon: SquareStack, title: 'Wall Thickness', desc: 'Design walls thick enough for the selected technology, material and intended use. Very thin walls may be fragile or difficult to print reliably.', tip: 'Thicker walls print more reliably than very thin ones.' },
  { icon: Layers, title: 'Overhangs and Supports', desc: 'Unsupported overhangs may need support structures. Part orientation can reduce supports, material use and finishing work.', tip: 'Reorient the part to minimize supports.' },
  { icon: Ruler, title: 'Tolerances and Fit', desc: 'Moving parts and assemblies need suitable clearance. Allowances depend on the printer, material, geometry and required fit.', tip: 'Add clearance for parts that must fit together.' },
  { icon: Maximize, title: 'Holes and Openings', desc: 'Small holes may print differently from their CAD dimensions. Test critical holes and adjust the design when accurate fits are important.', tip: 'Test-print critical holes before committing.' },
  { icon: Scaling, title: 'Orientation and Strength', desc: 'Part orientation can affect surface finish, support requirements and strength. FDM parts may have different strength across and along their layer directions.', tip: 'Orient so loads run along, not across, layers.' },
  { icon: Boxes, title: 'Infill and Material', desc: 'Infill, shell thickness and material selection influence weight, strength, print time and cost. Choose settings according to the part\u2019s purpose.', tip: 'Higher infill adds strength, time and cost.' },
];

export function DesignGuidelines() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container01 mx-auto px-4">
        <motion.div className="mx-auto max-w-3xl text-center" initial="hidden" whileInView="show" viewport={viewport} variants={fadeUp}>
          <h2 className="text-4xl font-semibold tracking-tight text-gray-900">Design Guidelines for Better 3D Prints</h2>
          <p className="mt-4 text-xl text-gray-600">A few design decisions can improve printability, fit, strength and overall results.</p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guidelines.map((g, i) => (
            <motion.div key={g.title} className="flex flex-col rounded-xl border border-gray-200 bg-white p-6" initial="hidden" whileInView="show" viewport={viewport} custom={i % 3} variants={fadeUp}>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#f78e00]/10">
                <g.icon className="h-6 w-6 text-[#f78e00]" />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{g.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">{g.desc}</p>
              <p className="mt-4 rounded-lg bg-[#fff8f0] px-3 py-2 text-xs text-[#e07e00]">
                <span className="font-semibold">Tip:</span> {g.tip}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="font-medium text-gray-700">Need Help Preparing Your Model?</p>
          <Link to="/services/cad-modeling" className="inline-flex items-center gap-2 rounded-lg border border-[#f78e00] px-6 py-3 font-semibold text-[#f78e00] transition-colors hover:bg-[#f78e00] hover:text-white">
            Explore CAD Modeling
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*  4. WHAT AFFECTS COST — 6 factors                                           */
/* ========================================================================== */

const costFactors = [
  { icon: Box, title: 'Material', desc: 'Different materials have different costs and properties. Select a material based on the required strength, flexibility, heat resistance, detail and application.' },
  { icon: Maximize, title: 'Part Size and Volume', desc: "Larger parts often require more material and printer time. The model's total volume and geometry influence the final estimate." },
  { icon: Clock, title: 'Print Duration', desc: 'Layer height, geometry, print settings and machine requirements can affect how long a part takes to manufacture.' },
  { icon: Settings2, title: 'Design Complexity', desc: 'Complex shapes, intricate details and difficult orientations may require extra preparation or support structures.' },
  { icon: PaintBucket, title: 'Finishing Requirements', desc: 'Support removal, sanding, painting, curing, assembly or other finishing steps can add time and cost when required.' },
  { icon: Boxes, title: 'Order Quantity', desc: 'Multiple parts may share setup and preparation work, while production planning and consistency requirements can affect larger orders.' },
];

export function CostFactors({ embedded = false }: { embedded?: boolean }) {
  const body = (
    <>
      <div className={embedded ? '' : 'mx-auto max-w-3xl text-center'}>
        <h2 className={embedded ? 'text-3xl text-gray-900 mb-2' : 'text-4xl font-semibold tracking-tight text-gray-900'}>
          What Affects the Cost of 3D Printing?
        </h2>
        <p className={embedded ? 'text-gray-600' : 'mt-4 text-xl text-gray-600'}>
          Every project is different. Understanding these factors helps you plan your design and budget.
        </p>
      </div>

      <div className={embedded ? 'mt-8 grid gap-4 sm:grid-cols-2' : 'mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'}>
        {costFactors.map((f, i) => (
          <motion.div
            key={f.title}
            className={`flex items-start gap-3 rounded-xl border border-gray-200 bg-white ${embedded ? 'p-4' : 'p-6'}`}
            initial="hidden"
            whileInView="show"
            viewport={viewport}
            custom={i % (embedded ? 2 : 3)}
            variants={fadeUp}
          >
            <div className={`flex ${embedded ? 'h-10 w-10' : 'h-12 w-12'} flex-shrink-0 items-center justify-center rounded-lg bg-[#f78e00]/10`}>
              <f.icon className={`${embedded ? 'h-5 w-5' : 'h-6 w-6'} text-[#f78e00]`} />
            </div>
            <div>
              <h3 className={`font-semibold text-gray-900 ${embedded ? 'text-sm' : ''}`}>{f.title}</h3>
              <p className={`${embedded ? 'mt-1 text-xs' : 'mt-1.5 text-sm'} leading-relaxed text-gray-600`}>{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className={`${embedded ? 'mt-6' : 'mx-auto mt-8 max-w-3xl'} rounded-xl border border-[#f78e00]/20 bg-[#fff8f0] p-4 text-center text-sm text-gray-700`}>
        The final quotation depends on the model, material, technology, quantity, finishing and project requirements.
      </div>

      <div className={`mt-6 flex flex-col gap-3 sm:flex-row ${embedded ? '' : 'mt-8 justify-center'}`}>
        <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f78e00] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#e07e00]">
          Get a Quote
          <ArrowRight className="h-5 w-5" />
        </Link>
        <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#f78e00] px-7 py-3.5 font-semibold text-[#f78e00] transition-colors hover:bg-[#f78e00] hover:text-white">
          Contact Our Team
        </Link>
      </div>
    </>
  );

  if (embedded) return <div>{body}</div>;

  return (
    <section className="bg-white py-20">
      <div className="container01 mx-auto px-4">{body}</div>
    </section>
  );
}
