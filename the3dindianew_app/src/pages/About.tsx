import { Target, Eye, Award, Users, Zap, Shield } from 'lucide-react';
import { Materials } from '../components/Materials';

const values = [
  {
    icon: Target,
    title: 'Precision',
    description: 'We deliver exceptional accuracy in every print, ensuring your designs come to life exactly as intended.',
  },
  {
    icon: Zap,
    title: 'Speed',
    description: 'Fast turnaround times without compromising quality, keeping your projects on schedule.',
  },
  {
    icon: Shield,
    title: 'Quality',
    description: 'Industrial-grade equipment and materials ensure superior results every time.',
  },
  {
    icon: Users,
    title: 'Customer Focus',
    description: '24/7 support and personalized service to meet your unique requirements.',
  },
];

const team = [
  {
    name: 'Vaishnavi Asati',
    role: 'Founder & CEO',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    description: '10+ years of experience in CAD design and 8+ years in 3D printing and manufacturing.',
  },
  {
    name: 'Priya Desai',
    role: 'Head of Design',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
    description: 'Expert CAD designer with 8+ years experience',
  },
  {
    name: 'Amit Kumar',
    role: 'Production Manager',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
    description: 'Specializes in quality control and optimization',
  },
  {
    name: 'Sneha Patel',
    role: 'Customer Success',
    image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha',
    description: 'Dedicated to exceptional customer service',
  },
];

export function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-orange-500 py-20">
        <div className="container01 mx-auto px-4 text-center">
          <h1 className="text-5xl text-white mb-6">About The3DIndia</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Leading the way in 3D printing innovation, delivering quality and precision since 2018.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container01 mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-4">
                Founded in 2018, The3DIndia started with a simple mission: to make high-quality 3D printing accessible to everyone in India. What began as a small workshop has grown into one of the country's most trusted 3D printing service providers.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                We've helped hundreds of businesses, students, hobbyists, and entrepreneurs bring their ideas to life. From simple prototypes to complex manufacturing projects, our team is dedicated to delivering exceptional results.
              </p>
              <p className="text-lg text-gray-600">
                Today, we operate state-of-the-art facilities equipped with the latest 3D printing technologies, serving clients across India and beyond.
              </p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-orange-500/20 rounded-2xl transform rotate-3"></div>
              <img
                src="/images/3d-printer.jpg"
                alt="Our workshop"
                className="relative rounded-2xl shadow-xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container01 mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To democratize 3D printing technology by providing accessible, affordable, and high-quality printing services that empower innovation and creativity across all industries.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To become India's most trusted 3D printing partner, known for innovation, quality, and customer satisfaction, while contributing to the growth of the maker movement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container01 mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-gray-50">
        <div className="container01 mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The talented people behind The3DIndia
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover bg-blue-100"
                />
                <div className="p-6">
                  <h3 className="text-xl text-gray-900 mb-1">{member.name}</h3>
                  <div className="text-blue-600 mb-3">{member.role}</div>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials & Technologies */}
      <Materials />

      {/* Achievements */}
      <section className="py-20 bg-white">
        <div className="container01 mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-gray-900 mb-4">Our Achievements</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Milestones that make us proud
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 bg-blue-50 rounded-xl">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl text-gray-900 mb-2">Industry Recognition</h3>
              <p className="text-gray-600">Awarded Best 3D Printing Service 2023</p>
            </div>
            <div className="text-center p-8 bg-blue-50 rounded-xl">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl text-gray-900 mb-2">Customer Excellence</h3>
              <p className="text-gray-600">98% customer satisfaction rating</p>
            </div>
            <div className="text-center p-8 bg-blue-50 rounded-xl">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl text-gray-900 mb-2">Innovation Leader</h3>
              <p className="text-gray-600">Featured in Tech Magazine India</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
