import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImage from 'figma:asset/b44ded5f4a40390ef42c1e843eb643a4df65afa1.png';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container01 mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="mb-4">
              <img src={logoImage} alt="The3DIndia Logo" className="h-8 brightness-0 invert" />
            </div>
            <p className="text-gray-400 mb-4">
              Leading 3D printing service provider in India, delivering quality and innovation with every print.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-[#f78e00] rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-[#f78e00] rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-[#f78e00] rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-[#f78e00] rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-[#f78e00] rounded-lg flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="hover:text-[#f9a030] transition-colors">3D Printing</Link></li>
              <li><Link to="/services" className="hover:text-[#f9a030] transition-colors">CAD Modeling</Link></li>
              <li><Link to="/services" className="hover:text-[#f9a030] transition-colors">Prototyping</Link></li>
              <li><Link to="/services" className="hover:text-[#f9a030] transition-colors">Custom Gifts</Link></li>
              <li><Link to="/services" className="hover:text-[#f9a030] transition-colors">Bulk Manufacturing</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-[#f9a030] transition-colors">About Us</Link></li>
              <li><Link to="/portfolio" className="hover:text-[#f9a030] transition-colors">Portfolio</Link></li>
              <li><Link to="/pricing" className="hover:text-[#f9a030] transition-colors">Pricing</Link></li>
              <li><Link to="/contact" className="hover:text-[#f9a030] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for latest updates and offers.
            </p>
            <div className="flex flex-wrap gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#f78e00] focus:border-transparent outline-none text-white"
              />
              <button className="px-4 py-2 bg-[#f78e00] hover:bg-[#e07e00] rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2025 The3DIndia. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-[#f9a030] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-[#f9a030] transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-[#f9a030] transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
