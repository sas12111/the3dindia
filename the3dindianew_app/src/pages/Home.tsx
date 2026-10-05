import { Link } from 'react-router-dom';
import { ArrowRight, Upload } from 'lucide-react';
import { HeroSlider } from '../components/HeroSlider';
import { Services } from '../components/Services';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Testimonials } from '../components/Testimonials';
import { HowItWorks } from '../components/HowItWorks';

export function Home() {
  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Services Overview */}
      <Services />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* How It Works */}
      <HowItWorks />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#f78e00] to-orange-500">
        <div className="container01 mx-auto px-4 text-center">
          <h2 className="text-4xl text-white mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-[#fff3e0] mb-8 max-w-2xl mx-auto">
            Get in touch with us today and let's bring your ideas to life with precision 3D printing
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-[#f78e00] rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg hover:bg-white/10 transition-colors"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
