import { BookOpen, Layers, Zap, Package, CheckCircle, Lightbulb } from 'lucide-react';
import { HowItWorks, TechComparison, DesignGuidelines, CostFactors } from '../components/LearnSections';

export function Learn3DPrinting() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-[#fff8f0] to-[#fff1e0]">
        <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#f78e00]/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-28 left-10 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" aria-hidden="true" />

        <div className="container01 relative mx-auto px-4 py-16 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* copy */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#f78e00]/10 px-4 py-2">
                <BookOpen className="h-4 w-4 text-[#f78e00]" />
                <span className="text-sm font-semibold tracking-wide text-[#e07e00]">Educational Guide</span>
              </div>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.08] tracking-tight text-gray-900 sm:text-5xl">
                Everything You Need to Know About <span className="text-[#f78e00]">3D Printing</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-gray-600">
                Discover the revolutionary technology that's transforming manufacturing, prototyping and creative design.
              </p>
              <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 sm:flex sm:flex-wrap sm:gap-x-8">
                {[
                  { icon: BookOpen, label: 'Easy to Understand' },
                  { icon: Lightbulb, label: 'Practical Insights' },
                  { icon: Package, label: 'Real-World Applications' },
                  { icon: CheckCircle, label: 'Guidance for Your Projects' },
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

            {/* image */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
                <div className="h-64 w-64 rounded-full bg-gradient-to-tr from-[#f78e00]/15 to-orange-300/20 blur-2xl lg:h-80 lg:w-80" />
              </div>
              <img
                src="/images/learn-3d-printing/hero-products.jpg"
                alt="Colorful 3D printed lattice vases and decorative products"
                className="mx-auto w-full max-w-xl rounded-2xl object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What is 3D Printing */}
      <section className="py-20">
        <div className="container01 mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl text-gray-900 mb-6">What is 3D Printing?</h2>
              <p className="text-lg text-gray-600 mb-6">
                3D printing, also known as additive manufacturing, is a process of creating three-dimensional objects from a digital file. Unlike traditional manufacturing methods that remove material (subtractive), 3D printing builds objects layer by layer, adding material only where needed.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                This revolutionary technology allows for rapid prototyping, complex geometries that would be impossible with traditional methods, and on-demand manufacturing with minimal waste.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#f78e00] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg text-gray-900 mb-1">Layer-by-Layer Construction</h3>
                    <p className="text-gray-600">
                      Objects are built incrementally, one thin layer at a time, allowing for intricate internal structures
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#f78e00] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg text-gray-900 mb-1">Digital to Physical</h3>
                    <p className="text-gray-600">
                      Transform 3D CAD models into tangible objects with precise accuracy and repeatability
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#f78e00] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg text-gray-900 mb-1">Minimal Waste</h3>
                    <p className="text-gray-600">
                      Use only the material needed for the object, making it an environmentally friendly option
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#f78e00]/20 to-orange-500/20 rounded-2xl transform -rotate-3"></div>
              <img
                src="/images/3d-printing-tech.jpg"
                alt="3D Printing Technology"
                className="relative rounded-2xl shadow-xl w-full object-cover h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How 3D Printing Works (added) */}
      <HowItWorks />

      {/* 3D Printing Technologies */}
      <section className="py-20 bg-gray-50">
        <div className="container01 mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-gray-900 mb-4">3D Printing Technologies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Different printing methods for different needs and applications
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* FDM */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-[#fff3e0] rounded-lg flex items-center justify-center mb-6">
                <Layers className="w-8 h-8 text-[#f78e00]" />
              </div>
              <h3 className="text-2xl text-gray-900 mb-4">FDM (Fused Deposition Modeling)</h3>
              <img
                src="/images/fdm-printer.jpg"
                alt="FDM 3D Printer"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-4">
                The most common and cost-effective method. Thermoplastic filament is heated and extruded through a nozzle, building the object layer by layer.
              </p>
              <h4 className="text-gray-900 mb-2">Best For:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#f78e00] flex-shrink-0 mt-0.5" />
                  <span>Functional prototypes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#f78e00] flex-shrink-0 mt-0.5" />
                  <span>Large parts with moderate detail</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[#f78e00] flex-shrink-0 mt-0.5" />
                  <span>Budget-friendly projects</span>
                </li>
              </ul>
            </div>

            {/* SLA */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl text-gray-900 mb-4">SLA (Stereolithography)</h3>
              <img
                src="/images/sla-printing.jpg"
                alt="SLA Resin Printing"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-4">
                Uses a UV laser to cure liquid resin into solid layers, producing exceptionally smooth and detailed prints with high accuracy.
              </p>
              <h4 className="text-gray-900 mb-2">Best For:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>High-detail models and miniatures</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Jewelry and dental applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span>Smooth surface finish requirements</span>
                </li>
              </ul>
            </div>

            {/* Resin */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Package className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl text-gray-900 mb-4">Resin Printing (LCD/DLP)</h3>
              <img
                src="/images/resin-printing.jpg"
                alt="Resin 3D Printing"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-4">
                Similar to SLA but uses an LCD screen or DLP projector to cure entire layers at once, offering faster print speeds with excellent detail.
              </p>
              <h4 className="text-gray-900 mb-2">Best For:</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Tabletop gaming miniatures</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Artistic sculptures</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span>Fast, detailed production</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Comparison (added) */}
      <TechComparison />

      {/* Materials */}
      <section className="py-20">
        <div className="container01 mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-gray-900 mb-4">3D Printing Materials</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the right material for your application
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#fff8f0] to-cyan-50 rounded-xl p-6 border border-[#fff3e0]">
              <h3 className="text-xl text-gray-900 mb-3">PLA (Polylactic Acid)</h3>
              <p className="text-gray-600 mb-3">
                Biodegradable, easy to print, perfect for beginners and decorative items.
              </p>
              <div className="text-sm text-[#f78e00]">• Eco-friendly • Low warping • Great detail</div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
              <h3 className="text-xl text-gray-900 mb-3">ABS (Acrylonitrile Butadiene)</h3>
              <p className="text-gray-600 mb-3">
                Strong, durable, and heat-resistant. Ideal for functional parts.
              </p>
              <div className="text-sm text-orange-600">• High strength • Heat resistant • Durable</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
              <h3 className="text-xl text-gray-900 mb-3">PETG</h3>
              <p className="text-gray-600 mb-3">
                Combines strength of ABS with ease of PLA. Food-safe option.
              </p>
              <div className="text-sm text-purple-600">• Food safe • Strong • Easy to print</div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <h3 className="text-xl text-gray-900 mb-3">TPU (Flexible)</h3>
              <p className="text-gray-600 mb-3">
                Rubber-like material for flexible, bendable parts and prototypes.
              </p>
              <div className="text-sm text-green-600">• Flexible • Impact resistant • Rubber-like</div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl text-gray-900 mb-3">Nylon</h3>
              <p className="text-gray-600 mb-3">
                Extremely strong and flexible. Perfect for mechanical parts.
              </p>
              <div className="text-sm text-gray-700">• Very strong • Wear resistant • Flexible</div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-[#fff8f0] rounded-xl p-6 border border-indigo-100">
              <h3 className="text-xl text-gray-900 mb-3">Resin</h3>
              <p className="text-gray-600 mb-3">
                Liquid photopolymer for high-detail SLA/DLP prints with smooth finish.
              </p>
              <div className="text-sm text-indigo-600">• Smooth finish • High detail • Various types</div>
            </div>
          </div>
        </div>
      </section>

      {/* Design Guidelines (added) */}
      <DesignGuidelines />

      {/* Applications & Cost — two balanced columns (matches reference) */}
      <section className="py-20 bg-gray-50">
        <div className="container01 mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Applications & Industries */}
            <div>
              <h2 className="text-3xl text-gray-900 mb-2">Applications &amp; Industries</h2>
              <p className="text-gray-600 mb-8">3D printing is used across many industries and purposes.</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Lightbulb, title: 'Prototyping', desc: 'Rapidly test and iterate designs before production.', bg: 'bg-[#fff3e0]', fg: 'text-[#f78e00]' },
                  { icon: Package, title: 'Manufacturing', desc: 'Custom parts, tooling, jigs and fixtures.', bg: 'bg-orange-100', fg: 'text-orange-500' },
                  { icon: Zap, title: 'Healthcare', desc: 'Educational and anatomical models.', bg: 'bg-purple-100', fg: 'text-purple-600' },
                  { icon: Layers, title: 'Education', desc: 'Teaching aids and hands-on learning tools.', bg: 'bg-green-100', fg: 'text-green-600' },
                  { icon: BookOpen, title: 'Art & Design', desc: 'Sculptures, custom gifts and installations.', bg: 'bg-red-100', fg: 'text-red-600' },
                  { icon: Package, title: 'Consumer Goods', desc: 'Custom products and replacement parts.', bg: 'bg-indigo-100', fg: 'text-indigo-600' },
                ].map((a) => (
                  <div key={a.title} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className={`w-11 h-11 ${a.bg} rounded-lg flex items-center justify-center mb-3`}>
                      <a.icon className={`w-5 h-5 ${a.fg}`} />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1">{a.title}</h3>
                    <p className="text-sm text-gray-600">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What Affects the Cost */}
            <CostFactors embedded />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container01 mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl text-gray-900 mb-12 text-center">Key Benefits of 3D Printing</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#fff3e0] rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-[#f78e00]" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900 mb-2">Rapid Prototyping</h3>
                  <p className="text-gray-600">
                    Go from design to physical prototype in hours, not weeks or months
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#fff3e0] rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-[#f78e00]" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900 mb-2">Cost-Effective</h3>
                  <p className="text-gray-600">
                    No need for expensive molds or tooling. Perfect for small batches and one-offs
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#fff3e0] rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-[#f78e00]" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900 mb-2">Design Freedom</h3>
                  <p className="text-gray-600">
                    Create complex geometries impossible with traditional manufacturing
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#fff3e0] rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-[#f78e00]" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900 mb-2">Customization</h3>
                  <p className="text-gray-600">
                    Easily personalize each product without additional costs or setup
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#fff3e0] rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-[#f78e00]" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900 mb-2">Less Waste</h3>
                  <p className="text-gray-600">
                    Additive process uses only necessary material, reducing environmental impact
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#fff3e0] rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-[#f78e00]" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900 mb-2">On-Demand Production</h3>
                  <p className="text-gray-600">
                    Print what you need, when you need it. No inventory required
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 3D Printing Process */}
      <section className="py-20 bg-gradient-to-br from-[#f78e00] to-[#e07e00] text-white">
        <div className="container01 mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl mb-12 text-center">The 3D Printing Process</h2>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white text-[#f78e00] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-2xl mb-2">Design Creation</h3>
                  <p className="text-[#fff3e0]">
                    Create or obtain a 3D model using CAD software, 3D scanning, or download from online repositories
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white text-[#f78e00] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-2xl mb-2">File Preparation (Slicing)</h3>
                  <p className="text-[#fff3e0]">
                    Convert the 3D model into layers using slicing software, which generates instructions (G-code) for the printer
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white text-[#f78e00] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-2xl mb-2">Printing</h3>
                  <p className="text-[#fff3e0]">
                    The 3D printer reads the instructions and builds the object layer by layer, which can take hours to days depending on size and complexity
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white text-[#f78e00] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">4</span>
                </div>
                <div>
                  <h3 className="text-2xl mb-2">Post-Processing</h3>
                  <p className="text-[#fff3e0]">
                    Remove support structures, sand, paint, or apply other finishing techniques to achieve desired appearance and functionality
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container01 mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-cyan-50 to-[#fff3e0] rounded-2xl p-12">
            <h2 className="text-4xl text-gray-900 mb-6">Ready to Start Your 3D Printing Project?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Let The3DIndia bring your ideas to life with our professional 3D printing services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-[#f78e00] text-white rounded-lg hover:bg-[#e07e00] transition-colors"
              >
                Get Started Today
              </a>
              <a
                href="/services"
                className="px-8 py-4 bg-white text-[#f78e00] border-2 border-[#f78e00] rounded-lg hover:bg-[#fff8f0] transition-colors"
              >
                Explore Our Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
