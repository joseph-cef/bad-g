import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { type Product } from '../data/products';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    const defaultSize = product.sizes[0] || 'One Size';
    const defaultColor = product.colors[0] || 'Default';
    addToCart(product, defaultSize, defaultColor, 1);
    addToast(t('addedToCart'));
  };

  // Color mapping for dots
  const colorMap: Record<string, string> = {
    'Black': '#1a1a1a',
    'White': '#f5f5f5',
    'Grey': '#9ca3af',
    'Navy': '#1e3a5f',
    'Blue': '#3b82f6',
    'Light Blue': '#93c5fd',
    'Red': '#ef4444',
    'Brown': '#92400e',
    'Olive': '#65712b',
    'Dark Green': '#166534',
    'Silver': '#c0c0c0',
    'Matte Black': '#2d2d2d',
    'Black/Red': 'linear-gradient(135deg, #1a1a1a 50%, #ef4444 50%)',
  };

  return (
    <Link 
      to={`/product/${product.id}`} 
      className="group relative block rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
      onMouseEnter={() => product.images.length > 1 && setCurrentImageIndex(1)}
      onMouseLeave={() => setCurrentImageIndex(0)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-dark-hover">
        {/* Shimmer placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-dark-card dark:via-dark-hover dark:to-dark-card shimmer-bg z-10" />
        )}

        {/* Main image */}
        <img
          src={product.images[currentImageIndex] || product.images[0]}
          alt={product.name}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Featured badge */}
        {product.featured && (
          <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 z-20">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary-500 text-white shadow-lg shadow-primary-500/30">
              Featured
            </span>
          </div>
        )}

        {/* Image dots indicator */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {product.images.slice(0, 4).map((_, i) => (
              <span key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImageIndex ? 'bg-white w-4' : 'bg-white/50'}`} />
            ))}
          </div>
        )}

        {/* Quick add button */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <button 
            onClick={handleQuickAdd}
            className="flex-1 flex items-center justify-center gap-2 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm text-gray-900 dark:text-white px-4 py-2.5 rounded-xl font-semibold text-sm hover:bg-white dark:hover:bg-dark-card active:scale-95 shadow-lg transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{t('addToCart')}</span>
          </button>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider">
            {product.category}
          </p>
          <p className="text-base font-bold text-gray-900 dark:text-white whitespace-nowrap">
            {product.price.toLocaleString()} <span className="text-xs font-medium text-gray-500">DA</span>
          </p>
        </div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate mb-2">
          {product.name}
        </h3>

        {/* Color dots */}
        <div className="flex items-center gap-1.5">
          {product.colors.slice(0, 4).map((color) => (
            <span
              key={color}
              className="w-3.5 h-3.5 rounded-full border border-gray-200 dark:border-dark-border shadow-sm"
              style={{ background: colorMap[color] || '#ccc' }}
              title={color}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-[10px] text-gray-400 font-medium">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </Link>
  );
};
