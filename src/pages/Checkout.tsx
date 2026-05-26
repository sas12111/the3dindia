import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, CheckCircle, MapPin, CreditCard, Banknote, Shield } from 'lucide-react';
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
}

interface Address {
  id: string;
  name: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

interface AddressFormData {
  name: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

const API = 'http://localhost:5000';

export function Checkout() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [addressForm, setAddressForm] = useState<AddressFormData>({
    name: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
  });
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('cod');
  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    const savedAddresses = localStorage.getItem('addresses');
    if (savedAddresses) {
      const parsedAddresses: Address[] = JSON.parse(savedAddresses);
      setAddresses(parsedAddresses);
      if (parsedAddresses.length > 0) {
        const defaultAddress = parsedAddresses.find((addr) => addr.isDefault);
        setSelectedAddress(defaultAddress ? defaultAddress.id : parsedAddresses[0].id);
      }
    }
    setLoading(false);
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCharge = subtotal > 500 ? 0 : 99;
  const total = subtotal + deliveryCharge;

  const resetAddressForm = () => {
    setAddressForm({
      name: '',
      mobile: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: addresses.length === 0,
    });
  };

  const openAddAddressForm = () => {
    setAddressError('');
    setShowAddAddressForm(true);
    resetAddressForm();
  };

  const closeAddAddressForm = () => {
    setAddressError('');
    setShowAddAddressForm(false);
    resetAddressForm();
  };

  const validateAddressForm = () => {
    if (!addressForm.name.trim()) return 'Please enter full name';
    if (!/^\d{10}$/.test(addressForm.mobile.trim())) return 'Please enter a valid 10-digit mobile number';
    if (!addressForm.address.trim()) return 'Please enter address details';
    if (!addressForm.city.trim()) return 'Please enter city';
    if (!addressForm.state.trim()) return 'Please enter state';
    if (!/^\d{6}$/.test(addressForm.pincode.trim())) return 'Please enter a valid 6-digit pincode';
    return '';
  };

  const handleAddressInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;
    if (name === 'isDefault') {
      const checked = (event.target as HTMLInputElement).checked;
      setAddressForm((prev) => ({ ...prev, isDefault: checked }));
      return;
    }

    setAddressForm((prev) => ({
      ...prev,
      [name]: type === 'tel' || name === 'pincode' ? value.replace(/\D/g, '') : value,
    }));
  };

  const handleSaveAddress = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationError = validateAddressForm();
    if (validationError) {
      setAddressError(validationError);
      return;
    }

    const makeDefault = addressForm.isDefault || addresses.length === 0;
    const newAddress: Address = {
      id: `addr_${Date.now()}`,
      name: addressForm.name.trim(),
      mobile: addressForm.mobile.trim(),
      address: addressForm.address.trim(),
      city: addressForm.city.trim(),
      state: addressForm.state.trim(),
      pincode: addressForm.pincode.trim(),
      isDefault: makeDefault,
    };

    const updatedAddresses = makeDefault
      ? [...addresses.map((addr) => ({ ...addr, isDefault: false })), newAddress]
      : [...addresses, newAddress];

    setAddresses(updatedAddresses);
    setSelectedAddress(newAddress.id);
    localStorage.setItem('addresses', JSON.stringify(updatedAddresses));
    closeAddAddressForm();
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert('Please select an address');
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setStep('success');
      localStorage.removeItem('cart');
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowLeft size={32} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <Link to="/products" className="text-blue-600 hover:text-blue-700 font-medium">Go back to shopping</Link>
        </div>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <AuthLayout title="Order confirmed" subtitle="Your purchase is complete and being prepared.">
        <div className="w-full max-w-md mx-auto text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={64} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">Your order has been confirmed. We'll notify you when it ships.</p>
          <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order ID</span>
              <span className="font-mono font-semibold text-gray-900">#ORD{Date.now().toString().slice(-8)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Estimated Delivery</span>
              <span className="font-medium text-gray-900">3-5 business days</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Paid</span>
              <span className="font-bold text-blue-600">₹{total.toLocaleString()}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Link to="/my-orders" className="py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">View Orders</Link>
            <Link to="/products" className="py-2.5 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors">Continue Shopping</Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container01 mx-auto px-4">
        <div className="mb-8">
          <button onClick={() => setStep('address')} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft size={18} /> Back to Cart
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-500">Complete your order by providing your shipping details.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <MapPin size={20} className="text-blue-600" /> Shipping Address
                </h2>
                <button onClick={openAddAddressForm} className="text-sm text-blue-600 hover:text-blue-700 font-medium">+ Add New Address</button>
              </div>
              {showAddAddressForm && (
                <form onSubmit={handleSaveAddress} className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900">Add New Address</h3>
                  {addressError && <p className="text-sm text-red-600">{addressError}</p>}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      name="name"
                      value={addressForm.name}
                      onChange={handleAddressInputChange}
                      placeholder="Full Name"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      name="mobile"
                      type="tel"
                      maxLength={10}
                      value={addressForm.mobile}
                      onChange={handleAddressInputChange}
                      placeholder="Mobile Number"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <textarea
                    name="address"
                    value={addressForm.address}
                    onChange={handleAddressInputChange}
                    rows={2}
                    placeholder="House no, street, area"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="grid sm:grid-cols-3 gap-3">
                    <input
                      name="city"
                      value={addressForm.city}
                      onChange={handleAddressInputChange}
                      placeholder="City"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      name="state"
                      value={addressForm.state}
                      onChange={handleAddressInputChange}
                      placeholder="State"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      name="pincode"
                      type="tel"
                      maxLength={6}
                      value={addressForm.pincode}
                      onChange={handleAddressInputChange}
                      placeholder="Pincode"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={addressForm.isDefault}
                      onChange={handleAddressInputChange}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    Set as default address
                  </label>
                  <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">Save Address</button>
                    <button type="button" onClick={closeAddAddressForm} className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">Cancel</button>
                  </div>
                </form>
              )}
              {addresses.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                  <MapPin size={32} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">No saved addresses found</p>
                  <button onClick={openAddAddressForm} className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">Add New Address</button>
                </div>
              ) : (
                <div className="space-y-3">
                  {addresses.map((addr) => (
                    <div key={addr.id} onClick={() => setSelectedAddress(addr.id)} className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedAddress === addr.id ? 'border-blue-600 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{addr.name}</h3>
                            {addr.isDefault && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Default</span>}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{addr.mobile}</p>
                          <p className="text-sm text-gray-600">{addr.address}, {addr.city}, {addr.state} - {addr.pincode}</p>
                        </div>
                        {selectedAddress === addr.id && <CheckCircle size={20} className="text-blue-600" />}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard size={20} className="text-blue-600" /> Payment Method
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'upi', label: 'UPI', icon: <Banknote size={20} /> },
                  { id: 'card', label: 'Card', icon: <CreditCard size={20} /> },
                  { id: 'netbanking', label: 'Net Banking', icon: <Banknote size={20} /> },
                  { id: 'cod', label: 'Cash on Delivery', icon: <div className="w-5 h-5 rounded bg-green-500 flex items-center justify-center text-[8px] text-white font-bold">COD</div> },
                ].map((method) => (
                  <button key={method.id} onClick={() => setPaymentMethod(method.id as any)} className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${paymentMethod === method.id ? 'border-blue-600 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className={`mb-2 ${paymentMethod === method.id ? 'text-blue-600' : 'text-gray-400'}`}>{method.icon}</div>
                    <span className={`text-xs font-medium ${paymentMethod === method.id ? 'text-blue-700' : 'text-gray-700'}`}>{method.label}</span>
                  </button>
                ))}
              </div>
              {paymentMethod !== 'cod' && (
                <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Shield size={16} className="text-green-500" />
                    Secure payment powered by Razorpay
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xl">📦</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500 mb-1">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium text-gray-900">{deliveryCharge === 0 ? 'Free' : '₹' + deliveryCharge.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-medium text-gray-900">₹0</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">₹{total.toLocaleString()}</span>
                </div>
              </div>
              <button onClick={handlePlaceOrder} disabled={saving} className="w-full mt-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {saving ? (<><Loader2 size={16} className="animate-spin" /> Processing...</>) : (<><Shield size={16} /> Place Order</>)}
              </button>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
                <Shield size={12} className="text-green-500" />
                Secure payment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}