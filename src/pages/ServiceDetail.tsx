import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Printer, 
  Pencil, 
  Lightbulb, 
  Gift, 
  Package, 
  Building,
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Star, 
  Users,
  Award,
  Zap,
  Shield,
  Phone,
  Mail
} from 'lucide-react';
const serviceDetails = {
  '3d-printing': {
    icon: Printer,
    title: '3D Printing Services',
    subtitle: 'Professional FDM, SLA, and Resin printing with high precision and quality finish',
    description: 'Transform your digital designs into physical reality with our state-of-the-art 3D printing services. We offer multiple printing technologies to meet diverse requirements, from rapid prototyping to end-use parts.',
    image: '/images/3d-printer.jpg',
    technologies: [
      {
        name: 'FDM Printing',
        description: 'Fused Deposition Modeling for durable, functional parts',
        materials: ['PLA', 'ABS', 'PETG', 'TPU', 'Wood-filled', 'Metal-filled']
      },
      {
        name: 'SLA Printing',
        description: 'Stereolithography for high-detail, smooth surface finish',
        materials: ['Standard Resin', 'Tough Resin', 'Flexible Resin', 'Castable Resin']
      },
      {
        name: 'Resin Printing',
        description: 'LCD/DLP printing for miniatures and detailed models',
        materials: ['Standard Resin', 'Water-washable Resin', 'Bio-compatible Resin']
      }
    ],
    features: [
      'Layer heights from 0.1mm to 0.3mm',
      'Build volumes up to 300x300x400mm',
      'Multi-color printing available',
      'Post-processing services',
      'Quality inspection included',
      '24-48 hour turnaround'
    ],
    applications: [
      'Functional prototypes',
      'End-use parts',
      'Architectural models',
      'Educational tools',
      'Art and sculptures',
      'Replacement parts'
    ],
    pricing: {
      starting: '₹50',
      unit: 'per gram',
      factors: ['Material type', 'Print complexity', 'Volume', 'Post-processing']
    },
    process: [
      'Upload your 3D file (STL, OBJ, 3MF)',
      'We analyze and optimize for printing',
      'Material and technology selection',
      'Printing and quality control',
      'Post-processing if required',
      'Quality inspection and delivery'
    ]
  },
  'cad-modeling': {
    icon: Pencil,
    title: '3D Designing / CAD Modeling',
    subtitle: 'Expert CAD modeling and design services to bring your concepts to reality',
    description: 'Our experienced design team transforms your ideas, sketches, or existing products into precise 3D models. Whether you need product design, reverse engineering, or design optimization, we deliver professional CAD solutions.',
    image: '/images/cad-modeling.jpg',
    technologies: [
      {
        name: 'SolidWorks',
        description: 'Professional parametric 3D CAD software',
        materials: ['Assemblies', 'Simulations', 'Technical drawings', 'Animations']
      },
      {
        name: 'Fusion 360',
        description: 'Cloud-based CAD/CAM/CAE platform',
        materials: ['Product design', 'Generative design', 'Simulation', 'Manufacturing']
      },
      {
        name: 'Blender',
        description: 'Advanced 3D modeling and rendering',
        materials: ['Organic modeling', 'Sculpting', 'Texturing', 'Animation']
      }
    ],
    features: [
      'Parametric modeling',
      'Assembly design',
      'Technical drawings',
      'Design for manufacturing',
      'Simulation and analysis',
      'Multiple file formats'
    ],
    applications: [
      'Product development',
      'Mechanical parts',
      'Consumer products',
      'Industrial equipment',
      'Architectural elements',
      'Custom components'
    ],
    pricing: {
      starting: '₹500',
      unit: 'per hour',
      factors: ['Design complexity', 'Revision rounds', 'File formats', 'Technical drawings']
    },
    process: [
      'Requirement analysis and briefing',
      'Concept sketches and ideation',
      '3D modeling and design',
      'Client review and feedback',
      'Revisions and refinements',
      'Final files and documentation'
    ]
  },
  'prototyping': {
    icon: Lightbulb,
    title: 'Prototyping & Product Development',
    subtitle: 'Rapid prototyping for product testing and iterative development',
    description: 'Accelerate your product development with our comprehensive prototyping services. From initial concept validation to pre-production testing, we help you iterate quickly and efficiently.',
    image: '/images/prototyping.jpg',
    technologies: [
      {
        name: 'Rapid Prototyping',
        description: 'Quick turnaround functional prototypes',
        materials: ['3D Printing', 'CNC Machining', 'Laser Cutting', 'Molding']
      },
      {
        name: 'Functional Testing',
        description: 'Working prototypes for validation',
        materials: ['Mechanical testing', 'Fit and finish', 'User experience', 'Performance']
      },
      {
        name: 'Iterative Design',
        description: 'Multiple design iterations',
        materials: ['Design optimization', 'Cost reduction', 'Manufacturing feasibility', 'Quality improvement']
      }
    ],
    features: [
      'Fast turnaround (24-72 hours)',
      'Multiple material options',
      'Functional testing support',
      'Design iteration cycles',
      'Cost-effective solutions',
      'Manufacturing guidance'
    ],
    applications: [
      'Product validation',
      'Concept testing',
      'Market research',
      'Investor presentations',
      'User testing',
      'Manufacturing planning'
    ],
    pricing: {
      starting: '₹1,000',
      unit: 'per prototype',
      factors: ['Complexity', 'Materials', 'Quantity', 'Testing requirements']
    },
    process: [
      'Concept evaluation and planning',
      'Initial prototype development',
      'Testing and validation',
      'Feedback analysis',
      'Design improvements',
      'Final prototype delivery'
    ]
  },
  'architectural-miniature': {
    icon: Building,
    title: 'Architectural Miniature Model Service',
    subtitle: 'Detailed architectural scale models for presentations, real estate, and urban planning',
    description: 'Create stunning architectural scale models that bring your designs to life. Perfect for client presentations, real estate marketing, urban planning, and educational purposes.',
    image: '/images/architectural-miniature.jpg',
    technologies: [
      {
        name: 'Scale Modeling',
        description: 'Precise scale architectural representations',
        materials: ['1:100 scale', '1:200 scale', '1:500 scale', 'Custom scales']
      },
      {
        name: 'Detailed Finishing',
        description: 'Professional finishing and painting',
        materials: ['Texture painting', 'Landscaping', 'Lighting effects', 'Transparent elements']
      },
      {
        name: 'Multi-Material',
        description: 'Various materials for realistic appearance',
        materials: ['PLA plastic', 'Resin details', 'Acrylic sheets', 'Metal accents']
      }
    ],
    features: [
      'Accurate scale representation',
      'Detailed architectural features',
      'Landscape integration',
      'Custom base and display',
      'Professional finishing',
      'Protective packaging'
    ],
    applications: [
      'Real estate marketing',
      'Client presentations',
      'Urban planning',
      'Educational models',
      'Museum displays',
      'Competition entries'
    ],
    pricing: {
      starting: '₹5,000',
      unit: 'per model',
      factors: ['Model size', 'Detail level', 'Materials', 'Finishing quality']
    },
    process: [
      'Architectural drawings analysis',
      '3D model creation and scaling',
      'Material selection and planning',
      'Printing and assembly',
      'Finishing and detailing',
      'Quality check and delivery'
    ]
  },
  'custom-gifts': {
    icon: Gift,
    title: 'Custom Gifts & Miniatures',
    subtitle: 'Personalized gifts, miniatures, keychains, and unique decorative items',
    description: 'Create memorable personalized gifts and miniatures that leave lasting impressions. From custom keychains to detailed figurines, we bring your creative ideas to life.',
    image: '/images/custom-gifts.jpg',
    technologies: [
      {
        name: 'Personalization',
        description: 'Custom text, names, and designs',
        materials: ['Engraved text', 'Custom logos', 'Photo lithophanes', 'Personal messages']
      },
      {
        name: 'Miniature Modeling',
        description: 'Detailed small-scale replicas',
        materials: ['Character figurines', 'Vehicle models', 'Building replicas', 'Pet miniatures']
      },
      {
        name: 'Functional Gifts',
        description: 'Useful personalized items',
        materials: ['Phone stands', 'Desk organizers', 'Planters', 'Tool holders']
      }
    ],
    features: [
      'Fully customizable designs',
      'Multiple color options',
      'Text and logo engraving',
      'Photo lithophanes',
      'Gift packaging available',
      'Bulk order discounts'
    ],
    applications: [
      'Corporate gifts',
      'Wedding favors',
      'Birthday presents',
      'Memorial items',
      'Promotional products',
      'Educational tools'
    ],
    pricing: {
      starting: '₹100',
      unit: 'per item',
      factors: ['Item complexity', 'Personalization level', 'Quantity', 'Material choice']
    },
    process: [
      'Gift concept discussion',
      'Design customization',
      'Preview and approval',
      'Production and printing',
      'Quality control',
      'Packaging and delivery'
    ]
  },
  'bulk-manufacturing': {
    icon: Package,
    title: 'Bulk Manufacturing',
    subtitle: 'Large-scale production with consistent quality and competitive pricing',
    description: 'Scale your production with our bulk manufacturing services. We ensure consistent quality, competitive pricing, and reliable delivery schedules for your volume requirements.',
    image: '/images/bulk-manufacturing.jpg',
    technologies: [
      {
        name: 'Volume Production',
        description: 'High-capacity manufacturing setup',
        materials: ['Multiple printers', 'Automated workflows', 'Quality systems', 'Batch processing']
      },
      {
        name: 'Quality Control',
        description: 'Consistent quality assurance',
        materials: ['Inspection protocols', 'Statistical sampling', 'Defect tracking', 'Process optimization']
      },
      {
        name: 'Supply Chain',
        description: 'Integrated production management',
        materials: ['Material sourcing', 'Inventory management', 'Logistics coordination', 'Delivery scheduling']
      }
    ],
    features: [
      'Volume discounts available',
      'Consistent quality standards',
      'Flexible delivery schedules',
      'Custom packaging options',
      'Quality certifications',
      'Dedicated project management'
    ],
    applications: [
      'Product manufacturing',
      'Spare parts production',
      'Promotional items',
      'Industrial components',
      'Consumer products',
      'Replacement parts'
    ],
    pricing: {
      starting: '₹25',
      unit: 'per piece (100+ qty)',
      factors: ['Order quantity', 'Part complexity', 'Material requirements', 'Delivery timeline']
    },
    process: [
      'Volume requirement analysis',
      'Production planning and costing',
      'Sample approval process',
      'Production setup and testing',
      'Bulk manufacturing',
      'Quality control and delivery'
    ]
  }
};
export function ServiceDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceId ? serviceDetails[serviceId as keyof typeof serviceDetails] : null;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The requested service could not be found.</p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Services
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = service.icon;
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-orange-500 py-20">
        <div className="container01 mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl text-white mb-6">{service.title}</h1>
              <p className="text-xl text-blue-100 mb-8">{service.subtitle}</p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                >
                  Get Quote
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:+917905620142"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-2xl transform rotate-3"></div>
              <img
                src={service.image}
                alt={service.title}
                className="relative rounded-2xl shadow-xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Service Overview */}
      <section className="py-20 bg-white">
        <div className="container01 mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl text-gray-900 mb-8 text-center">Service Overview</h2>
            <p className="text-lg text-gray-600 leading-relaxed text-center mb-12">
              {service.description}
            </p>

            {/* Key Stats */}
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">24-72h</h3>
                <p className="text-gray-600">Turnaround Time</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">500+</h3>
                <p className="text-gray-600">Projects Completed</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">200+</h3>
                <p className="text-gray-600">Happy Clients</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">99%</h3>
                <p className="text-gray-600">Quality Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Technologies & Materials */}
      <section className="py-20 bg-gray-50">
        <div className="container01 mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl text-gray-900 mb-12 text-center">Technologies & Materials</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {service.technologies.map((tech, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl text-gray-900 mb-4">{tech.name}</h3>
                  <p className="text-gray-600 mb-6">{tech.description}</p>
                  <div className="space-y-2">
                    {tech.materials.map((material, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">{material}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Features & Applications */}
      <section className="py-20 bg-white">
        <div className="container01 mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Features */}
              <div>
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl text-gray-900 mb-8">Key Features</h2>
                <div className="space-y-4">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <span className="text-lg text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div>
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl text-gray-900 mb-8">Applications</h2>
                <div className="space-y-4">
                  {service.applications.map((application, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                      <span className="text-lg text-gray-700">{application}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="container01 mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl text-gray-900 mb-12 text-center">Our Process</h2>
            <div className="space-y-8">
              {service.process.map((step, index) => (
                <div key={index} className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-lg text-gray-700">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="container01 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl text-gray-900 mb-8">Pricing</h2>
            <div className="bg-gradient-to-br from-blue-600 to-orange-500 rounded-2xl p-8 text-white mb-8">
              <div className="text-5xl font-bold mb-2">
                Starting from {service.pricing.starting}
              </div>
              <div className="text-xl text-blue-100 mb-6">{service.pricing.unit}</div>
              <p className="text-blue-100 mb-6">
                Final pricing depends on various factors:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {service.pricing.factors.map((factor, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />
                    <span>{factor}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-gray-600 mb-8">
              Get a detailed quote by contacting us with your project requirements.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Custom Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="mailto:info@the3dindia.com"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-orange-500">
        <div className="container01 mx-auto px-4 text-center">
          <h2 className="text-4xl text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your project requirements and bring your ideas to life with our {service.title.toLowerCase()}.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
            >
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}