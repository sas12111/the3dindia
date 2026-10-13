import { useEffect, useState } from 'react';
import { apiUrl } from '../utils/api';
// Read env from common locations without referencing `process` directly
import { Link } from 'react-router-dom';
import {
  Printer, Pencil, Lightbulb, Gift, Package, Building,
  Wrench, Cpu, Stethoscope, ArrowRight, CheckCircle, Loader2,
  Headphones, ShieldCheck, Boxes, Workflow,
} from 'lucide-react';

// Map icon name strings (stored in DB) → Lucide components
const ICON_MAP: Record<string, React.ElementType> = {
  Printer,
  Pencil,
  Lightbulb,
  Gift,
  Package,
  Building,
  Wrench,
  Cpu,
  Stethoscope,
};

interface Service {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  order: number;
  active: boolean;
}

// Canonical fallback so the redesigned service pages always surface here,
// even if the backend API is unavailable or returns an empty list.
const FALLBACK_SERVICES: Service[] = [
  {
    id: '3d-printing',
    icon: 'Printer',
    title: '3D Printing Services',
    description: 'Custom FDM 3D printing for prototypes, functional parts, models and small-batch products.',
    features: ['FDM / FFF technology', 'PLA, PETG and TPU materials', 'High-detail, consistent results', 'Prototypes & functional parts', 'Small-batch production', 'Multiple colour options'],
    image: '/images/3d-printing/01_hero_3d_printing_services.jpg',
    order: 1,
    active: true,
  },
  {
    id: 'prototyping-product-development',
    icon: 'Lightbulb',
    title: 'Prototyping & Product Development',
    description: 'Turn product ideas into physical prototypes you can see, hold, test and refine.',
    features: ['Concept models', 'Functional prototypes', 'Product enclosures', 'Design iterations', 'Form, fit & function checks', 'Small-batch prototypes'],
    image: '/images/prototyping/01_hero_cad_workbench.jpg',
    order: 2,
    active: true,
  },
  {
    id: 'functional-parts',
    icon: 'Wrench',
    title: 'Functional Parts & Utility Products',
    description: 'Custom 3D printed parts for everyday use, prototypes, replacements and specialized requirements.',
    features: ['Brackets & mounts', 'Enclosures & housings', 'Clips & adapters', 'Organizers & holders', 'Replacement parts (where suitable)', 'Custom utility products'],
    image: '/images/functional-parts/01_hero_functional_parts.jpg',
    order: 3,
    active: true,
  },
  {
    id: 'miniature-architectural-models',
    icon: 'Building',
    title: 'Miniature & Architectural Models',
    description: 'Detailed 3D printed architectural and miniature models for presentation, education and visualization.',
    features: ['Residential & commercial models', 'Interior layouts', 'Landscape & site models', 'Educational models', 'Custom scales & sizes', 'Presentation finish'],
    image: '/images/architectural-models/01_modern_luxury_house.jpg',
    order: 4,
    active: true,
  },
  {
    id: 'medical-anatomical-models',
    icon: 'Stethoscope',
    title: 'Medical & Anatomical Models',
    description: 'Detailed 3D printed anatomical models for education, training, visualization and presentation.',
    features: ['Skeletal & organ models', 'Brain & nervous system', 'Dental models', 'Joint & orthopedic models', 'Custom anatomical models', 'For educational use'],
    image: '/images/medical-models/01_hero_medical_anatomical_models.jpg',
    order: 5,
    active: true,
  },
  {
    id: 'customized-gifts',
    icon: 'Gift',
    title: 'Customized Gifts & Personalized Items',
    description: 'Personalized 3D printed gifts, figurines, name plates, pen stands, keychains and décor.',
    features: ['Personalized statues & figurines', 'Tabletop name plates', 'Custom pen stands', 'Photo-based figurines', 'Personalized keychains', 'Custom décor'],
    image: '/images/customized-gifts/01_hero_customized_gifts.jpg',
    order: 6,
    active: true,
  },
  {
    id: 'cad-modeling',
    icon: 'Pencil',
    title: '3D Designing / CAD Modeling',
    description: 'Professional 3D designing and CAD modeling for product, mechanical, industrial and architectural designs.',
    features: ['Product design', 'Mechanical design', 'Industrial design', 'Architectural modeling', 'Multiple file formats', 'Manufacturing-ready models'],
    image: '/images/cad-modeling/01_cad_workspace_hero.jpg',
    order: 7,
    active: true,
  },
  {
    id: 'bulk-manufacturing',
    icon: 'Package',
    title: 'Bulk Manufacturing',
    description: 'Small-batch to large-volume 3D printing with consistent quality, competitive pricing and reliable delivery.',
    features: ['Volume production', 'Consistent quality', 'Competitive pricing', 'Quality control', 'Post-processing & assembly', 'On-time delivery'],
    image: '/images/bulk-manufacturing/01_hero_printer_farm.jpg',
    order: 8,
    active: true,
  },
];

export function Services() {
  const API_BASE = apiUrl('');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    fetch(apiUrl('/api/services'))
      .then(r => r.json())
      .then(data => {
        if (data.success && Array.isArray(data.services) && data.services.length > 0) {
          setServices(data.services);
        } else {
          // API reachable but no data — fall back to the canonical list.
          setServices(FALLBACK_SERVICES);
        }
      })
      .catch(() => {
        // API unreachable — still show the redesigned services.
        setServices(FALLBACK_SERVICES);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-[#fff8f0] to-[#fff1e0]">
        {/* soft decorative shapes */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#f78e00]/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-28 right-10 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl" aria-hidden="true" />
        <div
          className="pointer-events-none absolute right-6 top-10 hidden h-24 w-24 opacity-40 lg:block"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(#f9a030 1.5px, transparent 1.5px)',
            backgroundSize: '12px 12px',
          }}
        />

        <div className="container01 relative mx-auto px-4 py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Left: copy */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-px w-8 bg-[#f78e00]" />
                <span className="text-xs font-semibold tracking-[0.22em] text-[#e07e00]">OUR SERVICES</span>
              </div>
              <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Our <span className="text-[#f78e00]">Services</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-gray-600">
                Comprehensive 3D printing solutions tailored to your specific needs. From design to delivery, we've got
                you covered.
              </p>

              {/* benefit highlights */}
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:flex-wrap sm:gap-x-8">
                {[
                  { icon: Headphones, label: 'Expert Support' },
                  { icon: ShieldCheck, label: 'Quality Assurance' },
                  { icon: Boxes, label: 'Wide Material Options' },
                  { icon: Workflow, label: 'End-to-End Solutions' },
                ].map((b) => (
                  <li key={b.label} className="flex items-center gap-3">
                    <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#fff3e0]">
                      <b.icon className="h-5 w-5 text-[#f78e00]" />
                    </span>
                    <span className="text-sm font-medium leading-tight text-gray-800">{b.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: product image */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
                <div className="h-64 w-64 rounded-full bg-gradient-to-tr from-[#f78e00]/15 to-orange-300/20 blur-2xl lg:h-80 lg:w-80" />
              </div>
              <img
                src="/images/services/hero-products.jpg"
                alt="A composition of 3D printed products — black mechanical bracket, gear, white lattice vase, orange lattice cube and a precision enclosure"
                className="mx-auto w-full max-w-xl rounded-2xl object-cover shadow-xl"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-white">
        <div className="container01 mx-auto px-4">

          {loading && (
            <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Loading services…</span>
            </div>
          )}

          {error && (
            <div className="text-center py-24 text-red-500">{error}</div>
          )}

          {!loading && !error && (
            <div className="space-y-20">
              {services.map((service, index) => {
                const IconComponent = ICON_MAP[service.icon] || Package;
                const defaultImage = '/images/3d-printer.jpg';
                  const imageUrl = service.image
                  ? (service.image.startsWith('http') || service.image.startsWith('/images/')
                    ? service.image
                    : `${API_BASE}${service.image.startsWith('/') ? service.image : '/' + service.image}`)
                  : defaultImage;
                return (
                  <div
                    key={service.id}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${
                      index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                      <div className="w-16 h-16 bg-[#fff3e0] rounded-lg flex items-center justify-center mb-6">
                        <IconComponent className="w-8 h-8 text-[#f78e00]" />
                      </div>
                      <h2 className="text-3xl text-gray-900 mb-4">{service.title}</h2>
                      <p className="text-lg text-gray-600 mb-6">{service.description}</p>

                      <div className="grid sm:grid-cols-2 gap-3 mb-8">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-[#f78e00] flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Link
                        to={`/services/${service.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#f78e00] text-white rounded-lg hover:bg-[#e07e00] transition-colors group"
                      >
                        Learn More
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#f78e00]/20 to-orange-500/20 rounded-2xl transform rotate-3" />
                        <img
                          src={imageUrl}
                          alt={service.title}
                          className="relative rounded-2xl shadow-xl w-full h-[400px] object-cover"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = defaultImage; }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && !error && services.length === 0 && (
            <div className="text-center py-24 text-gray-400">
              No services available yet.
            </div>
          )}
        </div>
      </section>

      {/* Consultation CTA Section */}
      <section className="bg-white py-14 lg:py-20">
        <div className="container01 mx-auto px-4">
          <div className="relative isolate overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-br from-[#f9fafb] to-[#fff6ec] px-6 py-10 shadow-sm sm:px-10 lg:py-12">
            {/* subtle decorative dot patterns */}
            <div
              className="pointer-events-none absolute left-6 top-1/2 hidden h-20 w-24 -translate-y-1/2 opacity-30 lg:block"
              aria-hidden="true"
              style={{ backgroundImage: 'radial-gradient(#93c5fd 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }}
            />
            <div
              className="pointer-events-none absolute right-6 top-1/2 hidden h-20 w-24 -translate-y-1/2 opacity-40 lg:block"
              aria-hidden="true"
              style={{ backgroundImage: 'radial-gradient(#f9a030 1.5px, transparent 1.5px)', backgroundSize: '12px 12px' }}
            />

            <div className="relative flex flex-col items-center gap-6 text-center lg:flex-row lg:gap-8 lg:text-left">
              <span className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-[#fff3e0]">
                <Headphones className="h-8 w-8 text-[#f78e00]" />
              </span>

              <div className="flex-1">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                  Not Sure <span className="text-[#f78e00]">Which Service</span> You Need?
                </h2>
                <p className="mt-2 text-gray-600">
                  Our team is here to help you choose the right service for your project. Get in touch for a free
                  consultation.
                </p>
              </div>

              <Link
                to="/contact"
                className="inline-flex flex-shrink-0 items-center justify-center gap-2 rounded-lg bg-[#f78e00] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#e07e00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f78e00]"
              >
                Contact Us
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
