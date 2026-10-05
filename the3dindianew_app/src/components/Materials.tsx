import { Layers, Zap, Shield, Droplet, Waves, Box } from 'lucide-react';

const materials = [
  {
    icon: Layers,
    name: 'PLA',
    description: 'Eco-friendly, easy to print, great for prototypes and decorative items.',
    properties: 'Biodegradable, Low warping',
  },
  {
    icon: Shield,
    name: 'ABS',
    description: 'Strong and durable, ideal for functional parts and mechanical components.',
    properties: 'High strength, Heat resistant',
  },
  {
    icon: Box,
    name: 'PETG',
    description: 'Perfect balance of strength and flexibility with chemical resistance.',
    properties: 'Durable, Chemical resistant',
  },
  {
    icon: Droplet,
    name: 'Resin',
    description: 'Ultra-smooth surface finish, perfect for highly detailed miniatures.',
    properties: 'High detail, Smooth finish',
  },
  {
    icon: Waves,
    name: 'TPU',
    description: 'Flexible and rubber-like material for gaskets and wearables.',
    properties: 'Flexible, Elastic',
  },
  {
    icon: Zap,
    name: 'Nylon',
    description: 'Industrial-grade strength for demanding applications.',
    properties: 'Strong, Wear resistant',
  },
];

export function Materials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container01 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">Materials & Technologies We Use</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Wide range of materials to suit every application and budget
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {materials.map((material, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#fff3e0] rounded-lg flex items-center justify-center flex-shrink-0">
                  <material.icon className="w-6 h-6 text-[#f78e00]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg text-gray-900 mb-2">{material.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{material.description}</p>
                  <div className="inline-block px-3 py-1 bg-[#fff8f0] text-[#e07e00] rounded-full text-xs">
                    {material.properties}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl text-[#f78e00] mb-2">0.05mm</div>
              <div className="text-gray-600">Minimum Layer Height</div>
            </div>
            <div>
              <div className="text-3xl text-[#f78e00] mb-2">±0.1mm</div>
              <div className="text-gray-600">Precision Tolerance</div>
            </div>
            <div>
              <div className="text-3xl text-[#f78e00] mb-2">256×256×256mm</div>
              <div className="text-gray-600">Max Build Volume</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
