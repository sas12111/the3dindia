import { Upload, Calculator, Truck } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    number: '01',
    title: 'Upload Your File',
    description: 'Submit your 3D model in STL, OBJ, or STEP format through our easy upload portal.',
  },
  {
    icon: Calculator,
    number: '02',
    title: 'Get Instant Quote',
    description: 'Receive an immediate price estimate based on material, size, and quantity.',
  },
  {
    icon: Truck,
    number: '03',
    title: 'Receive Your Print',
    description: 'We print with precision and deliver your order right to your doorstep.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="container01 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">Simple 3-Step Process</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From design to delivery, we make 3D printing effortless
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting lines */}
          <div className="hidden md:block absolute top-20 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-[#f78e00] via-[#f9a030] to-[#f78e00]"></div>
          
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="w-24 h-24 bg-[#f78e00] rounded-full flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg">
                <step.icon className="w-12 h-12 text-white" />
              </div>
              <div className="absolute top-0 right-0 text-7xl opacity-10 z-0">
                {step.number}
              </div>
              <h3 className="text-2xl text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-[#f78e00] text-white rounded-lg hover:bg-[#e07e00] transition-colors">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
}
