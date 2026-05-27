import React, { useEffect, useRef, useState } from 'react';
import { apiUrl } from '../utils/api';
import { X, Layers, Ruler, Clock, ShoppingCart, Star, CheckCircle, Plus, Minus, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  badge?: string;
  description: string;
  fullDesc: string;
  material: string;
  dimensions: string;
  printTime: string;
  tags: string[];
  active: boolean;
}

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [ordering, setOrdering] = useState(false);
  const [ordered, setOrdered] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [note, setNote] = useState('');
  const [qty, setQty] = useState(1);
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (product) {
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      setOrdered(false);
      setOrderError('');
      setNote('');
      setQty(1);
    } else {
      dialog.close();
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  const images = (product?.images && product.images.length > 0)
    ? product.images
    : (product?.image ? [product.image] : ['/images/3d-printer.jpg']);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [naturalSize, setNaturalSize] = useState<{w:number,h:number}>({w:0,h:0});
  const zoomImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    setSelectedIndex(0);
    setZoomOpen(false);
    setZoomScale(1);
    setNaturalSize({w:0,h:0});
  }, [product?.id]);

  const API = (window as any).REACT_APP_API_URL || '';

  if (!product) return null;

  return (
    <dialog ref={dialogRef} style={{ padding: 0, border: 'none', borderRadius: '1rem', maxWidth: '900px', width: 'calc(100% - 2rem)', maxHeight: '90vh', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.4)' }}>
      <div style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem' }}>
          <div style={{ width: '5.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {images.map((src, i) => (
              <button key={i} onClick={() => setSelectedIndex(i)} type="button" style={{ border: selectedIndex === i ? '2px solid #2563eb' : '1px solid #e5e7eb', padding: 0, borderRadius: '0.5rem', overflow: 'hidden', background: '#fff' }}>
                <img src={src || '/images/3d-printer.jpg'} alt={`thumb-${i}`} style={{ width: '3.75rem', height: '3.75rem', objectFit: 'cover', display: 'block' }} />
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', flex: 1, height: '16rem', overflow: 'hidden', borderRadius: '0.75rem' }}>
            <img src={images[selectedIndex] || '/images/3d-printer.jpg'} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'zoom-in' }} onClick={() => setZoomOpen(true)} />
            <div style={{ position: 'absolute', bottom: '0.6rem', right: '0.6rem', display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => { setZoomScale(s => Math.max(1, +(s - 0.25).toFixed(2))); }} style={{ background: 'rgba(255,255,255,0.9)', border: 'none', padding: '0.4rem', borderRadius: '0.4rem' }}>−</button>
              <button onClick={() => { setZoomScale(s => +(s + 0.25).toFixed(2)); }} style={{ background: 'rgba(255,255,255,0.9)', border: 'none', padding: '0.4rem', borderRadius: '0.4rem' }}>+</button>
            </div>
            <button onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: '1rem', right: '1rem', width: '2.25rem', height: '2.25rem', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
              <X size={18} color="#374151" />
            </button>
          </div>
        </div>

        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#111827' }}>{product.name}</h2>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2563eb', whiteSpace: 'nowrap', marginLeft: '1rem' }}>₹{product.price.toLocaleString()}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { icon: <Layers size={20} color="#2563eb" />, label: 'Material', value: product.material },
              { icon: <Ruler size={20} color="#2563eb" />, label: 'Size', value: product.dimensions },
              { icon: <Clock size={20} color="#2563eb" />, label: 'Print Time', value: product.printTime },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: '#f9fafb', borderRadius: '0.75rem', padding: '0.75rem' }}>
                <div style={{ flexShrink: 0 }}>{icon}</div>
                <div>
                  <p style={{ fontSize: '0.7rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
                  <p style={{ fontSize: '0.8rem', fontWeight: 500, color: '#1f2937' }}>{value || '—'}</p>
                </div>
              </div>
            ))}
          </div>

          {product.fullDesc && (
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Product Details</p>
              <p style={{ color: '#4b5563', lineHeight: 1.7 }}>{product.fullDesc}</p>
            </div>
          )}

          {product.tags?.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Tag size={16} color="#f97316" />
                <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tags</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {product.tags.map(tag => (
                  <span key={tag} style={{ padding: '0.25rem 0.75rem', background: '#fff7ed', color: '#ea580c', borderRadius: '9999px', fontSize: '0.875rem', border: '1px solid #fed7aa' }}>#{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* Order section */}
          {ordered ? (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '0.75rem', padding: '1.25rem', textAlign: 'center' }}>
              <CheckCircle size={32} color="#16a34a" style={{ margin: '0 auto 0.5rem' }} />
              <p style={{ fontWeight: 700, color: '#15803d', fontSize: '1rem' }}>Order Placed!</p>
              <p style={{ color: '#4b5563', fontSize: '0.875rem', marginTop: '0.25rem' }}>Track it in My Orders.</p>
              <button onClick={() => { onClose(); navigate('/my-orders'); }} style={{ marginTop: '0.75rem', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '0.5rem', padding: '0.6rem 1.25rem', fontWeight: 600, cursor: 'pointer', fontSize: '0.875rem' }}>
                View My Orders →
              </button>
            </div>
          ) : (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.35rem' }}>Quantity</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} disabled={qty <= 1} style={{ width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6', border: 'none', borderRadius: '0.5rem', cursor: qty <= 1 ? 'not-allowed' : 'pointer', color: qty <= 1 ? '#9ca3af' : '#374151' }}>
                      <Minus size={16} />
                    </button>
                    <input type="number" min={1} value={qty} onChange={e => setQty(Math.max(1, Number(e.target.value)))}
                      style={{ width: '100%', padding: '0.55rem 0.75rem', border: '1.5px solid #e2e8f0', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none', textAlign: 'center' }} />
                    <button type="button" onClick={() => setQty(qty + 1)} style={{ width: '2.5rem', height: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6', border: 'none', borderRadius: '0.5rem', cursor: 'pointer', color: '#374151' }}>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#374151', display: 'block', marginBottom: '0.35rem' }}>Note <span style={{ color: '#9ca3af', fontWeight: 400 }}>(optional)</span></label>
                  <input type="text" value={note} onChange={e => setNote(e.target.value)} placeholder="Color, size, customization…"
                    style={{ width: '100%', padding: '0.55rem 0.75rem', border: '1.5px solid #e2e8f0', borderRadius: '0.5rem', fontSize: '0.875rem', outline: 'none' }} />
                </div>
              </div>

              {orderError && <p style={{ color: '#dc2626', fontSize: '0.8rem', marginBottom: '0.5rem' }}>{orderError}</p>}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {user ? (
                  <>
                    <button
                      disabled={cartLoading}
                      onClick={async () => {
                        setCartLoading(true);
                        try {
                          const cart = JSON.parse(localStorage.getItem('cart') || '[]');
                          const existingItem = cart.find((item: any) => item.productId === product.id);
                          if (existingItem) {
                            existingItem.quantity += qty;
                          } else {
                            cart.push({ productId: product.id, name: product.name, image: product.image, category: product.category, price: product.price, quantity: qty, variant: note });
                          }
                          localStorage.setItem('cart', JSON.stringify(cart));
                          setCartLoading(false);
                          alert('Added to cart!');
                        } catch { setCartLoading(false); alert('Failed to add to cart'); }
                      }}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: cartLoading ? '#93c5fd' : '#f3f4f6', color: '#374151', padding: '0.75rem 1rem', borderRadius: '0.75rem', fontWeight: 600, fontSize: '0.9rem', border: '1px solid #e5e7eb', cursor: cartLoading ? 'not-allowed' : 'pointer' }}>
                      <ShoppingCart size={18} />
                      {cartLoading ? 'Adding...' : 'Add to Cart'}
                    </button>
                    <button
                      disabled={ordering}
                      onClick={async () => {
                        setOrdering(true); setOrderError('');
                        try {
                          const savedAddresses = JSON.parse(localStorage.getItem('addresses') || '[]');
                          const selectedAddress = savedAddresses.find((addr: any) => addr.isDefault) || savedAddresses[0] || null;
                          const res  = await fetch(apiUrl('/api/orders'), {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                            body: JSON.stringify({
                              productId: product.id,
                              productName: product.name,
                              productImage: product.image,
                              category: product.category,
                              price: product.price,
                              quantity: qty,
                              note,
                              shippingAddress: selectedAddress,
                            }),
                          });
                          const data = await res.json();
                          if (data.success) setOrdered(true);
                          else setOrderError(data.error || 'Order failed');
                        } catch { setOrderError('Failed to place order. Try again.'); }
                        finally { setOrdering(false); }
                      }}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: ordering ? '#93c5fd' : '#2563eb', color: '#fff', padding: '0.75rem 1rem', borderRadius: '0.75rem', fontWeight: 600, fontSize: '0.9rem', border: 'none', cursor: ordering ? 'not-allowed' : 'pointer' }}>
                      <ShoppingCart size={18} />
                      {ordering ? 'Placing...' : `Buy Now · ₹${(product.price * qty).toLocaleString()}`}
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { onClose(); navigate('/login', { state: { from: '/products' } }); }}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#f3f4f6', color: '#374151', padding: '0.75rem 1rem', borderRadius: '0.75rem', fontWeight: 600, fontSize: '0.9rem', border: '1px solid #e5e7eb', cursor: 'pointer' }}>
                      <ShoppingCart size={18} />
                      Sign in to Add
                    </button>
                    <button onClick={() => { onClose(); navigate('/login', { state: { from: '/products' } }); }}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: '#2563eb', color: '#fff', padding: '0.75rem 1rem', borderRadius: '0.75rem', fontWeight: 600, fontSize: '0.9rem', border: 'none', cursor: 'pointer' }}>
                      <ShoppingCart size={18} />
                      Sign in to Buy
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {zoomOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60 }} onClick={() => setZoomOpen(false)}>
          <div style={{ width: '85vw', height: '85vh', background: '#fff', padding: '0.5rem', borderRadius: '0.5rem', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ color: '#374151', fontWeight: 700 }}>{product.name}</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => setZoomScale(s => Math.max(0.25, +(s - 0.25).toFixed(2)))} style={{ padding: '0.5rem', background: '#fff', borderRadius: '0.35rem' }}>−</button>
                <button onClick={() => setZoomScale(s => +(s + 0.25).toFixed(2))} style={{ padding: '0.5rem', background: '#fff', borderRadius: '0.35rem' }}>+</button>
                <button onClick={() => { setZoomScale(1); setSelectedIndex(0); }} style={{ padding: '0.5rem', background: '#fff', borderRadius: '0.35rem' }}>Reset</button>
                <button onClick={() => setZoomOpen(false)} style={{ padding: '0.5rem', background: '#fff', borderRadius: '0.35rem' }}>Close</button>
              </div>
            </div>
            <div style={{ width: '100%', height: 'calc(100% - 3rem)', overflow: 'auto', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img ref={zoomImgRef} src={images[selectedIndex] || '/images/3d-printer.jpg'}
                onLoad={(e) => { const img = e.currentTarget as HTMLImageElement; setNaturalSize({ w: img.naturalWidth, h: img.naturalHeight }); }}
                style={{ width: naturalSize.w ? `${naturalSize.w * zoomScale}px` : 'auto', height: naturalSize.h ? `${naturalSize.h * zoomScale}px` : 'auto', objectFit: 'contain', display: 'block' }}
                alt={product.name} />
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}