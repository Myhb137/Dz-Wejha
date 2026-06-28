import React, { useState, useEffect, useMemo } from 'react';
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate
} from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Users,
  Search,
  Star,
  Clock,
  ChevronRight,
  Shield,
  Zap,
  CheckCircle2,
  TrendingUp,
  Menu,
  X,
  User,
  Sparkles,
  Camera,
  History,
  Compass,
  ArrowRight,
  Filter,
  CreditCard,
  Download,
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getMappedImage } from './utils/imageMapper';
import AiChat from './components/AiChat';

const HeritageGame = React.lazy(() => import('./components/HeritageGame'));
const AlgeriaFeed = React.lazy(() => import('./components/AlgeriaFeed'));

import { Site, SiteCategory } from '../types';
import { SITES, WILAYAS, HERO_SLIDES } from '../data/sites';

// ── Type Definitions ─────────────────────────────────────────────────────────

type PaymentMethod = 'CIB' | 'Edahabia' | 'Cash';

// ── Helpers ──────────────────────────────────────────────────────────────────

const getSiteImage = (site: Site) => getMappedImage(site.name, site.image);

// ── Layout ───────────────────────────────────────────────────────────────────

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen" style={{ fontFamily: 'DM Sans, sans-serif', backgroundColor: '#F8F5EF' }}>
      <div className="fixed inset-0 pointer-events-none opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(45deg, #0F6E56 0, #0F6E56 1px, transparent 0, transparent 50%)`,
        backgroundSize: '20px 20px'
      }} />

      <header className="fixed top-0 left-0 right-0 z-50 pt-4 pb-2 px-4 w-full transition-all duration-300">
        <div className={`max-w-6xl mx-auto border transition-all duration-500 rounded-full px-6 md:px-8 h-16 md:h-20 flex justify-between items-center relative ${
          (scrolled || !isHome)
            ? 'bg-white/95 backdrop-blur-2xl border-white/40 shadow-[0_12px_40px_rgba(5,40,30,0.15)] scale-[0.98]'
            : 'bg-white/10 backdrop-blur-md border-white/20 shadow-none'
        }`}>
          <Link to="/" className="flex items-center gap-2 md:gap-3 cursor-pointer group">
            <img
              src="/logo.png"
              alt="Wejha Logo"
              className="w-10 h-10 md:w-12 md:h-12 object-contain group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 drop-shadow-lg"
            />
            <span className={`font-black text-xl md:text-2xl tracking-tighter transition-colors duration-300 ${(scrolled || !isHome) ? 'text-[#0F6E56]' : 'text-white'}`}>WEJHA</span>
          </Link>

          <nav className={`hidden lg:flex items-center gap-2 p-1.5 rounded-full border transition-all duration-300 ${
            (scrolled || !isHome) ? 'bg-gray-100/80 border-gray-200/50' : 'bg-white/10 border-white/10'
          }`}>
            {[
              { name: 'Accueil', path: '/' },
              { name: 'Destinations', path: '/catalogue' },
              { name: 'Découvrir', path: '/discover' },
              { name: 'Wilayas', path: '/wilayas' }
            ].map((item) => {
              const isActive = location.pathname === item.path;
              const useDarkText = scrolled || !isHome;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 flex items-center justify-center ${
                    isActive
                      ? useDarkText
                        ? 'text-white bg-[#0F6E56] shadow-md shadow-[#0F6E56]/20'
                        : 'text-[#05281E] bg-white shadow-md'
                      : useDarkText
                        ? 'text-gray-700 hover:text-[#0F6E56] hover:bg-[#0F6E56]/10'
                        : 'text-white hover:text-white/80 hover:bg-white/10'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 lg:hidden">
            <button
              className={`p-2.5 rounded-full transition-colors ${
                showMobileMenu
                  ? 'bg-[#0F6E56] text-white'
                  : (scrolled || !isHome)
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-white/15 text-white hover:bg-white/25 border border-white/10'
              }`}
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu size={20} />
            </button>
          </div>

          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-4 mx-auto w-full max-w-sm bg-white/95 backdrop-blur-2xl border border-white/60 shadow-[0_20px_40px_rgba(0,0,0,0.1)] rounded-[2rem] overflow-hidden lg:hidden"
              >
                <div className="p-2 space-y-1">
                  {[
                    { name: 'Accueil', path: '/' },
                    { name: 'Destinations', path: '/catalogue' },
                    { name: 'Découvrir', path: '/discover' },
                    { name: 'Wilayas', path: '/wilayas' }
                  ].map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setShowMobileMenu(false)}
                      className="block w-full text-left px-6 py-4 font-bold text-gray-700 hover:text-[#0F6E56] hover:bg-[#0F6E56]/5 rounded-2xl transition-all"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className={`relative pb-12 ${isHome ? '' : 'pt-24 md:pt-32'}`}>
        {children}
      </main>

      <footer className="bg-[#05281E] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <img src="/logo.png" alt="Wejha Logo" className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-[0_0_20px_rgba(29,158,117,0.4)]" />
                <span className="font-black text-3xl md:text-4xl tracking-tighter">WEJHA</span>
              </div>
              <p className="text-white/60 leading-relaxed mb-8">La première plateforme de gestion intelligente du patrimoine touristique algérien.</p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0F6E56] transition-colors cursor-pointer"><Compass size={20} /></div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0F6E56] transition-colors cursor-pointer"><Camera size={20} /></div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0F6E56] transition-colors cursor-pointer"><History size={20} /></div>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xl mb-8">Navigation</h4>
              <ul className="space-y-4 text-white/60">
                <li><Link to="/" className="hover:text-white transition-colors">Accueil</Link></li>
                <li><Link to="/catalogue" className="hover:text-white transition-colors">Destinations</Link></li>
                <li><Link to="/wilayas" className="hover:text-white transition-colors">Wilayas</Link></li>
                <li><Link to="/#about" className="hover:text-white transition-colors">À propos</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xl mb-8">Support</h4>
              <ul className="space-y-4 text-white/60">
                <li className="hover:text-white cursor-pointer transition-colors">Aide & FAQ</li>
                <li className="hover:text-white cursor-pointer transition-colors">Partenariats</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
                <li className="hover:text-white cursor-pointer transition-colors">Mentions Légales</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xl mb-8">Newsletter</h4>
              <p className="text-white/60 mb-6">Recevez les meilleures pépites de notre patrimoine chaque semaine.</p>
              <div className="relative">
                <input type="email" placeholder="votre@email.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-[#0F6E56] transition-all" />
                <button className="absolute right-2 top-2 bottom-2 px-4 bg-[#0F6E56] rounded-lg hover:scale-105 transition-all"><ArrowRight size={20} /></button>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/40 text-sm">
            <p>© 2026 Wejha Platform. Fièrement développé pour l'Algérie.</p>
            <div className="flex gap-8">
              <span>Confidentialité</span>
              <span>Conditions</span>
              <span>Sécurité</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ── HeroSection ──────────────────────────────────────────────────────────────

function HeroSection({
  selectedDate,
  setSelectedDate,
  visitorCount,
  setVisitorCount,
  onSearch
}: {
  selectedDate: string;
  setSelectedDate: (d: string) => void;
  visitorCount: number;
  setVisitorCount: (n: number) => void;
  onSearch: (params: { wilaya: string; type: string }) => void;
}) {
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
      {HERO_SLIDES.map((img, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[1.6s] ease-in-out"
          style={{ opacity: i === slide ? 1 : 0, zIndex: i === slide ? 1 : 0 }}
        >
          <img
            src={img.src}
            alt={img.label}
            className="w-full h-full object-cover object-center"
            style={{ transform: i === slide ? 'scale(1.05)' : 'scale(1)', transition: 'transform 6.5s ease-in-out' }}
          />
        </div>
      ))}

      <div className="absolute inset-0 z-1 bg-gradient-to-tr from-[#05281E]/95 via-[#0F6E56]/75 to-transparent" />
      <div className="absolute inset-0 z-1 bg-gradient-to-b from-transparent via-transparent to-[#F8F5EF]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 text-left">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: 'easeOut' }}>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/10">
              <Sparkles size={14} className="text-amber-300 animate-pulse" />
              <span className="text-white font-extrabold text-xs tracking-wider uppercase">{HERO_SLIDES[slide].label}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight mb-6 font-serif">
              Explorez les <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-300 to-white drop-shadow-sm font-bold">
                trésors cachés
              </span>{' '}
              <br />
              de l'Algérie.
            </h1>

            <p className="text-white/85 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mb-10">
              Planifiez intelligemment votre visite des sites patrimoniaux et naturels algériens les plus spectaculaires avec l'assistance de Wejha AI.
            </p>

            <div className="flex flex-wrap gap-8 sm:gap-12 items-center">
              {[
                { icon: MapPin, value: '58', label: 'Wilayas' },
                { icon: Star, value: '50+', label: 'Joyaux Phares' },
                { icon: Users, value: '100%', label: 'Authentique' }
              ].map((item, i) => (
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
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }} className="w-full">
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
                    <select
                      value={searchWilaya}
                      onChange={e => setSearchWilaya(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:bg-white focus:border-[#0F6E56] focus:ring-2 focus:ring-[#0F6E56]/15 outline-none font-bold text-gray-800 text-sm transition-all cursor-pointer"
                    >
                      <option>Toutes les wilayas</option>
                      {WILAYAS.map(w => <option key={w.number}>{w.name}</option>)}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-1.5 font-bold text-xs text-gray-700 mb-2">
                        <Calendar size={14} className="text-[#0F6E56]" /> Date de Visite
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={e => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:bg-white focus:border-[#0F6E56] focus:ring-2 focus:ring-[#0F6E56]/15 outline-none font-bold text-gray-800 text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-1.5 font-bold text-xs text-gray-700 mb-2">
                        <Users size={14} className="text-[#0F6E56]" /> Visiteurs
                      </label>
                      <select
                        value={visitorCount}
                        onChange={e => setVisitorCount(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:bg-white focus:border-[#0F6E56] focus:ring-2 focus:ring-[#0F6E56]/15 outline-none font-bold text-gray-800 text-sm transition-all cursor-pointer"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                          <option key={n} value={n}>{n} pers.</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 font-bold text-xs text-gray-700 mb-2">
                      <Sparkles size={14} className="text-[#0F6E56]" /> Style d'Exploration
                    </label>
                    <select
                      value={searchType}
                      onChange={e => setSearchType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/70 focus:bg-white focus:border-[#0F6E56] focus:ring-2 focus:ring-[#0F6E56]/15 outline-none font-bold text-gray-800 text-sm transition-all cursor-pointer"
                    >
                      <option>Tous</option>
                      <option>Historique</option>
                      <option>Nature</option>
                      <option>Sahara</option>
                      <option>Plage</option>
                    </select>
                  </div>
                </div>

                <motion.button
                  onClick={handleSearch}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-[#0F6E56] to-[#1D9E75] text-white font-extrabold rounded-2xl shadow-lg shadow-[#0F6E56]/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search size={18} />
                  <span>Rechercher les Destinations</span>
                  <ChevronRight size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3 | 4>(1);
  const [bookingReference, setBookingReference] = useState('');
  const [personalInfo, setPersonalInfo] = useState({ firstName: '', lastName: '', phone: '', email: '' });
  const [categoryFilter, setCategoryFilter] = useState<SiteCategory | 'Tous'>('Tous');
  const [visitorCount, setVisitorCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState('2026-05-24');
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CIB');
  const [heroSearchFilters, setHeroSearchFilters] = useState({ wilaya: 'Toutes les wilayas', type: 'Tous' });
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSiteSelect = (site: Site) => {
    setSelectedSite(site);
    setBookingStep(1);
    setShowBookingModal(true);
  };

  const filteredSites = useMemo(() => {
    return SITES.filter(site => {
      const matchesCategory = categoryFilter === 'Tous' || site.categories.includes(categoryFilter);
      const matchesHeroWilaya = heroSearchFilters.wilaya === 'Toutes les wilayas' || site.wilaya === heroSearchFilters.wilaya;
      const matchesHeroType = heroSearchFilters.type === 'Tous' || site.categories.includes(heroSearchFilters.type as any);
      const matchesSearch =
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.wilaya.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesHeroWilaya && matchesHeroType && matchesSearch;
    });
  }, [categoryFilter, heroSearchFilters, searchQuery]);

  return (
    <Layout>
      <Routes>
        {/* ── Home ── */}
        <Route
          path="/"
          element={
            <div>
              <HeroSection
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                visitorCount={visitorCount}
                setVisitorCount={setVisitorCount}
                onSearch={(params) => setHeroSearchFilters(params)}
              />

              {/* Comment ça marche */}
              <section className="bg-white py-20 md:py-32 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `radial-gradient(#0F6E56 2px, transparent 2px)`, backgroundSize: '30px 30px' }} />
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                  <div className="text-center mb-16 md:mb-24">
                    <span className="text-xs font-black text-emerald-700 uppercase tracking-widest block mb-3">Visite fluide</span>
                    <h2 className="text-3xl md:text-5xl font-black mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#0F6E56' }}>Comment ça marche ?</h2>
                    <p className="text-gray-500 max-w-xl mx-auto">Trois étapes simples et innovantes pour planifier vos visites et préserver notre patrimoine commun.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                    {[
                      { icon: Search, step: '01', title: 'Découvrez', desc: "Explorez les monuments et joyaux naturels d'Algérie à l'aide de notre catalogue intelligent alimenté par l'IA." },
                      { icon: Calendar, step: '02', title: 'Planifiez', desc: "Choisissez votre jour et heure. Wejha AI régule les flux en temps réel pour une expérience de visite sereine." },
                      { icon: CreditCard, step: '03', title: 'Vivez', desc: "Payez en toute sécurité via CIB/Edahabia et recevez instantanément votre pass numérique pour une entrée sans file." }
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

              {/* Incontournables */}
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
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 hover:border-[#0F6E56]/20 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgba(15,110,86,0.08)] group cursor-pointer flex flex-col h-full transition-all duration-300"
                      onClick={() => handleSiteSelect(site)}
                    >
                      <div className="relative h-64 overflow-hidden flex-shrink-0">
                        <img src={getSiteImage(site)} alt={site.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />
                        <div className="absolute top-4 left-4 px-3 py-1 bg-black/45 backdrop-blur-md rounded-full text-xs font-bold text-white flex items-center gap-1.5 border border-white/10">
                          <MapPin size={12} className="text-emerald-400" /> {site.wilaya}
                        </div>
                        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-md font-black text-[#0F6E56] text-xs">
                          {site.wilayaNumber}
                        </div>
                        <div className="absolute bottom-4 left-4 flex gap-1.5">
                          {site.categories.map((cat) => (
                            <span key={cat} className="px-2.5 py-1 bg-white/95 backdrop-blur text-[10px] font-extrabold text-[#0F6E56] rounded-lg uppercase tracking-wider shadow-sm">{cat}</span>
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

              {/* AI Companion */}
              <section className="bg-gradient-to-br from-[#05281E] to-[#0D5544] text-white py-20 md:py-32 relative overflow-hidden">
                <div className="absolute top-1/4 -left-64 w-96 h-96 bg-[#1D9E75]/15 rounded-full blur-3xl animate-pulse pointer-events-none" />
                <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div className="lg:col-span-6 text-left">
                      <span className="text-xs font-black text-amber-300 uppercase tracking-widest block mb-4">COMPAGNON INTELLIGENT DE ROUTE</span>
                      <h2 className="text-3xl sm:text-5xl font-black leading-tight mb-6 font-serif">
                        Planifiez avec notre <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-emerald-300 font-bold">Intelligence Artificielle</span>
                      </h2>
                      <p className="text-white/80 text-base sm:text-lg mb-8 leading-relaxed">
                        Wejha AI est conçu spécialement pour explorer l'Algérie. Il élabore des itinéraires optimisés, fournit des détails historiques sur place et vous conseille sur le meilleur créneau horaire en évitant les foules.
                      </p>
                      <div className="space-y-4 mb-8">
                        {[
                          "Génération d'itinéraires sur-mesure d'un simple clic",
                          'Régulation en temps réel basée sur l\'affluence du site',
                          'Recherche linguistique flexible (français, arabe, derja)'
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
                        <div className="space-y-4 mb-6 max-h-72 overflow-y-auto pr-1 text-left">
                          <div className="flex gap-3">
                            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold flex-shrink-0">U</div>
                            <div className="bg-white/10 p-3 rounded-2xl rounded-tl-sm text-xs leading-relaxed max-w-[85%] text-white">
                              Que me conseilles-tu à Alger ce week-end ?
                            </div>
                          </div>
                          <div className="flex gap-3 flex-row-reverse">
                            <div className="w-7 h-7 rounded-full bg-[#1D9E75] flex items-center justify-center text-xs font-bold flex-shrink-0">AI</div>
                            <div className="bg-[#0F6E56] p-3 rounded-2xl rounded-tr-sm text-xs leading-relaxed max-w-[85%] text-white">
                              Je vous suggère de commencer le matin par la majestueuse{' '}
                              <strong className="text-amber-300 cursor-pointer underline" onClick={() => handleSiteSelect(SITES[0])}>Casbah d'Alger</strong>{' '}
                              pour profiter d'une affluence modérée (idéale entre 9h et 11h). Ensuite, visitez la basilique{' '}
                              <strong className="text-amber-300 cursor-pointer underline" onClick={() => handleSiteSelect(SITES[3])}>Notre Dame d'Afrique</strong>{' '}
                              pour admirer le coucher de soleil unique sur la baie ! 🌅
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3 pt-4 border-t border-white/10">
                          <div className="flex-1 bg-white/5 border border-white/10 p-3 rounded-xl text-xs text-white/50 text-left">Posez une question...</div>
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

              {/* Stats */}
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
                        <div className="text-4xl md:text-6xl font-black text-amber-300 font-serif mb-3">{stat.value}</div>
                        <div className="text-white font-extrabold text-sm mb-1">{stat.suffix}</div>
                        <div className="text-white/50 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Why Wejha */}
              <section className="py-20 md:py-32 overflow-hidden bg-white text-left">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
                    <div className="flex-1">
                      <span className="text-xs font-black text-amber-600 uppercase tracking-widest block mb-3">Expérience Unique</span>
                      <h2 className="text-3xl md:text-5xl font-black mb-8 font-serif text-[#0F6E56]">Pourquoi choisir Wejha ?</h2>
                      <div className="space-y-8">
                        {[
                          { icon: Zap, title: 'Accès fluide & rapide', desc: "Dites adieu aux files d'attente interminables. Réservez votre Wejha Pass instantanément et gagnez un temps précieux." },
                          { icon: Shield, title: 'Préservation active', desc: "En régulant l'affluence sur les sites sensibles, vous contribuez activement à protéger et à préserver notre patrimoine millénaire." },
                          { icon: Star, title: 'Immersion & Audio guides', desc: "Bénéficiez d'anecdotes historiques vérifiées, d'itinéraires personnalisés et de récits audio captivants via notre IA." }
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
                      <img src="/cap-carbon.jpg" className="relative rounded-[3rem] shadow-2xl w-full max-h-[500px] object-cover rotate-1 hover:rotate-0 transition-all duration-700 border border-[#0F6E56]/10" alt="Cap Carbon" />
                    </div>
                  </div>
                </div>
              </section>

              {/* Game Promo */}
              <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="bg-gradient-to-br from-[#0F6E56] to-[#05281E] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl border border-white/10">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#1D9E75]/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/5 rounded-full -ml-20 -mb-20 blur-3xl"></div>
                  <div className="relative z-10">
                    <div className="w-20 h-20 bg-white/10 border border-white/20 rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 backdrop-blur-md">
                      <Trophy className="text-amber-300 w-10 h-10 animate-bounce" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-6 font-serif">Connaissez-vous votre pays ?</h2>
                    <p className="text-white/80 max-w-xl mx-auto mb-10 text-base sm:text-lg leading-relaxed">
                      Mettez vos connaissances à l'épreuve avec <strong>Le Défi Patrimoine</strong> ! Apprenez des faits incroyables sur les wilayas et remportez le prestigieux badge d'Ambassadeur Wejha.
                    </p>
                    <Link to="/game" className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#05281E] font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-black/35">
                      <span>Relever le Défi maintenant</span>
                      <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </section>

              {/* About */}
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
                        <p className="text-gray-500 text-sm leading-relaxed">Propulser l'Algérie parmi les destinations de tourisme culturel les plus fluides et préservées d'Afrique du Nord, en équipant chaque voyageur d'outils intelligents et authentiques.</p>
                      </div>
                      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-[#F0F9F7] relative group hover:border-[#0F6E56]/15 transition-all">
                        <Zap className="text-emerald-500 mb-6 w-10 h-10 bg-[#F0F9F7] p-2 rounded-xl" />
                        <h3 className="text-2xl font-black mb-4 text-[#0F6E56]" style={{ fontFamily: 'Playfair Display, serif' }}>Propulsé par l'IA</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">Notre IA native analyse l'affluence historique et en direct pour vous suggérer les moments idéaux pour vos parcours culturels, tout en garantissant des informations vérifiées d'historiens.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          }
        />

        {/* ── Catalogue ── */}
        <Route
          path="/catalogue"
          element={
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
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-2.5 rounded-full border border-gray-200 focus:border-[#0F6E56] focus:ring-2 focus:ring-[#0F6E56]/10 outline-none transition-all"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Tous', 'Historique', 'Nature', 'Sahara', 'Plage'].map(cat => (
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
                {filteredSites.slice(0, 10).map(site => (
                  <motion.div
                    key={site.id}
                    layout
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 hover:border-[#0F6E56]/20 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_30px_rgba(15,110,86,0.06)] group cursor-pointer flex flex-col h-full transition-all duration-300"
                    onClick={() => handleSiteSelect(site)}
                  >
                    <div className="relative h-48 overflow-hidden flex-shrink-0">
                      <img src={getSiteImage(site)} alt={site.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-black/45 backdrop-blur-md rounded-full text-[10px] font-bold text-white flex items-center gap-1 border border-white/10">
                        <MapPin size={10} className="text-emerald-400" /> {site.wilaya}
                      </div>
                      <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/95 backdrop-blur flex items-center justify-center shadow-md border border-gray-100">
                        <div className="text-[10px] font-black text-[#0F6E56]">{site.wilayaNumber}</div>
                      </div>
                      <div className="absolute bottom-3 left-3 flex gap-1">
                        <span className="px-2 py-0.5 bg-white/95 backdrop-blur text-[9px] font-extrabold text-[#0F6E56] rounded-md uppercase tracking-wider">{site.categories[0]}</span>
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
                <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6"><Compass className="text-gray-300 w-10 h-10" /></div>
                  <h3 className="text-2xl font-bold text-gray-400 mb-4">Aucun site trouvé</h3>
                  <button onClick={() => { setCategoryFilter('Tous'); setHeroSearchFilters({ wilaya: 'Toutes les wilayas', type: 'Tous' }); }} className="text-[#0F6E56] font-bold underline">Réinitialiser les filtres</button>
                </div>
              )}
            </div>
          }
        />

        {/* ── Wilayas ── */}
        <Route
          path="/wilayas"
          element={
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#0F6E56' }}>Nos 58 Wilayas</h1>
                <p className="text-gray-600 max-w-2xl mx-auto">Explorez le patrimoine algérien wilaya par wilaya. Chaque région recèle des joyaux uniques à découvrir.</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
                {WILAYAS.map(w => (
                  <motion.div
                    key={w.number}
                    whileHover={{ scale: 1.05, y: -5 }}
                    onClick={() => { setHeroSearchFilters({ wilaya: w.name, type: 'Tous' }); navigate('/catalogue'); }}
                    className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all cursor-pointer text-center group border border-gray-50"
                  >
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white font-black text-xl md:text-2xl transition-transform group-hover:rotate-12" style={{ background: 'linear-gradient(135deg, #0F6E56 0%, #1D9E75 100%)' }}>
                      {w.number}
                    </div>
                    <h3 className="font-bold group-hover:text-[#0F6E56] transition-colors">{w.name}</h3>
                    <div className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-2">{w.siteCount} sites phares</div>
                  </motion.div>
                ))}
              </div>
            </div>
          }
        />

        {/* ── Game ── */}
        <Route path="/game" element={
          <React.Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-4 border-[#0F6E56] border-t-transparent rounded-full animate-spin" /></div>}>
            <HeritageGame />
          </React.Suspense>
        } />

        {/* ── Discover ── */}
        <Route path="/discover" element={
          <React.Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="w-8 h-8 border-4 border-[#0F6E56] border-t-transparent rounded-full animate-spin" /></div>}>
            <AlgeriaFeed />
          </React.Suspense>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* ── AI Chat ── */}
      <AiChat
        onSelectSite={(siteName) => {
          const normalizedInput = siteName.toLowerCase()
            .replace(/^(the|la|le|l'|les)\s+/, '')
            .replace(/[.,!?;:]/g, '')
            .trim();
          const site = SITES.find(s => {
            const normalizedSite = s.name.toLowerCase()
              .replace(/^(the|la|le|l'|les)\s+/, '')
              .replace(/[.,!?;:]/g, '')
              .trim();
            return normalizedSite.includes(normalizedInput) || normalizedInput.includes(normalizedSite);
          });
          if (site) handleSiteSelect(site);
        }}
      />

      {/* ── Booking Modal ── */}
      <AnimatePresence>
        {showBookingModal && selectedSite && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 p-2 md:p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2.5rem] shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-gray-100"
            >
              <div className="flex flex-col relative overflow-x-hidden min-h-[500px]">
                {bookingStep < 4 && (
                  <div className="relative h-48 md:h-64 w-full flex-shrink-0">
                    <img src={getSiteImage(selectedSite)} alt={selectedSite.name} loading="lazy" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <button onClick={() => setShowBookingModal(false)} className="absolute top-6 right-6 p-2.5 bg-black/40 hover:bg-black/60 border border-white/20 text-white rounded-full backdrop-blur-md transition-colors z-10 shadow-md">
                      <X size={20} />
                    </button>
                    <div className="absolute bottom-6 left-6 right-6 text-white text-left">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2">
                        <MapPin size={14} /> <span>{selectedSite.wilaya} • Wilaya {selectedSite.wilayaNumber}</span>
                      </div>
                      <h2 className="font-extrabold text-3xl md:text-4xl leading-tight mb-2 tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>{selectedSite.name}</h2>
                      <p className="text-white/80 text-sm md:text-base line-clamp-2 leading-relaxed max-w-2xl">{selectedSite.description}</p>
                    </div>
                  </div>
                )}

                {bookingStep < 4 && (
                  <div className="px-6 md:px-8 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {[1, 2, 3].map(step => (
                        <div key={step} className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${bookingStep >= step ? 'bg-[#0F6E56] text-white shadow-md' : 'bg-gray-100 text-gray-400'}`}>{step}</div>
                          {step < 3 && <div className={`w-8 md:w-16 h-1 rounded-full transition-all ${bookingStep > step ? 'bg-[#0F6E56]' : 'bg-gray-100'}`} />}
                        </div>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest hidden sm:block">
                      {bookingStep === 1 ? 'Configuration' : bookingStep === 2 ? 'Informations' : 'Paiement'}
                    </span>
                  </div>
                )}

                <div className="p-6 md:p-8 flex-1 relative text-left">
                  <AnimatePresence mode="wait">
                    {bookingStep === 1 && (
                      <motion.div key="step1" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="font-extrabold text-2xl text-gray-900 mb-2">Date & Visiteurs</h3>
                          <p className="text-sm text-gray-500 mb-3">Préparez votre visite à {selectedSite.name}.</p>
                          <p className="text-sm text-gray-600 leading-relaxed mb-6">{selectedSite.description}</p>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Date de visite</label>
                              <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="w-full p-4 rounded-2xl border border-gray-200 bg-gray-50 font-bold text-gray-800 outline-none focus:border-[#0F6E56] transition-colors" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Heure de visite</label>
                              <input type="time" value={selectedTime} onChange={e => setSelectedTime(e.target.value)} className="w-full p-4 rounded-2xl border border-gray-200 bg-gray-50 font-bold text-gray-800 outline-none focus:border-[#0F6E56] transition-colors" />
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-2xl border border-gray-200">
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Nombre de visiteurs</label>
                            <div className="flex items-center justify-between">
                              <button onClick={() => setVisitorCount(Math.max(1, visitorCount - 1))} className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 font-extrabold flex items-center justify-center text-gray-600 transition-colors">-</button>
                              <span className="font-extrabold text-xl text-gray-900">{visitorCount}</span>
                              <button onClick={() => setVisitorCount(visitorCount + 1)} className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 font-extrabold flex items-center justify-center text-gray-600 transition-colors">+</button>
                            </div>
                          </div>
                        </div>
                        <div className="bg-[#F0F9F7] p-6 rounded-[2rem] flex flex-col justify-end border border-[#0F6E56]/10">
                          <div className="flex justify-between items-end mb-6">
                            <div>
                              <span className="text-[10px] font-black text-[#0F6E56] uppercase tracking-wider block mb-1">Montant Estimé</span>
                              <span className="font-black text-3xl text-[#0F6E56]">{selectedSite.price === 0 ? 'Gratuit' : `${selectedSite.price * visitorCount} DZD`}</span>
                            </div>
                          </div>
                          <button onClick={() => setBookingStep(2)} className="w-full py-4 bg-[#0F6E56] text-white font-extrabold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                            Continuer <ArrowRight size={18} />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {bookingStep === 2 && (
                      <motion.div key="step2" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="max-w-2xl mx-auto w-full">
                        <h3 className="font-extrabold text-2xl text-gray-900 mb-2">Vos informations</h3>
                        <p className="text-sm text-gray-500 mb-8">Nous avons besoin de ces informations pour émettre votre billet numérique.</p>
                        <div className="space-y-4 mb-8">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Prénom</label>
                              <input type="text" value={personalInfo.firstName} onChange={e => setPersonalInfo({ ...personalInfo, firstName: e.target.value })} className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#0F6E56] outline-none transition-colors" placeholder="Ex: Karim" />
                            </div>
                            <div>
                              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Nom de famille</label>
                              <input type="text" value={personalInfo.lastName} onChange={e => setPersonalInfo({ ...personalInfo, lastName: e.target.value })} className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#0F6E56] outline-none transition-colors" placeholder="Ex: Benali" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Email</label>
                            <input type="email" value={personalInfo.email} onChange={e => setPersonalInfo({ ...personalInfo, email: e.target.value })} className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#0F6E56] outline-none transition-colors" placeholder="votre@email.com" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Numéro de téléphone</label>
                            <input type="tel" value={personalInfo.phone} onChange={e => setPersonalInfo({ ...personalInfo, phone: e.target.value })} className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#0F6E56] outline-none transition-colors" placeholder="+213 550 XX XX XX" />
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <button onClick={() => setBookingStep(1)} className="px-6 py-4 border-2 border-gray-200 text-gray-600 font-extrabold rounded-xl hover:bg-gray-50 transition-all">Retour</button>
                          <button
                            onClick={() => setBookingStep(3)}
                            disabled={!personalInfo.firstName || !personalInfo.lastName || !personalInfo.phone}
                            className="flex-1 py-4 bg-[#0F6E56] text-white font-extrabold rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2"
                          >
                            Passer au paiement <ArrowRight size={18} />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {bookingStep === 3 && (
                      <motion.div key="step3" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} className="max-w-2xl mx-auto w-full">
                        <h3 className="font-extrabold text-2xl text-gray-900 mb-2">Paiement</h3>
                        <p className="text-sm text-gray-500 mb-8">Choisissez votre méthode de paiement pour finaliser la réservation.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                          {(['CIB', 'Edahabia', 'Cash'] as PaymentMethod[]).map(method => (
                            <div
                              key={method}
                              onClick={() => setPaymentMethod(method)}
                              className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${paymentMethod === method ? 'border-[#0F6E56] bg-[#F0F9F7] shadow-sm' : 'border-gray-100 hover:border-gray-200'}`}
                            >
                              <CreditCard className={paymentMethod === method ? 'text-[#0F6E56]' : 'text-gray-400'} size={28} />
                              <span className={`font-extrabold ${paymentMethod === method ? 'text-[#0F6E56]' : 'text-gray-600'}`}>{method}</span>
                            </div>
                          ))}
                        </div>
                        {(paymentMethod === 'Edahabia' || paymentMethod === 'CIB') && (
                          <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100 space-y-4">
                            <div>
                              <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Numéro de carte</label>
                              <input type="text" maxLength={16} className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#0F6E56] outline-none transition-colors font-mono" placeholder="0000 0000 0000 0000" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Date d'expiration</label>
                                <input type="text" maxLength={5} className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#0F6E56] outline-none transition-colors font-mono" placeholder="MM/AA" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">CVV</label>
                                <input type="text" maxLength={3} className="w-full p-4 rounded-xl border border-gray-200 focus:border-[#0F6E56] outline-none transition-colors font-mono" placeholder="123" />
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
                          <div className="flex justify-between mb-3"><span className="text-gray-500 font-medium">Billet d'entrée ({visitorCount}x)</span><span className="font-bold">{selectedSite.price * visitorCount} DZD</span></div>
                          <div className="flex justify-between mb-3"><span className="text-gray-500 font-medium">Frais de service</span><span className="font-bold text-[#0F6E56]">Gratuit</span></div>
                          <div className="flex justify-between pt-4 mt-4 border-t border-gray-200"><span className="font-extrabold text-lg">Total à payer</span><span className="font-black text-2xl text-[#0F6E56]">{selectedSite.price * visitorCount} DZD</span></div>
                        </div>
                        <div className="flex gap-4">
                          <button onClick={() => setBookingStep(2)} className="px-6 py-4 border-2 border-gray-200 text-gray-600 font-extrabold rounded-xl hover:bg-gray-50 transition-all">Retour</button>
                          <button
                            onClick={() => {
                              setBookingReference(`ALG-${new Date().getFullYear()}-${Math.floor(Math.random() * 90000) + 10000}`);
                              setBookingStep(4);
                            }}
                            className="flex-1 py-4 bg-[#0F6E56] hover:bg-[#0D5544] text-white font-extrabold rounded-xl shadow-lg hover:shadow-xl transition-all flex justify-center items-center gap-2"
                          >
                            <CreditCard size={18} /> Confirmer et Payer
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {bookingStep === 4 && (
                      <motion.div key="step4" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center text-center py-6">
                        <div className="w-20 h-20 bg-[#F0F9F7] rounded-full flex items-center justify-center mb-6 shadow-inner">
                          <div className="w-14 h-14 bg-[#0F6E56] rounded-full flex items-center justify-center text-white shadow-lg">
                            <CheckCircle2 size={28} />
                          </div>
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2 leading-tight">Réservation validée !</h2>
                        <p className="text-gray-500 text-sm mb-8 max-w-sm">Votre pass d'accès numérique pour <span className="font-bold text-[#0F6E56]">{selectedSite.name}</span> a été généré avec succès.</p>
                        <div className="w-full max-w-md bg-gradient-to-b from-[#0F6E56] to-[#0D5544] text-white rounded-3xl shadow-2xl overflow-hidden mb-8 relative border border-[#1D9E75]/25">
                          <div className="p-6 pb-4 border-b border-white/10 flex justify-between items-center text-left">
                            <div>
                              <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider block">Voyageur</span>
                              <span className="font-black text-sm">{personalInfo.firstName} {personalInfo.lastName.toUpperCase()}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] text-white/60 font-bold uppercase tracking-wider block">Billet numérique</span>
                              <span className="font-extrabold text-xs bg-white/20 px-2 py-0.5 rounded text-[#FDE68A]">WEJHA PASS</span>
                            </div>
                          </div>
                          <div className="p-6 grid grid-cols-2 gap-y-4 gap-x-6 text-left relative">
                            <div className="absolute top-1/2 -left-3 w-6 h-6 bg-white rounded-full -translate-y-1/2 shadow-inner" />
                            <div className="absolute top-1/2 -right-3 w-6 h-6 bg-white rounded-full -translate-y-1/2 shadow-inner" />
                            <div><span className="text-[10px] text-white/60 font-bold uppercase tracking-wider block">Destination</span><span className="font-black text-base line-clamp-1">{selectedSite.name}</span></div>
                            <div><span className="text-[10px] text-white/60 font-bold uppercase tracking-wider block">Référence</span><span className="font-black text-base tracking-wider text-[#FDE68A]">{bookingReference}</span></div>
                            <div><span className="text-[10px] text-white/60 font-bold uppercase tracking-wider block">Visiteurs</span><span className="font-extrabold text-sm">{visitorCount} {visitorCount > 1 ? 'personnes' : 'personne'}</span></div>
                            <div><span className="text-[10px] text-white/60 font-bold uppercase tracking-wider block">Date</span><span className="font-extrabold text-sm">{new Date(selectedDate).toLocaleDateString('fr-FR')} à {selectedTime}</span></div>
                          </div>
                          <div className="bg-white/5 py-5 px-6 border-t border-dashed border-white/20 flex flex-col items-center">
                            <div className="h-10 w-full bg-transparent flex justify-between items-center opacity-70 mb-2">
                              {Array.from({ length: 48 }).map((_, idx) => (
                                <div key={idx} className="bg-white rounded-sm" style={{ width: idx % 3 === 0 ? '2px' : idx % 5 === 0 ? '4px' : '1px', height: idx % 2 === 0 ? '32px' : '24px' }} />
                              ))}
                            </div>
                            <span className="text-[9px] tracking-[0.4em] font-mono text-white/60">{bookingReference}</span>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                          <button onClick={() => { const link = document.createElement('a'); link.href = '#'; link.download = 'Wejha_Ticket.pdf'; link.click(); }} className="flex-1 py-3.5 bg-gray-900 hover:bg-gray-800 text-white font-extrabold rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg">
                            <Download size={18} /> Télécharger le pass
                          </button>
                          <button onClick={() => setShowBookingModal(false)} className="flex-1 py-3.5 border-2 border-gray-100 hover:border-[#0F6E56]/30 text-gray-700 font-extrabold rounded-2xl transition-all">
                            Fermer
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
}