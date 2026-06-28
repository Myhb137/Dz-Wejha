import React from 'react';
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
              <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#0F6E56' }}>Destinations</h1>
                <p className="text-gray-600">Affichage de {Math.min(10, filteredSites.length)} sur {filteredSites.length} sites exceptionnels à travers le pays.</p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Rechercher un site..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-2.5 rounded-full border border-gray-200 focus:border-[#0F6E56] focus:ring-2 focus:ring-[#0F6E56]/10 outline-none transition-all"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Tous', 'Historique', 'Nature', 'Sahara', 'Plage'].map((cat) => (
                    <button 
                      key={cat} 
                      onClick={() => setCategoryFilter(cat as any)} 
                      className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all ${categoryFilter === cat ? 'bg-[#0F6E56] text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#0F6E56]'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {filteredSites.slice(0, 10).map((site) => (
                <motion.div 
                  key={site.id} 
                  layout 
                  whileHover={{ y: -6 }} 
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:border-[#0F6E56]/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_30px_rgba(15,110,86,0.06)] group cursor-pointer flex flex-col h-full transition-all duration-300" 
                  onClick={() => handleSiteSelect(site)}
                >
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img src={getSiteImage(site)} alt={site.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-black/45 backdrop-blur-md rounded-full text-[10px] font-bold text-white flex items-center gap-1 border border-white/10">
                      <MapPin size={10} className="text-emerald-400" /> {site.wilaya}
                    </div>
                    
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-md border border-gray-100">
                      <div className="text-[10px] font-black text-[#0F6E56]">{site.wilayaNumber}</div>
                    </div>

                    <div className="absolute bottom-3 left-3 flex gap-1">
                      <span className="px-2 py-0.5 bg-white/95 backdrop-blur text-[9px] font-extrabold text-[#0F6E56] rounded-md uppercase tracking-wider">
                        {site.categories[0]}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="mb-4">
                      <div className="flex items-center gap-1 text-gray-400 mb-1">
                        <MapPin size={10} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{site.wilaya}</span>
                      </div>
                      <h3 className="font-extrabold text-gray-900 text-base mb-1.5 group-hover:text-[#0F6E56] transition-colors leading-snug line-clamp-1">{site.name}</h3>
                      <p className="text-gray-500 text-xs line-clamp-3 leading-relaxed">{site.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-auto">
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded text-amber-700">
                        <Star className="text-amber-500 fill-amber-500" size={12} />
                        <span className="font-bold text-[10px]">{site.rating.toFixed(1)}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-[#0F6E56] text-sm">{site.price === 0 ? 'Gratuit' : `${site.price} DZD`}</span>
                        <div className="w-6 h-6 rounded-full bg-[#F0F9F7] group-hover:bg-[#0F6E56] flex items-center justify-center text-[#0F6E56] group-hover:text-white transition-colors duration-300 shadow-sm">
                          <ChevronRight size={12} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {filteredSites.length === 0 && (
              <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200"><div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6"><Compass className="text-gray-300 w-10 h-10" /></div><h3 className="text-2xl font-bold text-gray-400 mb-4">Aucun site trouvé</h3><button onClick={() => { setCategoryFilter('Tous'); setHeroSearchFilters({ wilaya: 'Toutes les wilayas', type: 'Tous' }); }} className="text-[#0F6E56] font-bold underline">Réinitialiser les filtres</button></div>
            )}
          </div>
        } />

  );
}
