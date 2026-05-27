import { useEffect, useState } from 'react';
import { apiUrl } from '../utils/api';
import { Link } from 'react-router-dom';
import {
  ShoppingBag, Package, Clock, CheckCircle, XCircle, Truck,
  Loader2, ArrowRight, User, Mail, Phone, Calendar,
  RefreshCw, Filter, ChevronDown,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';


interface Order {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  category: string;
  price: number;
  quantity: number;
  total: number;
  note: string;
  status: 'Pending' | 'Confirmed' | 'In Production' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

const STATUS_CFG: Record<string, { color: string; bg: string; border: string; dot: string }> = {
  Pending:         { color: '#92400e', bg: '#fffbeb', border: '#fde68a', dot: '#f59e0b' },
  Confirmed:       { color: '#1e40af', bg: '#eff6ff', border: '#bfdbfe', dot: '#3b82f6' },
  'In Production': { color: '#5b21b6', bg: '#f5f3ff', border: '#ddd6fe', dot: '#8b5cf6' },
  Shipped:         { color: '#0e7490', bg: '#ecfeff', border: '#a5f3fc', dot: '#06b6d4' },
  Delivered:       { color: '#14532d', bg: '#f0fdf4', border: '#bbf7d0', dot: '#22c55e' },
  Cancelled:       { color: '#991b1b', bg: '#fef2f2', border: '#fecaca', dot: '#ef4444' },
};

const STEPS = ['Pending', 'Confirmed', 'In Production', 'Shipped', 'Delivered'];

const FILTER_OPTIONS = ['All', 'Pending', 'Confirmed', 'In Production', 'Shipped', 'Delivered', 'Cancelled'];

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CFG[status] || STATUS_CFG['Pending'];
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}>
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.dot }} />
      {status}
    </span>
  );
}

function OrderTimeline({ status }: { status: string }) {
  if (status === 'Cancelled') {
    return (
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
        <XCircle size={14} className="text-red-400" />
        <span className="text-xs text-red-500 font-medium">This order was cancelled</span>
      </div>
    );
  }
  const current = STEPS.indexOf(status);
  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="flex items-center">
        {STEPS.map((step, i) => {
          const done    = i < current;
          const active  = i === current;
          const pending = i > current;
          return (
            <div key={step} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all
                  ${done ? 'bg-blue-600' : active ? 'bg-blue-600 ring-4 ring-blue-100' : 'bg-gray-200'}`}>
                  {done
                    ? <CheckCircle size={12} className="text-white" />
                    : active
                      ? <span className="w-2 h-2 bg-white rounded-full" />
                      : <span className="w-2 h-2 bg-gray-400 rounded-full" />}
                </div>
                <span className={`text-[10px] font-medium whitespace-nowrap hidden sm:block
                  ${done || active ? 'text-blue-600' : 'text-gray-400'}`}>
                  {step}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`h-0.5 flex-1 mx-1 mb-4 transition-all ${done ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function MyOrders() {
  const { user, token }         = useAuth();
  const [orders, setOrders]     = useState<Order[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [cancelling, setCancelling] = useState<string | null>(null);
  const [filter, setFilter]     = useState('All');
  const [showFilter, setShowFilter] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchOrders = () => {
    setLoading(true);
    fetch(apiUrl('/api/orders'), { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { if (data.success) setOrders(data.orders); else setError(data.error); })
      .catch(() => setError('Could not load orders'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, []);

  const cancelOrder = async (id: string) => {
    if (!confirm('Cancel this order? This cannot be undone.')) return;
    setCancelling(id);
    try {
      const res  = await fetch(apiUrl(`/api/orders/${id}`), { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) fetchOrders();
      else alert(data.error);
    } finally { setCancelling(null); }
  };

  const filtered = filter === 'All' ? orders : orders.filter(o => o.status === filter);

  const stats = {
    total:     orders.length,
    active:    orders.filter(o => !['Delivered', 'Cancelled'].includes(o.status)).length,
    delivered: orders.filter(o => o.status === 'Delivered').length,
    spent:     orders.filter(o => o.status !== 'Cancelled').reduce((s, o) => s + o.total, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Top banner ── */}
      <div className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #2563eb 60%, #ea580c 100%)' }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#g)" />
          </svg>
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }} />
        </div>
        <div className="container01 mx-auto px-4 py-10 relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <span className="text-2xl font-bold text-white">{user?.name?.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <p className="text-blue-200 text-sm font-medium">Welcome back</p>
                <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
                <p className="text-blue-200 text-xs mt-0.5">{user?.email}</p>
              </div>
            </div>
            <Link to="/products"
              className="flex items-center gap-2 px-5 py-2.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/25 text-white text-sm font-semibold rounded-xl transition-all">
              + New Order <ArrowRight size={14} />
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
            {[
              { label: 'Total Orders', value: stats.total, icon: <ShoppingBag size={16} /> },
              { label: 'Active',       value: stats.active, icon: <Clock size={16} /> },
              { label: 'Delivered',    value: stats.delivered, icon: <CheckCircle size={16} /> },
              { label: 'Total Spent',  value: `₹${stats.spent.toLocaleString()}`, icon: <Package size={16} /> },
            ].map(s => (
              <div key={s.label} className="rounded-xl px-4 py-3 backdrop-blur-sm"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.18)' }}>
                <div className="flex items-center gap-2 text-blue-200 mb-1">
                  {s.icon}
                  <span className="text-xs">{s.label}</span>
                </div>
                <div className="text-xl font-bold text-white">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="container01 mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Sidebar ── */}
          <aside className="lg:w-64 flex-shrink-0 space-y-4">

            {/* Profile card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #ea580c)' }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">{user?.name}</p>
                  <p className="text-xs text-gray-400">Customer</p>
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5 text-xs text-gray-600">
                  <Mail size={13} className="text-gray-400 flex-shrink-0" />
                  <span className="truncate">{user?.email}</span>
                </div>
                {user?.mobile && (
                  <div className="flex items-center gap-2.5 text-xs text-gray-600">
                    <Phone size={13} className="text-gray-400 flex-shrink-0" />
                    <span>{user.mobile}</span>
                  </div>
                )}
                <div className="flex items-center gap-2.5 text-xs text-gray-600">
                  <Calendar size={13} className="text-gray-400 flex-shrink-0" />
                  <span>Member since {new Date().getFullYear()}</span>
                </div>
              </div>
            </div>

            {/* Filter card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Filter Orders</p>
              <div className="space-y-1">
                {FILTER_OPTIONS.map(opt => {
                  const count = opt === 'All' ? orders.length : orders.filter(o => o.status === opt).length;
                  const cfg   = STATUS_CFG[opt];
                  return (
                    <button key={opt} onClick={() => setFilter(opt)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                        filter === opt ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                      }`}>
                      <div className="flex items-center gap-2">
                        {cfg && <span className="w-2 h-2 rounded-full" style={{ background: cfg.dot }} />}
                        {!cfg && <span className="w-2 h-2 rounded-full bg-gray-400" />}
                        {opt}
                      </div>
                      <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
                        filter === opt ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                      }`}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* ── Orders list ── */}
          <div className="flex-1 min-w-0">

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {filter === 'All' ? 'All Orders' : `${filter} Orders`}
                </h2>
                <p className="text-sm text-gray-400">{filtered.length} order{filtered.length !== 1 ? 's' : ''}</p>
              </div>
              <button onClick={fetchOrders}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm">
                <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                <p className="text-gray-400 text-sm">Loading your orders…</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                <XCircle size={16} />{error}
              </div>
            )}

            {/* Empty */}
            {!loading && !error && filtered.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-20 px-6 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                  <ShoppingBag size={32} className="text-gray-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">
                  {filter === 'All' ? 'No orders yet' : `No ${filter.toLowerCase()} orders`}
                </h3>
                <p className="text-gray-400 text-sm mb-6 max-w-xs">
                  {filter === 'All'
                    ? 'Browse our products and place your first 3D printing order.'
                    : `You don't have any ${filter.toLowerCase()} orders right now.`}
                </p>
                {filter === 'All' && (
                  <Link to="/products"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                    Browse Products <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            )}

            {/* Order cards */}
            {!loading && !error && filtered.length > 0 && (
              <div className="space-y-3">
                {filtered.map(order => {
                  const isExpanded = expandedId === order.id;
                  return (
                    <div key={order.id}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">

                      {/* Card header — always visible */}
                      <div className="p-5">
                        <div className="flex items-start gap-4">

                          {/* Product image */}
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                            {order.productImage
                              ? <img src={order.productImage} alt={order.productName} className="w-full h-full object-cover" />
                              : <div className="w-full h-full flex items-center justify-center text-xl">📦</div>}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 flex-wrap">
                              <div>
                                <h3 className="font-semibold text-gray-900 text-sm leading-tight">{order.productName}</h3>
                                <p className="text-xs text-gray-400 mt-0.5">
                                  {order.category} · Qty {order.quantity} · #{order.id.slice(-6).toUpperCase()}
                                </p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <div className="text-base font-bold text-gray-900">₹{order.total.toLocaleString()}</div>
                                <div className="text-xs text-gray-400 mt-0.5">
                                  {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                              <StatusBadge status={order.status} />
                              <div className="flex items-center gap-3">
                                {order.status === 'Pending' && (
                                  <button onClick={() => cancelOrder(order.id)} disabled={cancelling === order.id}
                                    className="text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1 disabled:opacity-50 transition-colors">
                                    {cancelling === order.id
                                      ? <Loader2 size={11} className="animate-spin" />
                                      : <XCircle size={11} />}
                                    Cancel
                                  </button>
                                )}
                                <button onClick={() => setExpandedId(isExpanded ? null : order.id)}
                                  className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 transition-colors">
                                  {isExpanded ? 'Less' : 'Details'}
                                  <ChevronDown size={12} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Timeline — always shown */}
                        <OrderTimeline status={order.status} />
                      </div>

                      {/* Expanded details */}
                      {isExpanded && (
                        <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
                          <div className="grid sm:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Unit Price</p>
                              <p className="font-semibold text-gray-800">₹{order.price.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Quantity</p>
                              <p className="font-semibold text-gray-800">{order.quantity} unit{order.quantity > 1 ? 's' : ''}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Order Total</p>
                              <p className="font-bold text-blue-600">₹{order.total.toLocaleString()}</p>
                            </div>
                          </div>
                          {order.note && (
                            <div className="mt-3 p-3 bg-white rounded-xl border border-gray-200">
                              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Your Note</p>
                              <p className="text-sm text-gray-700">{order.note}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
