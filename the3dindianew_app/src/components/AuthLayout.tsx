import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Shield, Clock, Star, CheckCircle } from 'lucide-react';
import logoImage from 'figma:asset/b44ded5f4a40390ef42c1e843eb643a4df65afa1.png';
interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  const features = [
    { icon: Clock, text: 'Real-time order tracking' },
    { icon: Shield, text: 'Secure account access' },
    { icon: Star, text: 'Priority support' },
    { icon: CheckCircle, text: 'Fast production turnaround' },
  ];

  const stats = [
    { value: '500+', label: 'Projects' },
    { value: '200+', label: 'Clients' },
    { value: '98%', label: 'Satisfaction' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50 flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[1400px] bg-white rounded-3xl shadow-2xl shadow-blue-900/10 overflow-hidden"
      >
        <div className="">
          <div className="grid min-h-[700px] grid-cols-1 md:grid-cols-[45%_55%]">
            {/* Left Visual Panel */}
            <div
              className="relative min-w-0 bg-blue-700 p-8 text-white overflow-hidden md:p-12"
                style={{ backgroundImage: 'linear-gradient(90deg, #f98f00 0%, #ea580c 60%, #7c2d12 100%)' }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }} />
              </div>

              {/* Floating Blurred Shapes */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-20 right-20 w-64 h-64 bg-blue-400 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  y: [0, 20, 0],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute bottom-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl"
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                {/* Logo & Trust Badge */}
                <div className="mb-8">
                  <Link to="/" className="block mb-4">
                    <div className="h-10 md:h-12 text-white font-bold text-lg flex items-center">
                      <span><img src={logoImage} alt="The3DIndia Logo" className="h-10 md:h-12 brightness-0 invert" /></span>
                    </div>
                  </Link>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm">
                    <Shield className="w-4 h-4" />
                    <span>India's trusted 3D printing partner</span>
                  </div>
                </div>

                {/* Hero Section */}
                <div className="flex-1 flex flex-col justify-center max-w-md">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
                  >
                    Track your 3D printing projects effortlessly
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-blue-100 text-lg mb-8"
                  >
                    Access real-time order tracking, secure account management, and priority support for all your 3D printing needs.
                  </motion.p>

                  {/* Feature Cards */}
                  <div className="grid grid-cols-2 gap-3 w-full mb-8">
                    {features.map((feature, index) => (
                      <motion.div
                        key={feature.text}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300"
                      >
                        <feature.icon className="w-5 h-5 mb-2 text-blue-200" />
                        <p className="text-sm text-blue-50">{feature.text}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stats Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="grid grid-cols-3 gap-4 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
                  >
                    {stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-2xl font-bold mb-1">{stat.value}</div>
                        <div className="text-xs text-blue-200">{stat.label}</div>
                      </div>
                    ))}
                  </motion.div>
                </div>

                {/* Testimonial */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
                >
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-blue-50 mb-3">
                    "The3DIndia transformed our product development. Fast, reliable, and exceptional quality!"
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-xs font-semibold">
                      RS
                    </div>
                    <div>
                      <div className="text-sm font-medium">Rajesh Sharma</div>
                      <div className="text-xs text-blue-200">Product Designer</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="min-w-0 flex items-center justify-center p-8 md:p-12 lg:p-16">
              <div className="w-full max-w-[520px]">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
                  {subtitle && <p className="text-gray-600 mb-8">{subtitle}</p>}
                  {children}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
