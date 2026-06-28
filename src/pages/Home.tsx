import React, { useState, useEffect } from 'react';
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
              <div className="animate-in fade-in duration-1000">
            <HeroSection selectedDate={selectedDate} setSelectedDate={setSelectedDate} visitorCount={visitorCount} setVisitorCount={setVisitorCount} onSearch={setHeroSearchFilters} />
            
            {/* Explorez par Thèmes */}
            <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
              <div className="text-center mb-16">
                <span className="text-xs font-black text-amber-600 uppercase tracking-widest block mb-3">Sélection exclusive</span>
                <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#0F6E56' }}>Explorez par Thèmes</h2>
                <p className="text-gray-500 max-w-xl mx-auto">Découvrez la diversité et la richesse incomparable des paysages d'Algérie à travers nos parcours thématiques.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {[
                  { title: "Merveilles Naturelles", category: "Nature", count: "12 sites incontournables", img: "/Djurdjura National Park.jpg", icon: Compass },
                  { title: "Patrimoine Historique", category: "Historique", count: "15 trésors ottomans & romains", img: "/casbah.jpg", icon: History },
                  { title: "Trésors Côtiers", category: "Plage", count: "8 criques sauvages", img: "/cap-carbon.jpg", icon: Camera },
                  { title: "Monuments & Art", category: "Tous", count: "10 chefs-d'œuvre uniques", img: "/makamShahid.jpg", icon: Sparkles }
                ].map((theme, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative h-96 rounded-[2.5rem] overflow-hidden shadow-lg border border-white/20 group cursor-pointer"
                    onClick={() => {
                      setCategoryFilter(theme.category as any);
                      navigate('/catalogue');
                    }}
                  >
                    <img src={theme.img} alt={theme.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05281E]/95 via-[#05281E]/40 to-transparent opacity-85" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-between items-start text-white text-left">
                      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
                        <theme.icon className="text-amber-300 w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-amber-300 uppercase tracking-widest block mb-2">{theme.count}</span>
                        <h3 className="text-2xl font-black tracking-tight mb-2">{theme.title}</h3>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:translate-x-1.5 transition-all">
                          Explorer <ArrowRight size={14} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Recommandations personnalisées */}
            <section className="bg-[#F2F8F4] py-16 md:py-24">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
                  <div>
                    <span className="text-xs font-black text-emerald-700 uppercase tracking-widest block mb-3">Système de recommandation</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#0F6E56' }}>Recommandations personnalisées</h2>
                    <p className="text-gray-600 max-w-2xl">Choisissez un style de visite et recevez une sélection personnalisée de sites algériens hautement cotés et adaptés à votre humeur.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Modifiez votre préférence pour voir de nouvelles suggestions instantanément.</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-10">
                  {['Top Qualité', 'Aventure', 'Historique', 'Nature', 'Plage', 'Famille'].map(filter => (
                    <button
                      key={filter}
                      onClick={() => setRecommendationFilter(filter as any)}
                      className={`px-5 py-3 rounded-full font-bold text-sm transition-all ${recommendationFilter === filter ? 'bg-[#0F6E56] text-white shadow-lg' : 'bg-white text-gray-600 border border-gray-200 hover:border-[#0F6E56] hover:text-[#0F6E56]'}`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {recommendedSites.map((site) => (
                    <motion.div
                      key={site.id}
                      whileHover={{ y: -6 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_14px_32px_-16px_rgba(15,110,86,0.25)] overflow-hidden cursor-pointer hover:shadow-[0_18px_48px_-18px_rgba(15,110,86,0.3)] transition-all"
                      onClick={() => handleSiteSelect(site)}
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img src={getSiteImage(site)} alt={site.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 text-[10px] uppercase font-bold tracking-widest text-[#0F6E56]">{site.categories[0]}</div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4 gap-3">
                          <div>
                            <h3 className="text-xl font-extrabold text-gray-900 mb-2 line-clamp-1">{site.name}</h3>
                            <p className="text-xs uppercase tracking-[0.18em] text-gray-500 font-black">{site.wilaya}</p>
                          </div>
                          <div className="inline-flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full text-amber-700 font-bold text-sm">
                            <Star className="text-amber-500" size={14} /> {site.rating.toFixed(1)}
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-5">{site.description}</p>
                        <div className="mb-4">
                          <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-black mb-3">Date de visite</label>
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="rounded-[2rem] border border-[#D8E9E0] bg-[#F4FCF7] p-3 flex items-center gap-3 transition-all hover:border-[#0F6E56]"
                          >
                            <div className="w-12 h-12 rounded-3xl bg-white shadow-sm flex items-center justify-center text-[#0F6E56]">
                              <Calendar size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[10px] uppercase tracking-[0.25em] text-gray-400 font-black mb-1">Sélectionnez une date</div>
                              <input
                                type="date"
                                value={offerDates[site.id] ?? selectedDate}
                                onChange={(e) => setOfferDates(prev => ({ ...prev, [site.id]: e.target.value }))}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full bg-transparent text-sm font-bold text-gray-900 outline-none appearance-none cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-sm font-bold text-[#0F6E56]">
                          <span>{site.price === 0 ? 'Gratuit' : `${site.price} DZD`}</span>
                          <span className="flex items-center gap-1">Voir <ArrowRight size={14} /></span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Comment ça marche */}
            <section className="bg-white py-20 md:py-32 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
                backgroundImage: `radial-gradient(#0F6E56 2px, transparent 2px)`,
                backgroundSize: '30px 30px'
              }} />
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16 md:mb-24">
                  <span className="text-xs font-black text-emerald-700 uppercase tracking-widest block mb-3">Visite fluide</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#0F6E56' }}>Comment ça marche ?</h2>
                  <p className="text-gray-500 max-w-xl mx-auto">Trois étapes simples et innovantes pour planifier vos visites et préserver notre patrimoine commun.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                  {[
                    { icon: Search, step: "01", title: "Découvrez", desc: "Explorez les monuments et joyaux naturels d'Algérie à l'aide de notre catalogue intelligent alimenté par l'IA." },
                    { icon: Calendar, step: "02", title: "Planifiez", desc: "Choisissez votre jour et heure. Wejha AI régule les flux en temps réel pour une expérience de visite sereine." },
                    { icon: CreditCard, step: "03", title: "Vivez", desc: "Payez en toute sécurité via CIB/Edahabia et recevez instantanément votre pass numérique pour une entrée sans file." }
                  ].map((item, i) => (
                    <div key={i} className="text-center group relative p-8 bg-[#F8F5EF]/30 border border-gray-100 rounded-[2.5rem] hover:shadow-xl transition-all duration-300">
                      <div className="absolute top-6 right-8 text-5xl font-black text-[#0F6E56]/5 group-hover:text-[#0F6E56]/10 transition-colors">{item.step}</div>
                      <div className="w-20 h-20 bg-[#F0F9F7] border border-[#0F6E56]/5 rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                        <item.icon size={32} className="text-[#0F6E56]" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-[#0F6E56]">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Incontournables Section */}
            <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                <div className="text-left">
                  <span className="text-xs font-black text-amber-600 uppercase tracking-widest block mb-3">Recommandations Premium</span>
                  <h2 className="text-3xl md:text-5xl font-black mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#0F6E56' }}>Joyaux Incontournables</h2>
                  <p className="text-gray-600 max-w-lg">Sélection exclusive de nos plus grands monuments nationaux, dotés de guides audio et certifiés 100% locaux.</p>
                </div>
                <Link to="/catalogue" className="flex items-center gap-2 px-6 py-3 border-2 border-[#0F6E56]/20 text-[#0F6E56] font-bold rounded-full hover:bg-[#0F6E56] hover:text-white transition-all cursor-pointer">
                  Explorer tout le catalogue <ArrowRight size={18} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {SITES.filter(s => [1, 3, 4, 7].includes(s.id)).map((site) => (
                  <motion.div 
                    key={site.id} 
                    whileHover={{ y: -8 }} 
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:border-[#0F6E56]/20 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(15,110,86,0.08)] group cursor-pointer flex flex-col h-full transition-all duration-300" 
                    onClick={() => handleSiteSelect(site)}
                  >
                    <div className="relative h-64 overflow-hidden flex-shrink-0">
                      <img src={getSiteImage(site)} alt={site.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-black/45 backdrop-blur-md rounded-full text-xs font-bold text-white flex items-center gap-1.5 border border-white/10">
                        <MapPin size={12} className="text-emerald-400" /> {site.wilaya}
                      </div>
                      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-md font-black text-[#0F6E56] text-xs">
                        {site.wilayaNumber}
                      </div>
                      
                      {/* Category Badges */}
                      <div className="absolute bottom-4 left-4 flex gap-1.5">
                        {site.categories.map((cat) => (
                          <span key={cat} className="px-2.5 py-1 bg-white/95 backdrop-blur text-[10px] font-extrabold text-[#0F6E56] rounded-lg uppercase tracking-wider shadow-sm">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col justify-between text-left">
                      <div className="mb-6">
                        <h3 className="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-[#0F6E56] transition-colors leading-snug line-clamp-1">{site.name}</h3>
                        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{site.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                        <div className="flex items-center gap-1.5 bg-yellow-50 px-2.5 py-1 rounded-lg text-amber-700">
                          <Star className="text-amber-500 fill-amber-500" size={14} />
                          <span className="font-bold text-xs">{site.rating.toFixed(1)}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="font-black text-base text-[#0F6E56]">{site.price === 0 ? 'Gratuit' : `${site.price} DZD`}</span>
                          <div className="w-8 h-8 rounded-full bg-[#F0F9F7] group-hover:bg-[#0F6E56] flex items-center justify-center text-[#0F6E56] group-hover:text-white transition-colors duration-300 shadow-sm">
                            <ChevronRight size={16} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* AI Companion Interactive Showcase */}
            <section className="bg-gradient-to-br from-[#05281E] to-[#0D5544] text-white py-20 md:py-32 relative overflow-hidden">
              <div className="absolute top-1/4 -left-64 w-96 h-96 bg-[#1D9E75]/15 rounded-full blur-3xl animate-pulse pointer-events-none" />
              <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
              
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                  
                  {/* Left Side: Copy */}
                  <div className="lg:col-span-6 text-left">
                    <span className="text-xs font-black text-amber-300 uppercase tracking-widest block mb-4">COMPAGNON INTELLIGENT DE ROUTE</span>
                    <h2 className="text-3xl sm:text-5xl font-black leading-tight mb-6 font-serif">
                      Planifiez avec notre <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-emerald-300 font-bold">
                        Intelligence Artificielle
                      </span>
                    </h2>
                    <p className="text-white/80 text-base sm:text-lg mb-8 leading-relaxed">
                      Wejha AI est conçu spécialement pour explorer l'Algérie. Il élabore des itinéraires optimisés, fournit des détails historiques sur place et vous conseille sur le meilleur créneau horaire en évitant les foules.
                    </p>
                    
                    <div className="space-y-4 mb-8">
                      {[
                        "Génération d'itinéraires sur-mesure d'un simple clic",
                        "Régulation en temps réel basée sur l'affluence du site",
                        "Recherche linguistique flexible (français, arabe, derja)"
                      ].map((text, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#1D9E75]/30 border border-[#1D9E75] flex items-center justify-center flex-shrink-0">
                            <Sparkles className="text-amber-300 w-3 h-3" />
                          </div>
                          <span className="font-bold text-sm text-white/90">{text}</span>
                        </div>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => window.dispatchEvent(new CustomEvent('open-wejha-ai'))}
                      className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#05281E] font-black rounded-2xl shadow-lg shadow-black/25 hover:scale-105 transition-all flex items-center gap-3 cursor-pointer"
                    >
                      <Sparkles size={20} className="animate-spin" style={{ animationDuration: '3s' }} />
                      <span>Lancer la conversation en direct</span>
                    </button>
                  </div>
                  
                  {/* Right Side: Mock iOS Chat Window */}
                  <div className="lg:col-span-6 w-full max-w-lg mx-auto">
                    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-6 shadow-2xl relative">
                      <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F6E56] to-[#1D9E75] flex items-center justify-center">
                            <Sparkles className="text-white w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-black text-sm text-white">Wejha AI</h4>
                            <span className="text-[10px] text-emerald-400 font-bold block uppercase tracking-wider">Expert local</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 bg-emerald-500/20 px-2.5 py-1 rounded-full border border-emerald-500/30 animate-pulse">
                          <div className="w-2 h-2 rounded-full bg-emerald-400" />
                          <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">En ligne</span>
                        </div>
                      </div>
                      
                      {/* Chat log mock */}
                      <div className="space-y-4 mb-6 max-h-72 overflow-y-auto pr-1 text-left">
                        <div className="flex gap-3">
                          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold flex-shrink-0">
                            U
                          </div>
                          <div className="bg-white/10 p-3 rounded-2xl rounded-tl-sm text-xs leading-relaxed max-w-[85%] text-white">
                            Que me conseilles-tu à Alger ce week-end ?
                          </div>
                        </div>
                        
                        <div className="flex gap-3 flex-row-reverse">
                          <div className="w-7 h-7 rounded-full bg-[#1D9E75] flex items-center justify-center text-xs font-bold flex-shrink-0">
                            AI
                          </div>
                          <div className="bg-[#0F6E56] p-3 rounded-2xl rounded-tr-sm text-xs leading-relaxed max-w-[85%] text-white">
                            Je vous suggère de commencer le matin par la majestueuse <strong className="text-amber-300 cursor-pointer underline" onClick={() => handleSiteSelect(SITES[0])}>Casbah d'Alger</strong> pour profiter d'une affluence modérée (idéale entre 9h et 11h). Ensuite, visitez la basilique <strong className="text-amber-300 cursor-pointer underline" onClick={() => handleSiteSelect(SITES[3])}>Notre Dame d'Afrique</strong> pour admirer le coucher de soleil unique sur la baie ! 🌅
                          </div>
                        </div>
                      </div>
                      
                      {/* Fake Input */}
                      <div className="flex gap-3 pt-4 border-t border-white/10">
                        <div className="flex-1 bg-white/5 border border-white/10 p-3 rounded-xl text-xs text-white/50 text-left">
                          Posez une question...
                        </div>
                        <button 
                          onClick={() => window.dispatchEvent(new CustomEvent('open-wejha-ai'))}
                          className="p-3 bg-[#1D9E75] hover:bg-[#0F6E56] text-white rounded-xl transition-all cursor-pointer"
                        >
                          <ArrowRight size={16} />
                        </button>
                      </div>
                      
                    </div>
                  </div>
                  
                </div>
              </div>
            </section>

            {/* Stats / Chiffres Clés Section */}
            <section className="py-20 md:py-28 bg-[#05281E] border-t border-white/5 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1D9E75_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
              <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
                  {[
                    { value: '58', suffix: 'Wilayas', label: 'Régions Couvertes' },
                    { value: '50+', suffix: 'Joyaux', label: 'Monuments Phares' },
                    { value: '100%', suffix: 'Sécurisé', label: 'Pass & Réservation' },
                    { value: '24/7', suffix: 'AI Support', label: 'Disponible à tout instant' }
                  ].map((stat, i) => (
                    <div key={i} className="flex flex-col items-center justify-center p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-colors">
                      <div className="text-4xl md:text-6xl font-black text-amber-300 font-serif mb-3">
                        {stat.value}
                      </div>
                      <div className="text-white font-extrabold text-sm mb-1">{stat.suffix}</div>
                      <div className="text-white/50 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Why Wejha Section */}
            <section className="py-20 md:py-32 overflow-hidden bg-white text-left">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
                  <div className="flex-1">
                    <span className="text-xs font-black text-amber-600 uppercase tracking-widest block mb-3">Expérience Unique</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-8 font-serif text-[#0F6E56]">Pourquoi choisir Wejha ?</h2>
                    <div className="space-y-8">
                      {[
                        { icon: Zap, title: 'Accès fluide & rapide', desc: 'Dites adieu aux files d\'attente interminables. Réservez votre Wejha Pass instantanément et gagnez un temps précieux.' },
                        { icon: Shield, title: 'Préservation active', desc: 'En régulant l\'affluence sur les sites sensibles, vous contribuez activement à protéger et à préserver notre patrimoine millénaire.' },
                        { icon: Star, title: 'Immersion & Audio guides', desc: 'Bénéficiez d\'anecdotes historiques vérifiées, d\'itinéraires personnalisés et de récits audio captivants via notre IA.' }
                      ].map((feature, i) => (
                        <div key={i} className="flex gap-6 group">
                          <div className="w-12 h-12 rounded-2xl bg-[#F0F9F7] group-hover:bg-[#0F6E56] shadow-sm flex items-center justify-center flex-shrink-0 transition-colors">
                            <feature.icon className="text-[#0F6E56] group-hover:text-white transition-colors" size={24} />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold mb-2 text-[#05281E]">{feature.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 relative w-full">
                    <div className="absolute -inset-4 bg-[#0F6E56] rounded-[3rem] rotate-3 opacity-10"></div>
                    <img 
                      src="/cap-carbon.jpg" 
                      className="relative rounded-[3rem] shadow-2xl w-full max-h-[500px] object-cover rotate-1 hover:rotate-0 transition-all duration-700 border border-[#0F6E56]/10" 
                      alt="Verified Algerian landscape cap carbon" 
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Game Promotion Section */}
            <section className="max-w-7xl mx-auto px-4 py-20">
              <div className="bg-gradient-to-br from-[#0F6E56] to-[#05281E] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl border border-white/10 group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#1D9E75]/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/5 rounded-full -ml-20 -mb-20 blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-white/10 border border-white/20 rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 backdrop-blur-md">
                    <Trophy className="text-amber-300 w-10 h-10 animate-bounce" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-serif">Connaissez-vous votre pays ?</h2>
                  <p className="text-white/80 max-w-xl mx-auto mb-10 text-base sm:text-lg leading-relaxed">
                    Mettez vos connaissances à l'épreuve avec **Le Défi Patrimoine** ! Apprenez des faits incroyables sur les wilayas et remportez le prestigieux badge d'Ambassadeur Wejha.
                  </p>
                  <Link to="/game" className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#05281E] font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-black/35">
                    <span>Relever le Défi maintenant</span>
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="max-w-7xl mx-auto px-4 py-20 border-t border-gray-200/50 text-center">
              <div className="max-w-4xl mx-auto">
                <span className="text-xs font-black text-amber-600 uppercase tracking-widest block mb-4">Notre Mission</span>
                <h2 className="text-4xl md:text-6xl font-black mb-12 font-serif text-[#0F6E56]">À Propos de Wejha</h2>
                <div className="prose prose-lg max-w-none text-gray-700 space-y-12">
                  <div className="text-center">
                    <p className="text-2xl leading-relaxed text-gray-600 mb-8 font-medium font-serif">
                      "Wejha" signifie <span className="text-[#0F6E56] font-bold border-b-2 border-amber-300 pb-1">Destination</span> en arabe.
                    </p>
                    <p className="leading-relaxed text-gray-500 max-w-2xl mx-auto">
                      Notre vocation est de moderniser l'accès à l'incroyable richesse archéologique, historique et naturelle de l'Algérie grâce au digital, tout en sensibilisant les visiteurs à la préservation des monuments précieux.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8 text-left">
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-[#F0F9F7] relative group hover:border-[#0F6E56]/15 transition-all">
                      <Sparkles className="text-amber-500 mb-6 w-10 h-10 bg-[#F0F9F7] p-2 rounded-xl" />
                      <h3 className="text-2xl font-black mb-4 text-[#0F6E56]" style={{ fontFamily: 'Playfair Display, serif' }}>Notre Vision</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        Propulser l'Algérie parmi les destinations de tourisme culturel les plus fluides et préservées d'Afrique du Nord, en équipant chaque voyageur d'outils intelligents et authentiques.
                      </p>
                    </div>
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-[#F0F9F7] relative group hover:border-[#0F6E56]/15 transition-all">
                      <Zap className="text-emerald-500 mb-6 w-10 h-10 bg-[#F0F9F7] p-2 rounded-xl" />
                      <h3 className="text-2xl font-black mb-4 text-[#0F6E56]" style={{ fontFamily: 'Playfair Display, serif' }}>Propulsé par l'IA</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        Notre IA native analyse l'affluence historique et en direct pour vous suggérer les moments idéaux pour vos parcours culturels, tout en garantissant des informations vérifiées d'historiens.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        } />

  );
}
