import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Minus, Plus, ShoppingCart, ChevronRight, Truck, RotateCcw, Shield } from 'lucide-react';
import { products } from '../data/products';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { ImageGallery } from '../components/ImageGallery';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const product = products.find(p => p.id === id);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || "");
      setSelectedColor(product.colors[0] || "");
      setQuantity(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-dark-card flex items-center justify-center mb-6">
          <ShoppingCart className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Product Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">The product you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/shop')} className="btn-primary">
          Return to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    addToast(t('addedToCart'));
  };

  // Color mapping
  const colorMap: Record<string, string> = {
    'Black': '#1a1a1a', 'White': '#f5f5f5', 'Grey': '#9ca3af', 'Navy': '#1e3a5f',
    'Blue': '#3b82f6', 'Light Blue': '#93c5fd', 'Red': '#ef4444', 'Brown': '#92400e',
    'Olive': '#65712b', 'Dark Green': '#166534', 'Silver': '#c0c0c0', 'Matte Black': '#2d2d2d',
    'Black/Red': 'linear-gradient(135deg, #1a1a1a 50%, #ef4444 50%)',
  };

  const guarantees = [
    { icon: Truck, text: 'Fast delivery across Algeria' },
    { icon: RotateCcw, text: 'Easy returns within 7 days' },
    { icon: Shield, text: 'Premium quality guarantee' },
  ];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-dark-card border-b border-gray-100 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-gray-900 dark:hover:text-white transition-colors">{t('home')}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/shop" className="hover:text-gray-900 dark:hover:text-white transition-colors">{t('shop')}</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 dark:text-white font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Image Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ImageGallery images={product.images} alt={product.name} />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            {/* Category badge */}
            <div className="mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-outfit font-bold text-gray-900 dark:text-white mb-3">
              {product.name}
            </h1>

            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {product.price.toLocaleString()} <span className="text-lg font-medium text-gray-500">DA</span>
            </p>

            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-8 pb-8 border-b border-gray-100 dark:border-dark-border">
              {product.description}
            </p>

            <div className="space-y-7">
              {/* Color */}
              {product.colors.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
                    {t('color')}: <span className="font-normal normal-case text-gray-500 tracking-normal">{selectedColor}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`relative w-10 h-10 rounded-xl border-2 transition-all duration-200 ${
                          selectedColor === color
                            ? 'border-primary-500 scale-110 shadow-lg'
                            : 'border-gray-200 dark:border-dark-border hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                        style={{ background: colorMap[color] || '#ccc' }}
                        title={color}
                        aria-label={color}
                      >
                        {selectedColor === color && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <span className={`w-2 h-2 rounded-full ${['White', 'Silver', 'Light Blue'].includes(color) ? 'bg-gray-800' : 'bg-white'}`} />
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size */}
              {product.sizes.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
                    {t('size')}: <span className="font-normal normal-case text-gray-500 tracking-normal">{selectedSize}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[3rem] px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                          selectedSize === size
                            ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md'
                            : 'bg-white dark:bg-dark-card text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-dark-border hover:border-gray-400 dark:hover:border-gray-500'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
                  {t('quantity')}
                </h3>
                <div className="inline-flex items-center bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-hover transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-gray-900 dark:text-white text-sm">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="p-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-hover transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Add to cart action */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-primary-600 text-white py-4 rounded-xl font-bold text-base hover:bg-primary-500 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-primary-500/20"
              >
                <ShoppingCart className="w-5 h-5" />
                {t('addToCart')} — {(product.price * quantity).toLocaleString()} DA
              </button>
            </div>

            {/* Guarantees */}
            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-dark-border">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {guarantees.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5 text-sm text-gray-500 dark:text-gray-400">
                    <Icon className="w-4 h-4 text-primary-500 shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
