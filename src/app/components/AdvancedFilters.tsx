import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, X, Filter, MapPin, DollarSign, Star, Clock } from 'lucide-react';

type SiteCategory = 'Historique' | 'Nature' | 'Sahara' | 'Religieux' | 'UNESCO' | 'Aventure' | 'Culture' | 'Architecture' | 'Plage' | 'Vue Panoramique' | 'Luxe' | 'Famille' | 'Neige' | 'Vie Nocturne' | 'Musée';

interface FilterConfig {
  categories: SiteCategory[];
  priceRange: [number, number];
  rating: number;
  accessibility: 'Accessible' | 'Moyenne' | 'Difficile' | '';
  duration: string[];
}

interface AdvancedFiltersProps {
  categories: SiteCategory[];
  onFilterChange: (filters: FilterConfig) => void;
  activeFiltersCount?: number;
}

const CATEGORY_COLORS: Record<SiteCategory, string> = {
  'Historique': '#0F6E56',
  'Nature': '#1D9E75',
  'Sahara': '#BA7517',
  'Religieux': '#8B5A3C',
  'UNESCO': '#E24B4A',
  'Aventure': '#FF6B6B',
  'Culture': '#4A90E2',
  'Architecture': '#7B68EE',
  'Plage': '#00BCD4',
  'Vue Panoramique': '#9C27B0',
  'Luxe': '#FFD700',
  'Famille': '#FF69B4',
  'Neige': '#B0E0E6',
  'Vie Nocturne': '#2C3E50',
  'Musée': '#D2B48C'
};

export function AdvancedFilters({ categories, onFilterChange, activeFiltersCount = 0 }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterConfig>({
    categories: [],
    priceRange: [0, 5000],
    rating: 0,
    accessibility: '',
    duration: []
  });

  const handleCategoryToggle = (cat: SiteCategory) => {
    const updated = filters.categories.includes(cat)
      ? filters.categories.filter(c => c !== cat)
      : [...filters.categories, cat];
    const newFilters = { ...filters, categories: updated };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      categories: [],
      priceRange: [0, 5000],
      rating: 0,
      accessibility: '',
      duration: []
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const hasActiveFilters = Object.values(filters).some(v => {
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'number') return v > 0;
    return v !== '' && v !== null;
  });

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border-2 border-[#0F6E56] text-[#0F6E56] font-bold hover:bg-[#0F6E56]/5 transition-all"
        whileHover={{ scale: 1.02 }}
      >
        <Filter size={18} />
        Filtres
        {hasActiveFilters && (
          <span className="ml-2 px-2 py-1 bg-[#0F6E56] text-white text-xs rounded-full font-black">
            {activeFiltersCount}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-30"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full mt-2 right-0 bg-white rounded-2xl shadow-2xl p-6 z-40 w-80 border border-gray-100"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-gray-900">Filtres</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">Catégories</label>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {categories.map(cat => (
                    <motion.button
                      key={cat}
                      onClick={() => handleCategoryToggle(cat)}
                      className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all text-left ${
                        filters.categories.includes(cat)
                          ? 'bg-[#0F6E56] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {cat}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <DollarSign size={16} />
                  Fourchette de prix
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    min="0"
                    max="5000"
                    value={filters.priceRange[0]}
                    onChange={(e) => {
                      const newFilters = { ...filters, priceRange: [parseInt(e.target.value), filters.priceRange[1]] };
                      setFilters(newFilters);
                      onFilterChange(newFilters);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0F6E56]"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    min="0"
                    max="5000"
                    value={filters.priceRange[1]}
                    onChange={(e) => {
                      const newFilters = { ...filters, priceRange: [filters.priceRange[0], parseInt(e.target.value)] };
                      setFilters(newFilters);
                      onFilterChange(newFilters);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0F6E56]"
                    placeholder="Max"
                  />
                </div>
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <Star size={16} />
                  Note minimum
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => {
                    const newFilters = { ...filters, rating: parseInt(e.target.value) };
                    setFilters(newFilters);
                    onFilterChange(newFilters);
                  }}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#0F6E56]"
                >
                  <option value="0">Toutes les notes</option>
                  <option value="4">4+ ⭐</option>
                  <option value="45">4.5+ ⭐⭐</option>
                  <option value="48">4.8+ ⭐⭐⭐</option>
                  <option value="49">4.9+ ⭐⭐⭐⭐</option>
                </select>
              </div>

              {/* Accessibility */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <MapPin size={16} />
                  Accessibilité
                </label>
                <div className="space-y-2">
                  {['Accessible', 'Moyenne', 'Difficile'].map(acc => (
                    <button
                      key={acc}
                      onClick={() => {
                        const newFilters = { ...filters, accessibility: filters.accessibility === acc ? '' : acc as any };
                        setFilters(newFilters);
                        onFilterChange(newFilters);
                      }}
                      className={`w-full px-3 py-2 rounded-lg text-sm font-semibold text-left transition-all ${
                        filters.accessibility === acc
                          ? 'bg-[#0F6E56] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {acc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">
                  <Clock size={16} />
                  Durée
                </label>
                <div className="space-y-2">
                  {['< 1h', '1-3h', '3-6h', '1 jour+', '2+ jours'].map(dur => (
                    <button
                      key={dur}
                      onClick={() => {
                        const updated = filters.duration.includes(dur)
                          ? filters.duration.filter(d => d !== dur)
                          : [...filters.duration, dur];
                        const newFilters = { ...filters, duration: updated };
                        setFilters(newFilters);
                        onFilterChange(newFilters);
                      }}
                      className={`w-full px-3 py-2 rounded-lg text-sm font-semibold text-left transition-all ${
                        filters.duration.includes(dur)
                          ? 'bg-[#0F6E56] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t border-gray-100">
                <button
                  onClick={handleReset}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                >
                  Réinitialiser
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-2 bg-[#0F6E56] text-white rounded-lg font-bold hover:bg-[#0D5544] transition-colors"
                >
                  Appliquer
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Category tag component
export function CategoryTag({ category, size = 'sm' }: { category: SiteCategory; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }[size];

  return (
    <motion.span
      className={`inline-block rounded-full font-bold text-white whitespace-nowrap ${sizeClass}`}
      style={{ backgroundColor: CATEGORY_COLORS[category] || '#0F6E56' }}
      whileHover={{ scale: 1.05 }}
    >
      {category}
    </motion.span>
  );
}
