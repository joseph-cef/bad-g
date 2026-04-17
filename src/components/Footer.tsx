import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Mail, MapPin, Phone as PhoneIcon } from 'lucide-react';

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.46V13a8.28 8.28 0 005.58 2.17v-3.44a4.85 4.85 0 01-3.59-1.47V6.69h3.59z" />
  </svg>
);

export const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { name: t('home'), path: '/' },
    { name: t('shop'), path: '/shop' },
    { name: t('cart'), path: '/cart' },
  ];

  const socialLinks = [
    { icon: FacebookIcon, label: 'Facebook', href: '#' },
    { icon: InstagramIcon, label: 'Instagram', href: '#' },
    { icon: TwitterIcon, label: 'X (Twitter)', href: '#' },
    { icon: TikTokIcon, label: 'TikTok', href: '#' },
  ];

  return (
    <footer className="relative bg-gray-900 dark:bg-dark-card text-gray-300 mt-auto overflow-hidden">
      {/* Gradient top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter section */}
        <div className="py-10 border-b border-gray-800 dark:border-dark-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left rtl:md:text-right">
              <h3 className="text-xl font-bold text-white mb-1">Stay in the loop</h3>
              <p className="text-sm text-gray-400">Subscribe to get special offers and updates.</p>
            </div>
            <div className="flex w-full max-w-md">
              <div className="relative flex-1">
                <Mail className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 rtl:pl-4 rtl:pr-10 pr-4 py-3 bg-gray-800 dark:bg-dark-bg border border-gray-700 dark:border-dark-border rounded-l-xl rtl:rounded-l-none rtl:rounded-r-xl text-white placeholder-gray-500 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none"
                />
              </div>
              <button className="px-6 py-3 bg-primary-600 hover:bg-primary-500 text-white font-semibold text-sm rounded-r-xl rtl:rounded-r-none rtl:rounded-l-xl transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-outfit font-extrabold text-2xl text-white">
                BAD <span className="gradient-text">G</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              Redefine your style with premium streetwear and accessories. Quality meets urban fashion.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 rounded-lg bg-gray-800 dark:bg-dark-bg hover:bg-primary-600 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary-500/20"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-400 hover:text-primary-400 transition-colors duration-200">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Customer Service</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">Return Policy</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-primary-400 transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-5">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">Algeria</span>
              </li>
              <li className="flex items-start gap-2.5">
                <PhoneIcon className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">+213 XXX XXX XXX</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">contact@badg.dz</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-gray-800 dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} BAD G. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
