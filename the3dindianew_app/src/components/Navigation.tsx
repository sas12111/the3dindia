import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logoImage from 'figma:asset/b44ded5f4a40390ef42c1e843eb643a4df65afa1.png';

// Get cart count from localStorage
const getCartCount = () => {
  try {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
  } catch {
    return 0;
  }
};

export function Navigation() {
  const [isOpen, setIsOpen]       = useState(false);
  const [userMenu, setUserMenu]   = useState(false);
  const { user, logout }          = useAuth();
  const location                  = useLocation();
  const navigate                  = useNavigate();
  const menuRef                   = useRef<HTMLDivElement>(null);
  const [cartCount, setCartCount] = useState(getCartCount());

  // Update cart count on cart changes
  useEffect(() => {
    const handleStorageChange = () => setCartCount(getCartCount());
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/products', label: 'Products' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/about', label: 'About Us' },
    { path: '/learn', label: 'Learn 3D Printing' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Close user dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setUserMenu(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    logout();
    setUserMenu(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container01 mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoImage} alt="The3DIndia Logo" className="h-8" />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}
                className={`text-sm transition-colors ${isActive(link.path) ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
                  <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate">{user.name}</span>
                  <ChevronDown size={14} className={`transition-transform ${userMenu ? 'rotate-180' : ''}`} />
                </button>

                {userMenu && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">{user.email}</p>
                    </div>
                    <Link to="/my-orders" onClick={() => setUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <ShoppingBag size={15} className="text-blue-600" /> My Orders
                    </Link>
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                  Sign In
                </Link>
                <Link to="/register" className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  Get Started
                </Link>
              </>
            )}
            <Link to="/cart" className="relative px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-blue-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-gray-700 hover:text-blue-600">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)}
                  className={`text-sm transition-colors ${isActive(link.path) ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'}`}>
                  {link.label}
                </Link>
              ))}
              <div className="border-t pt-3 mt-1 flex flex-col gap-2">
                {user ? (
                  <>
                    <div className="flex items-center gap-2 px-1 py-1">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <Link to="/my-orders" onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 px-1">
                      <ShoppingBag size={15} /> My Orders
                    </Link>
                    <button onClick={() => { handleLogout(); setIsOpen(false); }}
                      className="flex items-center gap-2 text-sm text-red-600 px-1">
                      <LogOut size={15} /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)}
                      className="text-sm text-gray-700 hover:text-blue-600 px-1">Sign In</Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}
                      className="px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 text-center">
                      Get Started
                    </Link>
                    <Link to="/cart" onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 px-1">
                      <ShoppingBag size={14} /> Cart
                      {cartCount > 0 && <span className="bg-blue-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
                    </Link>
                    <Link to="/forgot-password" onClick={() => setIsOpen(false)}
                      className="text-sm text-gray-700 hover:text-blue-600 px-1">Forgot Password?</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
