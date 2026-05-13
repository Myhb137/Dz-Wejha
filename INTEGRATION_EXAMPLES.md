# 🔗 Integration Examples

## Example 1: Enhanced Catalogue Page

```tsx
// src/app/pages/Catalogue.tsx
import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { AdvancedFilters } from '../components/AdvancedFilters';
import { SiteCard } from '../components/SiteCard';
import { GridSkeleton } from '../components/SkeletonLoader';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { Button } from '../components/Button';

interface FilterConfig {
  categories: string[];
  priceRange: [number, number];
  rating: number;
  accessibility: string;
  duration: string[];
}

export default function CataloguePage() {
  const [sites] = useState(SITES); // Your sites data
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterConfig>({
    categories: [],
    priceRange: [0, 5000],
    rating: 0,
    accessibility: '',
    duration: []
  });
  const [favorites, setFavorites] = useState<number[]>([]);

  // Filter sites based on active filters
  const filteredSites = useMemo(() => {
    return sites.filter(site => {
      // Category filter
      if (filters.categories.length > 0) {
        if (!site.categories.some(c => filters.categories.includes(c))) {
          return false;
        }
      }

      // Price filter
      if (site.price < filters.priceRange[0] || site.price > filters.priceRange[1]) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && site.rating < filters.rating / 10) {
        return false;
      }

      // Accessibility filter
      if (filters.accessibility && site.accessibility !== filters.accessibility) {
        return false;
      }

      return true;
    });
  }, [sites, filters]);

  const handleSiteSelect = (id: number) => {
    // Navigate to site details or open modal
    console.log('Selected site:', id);
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <ErrorBoundary>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Découvrez nos destinations
          </h1>
          <p className="text-gray-600 text-lg">
            {filteredSites.length} destination{filteredSites.length !== 1 ? 's' : ''} trouvée{filteredSites.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex gap-4 items-center">
          <AdvancedFilters
            categories={['Historique', 'Nature', 'Sahara', 'Religieux', 'UNESCO', 'Aventure', 'Culture', 'Architecture', 'Plage', 'Vue Panoramique', 'Luxe', 'Famille', 'Neige', 'Vie Nocturne', 'Musée']}
            onFilterChange={setFilters}
            activeFiltersCount={
              filters.categories.length +
              (filters.accessibility ? 1 : 0) +
              (filters.rating > 0 ? 1 : 0) +
              (filters.duration.length > 0 ? 1 : 0)
            }
          />
          
          {/* Active filters display */}
          {filters.categories.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {filters.categories.map(cat => (
                <span key={cat} className="px-3 py-1 bg-[#0F6E56]/10 text-[#0F6E56] rounded-full text-sm font-bold">
                  {cat}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Sites Grid */}
        {loading ? (
          <GridSkeleton count={12} />
        ) : filteredSites.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSites.map(site => (
              <SiteCard
                key={site.id}
                {...site}
                variant="grid"
                isFavorite={favorites.includes(site.id)}
                onSelect={handleSiteSelect}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              🔍
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune destination trouvée</h3>
            <p className="text-gray-600 mb-6">Essayez de modifier vos filtres</p>
            <Button onClick={() => setFilters({ categories: [], priceRange: [0, 5000], rating: 0, accessibility: '', duration: [] })}>
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
```

---

## Example 2: Enhanced Header/Navigation

```tsx
// Updated Layout component for App.tsx
import { useState } from 'react';
import { MobileNav, MobileBottomNav } from './components/MobileNav';
import { Button } from './components/Button';

const Layout = ({ children, onOpenAuth }: { children: React.ReactNode; onOpenAuth: () => void }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen" style={{ fontFamily: 'DM Sans, sans-serif', backgroundColor: '#F8F5EF' }}>
      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 md:gap-3 cursor-pointer group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#0F6E56] to-[#1D9E75] flex items-center justify-center group-hover:rotate-6 transition-transform">
                <MapPin className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="font-black text-xl md:text-2xl tracking-tighter" style={{ color: '#0F6E56' }}>
                WEJHA
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative font-bold transition-all duration-200 group ${
                    location.pathname === item.path ? 'text-[#0F6E56]' : 'text-gray-600 hover:text-[#0F6E56]'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="outline"
                onClick={onOpenAuth}
              >
                <User size={18} />
                Connexion
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        currentPath={location.pathname}
      />

      {/* Main Content */}
      <main className="relative pb-20 lg:pb-12">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav currentPath={location.pathname} />

      {/* Footer */}
      <footer className="bg-[#05281E] text-white py-16 md:py-24">
        {/* Footer content... */}
      </footer>
    </div>
  );
};
```

---

## Example 3: Feed with Error Handling and Skeletons

```tsx
// AlgeriaFeed.tsx with improvements
import { ErrorBoundary } from './ErrorBoundary';
import { FeedSkeleton } from './SkeletonLoader';
import { SiteCard } from './SiteCard';

export default function AlgeriaFeed() {
  const [items, setItems] = useState<InfoItem[]>(INITIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMore = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    setError(null);
    try {
      // Fetch more data
      setTimeout(() => {
        setItems(prev => [...prev, ...MORE_DATA[page]]);
        setPage(p => p + 1);
        setLoading(false);
      }, 1500);
    } catch (err) {
      setError('Erreur lors du chargement. Veuillez réessayer.');
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  return (
    <ErrorBoundary>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#0F6E56' }}>
            Découvrir l'Algérie
          </h1>
          <p className="text-gray-500">
            Un flux infini de connaissances sur notre patrimoine, notre culture et notre histoire.
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex justify-between items-center">
            {error}
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        {/* Content */}
        {loading && items.length === 0 ? (
          <FeedSkeleton />
        ) : (
          <div className="space-y-12">
            {items.map(item => (
              <SiteCard
                key={item.id}
                id={parseInt(item.id)}
                name={item.title}
                wilaya={item.category}
                categories={[item.category as any]}
                price={0}
                rating={4.5}
                duration="4 min"
                accessibility="Accessible"
                image={item.image}
                variant="featured"
              />
            ))}
          </div>
        )}

        {/* Load more trigger */}
        <div ref={loaderRef} className="py-20 flex flex-col items-center justify-center gap-4">
          {loading && <LoadingSpinner />}
          {!hasMore && items.length > 0 && (
            <div className="text-center">
              <p className="text-gray-500 font-bold">
                Vous avez parcouru tout le fil !
              </p>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
```

---

## Example 4: Using Button Component Variants

```tsx
// Various button usage examples
import { Button, IconButton, FloatingButton } from './components/Button';

export function ButtonShowcase() {
  return (
    <div className="space-y-8 p-8">
      {/* Primary Buttons */}
      <div>
        <h3 className="font-bold mb-4">Primary (Main CTAs)</h3>
        <div className="flex gap-4 flex-wrap">
          <Button size="sm">Petit</Button>
          <Button size="md">Standard</Button>
          <Button size="lg">Grand</Button>
        </div>
      </div>

      {/* Secondary Buttons */}
      <div>
        <h3 className="font-bold mb-4">Secondary (Alternative Actions)</h3>
        <div className="flex gap-4 flex-wrap">
          <Button variant="secondary" size="md">Alternative</Button>
          <Button variant="secondary" size="lg">Action Alternative</Button>
        </div>
      </div>

      {/* Outline Buttons */}
      <div>
        <h3 className="font-bold mb-4">Outline (Subtle Actions)</h3>
        <div className="flex gap-4 flex-wrap">
          <Button variant="outline" size="md">Annuler</Button>
          <Button variant="outline" size="lg">En savoir plus</Button>
        </div>
      </div>

      {/* Ghost Buttons */}
      <div>
        <h3 className="font-bold mb-4">Ghost (Minimal)</h3>
        <div className="flex gap-4 flex-wrap">
          <Button variant="ghost">Lien</Button>
          <Button variant="ghost">Autre lien</Button>
        </div>
      </div>

      {/* Icon Buttons */}
      <div>
        <h3 className="font-bold mb-4">Icon Buttons</h3>
        <div className="flex gap-4">
          <IconButton>❤️</IconButton>
          <IconButton>⭐</IconButton>
          <IconButton>🔖</IconButton>
        </div>
      </div>

      {/* Loading State */}
      <div>
        <h3 className="font-bold mb-4">Loading State</h3>
        <Button loading={true}>Sauvegarde...</Button>
      </div>

      {/* Disabled State */}
      <div>
        <h3 className="font-bold mb-4">Disabled State</h3>
        <Button disabled>Désactivé</Button>
      </div>
    </div>
  );
}
```

---

## Quick Start Checklist

```markdown
- [ ] Copy new component files to src/app/components/
- [ ] Update imports in your pages
- [ ] Wrap pages with <ErrorBoundary>
- [ ] Replace buttons with <Button> component
- [ ] Add AdvancedFilters to catalogue page
- [ ] Update SiteCard usage to new component
- [ ] Add MobileNav to Layout
- [ ] Test on mobile device
- [ ] Test keyboard navigation
- [ ] Verify all animations work smoothly
```

