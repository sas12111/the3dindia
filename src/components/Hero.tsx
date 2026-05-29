import { ArrowRight, Upload } from 'lucide-react';
import logoImage from 'figma:asset/b44ded5f4a40390ef42c1e843eb643a4df65afa1.png';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-cyan-50 to-[#fff3e0] overflow-hidden">
      {/* Navigation */}
      <nav className="container01 mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="The3DIndia Logo" className="h-12" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-gray-700 hover:text-[#f78e00] transition-colors">Services</a>
            <a href="#portfolio" className="text-gray-700 hover:text-[#f78e00] transition-colors">Portfolio</a>
            <a href="#pricing" className="text-gray-700 hover:text-[#f78e00] transition-colors">Pricing</a>
            <a href="#contact" className="text-gray-700 hover:text-[#f78e00] transition-colors">Contact</a>
          </div>
          <button className="px-6 py-2 bg-[#f78e00] text-white rounded-lg hover:bg-[#e07e00] transition-colors">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container01 mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl text-gray-900 leading-tight">
              Bring Your Ideas to Life with <span className="text-[#f78e00]">Precision 3D Printing</span>
            </h1>
            <p className="text-xl text-gray-600">
              High-quality, affordable, and fast 3D printing services for prototypes, gifts, industrial parts, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-[#f78e00] text-white rounded-lg hover:bg-[#e07e00] transition-colors flex items-center justify-center gap-2 group">
                Get a Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white text-[#f78e00] border-2 border-[#f78e00] rounded-lg hover:bg-[#fff8f0] transition-colors flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Your Design
              </button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl text-gray-900">500+</div>
                <div className="text-gray-600">Projects Completed</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div>
                <div className="text-3xl text-gray-900">98%</div>
                <div className="text-gray-600">Client Satisfaction</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div>
                <div className="text-3xl text-gray-900">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#f78e00]/20 to-orange-500/20 rounded-2xl transform rotate-3"></div>
            <img
              src="/images/3d-printer.jpg"
              alt="3D Printer in action"
              className="relative rounded-2xl shadow-2xl w-full object-cover h-[500px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
