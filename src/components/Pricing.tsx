import { Calculator, CheckCircle } from 'lucide-react';

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container01 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">Transparent, Affordable Pricing</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pay only for the volume and material you use
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-orange-500 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl mb-4">Get Instant Quote</h3>
                <p className="text-blue-100 mb-6">
                  Our intelligent pricing calculator gives you an accurate estimate in seconds. No hidden fees, no surprises.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Volume-based pricing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Material selection included</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Bulk order discounts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <span>Free design optimization</span>
                  </li>
                </ul>
                <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Calculate Cost
                </button>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h4 className="text-xl mb-4">Sample Pricing</h4>
                <div className="space-y-4">
                  <div className="flex justify-between pb-3 border-b border-white/20">
                    <span className="text-blue-100">Small items (keychains)</span>
                    <span>₹50 - ₹200</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-white/20">
                    <span className="text-blue-100">Medium parts (prototypes)</span>
                    <span>₹500 - ₹2000</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-white/20">
                    <span className="text-blue-100">Large components</span>
                    <span>₹2000 - ₹10000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-100">Bulk orders</span>
                    <span>Custom quote</span>
                  </div>
                </div>
                <p className="text-sm text-blue-200 mt-4">
                  *Prices vary based on material, size, and complexity
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl text-blue-600 mb-2">30%</div>
              <div className="text-gray-600">Bulk Order Discount</div>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl text-blue-600 mb-2">₹0</div>
              <div className="text-gray-600">Design Correction Fee</div>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <div className="text-3xl text-blue-600 mb-2">24h</div>
              <div className="text-gray-600">Express Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
