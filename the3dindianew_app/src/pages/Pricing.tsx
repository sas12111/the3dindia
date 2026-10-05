import { Link } from 'react-router-dom';
import { Calculator, CheckCircle, ArrowRight } from 'lucide-react';
import { FAQ } from '../components/FAQ';

const pricingTiers = [
  {
    name: 'Hobbyist',
    description: 'Perfect for personal projects and learning',
    price: '₹50',
    unit: 'per part',
    features: [
      'PLA & PETG materials',
      'Standard resolution',
      '3-5 day delivery',
      'Email support',
      'Basic design help',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Professional',
    description: 'Best for small businesses and prototyping',
    price: '₹500',
    unit: 'per part',
    features: [
      'All materials available',
      'High resolution printing',
      '24-48 hour delivery',
      'Priority support',
      'Free design optimization',
      'Multiple revisions',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Enterprise',
    description: 'For large-scale production needs',
    price: 'Custom',
    unit: 'quote',
    features: [
      'Volume discounts up to 30%',
      'Dedicated account manager',
      'Custom materials',
      'Same-day delivery options',
      '24/7 phone support',
      'Bulk ordering portal',
      'Quality assurance reports',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const materialPricing = [
  { material: 'PLA', price: '₹8-12 per gram', description: 'Most economical option' },
  { material: 'PETG', price: '₹10-15 per gram', description: 'Strong and versatile' },
  { material: 'ABS', price: '₹12-18 per gram', description: 'Heat resistant' },
  { material: 'TPU', price: '₹20-30 per gram', description: 'Flexible material' },
  { material: 'Nylon', price: '₹25-35 per gram', description: 'Industrial strength' },
  { material: 'Resin', price: '₹30-50 per gram', description: 'High detail' },
];

export function Pricing() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#f78e00] to-orange-500 py-20">
        <div className="container01 mx-auto px-4 text-center">
          <h1 className="text-5xl text-white mb-6">Transparent Pricing</h1>
          <p className="text-xl text-[#fff3e0] max-w-3xl mx-auto">
            Simple, fair pricing with no hidden fees. Pay only for what you use.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 bg-white">
        <div className="container01 mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 ${
                  tier.popular
                    ? 'bg-gradient-to-br from-[#f78e00] to-orange-500 text-white shadow-2xl scale-105'
                    : 'bg-white border-2 border-gray-200'
                }`}
              >
                {tier.popular && (
                  <div className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-2xl mb-2 ${tier.popular ? 'text-white' : 'text-gray-900'}`}>
                  {tier.name}
                </h3>
                <p className={`mb-6 ${tier.popular ? 'text-[#fff3e0]' : 'text-gray-600'}`}>
                  {tier.description}
                </p>
                <div className="mb-6">
                  <span className={`text-4xl ${tier.popular ? 'text-white' : 'text-gray-900'}`}>
                    {tier.price}
                  </span>
                  <span className={`ml-2 ${tier.popular ? 'text-[#fff3e0]' : 'text-gray-600'}`}>
                    {tier.unit}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle
                        className={`w-5 h-5 flex-shrink-0 ${
                          tier.popular ? 'text-white' : 'text-[#f78e00]'
                        }`}
                      />
                      <span className={tier.popular ? 'text-[#fff3e0]' : 'text-gray-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`block w-full py-3 rounded-lg text-center transition-colors ${
                    tier.popular
                      ? 'bg-white text-[#f78e00] hover:bg-gray-100'
                      : 'bg-[#f78e00] text-white hover:bg-[#e07e00]'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Material Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="container01 mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-900 mb-4">Material Pricing</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transparent pricing based on material weight and type
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {materialPricing.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl text-gray-900 mb-2">{item.material}</h3>
                <div className="text-2xl text-[#f78e00] mb-2">{item.price}</div>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">
              Final price depends on volume, complexity, and material choice
            </p>
          </div>
        </div>
      </section>

      {/* Cost Calculator CTA */}
      <section className="py-20 bg-white">
        <div className="container01 mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#f78e00] to-orange-500 rounded-2xl p-12 text-center">
            <Calculator className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl text-white mb-4">Get Instant Quote</h2>
            <p className="text-xl text-[#fff3e0] mb-8">
              Upload your 3D file and get an accurate price estimate in seconds
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#f78e00] rounded-lg hover:bg-gray-100 transition-colors"
            >
              Calculate Your Cost
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-20 bg-gray-50">
        <div className="container01 mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-900 mb-4">What's Included</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every order comes with these benefits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 bg-white rounded-xl">
              <div className="text-4xl text-[#f78e00] mb-4">₹0</div>
              <h3 className="text-xl text-gray-900 mb-2">Design Review</h3>
              <p className="text-gray-600">Free design optimization and recommendations</p>
            </div>
            <div className="text-center p-8 bg-white rounded-xl">
              <div className="text-4xl text-[#f78e00] mb-4">30%</div>
              <h3 className="text-xl text-gray-900 mb-2">Bulk Discounts</h3>
              <p className="text-gray-600">Save up to 30% on large orders</p>
            </div>
            <div className="text-center p-8 bg-white rounded-xl">
              <div className="text-4xl text-[#f78e00] mb-4">24/7</div>
              <h3 className="text-xl text-gray-900 mb-2">Support</h3>
              <p className="text-gray-600">Round-the-clock customer assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
}
