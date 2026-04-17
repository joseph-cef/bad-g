import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

export const Cart = () => {
  const { t, language } = useLanguage();
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-gray-100 dark:bg-dark-card rounded-2xl flex items-center justify-center mb-8">
          <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-3xl font-outfit font-bold text-gray-900 dark:text-white mb-3">
          {t('emptyCart')}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link 
          to="/shop"
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-500 transition-all shadow-lg shadow-primary-500/20 active:scale-[0.97]"
        >
          {t('continueShopping')}
          <ArrowRight className={`w-5 h-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <h1 className="text-3xl font-outfit font-bold text-gray-900 dark:text-white mb-2">
        {t('cart')}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
      </p>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Cart Items */}
        <div className="lg:w-2/3 space-y-4">
          {cartItems.map((item) => (
            <div key={item.cartId} className="flex gap-4 sm:gap-6 bg-white dark:bg-dark-card p-4 rounded-2xl border border-gray-100 dark:border-dark-border shadow-card transition-all hover:shadow-card-hover">
              <Link to={`/product/${item.id}`} className="shrink-0 w-20 h-20 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-100 dark:bg-dark-hover">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
              </Link>
              
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white truncate">
                      <Link to={`/product/${item.id}`} className="hover:text-primary-600 transition-colors">
                        {item.name}
                      </Link>
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      {item.selectedSize} / {item.selectedColor}
                    </p>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-white whitespace-nowrap">
                    {(item.price * item.quantity).toLocaleString()} DA
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="inline-flex items-center bg-gray-50 dark:bg-dark-bg rounded-lg overflow-hidden border border-gray-100 dark:border-dark-border">
                    <button 
                      onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-bold text-gray-900 dark:text-white text-sm">
                      {item.quantity}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-hover transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.cartId)}
                    className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                    title={t('remove')}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-card sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              Order Summary
            </h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>{t('subtotal')}</span>
                <span className="font-medium">{cartTotal.toLocaleString()} DA</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Shipping</span>
                <span className="text-primary-600 dark:text-primary-400 font-medium">Calculated at checkout</span>
              </div>
              
              <div className="border-t border-gray-100 dark:border-dark-border pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold text-gray-900 dark:text-white">{t('total')}</span>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">{cartTotal.toLocaleString()} DA</span>
                </div>
              </div>
            </div>

            <Link 
              to="/checkout"
              className="mt-6 w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-500 active:scale-[0.98] transition-all shadow-lg shadow-primary-500/20"
            >
              {t('checkout')}
              <ArrowRight className={`w-5 h-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
            </Link>

            <Link to="/shop" className="mt-4 w-full flex items-center justify-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium">
              {t('continueShopping')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
