import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import { ToastProvider } from './contexts/ToastContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <ThemeProvider>
          <CartProvider>
            <ToastProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow bg-white dark:bg-dark-bg transition-colors">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </ToastProvider>
          </CartProvider>
        </ThemeProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
