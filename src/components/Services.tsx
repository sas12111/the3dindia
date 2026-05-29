import { Printer, Pencil, Lightbulb, Gift, Package } from 'lucide-react';

const services = [
  {
    icon: Printer,
    title: '3D Printing Services',
    description: 'Professional FDM, SLA, and Resin printing with high precision and quality finish.',
    features: ['FDM Printing', 'SLA/Resin', 'Multi-material'],
  },
  {
    icon: Pencil,
    title: '3D Designing / CAD Modeling',
    description: 'Expert CAD modeling and design services to bring your concepts to reality.',
    features: ['CAD Modeling', '3D Scanning', 'Design Optimization'],
  },
  {
    icon: Lightbulb,
    title: 'Prototyping & Product Development',
    description: 'Rapid prototyping for product testing and iterative development.',
    features: ['Rapid Prototyping', 'Testing', 'Iteration Support'],
  },
  {
    icon: Gift,
    title: 'Custom Gifts & Miniatures',
    description: 'Personalized gifts, miniatures, keychains, and unique decorative items.',
    features: ['Personalized Items', 'Miniatures', 'Keychains'],
  },
  {
    icon: Package,
    title: 'Bulk Manufacturing',
    description: 'Large-scale production with consistent quality and competitive pricing.',
    features: ['Volume Production', 'Quality Control', 'Cost Effective'],
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container01 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">What We Offer</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive 3D printing solutions tailored to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-8 bg-white border border-gray-200 rounded-xl hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="w-14 h-14 bg-[#fff3e0] rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#f78e00] transition-colors">
                <service.icon className="w-7 h-7 text-[#f78e00] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-[#f78e00] rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
