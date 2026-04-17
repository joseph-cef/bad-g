import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Moon, Sun, Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { type Language } from '../utils/translations';

export const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prevCartCount, setPrevCartCount] = useState(cartCount);
  const [cartBounce, setCartBounce] = useState(false);
  const location = useLocation();

  // Track scroll for navbar style change
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate cart badge on count change
  useEffect(() => {
    if (cartCount !== prevCartCount && cartCount > 0) {
      setCartBounce(true);
      const timer = setTimeout(() => setCartBounce(false), 300);
      setPrevCartCount(cartCount);
      return () => clearTimeout(timer);
    }
    setPrevCartCount(cartCount);
  }, [cartCount, prevCartCount]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const cycleLanguage = () => {
    const langs: Language[] = ['en', 'fr', 'ar'];
    const currentIndex = langs.indexOf(language);
    const nextIndex = (currentIndex + 1) % langs.length;
    setLanguage(langs[nextIndex]);
  };

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('shop'), path: '/shop' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-dark-bg/80 backdrop-blur-xl shadow-sm border-b border-gray-100/50 dark:border-dark-border/50' 
          : 'bg-white/50 dark:bg-dark-bg/50 backdrop-blur-md border-b border-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 lg:h-18">
            {/* Logo + Nav Links */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                <span className="font-outfit font-extrabold text-2xl tracking-tight text-gray-900 dark:text-white transition-colors">
                  BAD <span className="gradient-text">G</span>
                </span>
              </Link>
              <div className="hidden md:flex md:items-center md:gap-1 md:ml-10 lg:ml-14">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive(link.path)
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-dark-card'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Right actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                onClick={cycleLanguage}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-dark-card transition-all"
                aria-label="Change Language"
              >
                <Globe className="h-[18px] w-[18px]" />
                <span className="text-xs font-bold uppercase tracking-wider">{language}</span>
              </button>

              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-dark-card transition-all"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
              </button>
              
              <Link
                to="/cart"
                className="relative p-2.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-dark-card transition-all"
              >
                <ShoppingBag className="h-[18px] w-[18px]" />
                {cartCount > 0 && (
                  <span className={`absolute -top-0.5 -right-0.5 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold leading-none text-white bg-primary-500 rounded-full ${cartBounce ? 'animate-pulse2' : ''}`}>
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2.5 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-dark-card transition-all"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <div className={`absolute top-16 ${language === 'ar' ? 'left-0' : 'right-0'} w-64 bg-white dark:bg-dark-card shadow-2xl rounded-b-2xl border border-gray-100 dark:border-dark-border animate-fadeInDown`}>
            <div className="py-3 px-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-dark-hover dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
