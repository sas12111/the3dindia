import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AuthLayout } from '../components/AuthLayout';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  category: string;
  price: number;
  quantity: number;
  variant?: string;
}

const API = 'http://localhost:5000';

export function Cart() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    setLoading(false);
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCart(items);
    localStorage.setItem('cart', JSON.stringify(items));
  };

  const updateQuantity = async (productId: string, delta: number) => {
    if (updating) return;
    setUpdating(productId);
    const newCart = cart.map(item => {
      if (item.productId === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    saveCart(newCart);
    setUpdating(null);
  };

  const removeItem = (productId: string) => {
    const newCart = cart.filter(item => item.productId !== productId);
    saveCart(newCart);
  };

  const clearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      saveCart([]);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCharge = subtotal > 500 ? 0 : 99;
  const total = subtotal + deliveryCharge;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <AuthLayout>
        <div className="w-full max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={48} className="text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet. Browse our products and find the perfect 3D printed item for you.</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Browse Products <ArrowRight size={16} />
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container01 mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart ({cart.length} items)</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.productId} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1">{item.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                          {item.variant && (
                            <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full mb-2">
                              {item.variant}
                            </span>
                          )}
                        </div>
                        <button onClick={() => removeItem(item.productId)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(item.productId, -1)} disabled={updating === item.productId || item.quantity <= 1} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="font-semibold text-gray-900 min-w-[2rem] text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, 1)} disabled={updating === item.productId} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</div>
                        <div className="text-sm text-gray-500">₹{item.price.toLocaleString()} each</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200">
              <button onClick={clearCart} className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-2">
                <Trash2 size={16} /> Clear Cart
              </button>
              <Link to="/products" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                Continue Shopping <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium text-gray-900">{deliveryCharge === 0 ? 'Free' : '₹' + deliveryCharge.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes & Fees</span>
                  <span className="font-medium text-gray-900">₹0</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">₹{total.toLocaleString()}</span>
                </div>
              </div>
              {user ? (
                <button onClick={() => navigate('/checkout')} className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 flex items-center justify-center gap-2">
                  Proceed to Checkout <ArrowRight size={18} />
                </button>
              ) : (
                <Link to="/login" state={{ from: '/cart' }} className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 flex items-center justify-center gap-2">
                  Sign In to Checkout <ArrowRight size={18} />
                </Link>
              )}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <CheckCircle size={14} className="text-green-500" />
                Secure checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}