import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Info, 
  MapPin, 
  Clock, 
  Camera, 
  BookOpen, 
  Loader2,
  Heart,
  Share2,
  Flame,
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { ErrorBoundary } from './ErrorBoundary';
import { FeedSkeleton } from './SkeletonLoader';
import { Button } from './Button';

interface InfoItem {
  id: string;
  title: string;
  category: 'Culture' | 'Histoire' | 'Gastronomie' | 'Nature';
  description: string;
  image: string;
  date: string;
  trending?: boolean;
  views?: number;
}

const INITIAL_DATA: InfoItem[] = [
  {
    id: '1',
    title: "L'art du Couscous Algérien",
    category: 'Gastronomie',
    description: "Classé au patrimoine immatériel de l'UNESCO, le couscous est bien plus qu'un plat : c'est un symbole de partage et de convivialité qui varie selon les régions (Kabylie, Sud, Est, Ouest).",
    image: "https://images.pexels.com/photos/36984667/pexels-photo-36984667.jpeg",
    date: "14 Mai 2026",
    trending: true,
    views: 2847
  },
  {
    id: '2',
    title: "Le Tassili n'Ajjer : Plus grand musée à ciel ouvert",
    category: 'Nature',
    description: "Avec plus de 15 000 dessins et gravures rupestres, ce plateau montagneux raconte l'histoire de l'humanité datant de plus de 10 000 ans.",
    image: "https://www.thecasbahpost.com/wp-content/uploads/2016/09/Tassili-Roches.jpg",
    date: "12 Mai 2026",
    trending: true,
    views: 3521
  },
  {
    id: '3',
    title: "L'épopée de l'Émir Abdelkader",
    category: 'Histoire',
    description: "Fondateur de l'État algérien moderne, l'Émir Abdelkader était un chef militaire, poète et philosophe reconnu mondialement pour son humanisme.",
    image: "https://www.arabnews.fr/sites/default/files/styles/670x395/public/2024-04/FF.jpg?h=c71d0c67",
    date: "10 Mai 2026",
    views: 1925
  }
];

const MORE_DATA: InfoItem[][] = [
  [
    {
      id: '4',
      title: "La Casbah : Un labyrinthe d'histoire",
      category: 'Culture',
      description: "Ses ruelles étroites et ses maisons traditionnelles en font l'un des sites les plus emblématiques de la Méditerranée.",
      image: "https://lalgerieaujourdhui.dz/wp-content/uploads/2024/02/La-casbah-dAlger.jpg",
      date: "08 Mai 2026",
      views: 2156
    },
    {
      id: '5',
      title: "Les Gorges du Rhummel, Constantine",
      category: 'Nature',
      description: "Perchés sur les rochers de Constantine, ces jardins offrent une vue imprenable sur les gorges du Rhummel.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRefo4rTrEkxMS-jmcHBITZfqtRUcVfNYwyoA&stlBwA&s",
      date: "06 Mai 2026",
      views: 1834
    }
  ],
  [
    {
      id: '6',
      title: "Le Karakou : Élégance Algéroise",
      category: 'Culture',
      description: "Un costume traditionnel brodé de fil d'or, témoignant du savoir-faire artisanal séculaire des femmes d'Alger.",
      image: "https://touhfawebmarket.dz/wp-content/uploads/2025/10/karakou-dz.jpg",
      date: "04 Mai 2026",
      views: 1456
    },
    {
      id: '7',
      title: "Taghit : L'enchanteresse du désert",
      category: 'Nature',
      description: "Une oasis entourée de dunes de sable doré, célèbre pour son ksar millénaire et ses gravures rupestres.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgYUimGWQ5Hli1bWP5O6PS9lcH7YvqafnMRQ&s",
      date: "02 Mai 2026",
      views: 2678
    }
  ]
];

const CATEGORIES: (InfoItem['category'])[] = ['Culture', 'Histoire', 'Gastronomie', 'Nature'];

const CATEGORY_COLORS: Record<InfoItem['category'], string> = {
  Culture: '#0F6E56',
  Histoire: '#8B5A3C',
  Gastronomie: '#BA7517',
  Nature: '#1D9E75'
};

function DiscoverHeader() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12 md:mb-16"
    >
      <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-emerald-50 rounded-full">
        <Sparkles size={16} className="text-[#0F6E56]" />
        <span className="text-sm font-bold text-[#0F6E56]">Flux de découverte en direct</span>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#0F6E56' }}>
        Découvrir l'Algérie
      </h1>
      
      <p className="text-gray-600 max-w-2xl mx-auto text-lg">
        Plongez dans un flux infini de pépites historiques, culturelles et naturelles qui font la richesse de notre patrimoine.
      </p>
    </motion.div>
  );
}

function CategoryFilter({ 
  activeCategory, 
  onCategoryChange 
}: { 
  activeCategory: InfoItem['category'] | 'Tous'; 
  onCategoryChange: (cat: InfoItem['category'] | 'Tous') => void 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide mb-8"
    >
      {(['Tous', ...CATEGORIES] as const).map(cat => (
        <motion.button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`px-4 py-2 rounded-full font-bold whitespace-nowrap transition-all ${
            activeCategory === cat
              ? 'text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          style={
            activeCategory === cat && cat !== 'Tous'
              ? { backgroundColor: CATEGORY_COLORS[cat as InfoItem['category']] }
              : {}
          }
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {cat}
        </motion.button>
      ))}
    </motion.div>
  );
}

function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="relative">
        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Rechercher un sujet, une wilaya, une histoire..."
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#0F6E56] transition-colors"
        />
      </div>
    </motion.div>
  );
}

export default function AlgeriaFeed() {
  const [items, setItems] = useState<InfoItem[]>(INITIAL_DATA);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [activeCategory, setActiveCategory] = useState<InfoItem['category'] | 'Tous'>('Tous');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [initialLoading, setInitialLoading] = useState(false);
  
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchMore = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    setTimeout(() => {
      if (page < MORE_DATA.length) {
        setItems(prev => [...prev, ...MORE_DATA[page]]);
        setPage(p => p + 1);
      } else {
        setHasMore(false);
      }
      setLoading(false);
    }, 1500);
  }, [loading, hasMore, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !initialLoading) {
          fetchMore();
        }
      },
      { threshold: 0.5 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [fetchMore, initialLoading]);

  // Filter items based on category and search
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchCategory = activeCategory === 'Tous' || item.category === activeCategory;
      const matchSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [items, activeCategory, searchQuery]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <ErrorBoundary>
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 pb-24 lg:pb-12">
        {/* Header */}
        <DiscoverHeader />

        {/* Search Bar */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* Category Filter */}
        <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

        {/* Results info */}
        {filteredItems.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 text-sm text-gray-600 font-medium"
          >
            {filteredItems.length} article{filteredItems.length !== 1 ? 's' : ''} trouvé{filteredItems.length !== 1 ? 's' : ''}
            {activeCategory !== 'Tous' && ` en ${activeCategory}`}
          </motion.div>
        )}

        {/* Content */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.article 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-50 group transition-all flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    alt={item.title} 
                  />
                  
                  {/* Badges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                    <span 
                      className="px-3 py-1 bg-white/95 backdrop-blur rounded-full text-xs font-black uppercase tracking-wider shadow-lg"
                      style={{ color: CATEGORY_COLORS[item.category] }}
                    >
                      {item.category}
                    </span>
                    {item.trending && (
                      <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs font-black flex items-center gap-1.5 shadow-lg">
                        <Flame size={12} /> En tendance
                      </span>
                    )}
                  </div>

                  {/* Favorite button */}
                  <motion.button
                    onClick={() => toggleFavorite(item.id)}
                    className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart 
                      size={18} 
                      className={favorites.includes(item.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'} 
                    />
                  </motion.button>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  {/* Text content */}
                  <div>
                    {/* Meta info */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        {item.date}
                      </div>
                      {item.views && (
                        <div className="flex items-center gap-1">
                          <TrendingUp size={12} />
                          {item.views.toLocaleString('fr-FR')}
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h2 className="text-lg font-bold mb-2 group-hover:text-[#0F6E56] transition-colors line-clamp-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {item.title}
                    </h2>
                    
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed text-sm line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <motion.button 
                        onClick={() => toggleFavorite(item.id)}
                        className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors font-bold text-xs"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Heart size={14} /> J'aime
                      </motion.button>
                    </div>
                    <motion.button 
                      className="text-[#0F6E56] font-bold hover:underline flex items-center gap-1 text-xs"
                      whileHover={{ x: 2 }}
                    >
                      Lire <Info size={12} />
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              🔍
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Aucun article trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              Essayez avec d'autres mots-clés ou catégories
            </p>
            <Button onClick={() => { setActiveCategory('Tous'); setSearchQuery(''); }}>
              Réinitialiser les filtres
            </Button>
          </motion.div>
        )}

        {/* Load more trigger */}
        <div ref={loaderRef} className="py-20 flex flex-col items-center justify-center gap-4">
          {loading ? (
            <>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                <Loader2 className="text-[#0F6E56]" size={40} />
              </motion.div>
              <p className="text-gray-400 font-bold">Chargement de pépites historiques...</p>
            </>
          ) : hasMore ? (
            <motion.p 
              animate={{ opacity: [0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-gray-400 text-sm"
            >
              ↓ Continuez à défiler pour en savoir plus
            </motion.p>
          ) : filteredItems.length > 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="text-[#0F6E56]" size={32} />
              </div>
              <p className="text-gray-500 font-bold">Vous avez parcouru tout le fil !</p>
              <p className="text-gray-400 text-sm mt-2">Revenez demain pour de nouvelles découvertes.</p>
            </motion.div>
          ) : null}
        </div>
      </div>
    </ErrorBoundary>
  );
}
