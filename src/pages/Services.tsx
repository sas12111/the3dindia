import { useEffect, useState } from 'react';
// Read env from common locations without referencing `process` directly
import { Link } from 'react-router-dom';
import {
  Printer, Pencil, Lightbulb, Gift, Package, Building,
  Wrench, Cpu, ArrowRight, CheckCircle, Loader2,
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

export function Services() {
  const API_BASE =
    (globalThis as any)?.process?.env?.REACT_APP_API_URL ||
    (typeof import.meta !== 'undefined' ? (import.meta as any).env?.VITE_API_URL : undefined) ||
    'http://localhost:5000';
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/api/services`)
      .then(r => r.json())
      .then(data => {
        if (data.success) setServices(data.services);
        else setError('Failed to load services.');
      })
      .catch(() => setError('Could not connect to server.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-orange-500 py-20">
        <div className="container01 mx-auto px-4 text-center">
          <h1 className="text-5xl text-white mb-6">Our Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive 3D printing solutions tailored to your specific needs. From design to delivery, we've got you covered.
          </p>
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
                  ? (service.image.startsWith('http')
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
                      <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                      </div>
                      <h2 className="text-3xl text-gray-900 mb-4">{service.title}</h2>
                      <p className="text-lg text-gray-600 mb-6">{service.description}</p>

                      <div className="grid sm:grid-cols-2 gap-3 mb-8">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Link
                        to={`/services/${service.id}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors group"
                      >
                        Learn More
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-orange-500/20 rounded-2xl transform rotate-3" />
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

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container01 mx-auto px-4 text-center">
          <h2 className="text-4xl text-gray-900 mb-6">Not Sure Which Service You Need?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our team is here to help you choose the right service for your project. Get in touch for a free consultation.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Contact Us
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
