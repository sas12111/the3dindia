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
    { icon: Clock,        text: 'Real-time order tracking' },
    { icon: Shield,       text: 'Secure account access' },
    { icon: Star,         text: 'Priority support' },
    { icon: CheckCircle,  text: 'Fast production turnaround' },
  ];

  const stats = [
    { value: '500+', label: 'Projects' },
    { value: '200+', label: 'Clients' },
    { value: '98%',  label: 'Satisfaction' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50 flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[1400px] bg-white rounded-3xl shadow-2xl shadow-orange-900/10 overflow-hidden"
      >
        <div className="grid min-h-[700px] grid-cols-1 md:grid-cols-[45%_55%]">

          {/* ── Left Visual Panel ── */}
          <div
            className="relative min-w-0 p-8 text-white overflow-hidden md:p-12"
            style={{ background: 'linear-gradient(160deg, #f78e00 0%, #e07e00 55%, #c96e00 100%)' }}
          >
            {/* Grid pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }} />
            </div>

            {/* Floating blobs */}
            <motion.div
              animate={{ y: [0, -20, 0], opacity: [0.25, 0.45, 0.25] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute top-20 right-20 w-64 h-64 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'rgba(255,255,255,0.18)' }}
            />
            <motion.div
              animate={{ y: [0, 20, 0], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute bottom-20 left-20 w-72 h-72 rounded-full blur-3xl pointer-events-none"
              style={{ background: 'rgba(255,255,255,0.12)' }}
            />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">

              {/* Logo + trust badge */}
              <div className="mb-8">
                <Link to="/" className="block mb-4">
                  <img src={logoImage} alt="The3DIndia Logo" className="h-10 md:h-12 brightness-0 invert" />
                </Link>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/15 backdrop-blur-sm rounded-full text-sm border border-white/20">
                  <Shield className="w-3.5 h-3.5" />
                  <span className="text-xs font-medium">India's trusted 3D printing partner</span>
                </div>
              </div>

              {/* Hero */}
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
                  className="text-white/75 text-base mb-8 leading-relaxed"
                >
                  Access real-time order tracking, secure account management, and priority support for all your 3D printing needs.
                </motion.p>

                {/* Feature cards 2×2 */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.text}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300"
                      style={{ background: 'rgba(255,255,255,0.1)' }}
                    >
                      <feature.icon className="w-5 h-5 mb-2 text-white/80" />
                      <p className="text-sm text-white/90 font-medium">{feature.text}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="grid grid-cols-3 divide-x divide-white/20 rounded-2xl border border-white/20 overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                >
                  {stats.map((stat) => (
                    <div key={stat.label} className="py-4 text-center">
                      <div className="text-2xl font-bold mb-0.5">{stat.value}</div>
                      <div className="text-xs text-white/60">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-8 p-4 rounded-xl border border-white/20"
                style={{ background: 'rgba(255,255,255,0.1)' }}
              >
                <div className="flex gap-0.5 mb-2.5">
                  {[1,2,3,4,5].map((s) => (
                    <Star key={s} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-white/85 mb-3 leading-relaxed">
                  "The3DIndia transformed our product development. Fast, reliable, and exceptional quality!"
                </p>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: 'rgba(255,255,255,0.25)' }}>
                    RS
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Rajesh Sharma</div>
                    <div className="text-xs text-white/55">Product Designer</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ── Right Form Panel ── */}
          <div className="min-w-0 flex items-center justify-center p-8 md:p-12 lg:p-16 bg-white">
            <div className="w-full max-w-[520px]">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
                {subtitle && <p className="text-gray-500 mb-8">{subtitle}</p>}
                {children}
              </motion.div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
