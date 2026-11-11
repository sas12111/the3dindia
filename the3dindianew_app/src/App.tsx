import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { About } from './pages/About';
import { Pricing } from './pages/Pricing';
import { Contact } from './pages/Contact';
import { ServiceDetail } from './pages/ServiceDetail';
import { Learn3DPrinting } from './pages/Learn3DPrinting';
import { Products } from './pages/Products';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { MyOrders } from './pages/MyOrders';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GitHubCallback } from './pages/GitHubCallback';
import { VerifyOTP } from './pages/VerifyOTP';
import { AIStudio } from './pages/AIStudio';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return null;
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return <>{children}</>;
}

function AppRoutes() {
  const location = useLocation();
  const isStudioRoute = location.pathname.startsWith('/studio');

  return (
    <div className={`min-h-screen flex flex-col ${isStudioRoute ? 'bg-[#f7f8fa]' : 'bg-white'}`}>
      {!isStudioRoute && <Navigation />}
      <main className="flex-1">
        <Routes>
          <Route path="/studio/*" element={<AIStudio />} />
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/learn" element={<Learn3DPrinting />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<RequireAuth><Checkout /></RequireAuth>} />
          <Route path="/my-orders" element={<RequireAuth><MyOrders /></RequireAuth>} />
          <Route path="/auth/github/callback" element={<GitHubCallback />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
        </Routes>
      </main>
      {!isStudioRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}
