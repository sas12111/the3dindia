import { Clock, Target, DollarSign, PenTool, Cpu, Headphones } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: 'Fast Delivery',
    description: 'Quick turnaround times without compromising on quality.',
  },
  {
    icon: Target,
    title: 'High Precision',
    description: 'Industrial-grade printers for exceptional accuracy.',
  },
  {
    icon: DollarSign,
    title: 'Affordable Pricing',
    description: 'Competitive rates with transparent pricing structure.',
  },
  {
    icon: PenTool,
    title: 'Free Design Corrections',
    description: 'We help optimize your designs at no extra cost.',
  },
  {
    icon: Cpu,
    title: 'Industrial-Grade Printers',
    description: 'State-of-the-art equipment for superior results.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock assistance for all your queries.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="container01 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">Why Customers Love Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're committed to delivering excellence in every print
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
