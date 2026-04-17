import { useState, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal, Grid2x2 } from 'lucide-react';

export const Shop = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Clothes", "Jackets / Coats", "Shoes", "Bags", "Hats / Caps", "Accessories"];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return products;
    return products.filter(p => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-dark-card border-b border-gray-100 dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-outfit font-bold text-gray-900 dark:text-white mb-2">
            {selectedCategory === "All" ? t('allProducts') : selectedCategory}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile: Horizontal scrollable chips */}
          <div className="lg:hidden overflow-x-auto -mx-4 px-4 pb-2">
            <div className="flex gap-2 min-w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20'
                      : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-dark-border hover:border-primary-300 dark:hover:border-primary-700'
                  }`}
                >
                  {category === "All" ? t('allProducts') : category}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop: Sidebar Filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <div className="bg-white dark:bg-dark-card p-5 rounded-2xl border border-gray-100 dark:border-dark-border shadow-card">
                <div className="flex items-center gap-2 mb-5">
                  <SlidersHorizontal className="w-4 h-4 text-gray-500" />
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    {t('categories')}
                  </h2>
                </div>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left rtl:text-right px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-hover'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category === "All" ? t('allProducts') : category}</span>
                        <span className={`text-xs font-medium ${selectedCategory === category ? 'text-primary-500' : 'text-gray-400'}`}>
                          {category === "All" ? products.length : products.filter(p => p.category === category).length}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gray-100 dark:bg-dark-card flex items-center justify-center">
                  <Grid2x2 className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No products found</p>
                <p className="text-gray-500 dark:text-gray-400">Try selecting a different category.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
