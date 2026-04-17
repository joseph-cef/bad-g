import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const { t, language } = useLanguage();
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  const categories = [
    { name: 'Clothes', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=600', count: products.filter(p => p.category === 'Clothes').length },
    { name: 'Jackets / Coats', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600', count: products.filter(p => p.category === 'Jackets / Coats').length },
    { name: 'Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600', count: products.filter(p => p.category === 'Shoes').length },
    { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=600', count: products.filter(p => p.category === 'Accessories').length },
  ];

  const perks = [
    { icon: Truck, title: 'Fast Delivery', desc: 'All across Algeria' },
    { icon: Shield, title: 'Secure Payment', desc: 'Cash on delivery' },
    { icon: Headphones, title: '24/7 Support', desc: 'Contact us anytime' },
    { icon: Sparkles, title: 'Premium Quality', desc: 'Only the best' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-[85vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e07?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Background" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 dark:from-black/90 dark:via-black/70 dark:to-black/50" />
          {/* Decorative gradient orb */}
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="opacity-0 animate-fadeInUp mb-6" style={{ animationDelay: '0s' }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-semibold border border-white/10 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-primary-400" />
                New Collection 2026
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-outfit font-extrabold tracking-tight text-white mb-6 opacity-0 animate-fadeInUp text-balance" style={{ animationDelay: '0.1s' }}>
              {t('heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed opacity-0 animate-fadeInUp" style={{ animationDelay: '0.25s' }}>
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-wrap gap-4 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <Link 
                to="/shop" 
                className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-primary-500 transition-all transform hover:scale-[1.03] shadow-xl shadow-primary-500/25 active:scale-[0.97]"
              >
                {t('shopNow')}
                <ArrowRight className={`w-5 h-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
              </Link>
              <Link 
                to="/shop" 
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-white/20 border border-white/15 transition-all"
              >
                {t('allProducts')}
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 animate-float">
          <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white/40 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Perks Bar */}
      <section className="bg-white dark:bg-dark-card border-y border-gray-100 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x rtl:divide-x-reverse divide-gray-100 dark:divide-dark-border">
            {perks.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-center gap-3 py-5 px-4 lg:px-6">
                <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2">{t('trendingProducts')}</p>
            <h2 className="text-3xl md:text-4xl font-outfit font-bold tracking-tight text-gray-900 dark:text-white">
              {t('featuredProducts')}
            </h2>
          </div>
          <Link 
            to="/shop" 
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors group"
          >
            {t('allProducts')}
            <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${language === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
          </Link>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 dark:text-primary-400">
            {t('allProducts')}
            <ArrowRight className={`w-4 h-4 ${language === 'ar' ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-50 dark:bg-dark-bg py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2">Browse</p>
            <h2 className="text-3xl md:text-4xl font-outfit font-bold tracking-tight text-gray-900 dark:text-white">
              {t('categories')}
            </h2>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat) => (
              <Link 
                key={cat.name} 
                to="/shop" 
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden"
              >
                <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/20 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">{cat.name}</h3>
                  <p className="text-xs text-gray-300">{cat.count} products</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-primary-900 dark:from-dark-card dark:via-dark-card dark:to-primary-900/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]" />
        
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-outfit font-bold text-white mb-6 text-balance">
            Ready to upgrade your wardrobe?
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
            Explore our full collection and find pieces that define your unique style.
          </p>
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-primary-500 transition-all transform hover:scale-[1.03] shadow-xl shadow-primary-500/25"
          >
            {t('shopNow')}
            <ArrowRight className={`w-5 h-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </section>
    </div>
  );
};
