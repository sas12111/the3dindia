import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'Engineering Prototypes',
    category: 'Industrial',
    image: '/images/prototyping.jpg',
  },
  {
    title: 'Custom Miniatures',
    category: 'Gifts',
    image: '/images/custom-gifts.jpg',
  },
  {
    title: 'Product Development',
    category: 'Design',
    image: '/images/cad-modeling.jpg',
  },
  {
    title: '3D Printed Models',
    category: 'Prototyping',
    image: '/images/3d-printed-models.jpg',
  },
  {
    title: 'Industrial Components',
    category: 'Manufacturing',
    image: '/images/bulk-manufacturing.jpg',
  },
  {
    title: 'Custom Keychains',
    category: 'Gifts',
    image: '/images/3d-printer.jpg',
  },
];

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container01 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">Our Recent Work</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our diverse portfolio of successful projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <div className="text-sm text-indigo-300 mb-1">{project.category}</div>
                <div className="text-xl text-white">{project.title}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="px-8 py-4 bg-[#f78e00] text-white rounded-lg hover:bg-[#e07e00] transition-colors inline-flex items-center gap-2 group">
            View Full Portfolio
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
