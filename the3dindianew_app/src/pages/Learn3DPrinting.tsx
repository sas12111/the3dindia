import { BookOpen, Layers, Zap, Package, CheckCircle, Lightbulb } from 'lucide-react';

export function Learn3DPrinting() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-50 to-blue-100 py-20">
        <div className="container01 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 rounded-full mb-6">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span className="text-blue-600">Educational Guide</span>
            </div>
            <h1 className="text-5xl lg:text-6xl text-gray-900 mb-6">
              Everything You Need to Know About{' '}
              <span className="text-blue-600">3D Printing</span>
            </h1>
            <p className="text-xl text-gray-600">
              Discover the revolutionary technology that's transforming manufacturing, prototyping, and creative design
            </p>
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
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg text-gray-900 mb-1">Layer-by-Layer Construction</h3>
                    <p className="text-gray-600">
                      Objects are built incrementally, one thin layer at a time, allowing for intricate internal structures
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg text-gray-900 mb-1">Digital to Physical</h3>
                    <p className="text-gray-600">
                      Transform 3D CAD models into tangible objects with precise accuracy and repeatability
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
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
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-orange-500/20 rounded-2xl transform -rotate-3"></div>
              <img
                src="/images/3d-printing-tech.jpg"
                alt="3D Printing Technology"
                className="relative rounded-2xl shadow-xl w-full object-cover h-[400px]"
              />
            </div>
          </div>
        </div>
      </section>

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
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Layers className="w-8 h-8 text-blue-600" />
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
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Functional prototypes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span>Large parts with moderate detail</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
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
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-xl text-gray-900 mb-3">PLA (Polylactic Acid)</h3>
              <p className="text-gray-600 mb-3">
                Biodegradable, easy to print, perfect for beginners and decorative items.
              </p>
              <div className="text-sm text-blue-600">• Eco-friendly • Low warping • Great detail</div>
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

            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border border-indigo-100">
              <h3 className="text-xl text-gray-900 mb-3">Resin</h3>
              <p className="text-gray-600 mb-3">
                Liquid photopolymer for high-detail SLA/DLP prints with smooth finish.
              </p>
              <div className="text-sm text-indigo-600">• Smooth finish • High detail • Various types</div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 bg-gray-50">
        <div className="container01 mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl text-gray-900 mb-4">Applications & Industries</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              3D printing is revolutionizing multiple industries
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Prototyping</h3>
              <p className="text-gray-600">
                Rapidly test and iterate product designs before mass production
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Manufacturing</h3>
              <p className="text-gray-600">
                Custom parts, tooling, jigs, and fixtures for production lines
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Healthcare</h3>
              <p className="text-gray-600">
                Prosthetics, dental models, surgical guides, and medical devices
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Layers className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Education</h3>
              <p className="text-gray-600">
                Teaching aids, architectural models, and hands-on learning tools
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Art & Design</h3>
              <p className="text-gray-600">
                Sculptures, jewelry, custom gifts, and creative installations
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Automotive</h3>
              <p className="text-gray-600">
                Custom parts, performance upgrades, and restoration components
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Aerospace</h3>
              <p className="text-gray-600">
                Lightweight components, complex geometries, and rapid tooling
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Consumer Goods</h3>
              <p className="text-gray-600">
                Custom products, personalized items, and replacement parts
              </p>
            </div>
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
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900 mb-2">Rapid Prototyping</h3>
                  <p className="text-gray-600">
                    Go from design to physical prototype in hours, not weeks or months
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900 mb-2">Cost-Effective</h3>
                  <p className="text-gray-600">
                    No need for expensive molds or tooling. Perfect for small batches and one-offs
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900 mb-2">Design Freedom</h3>
                  <p className="text-gray-600">
                    Create complex geometries impossible with traditional manufacturing
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900 mb-2">Customization</h3>
                  <p className="text-gray-600">
                    Easily personalize each product without additional costs or setup
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900 mb-2">Less Waste</h3>
                  <p className="text-gray-600">
                    Additive process uses only necessary material, reducing environmental impact
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
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
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="container01 mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl mb-12 text-center">The 3D Printing Process</h2>
            
            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">1</span>
                </div>
                <div>
                  <h3 className="text-2xl mb-2">Design Creation</h3>
                  <p className="text-blue-100">
                    Create or obtain a 3D model using CAD software, 3D scanning, or download from online repositories
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">2</span>
                </div>
                <div>
                  <h3 className="text-2xl mb-2">File Preparation (Slicing)</h3>
                  <p className="text-blue-100">
                    Convert the 3D model into layers using slicing software, which generates instructions (G-code) for the printer
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">3</span>
                </div>
                <div>
                  <h3 className="text-2xl mb-2">Printing</h3>
                  <p className="text-blue-100">
                    The 3D printer reads the instructions and builds the object layer by layer, which can take hours to days depending on size and complexity
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">4</span>
                </div>
                <div>
                  <h3 className="text-2xl mb-2">Post-Processing</h3>
                  <p className="text-blue-100">
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
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-cyan-50 to-blue-100 rounded-2xl p-12">
            <h2 className="text-4xl text-gray-900 mb-6">Ready to Start Your 3D Printing Project?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Let The3DIndia bring your ideas to life with our professional 3D printing services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started Today
              </a>
              <a
                href="/services"
                className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
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
