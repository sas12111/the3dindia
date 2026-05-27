import { useState, useEffect, useRef } from 'react';
import { apiUrl } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';
import { Filter, X, Tag, Layers, ShoppingCart, Star, Ruler, Clock, Loader2, CheckCircle, Plus, Minus } from 'lucide-react';
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

import ProductModal from '../components/ProductModal';

export function Products() {
  const [products, setProducts]         = useState<Product[]>([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct]   = useState<Product | null>(null);

  useEffect(() => {
    fetch(apiUrl('/api/products'))
      .then(r => r.json())
      .then(data => {
        if (data.success) setProducts(data.products);
        else setError('Failed to load products.');
      })
      .catch(() => setError('Could not connect to server.'))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category))).sort()];
  const filtered = selectedCategory === 'All' ? products : products.filter(p => p.category === selectedCategory);

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 to-orange-500 py-20">
        <div className="container01 mx-auto px-4 text-center">
          <h1 className="text-5xl text-white mb-6">Our Products</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Browse our ready-to-order 3D printed products — from custom gifts to industrial parts. All fully customizable.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white border-b">
        <div className="container01 mx-auto px-4">
          <div className="flex items-center gap-4 justify-center flex-wrap">
            <div className="flex items-center gap-2 text-gray-700">
              <Filter className="w-5 h-5" />
              <span>Filter by:</span>
            </div>
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-lg transition-colors ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container01 mx-auto px-4">
          {loading && (
            <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin" /><span>Loading products…</span>
            </div>
          )}
          {error && <div className="text-center py-24 text-red-500">{error}</div>}
          {!loading && !error && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(product => (
                <button key={product.id} type="button" onClick={() => setSelectedProduct(product)}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer text-left w-full">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={product.image || '/images/3d-printer.jpg'} alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">{product.badge}</span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">{product.category}</div>
                      <span className="text-blue-600 font-bold text-lg">₹{product.price.toLocaleString()}</span>
                    </div>
                    <h3 className="text-xl text-gray-900 mb-1">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => <Star key={i} size={13} fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'} color="#f59e0b" />)}
                      <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                    </div>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <span className="text-blue-600 text-sm font-medium group-hover:underline">View Details →</span>
                  </div>
                </button>
              ))}
            </div>
          )}
          {!loading && !error && filtered.length === 0 && (
            <div className="text-center py-12"><p className="text-xl text-gray-600">No products found in this category.</p></div>
          )}
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container01 mx-auto px-4 text-center">
          <h2 className="text-4xl text-gray-900 mb-6">Need Something Custom?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Don't see what you're looking for? We build fully custom 3D printed products from your design or idea.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Get a Custom Quote →
          </Link>
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
