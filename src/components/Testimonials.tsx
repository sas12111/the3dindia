import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Product Designer',
    rating: 5,
    text: 'The3DIndia delivered exceptional quality prototypes for our product line. Their attention to detail and quick turnaround time exceeded our expectations.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh',
  },
  {
    name: 'Priya Sharma',
    role: 'Startup Founder',
    rating: 5,
    text: 'Outstanding service! They helped us iterate through multiple design versions quickly. The design correction support was invaluable for our startup.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
  },
  {
    name: 'Amit Patel',
    role: 'Mechanical Engineer',
    rating: 5,
    text: 'Professional team with industrial-grade equipment. Perfect for functional parts and engineering components. Highly recommended!',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
  },
  {
    name: 'Neha Gupta',
    role: 'Gift Shop Owner',
    rating: 5,
    text: 'Best place for custom gifts and miniatures. My customers love the personalized keychains and figurines. Great quality at reasonable prices.',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Neha',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container01 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who trust us
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-24 h-24 rounded-full"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex gap-1 mb-4 justify-center md:justify-start">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg text-gray-700 mb-6 italic">
                  "{testimonials[currentIndex].text}"
                </p>
                <div>
                  <div className="text-gray-900 mb-1">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {testimonials[currentIndex].role}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-blue-600" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 bg-blue-100 hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-blue-600" />
              </button>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
