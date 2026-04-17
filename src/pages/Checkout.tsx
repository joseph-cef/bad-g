import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Truck, Store, MapPin, Phone, User, CheckCircle2, ArrowRight, Package } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

// --- TELEGRAM CONFIGURATION ---
const TELEGRAM_BOT_TOKEN = "8620257104:AAGE-lP_APOntHaAhU8gEZ7Scj5xIWVxj_g";
const TELEGRAM_CHAT_ID = "7580329356";

export const Checkout = () => {
  const { t, language } = useLanguage();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    wilaya: '',
    commune: '',
    deliveryType: 'homeDelivery'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      addToast(t('emptyCart'));
      return;
    }

    setIsSubmitting(true);

    const orderDate = new Date().toLocaleString(language === 'ar' ? 'ar-DZ' : 'en-GB');
    let messageText = `📦 <b>NEW ORDER</b> 📦\n\n`;

    messageText += `<b>Customer Details:</b>\n`;
    messageText += `👤 Name: ${formData.fullName}\n`;
    messageText += `📱 Phone: ${formData.phone}\n`;
    messageText += `📍 Wilaya: ${formData.wilaya}\n`;
    messageText += `🏙️ Commune: ${formData.commune}\n`;
    messageText += `🏠 Address: ${formData.address}\n`;
    messageText += `🚚 Delivery: ${formData.deliveryType === 'homeDelivery' ? 'Home Delivery' : 'Office Pickup'}\n\n`;

    messageText += `<b>Order Items:</b>\n`;
    cartItems.forEach((item, index) => {
      messageText += `${index + 1}. ${item.name}\n`;
      messageText += `   - Size: ${item.selectedSize} | Color: ${item.selectedColor}\n`;
      messageText += `   - QTY: ${item.quantity} x ${item.price} DA\n`;
    });

    messageText += `\n💰 <b>Total Price: ${cartTotal} DA</b>\n`;
    messageText += `⏳ Date: ${orderDate}`;

    try {
      if (TELEGRAM_BOT_TOKEN === "8620257104:AAGE-lP_APOntHaAhU8gEZ7Scj5xIWVxj_g") {
        console.log("Mock Telegram Message Payload:\n\n", messageText.replace(/<[^>]*>?/gm, ''));
        await new Promise(resolve => setTimeout(resolve, 1500));
      } else {
        const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: messageText,
            parse_mode: 'HTML'
          })
        });
        if (!response.ok) throw new Error('Failed to send telegram message');
      }

      setIsSuccess(true);
      clearCart();
      addToast(t('orderSuccess'));

    } catch (error) {
      console.error(error);
      addToast("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Steps
  const steps = [
    { icon: Package, label: t('cart'), done: true },
    { icon: MapPin, label: t('checkoutForm'), done: false, active: true },
    { icon: CheckCircle2, label: 'Confirmation', done: false },
  ];

  if (isSuccess) {
    return (
      <div className="min-h-[60vh] max-w-3xl mx-auto px-4 sm:px-6 py-20 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mb-8 animate-scaleIn">
          <CheckCircle2 className="w-10 h-10 text-green-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-outfit font-bold text-gray-900 dark:text-white mb-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          {t('orderSuccess')}
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-400 mb-10 max-w-lg animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          Thank you for your order! We have received your request and will contact you shortly to confirm the delivery.
        </p>
        <div className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-500 transition-all shadow-lg shadow-primary-500/20"
          >
            {t('continueShopping')}
            <ArrowRight className={`w-5 h-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[50vh] max-w-7xl mx-auto px-4 py-20 text-center flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('emptyCart')}</h2>
        <button onClick={() => navigate('/shop')} className="text-primary-600 hover:underline font-medium">
          {t('continueShopping')}
        </button>
      </div>
    );
  }

  const inputTheme = "w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 bg-white dark:bg-dark-bg border border-gray-200 dark:border-dark-border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all outline-none";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Progress Steps */}
      <div className="mb-10 max-w-xl mx-auto">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.label}>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${step.done ? 'bg-primary-600 text-white'
                    : step.active ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 ring-2 ring-primary-500/30'
                      : 'bg-gray-100 dark:bg-dark-card text-gray-400'
                  }`}>
                  <step.icon className="w-4 h-4" />
                </div>
                <span className={`text-xs font-medium hidden sm:block ${step.done || step.active ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-3 rounded-full ${step.done ? 'bg-primary-500' : 'bg-gray-200 dark:bg-dark-border'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handlePlaceOrder} className="bg-white dark:bg-dark-card p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-dark-border shadow-card space-y-8">

            {/* Delivery Details */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary-500" />
                Delivery Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('fullName')}</label>
                  <div className="relative">
                    <User className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input required type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={inputTheme} placeholder="John Doe" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('phone')}</label>
                  <div className="relative">
                    <Phone className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputTheme} placeholder="05XX XX XX XX" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('wilaya')}</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input required type="text" name="wilaya" value={formData.wilaya} onChange={handleChange} className={inputTheme} placeholder="Alger" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('commune')}</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input required type="text" name="commune" value={formData.commune} onChange={handleChange} className={inputTheme} placeholder="Sidi M'hamed" />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">{t('address')}</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 rtl:left-auto rtl:right-3 top-3.5 w-4 h-4 text-gray-400" />
                    <textarea required name="address" value={formData.address} onChange={handleChange} rows={3} className={`${inputTheme} resize-none`} placeholder="Detailed address..." />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Type */}
            <div className="pt-6 border-t border-gray-100 dark:border-dark-border">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                {t('deliveryType')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, deliveryType: 'homeDelivery' }))}
                  className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all ${formData.deliveryType === 'homeDelivery'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                      : 'border-gray-100 dark:border-dark-border bg-white dark:bg-dark-bg hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                >
                  <Truck className={`w-6 h-6 shrink-0 ${formData.deliveryType === 'homeDelivery' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`} />
                  <span className={`font-semibold text-sm ${formData.deliveryType === 'homeDelivery' ? 'text-primary-700 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'}`}>
                    {t('homeDelivery')}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, deliveryType: 'officePickup' }))}
                  className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all ${formData.deliveryType === 'officePickup'
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
                      : 'border-gray-100 dark:border-dark-border bg-white dark:bg-dark-bg hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                >
                  <Store className={`w-6 h-6 shrink-0 ${formData.deliveryType === 'officePickup' ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`} />
                  <span className={`font-semibold text-sm ${formData.deliveryType === 'officePickup' ? 'text-primary-700 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400'}`}>
                    {t('officePickup')}
                  </span>
                </button>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6 border-t border-gray-100 dark:border-dark-border">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white py-4 rounded-xl font-bold text-base hover:bg-primary-500 active:scale-[0.98] transition-all shadow-lg shadow-primary-500/20 disabled:opacity-70 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    {t('placeOrder')}
                  </>
                )}
              </button>
              <p className="text-center text-xs text-gray-400 mt-3">
                By placing this order, you agree to our Terms & Conditions.
              </p>
            </div>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-dark-border shadow-card sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-5 pb-4 border-b border-gray-100 dark:border-dark-border">
              Your Order ({cartItems.length})
            </h2>

            <div className="space-y-4 mb-6 max-h-[35vh] overflow-y-auto pr-1">
              {cartItems.map(item => (
                <div key={item.cartId} className="flex gap-3">
                  <div className="w-14 h-14 shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-dark-hover">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{item.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {item.selectedSize} / {item.selectedColor} × {item.quantity}
                    </p>
                    <p className="text-sm font-bold text-primary-600 dark:text-primary-400 mt-1">
                      {(item.price * item.quantity).toLocaleString()} DA
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 dark:border-dark-border pt-4 space-y-3">
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{t('subtotal')}</span>
                <span className="font-medium">{cartTotal.toLocaleString()} DA</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Shipping</span>
                <span>TBD</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-dark-border">
                <span className="text-base font-bold text-gray-900 dark:text-white">{t('total')}</span>
                <span className="text-xl font-bold text-primary-600 dark:text-primary-400">{cartTotal.toLocaleString()} DA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
