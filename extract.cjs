const fs = require('fs');
const app = fs.readFileSync('src/app/App.tsx', 'utf-8');
const lines = app.split('\n');

const homeJSX = lines.slice(499, 950).join('\n'); 
fs.mkdirSync('src/pages', { recursive: true });

const content = `import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Users, Search, Star, ChevronRight, Compass, History, Camera, Sparkles, ArrowRight } from 'lucide-react';
import { Site } from '../types';
import { getMappedImage } from '../utils/imageMapper';
import { useNavigate } from 'react-router-dom';
import { HERO_SLIDES, WILAYAS } from '../data/sites';

function HeroSection({ 
  selectedDate, setSelectedDate, visitorCount, setVisitorCount, onSearch
}: any) {
  const [slide, setSlide] = useState(0);
  const [searchWilaya, setSearchWilaya] = useState('Toutes les wilayas');
  const [searchType, setSearchType] = useState('Tous');
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(id);
  }, []);

  const handleSearch = () => {
    onSearch({ wilaya: searchWilaya, type: searchType });
    navigate('/catalogue');
  };

  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] overflow-hidden flex items-center justify-center">
      {/* Background Slides */}
      {HERO_SLIDES.map((img, i) => (
        <div 
          key={i} 
          className="absolute inset-0 transition-opacity duration-[1.6s] ease-in-out"
          style={{ opacity: i === slide ? 1 : 0, zIndex: i === slide ? 1 : 0 }}
        >
          <img src={img.src} alt={img.label} className="w-full h-full object-cover object-center"
            style={{ transform: i === slide ? 'scale(1.05)' : 'scale(1)', transition: 'transform 6.5s ease-in-out' }} />
        </div>
      ))}
      <div className="absolute inset-0 z-1 bg-gradient-to-tr from-[#05281E]/95 via-[#0F6E56]/75 to-transparent" />
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-transparent via-transparent to-[#F8F5EF]" />
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 text-left">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/10">
              <Sparkles size={14} className="text-amber-300 animate-pulse" />
              <span className="text-white font-extrabold text-xs tracking-wider uppercase">{HERO_SLIDES[slide].label}</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight mb-6 font-serif">
              Explorez les <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-white drop-shadow-sm font-bold">trésors cachés</span> <br />
              de l'Algérie.
            </h1>
            <p className="text-white/85 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mb-10">
              Planifiez intelligemment votre visite des sites patrimoniaux et naturels algériens les plus spectaculaires avec l'assistance de Wejha AI.
            </p>
            <div className="flex flex-wrap gap-8 sm:gap-12 items-center">
              {[ { icon: MapPin, value: '58', label: 'Wilayas' }, { icon: Star, value: '50+', label: 'Joyaux Phares' }, { icon: Users, value: '100%', label: 'Authentique' } ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/15 backdrop-blur-md border border-white/20 shadow-md">
                    <item.icon size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="font-extrabold text-2xl text-white leading-none">{item.value}</div>
                    <div className="text-white/60 text-xs font-bold uppercase tracking-widest mt-1">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="lg:col-span-5 w-full">
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} className="w-full">
            <div className="bg-white/80 backdrop-blur-3xl rounded-[2.5rem] p-6 sm:p-8 shadow-[0_32px_64px_rgba(0,0,0,0.18)] border border-white/60 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#1D9E75]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 text-left">
                <h3 className="text-2xl font-black text-gray-900 mb-2 font-serif" style={{ color: '#0F6E56' }}>Planifier un voyage</h3>
                <p className="text-gray-500 text-xs font-bold mb-6 uppercase tracking-wider">Accès instantané & régulation des flux</p>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="flex items-center gap-1.5 font-bold text-xs text-gray-700 mb-2">
                      <MapPin size={14} className="text-[#0F6E56]" /> Wilaya de Destination
                    </label>
                    <select value={searchWilaya} onChange={e => setSearchWilaya(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:bg-white focus:border-[#0F6E56] focus:ring-2 focus:ring-[#0F6E56]/15 outline-none font-bold text-gray-800 text-sm transition-all cursor-pointer">
                      <option>Toutes les wilayas</option>
                      {WILAYAS.map(w => <option key={w.number}>{w.name}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 font-bold text-xs text-gray-700 mb-2">
                        <Calendar size={14} className="text-[#0F6E56]" /> Date de Visite
                      </label>
                      <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:bg-white focus:border-[#0F6E56] focus:ring-2 focus:ring-[#0F6E56]/15 outline-none font-bold text-gray-800 text-sm transition-all" />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 font-bold text-xs text-gray-700 mb-2">
                        <Users size={14} className="text-[#0F6E56]" /> Visiteurs
                      </label>
                      <select value={visitorCount} onChange={e => setVisitorCount(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:bg-white focus:border-[#0F6E56] focus:ring-2 focus:ring-[#0F6E56]/15 outline-none font-bold text-gray-800 text-sm transition-all cursor-pointer">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} pers.</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center gap-1.5 font-bold text-xs text-gray-700 mb-2">
                      <Sparkles size={14} className="text-[#0F6E56]" /> Style d'Exploration
                    </label>
                    <select value={searchType} onChange={e => setSearchType(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:bg-white focus:border-[#0F6E56] focus:ring-2 focus:ring-[#0F6E56]/15 outline-none font-bold text-gray-800 text-sm transition-all cursor-pointer">
                      <option>Tous</option><option>Historique</option><option>Nature</option><option>Sahara</option><option>Plage</option>
                    </select>
                  </div>
                </div>
                <motion.button onClick={handleSearch} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-4 bg-gradient-to-r from-[#0F6E56] to-[#1D9E75] text-white font-extrabold rounded-2xl shadow-lg shadow-[#0F6E56]/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <Search size={18} /><span>Rechercher les Destinations</span><ChevronRight size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const getSiteImage = (site: Site) => getMappedImage(site.name, site.image);

export default function Home({
  selectedDate, setSelectedDate, visitorCount, setVisitorCount, setHeroSearchFilters,
  setCategoryFilter, recommendationFilter, setRecommendationFilter, recommendedSites,
  handleSiteSelect, offerDates, setOfferDates
}: any) {
  const navigate = useNavigate();
  return (
    ${homeJSX}
  );
}
`;
fs.writeFileSync('src/pages/Home.tsx', content);

const catalogueJSX = lines.slice(954, 1047).join('\n');
const catalogueContent = `import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Search, Star, Filter, ArrowRight, X } from 'lucide-react';
import { Site } from '../types';
import { getMappedImage } from '../utils/imageMapper';

const getSiteImage = (site: Site) => getMappedImage(site.name, site.image);

export default function Catalogue({
  searchQuery, setSearchQuery, categoryFilter, setCategoryFilter,
  heroSearchFilters, setHeroSearchFilters, filteredSites,
  handleSiteSelect, offerDates, setOfferDates, selectedDate
}: any) {
  return (
    ${catalogueJSX}
  );
}
`;
fs.writeFileSync('src/pages/Catalogue.tsx', catalogueContent);

const wilayasJSX = lines.slice(1048, 1060).join('\n');
const wilayasContent = `import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Search } from 'lucide-react';
import { SITES, WILAYAS } from '../data/sites';
import { useNavigate } from 'react-router-dom';

export default function Wilayas({
  setHeroSearchFilters, setCategoryFilter
}: any) {
  const [wilayaSearch, setWilayaSearch] = useState('');
  const navigate = useNavigate();
  return (
    ${wilayasJSX}
  );
}
`;
fs.writeFileSync('src/pages/Wilayas.tsx', wilayasContent);
