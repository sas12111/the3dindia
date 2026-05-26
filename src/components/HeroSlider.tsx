import { Link } from 'react-router-dom';
import { ArrowRight, Upload, ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from 'react-slick';

const slides = [
  {
    id: 1,
    title: 'Bring Your Ideas to Life with',
    highlight: 'Precision 3D Printing',
    description: 'High-quality, affordable, and fast 3D printing services for prototypes, gifts, industrial parts, and more.',
    image: '/images/3d-printer.jpg',
    stats: [
      { value: '500+', label: 'Projects Completed' },
      { value: '98%', label: 'Client Satisfaction' },
      { value: '24/7', label: 'Support' },
    ],
  },
  {
    id: 2,
    title: 'Professional CAD Modeling &',
    highlight: '3D Design Services',
    description: 'Expert designers ready to transform your concepts into detailed 3D models ready for printing.',
    image: '/images/cad-modeling.jpg',
    stats: [
      { value: '6+', label: 'Materials Available' },
      { value: '24hrs', label: 'Fast Delivery' },
      { value: 'Free', label: 'Design Corrections' },
    ],
  },
  {
    id: 3,
    title: 'Rapid Prototyping for',
    highlight: 'Product Development',
    description: 'Accelerate your product development cycle with our rapid prototyping and testing services.',
    image: '/images/prototyping.jpg',
    stats: [
      { value: 'Same Day', label: 'Options Available' },
      { value: '0.1mm', label: 'Precision' },
      { value: 'Industrial', label: 'Grade Quality' },
    ],
  },
  {
    id: 4,
    title: 'Bulk Manufacturing with',
    highlight: 'Volume Discounts',
    description: 'Scale your production with competitive pricing and consistent quality for large orders.',
    image: '/images/bulk-manufacturing.jpg',
    stats: [
      { value: '30%', label: 'Bulk Discounts' },
      { value: '200+', label: 'Happy Clients' },
      { value: 'Custom', label: 'Solutions' },
    ],
  },
];

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
    >
      <ChevronRight className="w-6 h-6 text-blue-600" />
    </button>
  );
}

function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
    >
      <ChevronLeft className="w-6 h-6 text-blue-600" />
    </button>
  );
}

export function HeroSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: 'slick-dots !bottom-8',
    customPaging: () => (
      <div className="w-3 h-3 bg-white/50 rounded-full hover:bg-white transition-all"></div>
    ),
  };

  return (
    <div className="relative hero-slider">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div className="relative bg-gradient-to-br from-cyan-50 to-blue-100 overflow-hidden">
              <div className="container01 mx-auto px-4 py-20 lg:py-32">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                    <h1 className="text-5xl lg:text-6xl text-gray-900 leading-tight">
                      {slide.title} <span className="text-blue-600">{slide.highlight}</span>
                    </h1>
                    <p className="text-xl text-gray-600">{slide.description}</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link
                        to="/contact"
                        className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 group"
                      >
                        Get a Quote
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link
                        to="/contact"
                        className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Upload className="w-5 h-5" />
                        Upload Your Design
                      </Link>
                    </div>
                    <div className="flex items-center gap-8 pt-4">
                      {slide.stats.map((stat, index) => (
                        <div key={index} className="flex items-center gap-4">
                          {index > 0 && <div className="w-px h-12 bg-gray-300"></div>}
                          <div>
                            <div className="text-3xl text-gray-900">{stat.value}</div>
                            <div className="text-gray-600">{stat.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-orange-500/20 rounded-2xl transform rotate-3"></div>
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="relative rounded-2xl shadow-2xl w-full object-cover h-[500px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      <style>{`
        .hero-slider .slick-dots li button:before {
          display: none;
        }
        .hero-slider .slick-dots li {
          margin: 0 4px;
        }
        .hero-slider .slick-dots li.slick-active div {
          background-color: white;
          transform: scale(1.3);
        }
      `}</style>
    </div>
  );
}
