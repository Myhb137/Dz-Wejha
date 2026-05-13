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
import AiChat from './components/AiChat';
import HeritageGame from './components/HeritageGame';
import AlgeriaFeed from './components/AlgeriaFeed';

// ── Types ───────────────────────────────────────────────────────────────────
type SiteCategory = 'Historique' | 'Nature' | 'Sahara' | 'Religieux' | 'UNESCO' | 'Aventure' | 'Culture' | 'Architecture' | 'Plage' | 'Vue Panoramique' | 'Luxe' | 'Famille' | 'Neige' | 'Vie Nocturne' | 'Musée';

interface Site {
  id: number;
  name: string;
  wilaya: string;
  wilayaNumber: number;
  categories: SiteCategory[];
  price: number;
  rating: number;
  duration: string;
  accessibility: string;
  image: string;
}

type TimeSlot = {
  time: string;
  crowdLevel: 'Faible' | 'Modérée' | 'Forte' | 'Complet';
};

type PaymentMethod = 'CIB' | 'Edahabia' | 'Cash';

// ── Data ────────────────────────────────────────────────────────────────────
const SITES: Site[] = [
  { id: 1, name: "Casbah d'Alger", wilaya: "Alger", wilayaNumber: 16, categories: ["Historique", "UNESCO"], price: 200, rating: 4.9, duration: "2-3h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1602496252172-8030f4df6ed0?w=800" },
  { id: 2, name: "Tassili n'Ajjer", wilaya: "Djanet", wilayaNumber: 56, categories: ["Nature", "Aventure", "UNESCO"], price: 3500, rating: 5.0, duration: "2-5 jours", accessibility: "Difficile", image: "https://images.unsplash.com/photo-1649250594738-0c8f8c385e91?w=800" },
  { id: 3, name: "Pont de Sidi M'Cid", wilaya: "Constantine", wilayaNumber: 25, categories: ["Historique", "Architecture"], price: 100, rating: 4.8, duration: "1-2h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1638732984003-d2a05a69ebd6?w=800" },
  { id: 4, name: "Notre Dame d'Afrique", wilaya: "Alger", wilayaNumber: 16, categories: ["Religieux", "Historique"], price: 150, rating: 4.7, duration: "1-2h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=800" },
  { id: 5, name: "Ruines de Timgad", wilaya: "Batna", wilayaNumber: 5, categories: ["Historique", "UNESCO"], price: 300, rating: 4.9, duration: "3-4h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1631995872935-d964797502e0?w=800" },
  { id: 6, name: "Plage de Madagh", wilaya: "Oran", wilayaNumber: 31, categories: ["Plage", "Nature"], price: 250, rating: 4.6, duration: "Toute la journée", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800" },
  { id: 7, name: "Djurdjura National Park", wilaya: "Tizi Ouzou", wilayaNumber: 15, categories: ["Nature", "Randonnée"], price: 500, rating: 4.8, duration: "4-6h", accessibility: "Difficile", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800" },
  { id: 8, name: "Ketchaoua Mosque", wilaya: "Alger", wilayaNumber: 16, categories: ["Religieux", "Historique"], price: 100, rating: 4.7, duration: "1h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800" },
  { id: 9, name: "Cap Carbon", wilaya: "Béjaïa", wilayaNumber: 6, categories: ["Nature", "Vue Panoramique"], price: 200, rating: 4.9, duration: "2-3h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800" },
  { id: 10, name: "Maqam Echahid", wilaya: "Alger", wilayaNumber: 16, categories: ["Historique", "Monument"], price: 100, rating: 4.8, duration: "1-2h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800" },
  { id: 11, name: "Ghoufi Canyon", wilaya: "Batna", wilayaNumber: 5, categories: ["Nature", "Aventure"], price: 400, rating: 4.8, duration: "3-5h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800" },
  { id: 12, name: "Santa Cruz Fort", wilaya: "Oran", wilayaNumber: 31, categories: ["Historique", "Vue Panoramique"], price: 200, rating: 4.7, duration: "2h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1628676894668-40e17b834f4d?w=800" },
  { id: 13, name: "Jardin d'Essai du Hamma", wilaya: "Alger", wilayaNumber: 16, categories: ["Nature", "Jardin"], price: 150, rating: 4.9, duration: "2-3h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800" },
  { id: 14, name: "Taghit Oasis", wilaya: "Béchar", wilayaNumber: 8, categories: ["Sahara", "Nature"], price: 1200, rating: 4.9, duration: "1-2 jours", accessibility: "Moyenne", image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800" },
  { id: 15, name: "Ghardaïa Old Town", wilaya: "Ghardaïa", wilayaNumber: 47, categories: ["Historique", "Culture", "UNESCO"], price: 400, rating: 4.9, duration: "3-4h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1669356771785-3af414591b4a?w=800" },
  { id: 16, name: "Tikjda Mountains", wilaya: "Bouira", wilayaNumber: 10, categories: ["Nature", "Randonnée"], price: 600, rating: 4.8, duration: "Toute la journée", accessibility: "Difficile", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800" },
  { id: 17, name: "Chenoua Beach", wilaya: "Tipaza", wilayaNumber: 42, categories: ["Plage", "Nature"], price: 200, rating: 4.6, duration: "Toute la journée", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800" },
  { id: 18, name: "Roman Ruins of Djemila", wilaya: "Sétif", wilayaNumber: 19, categories: ["Historique", "UNESCO"], price: 300, rating: 4.9, duration: "2-4h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1449495169669-7b118f960251?w=800" },
  { id: 19, name: "Beni Hammad Fort", wilaya: "M'Sila", wilayaNumber: 28, categories: ["Historique", "UNESCO"], price: 250, rating: 4.7, duration: "2-3h", accessibility: "Moyenne", image: "https://images.unsplash.com/photo-1638733221295-886884772a57?w=800" },
  { id: 20, name: "El Kala National Park", wilaya: "El Tarf", wilayaNumber: 36, categories: ["Nature", "Culture"], price: 500, rating: 4.8, duration: "4-6h", accessibility: "Moyenne", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800" },
  { id: 21, name: "Sablettes Beach", wilaya: "Alger", wilayaNumber: 16, categories: ["Plage", "Famille"], price: 100, rating: 4.5, duration: "Toute la journée", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800" },
  { id: 22, name: "Tlemcen Waterfalls", wilaya: "Tlemcen", wilayaNumber: 13, categories: ["Nature", "Vue Panoramique"], price: 350, rating: 4.8, duration: "2-4h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1433086390890-8299e671390b?w=800" },
  { id: 23, name: "Gouraya National Park", wilaya: "Béjaïa", wilayaNumber: 6, categories: ["Nature", "Randonnée"], price: 450, rating: 4.8, duration: "3-5h", accessibility: "Moyenne", image: "https://images.unsplash.com/photo-1713510747419-b46fdb53e356?w=800" },
  { id: 24, name: "Hoggar Mountains", wilaya: "Tamanrasset", wilayaNumber: 11, categories: ["Sahara", "Aventure"], price: 5000, rating: 5.0, duration: "3-7 jours", accessibility: "Difficile", image: "https://images.unsplash.com/photo-1638734612296-92e65572a57f?w=800" },
  { id: 25, name: "Royal Mausoleum of Mauretania", wilaya: "Tipaza", wilayaNumber: 42, categories: ["Historique", "Architecture"], price: 200, rating: 4.7, duration: "1-2h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1528127269322-539801943592?w=800" },
  { id: 26, name: "Ain Achir Beach", wilaya: "Annaba", wilayaNumber: 23, categories: ["Plage", "Nature"], price: 150, rating: 4.6, duration: "Toute la journée", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800" },
  { id: 27, name: "Taza National Park", wilaya: "Jijel", wilayaNumber: 18, categories: ["Nature", "Randonnée"], price: 400, rating: 4.8, duration: "4-6h", accessibility: "Difficile", image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800" },
  { id: 28, name: "Constantine Old City", wilaya: "Constantine", wilayaNumber: 25, categories: ["Historique", "Culture"], price: 200, rating: 4.8, duration: "3-5h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1621609764095-b32bbe35cf3a?w=800" },
  { id: 29, name: "Emir Abdelkader Mosque", wilaya: "Constantine", wilayaNumber: 25, categories: ["Religieux", "Architecture"], price: 150, rating: 4.9, duration: "1-2h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1564767609342-620cb19b2357?w=800" },
  { id: 30, name: "Sidi Fredj Marina", wilaya: "Alger", wilayaNumber: 16, categories: ["Plage", "Luxe"], price: 600, rating: 4.7, duration: "Toute la journée", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800" },
  { id: 31, name: "Chréa National Park", wilaya: "Blida", wilayaNumber: 9, categories: ["Nature", "Neige"], price: 500, rating: 4.7, duration: "4-6h", accessibility: "Moyenne", image: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=800" },
  { id: 32, name: "M'zab Valley", wilaya: "Ghardaïa", wilayaNumber: 47, categories: ["Culture", "UNESCO"], price: 500, rating: 4.9, duration: "1 journée", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1669356771785-3af414591b4a?w=800" },
  { id: 33, name: "Bousaada Oasis", wilaya: "M'Sila", wilayaNumber: 28, categories: ["Sahara", "Culture"], price: 450, rating: 4.6, duration: "1 journée", accessibility: "Moyenne", image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800" },
  { id: 34, name: "Lalla Setti Plateau", wilaya: "Tlemcen", wilayaNumber: 13, categories: ["Vue Panoramique", "Nature"], price: 250, rating: 4.8, duration: "2-3h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800" },
  { id: 35, name: "El Aurassi Viewpoint", wilaya: "Alger", wilayaNumber: 16, categories: ["Vue Panoramique", "Luxe"], price: 300, rating: 4.7, duration: "1-2h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800" },
  { id: 36, name: "Paradise Beach", wilaya: "Skikda", wilayaNumber: 21, categories: ["Plage", "Nature"], price: 200, rating: 4.9, duration: "Toute la journée", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800" },
  { id: 37, name: "Roman Theater of Guelma", wilaya: "Guelma", wilayaNumber: 24, categories: ["Historique", "Culture"], price: 150, rating: 4.7, duration: "1-2h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800" },
  { id: 38, name: "Ténès Coastline", wilaya: "Chlef", wilayaNumber: 2, categories: ["Plage", "Nature"], price: 250, rating: 4.6, duration: "Toute la journée", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1516815231560-8f41ec531527?w=800" },
  { id: 39, name: "Akfadou Forest", wilaya: "Béjaïa", wilayaNumber: 6, categories: ["Nature", "Randonnée"], price: 400, rating: 4.8, duration: "3-5h", accessibility: "Difficile", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800" },
  { id: 40, name: "Sebiba Dunes", wilaya: "Djanet", wilayaNumber: 56, categories: ["Sahara", "Aventure"], price: 1800, rating: 4.9, duration: "1-2 jours", accessibility: "Difficile", image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800" },
  { id: 41, name: "Tichy Beach", wilaya: "Béjaïa", wilayaNumber: 6, categories: ["Plage", "Famille"], price: 150, rating: 4.5, duration: "Toute la journée", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800" },
  { id: 42, name: "Miliana Historic Center", wilaya: "Aïn Defla", wilayaNumber: 44, categories: ["Historique", "Culture"], price: 100, rating: 4.7, duration: "2-3h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=800" },
  { id: 43, name: "Oran Corniche", wilaya: "Oran", wilayaNumber: 31, categories: ["Plage", "Vie Nocturne"], price: 300, rating: 4.8, duration: "Toute la soirée", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800" },
  { id: 44, name: "Babor Mountains", wilaya: "Sétif", wilayaNumber: 19, categories: ["Nature", "Randonnée"], price: 500, rating: 4.8, duration: "5-7h", accessibility: "Difficile", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800" },
  { id: 45, name: "Timgad Museum", wilaya: "Batna", wilayaNumber: 5, categories: ["Historique", "Musée"], price: 150, rating: 4.7, duration: "1-2h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800" },
  { id: 46, name: "Annaba Basilica of St Augustine", wilaya: "Annaba", wilayaNumber: 23, categories: ["Religieux", "Historique"], price: 200, rating: 4.9, duration: "1-2h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1548013146-72479768bbaa?w=800" },
  { id: 47, name: "Jijel Caves", wilaya: "Jijel", wilayaNumber: 18, categories: ["Nature", "Aventure"], price: 350, rating: 4.8, duration: "2-4h", accessibility: "Moyenne", image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800" },
  { id: 48, name: "Béni Abbès Oasis", wilaya: "Béchar", wilayaNumber: 8, categories: ["Sahara", "Nature"], price: 1000, rating: 4.9, duration: "1-2 jours", accessibility: "Moyenne", image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800" },
  { id: 49, name: "Saoura Valley", wilaya: "Adrar", wilayaNumber: 1, categories: ["Sahara", "Culture"], price: 2000, rating: 4.8, duration: "2-4 jours", accessibility: "Moyenne", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800" },
  { id: 50, name: "Tlemcen Grand Mosque", wilaya: "Tlemcen", wilayaNumber: 13, categories: ["Religieux", "Historique"], price: 150, rating: 4.9, duration: "1-2h", accessibility: "Accessible", image: "https://images.unsplash.com/photo-1564767609342-620cb19b2357?w=800" }
];

const WILAYAS = [
  { number: 16, name: "Alger", siteCount: 12 },
  { number: 31, name: "Oran", siteCount: 8 },
  { number: 25, name: "Constantine", siteCount: 6 },
  { number: 6, name: "Béjaïa", siteCount: 5 },
  { number: 5, name: "Batna", siteCount: 4 },
  { number: 13, name: "Tlemcen", siteCount: 4 },
  { number: 47, name: "Ghardaïa", siteCount: 3 },
  { number: 56, name: "Djanet", siteCount: 2 },
  { number: 8, name: "Béchar", siteCount: 3 },
  { number: 42, name: "Tipaza", siteCount: 2 },
  { number: 18, name: "Jijel", siteCount: 2 },
  { number: 1, name: "Adrar", siteCount: 1 }
];

const HERO_SLIDES = [
  { src: "https://images.unsplash.com/photo-1602496252172-8030f4df6ed0?auto=format&fit=crop&q=80&w=2000", label: "Casbah d'Alger" },
  { src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=2000", label: "Sahara Algérien" },
  { src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=2000", label: "Pont de Constantine" }
];

// ── Components ──────────────────────────────────────────────────────────────

const Layout = ({ children, onOpenAuth }: { children: React.ReactNode, onOpenAuth: () => void }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen" style={{ fontFamily: 'DM Sans, sans-serif', backgroundColor: '#F8F5EF' }}>
      <div className="fixed inset-0 pointer-events-none opacity-5" style={{
        backgroundImage: `repeating-linear-gradient(45deg, #0F6E56 0, #0F6E56 1px, transparent 0, transparent 50%)`,
        backgroundSize: '20px 20px'
      }} />

      <header className="relative bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <Link to="/" className="flex items-center gap-2 md:gap-3 cursor-pointer group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-[#0F6E56] to-[#1D9E75] flex items-center justify-center group-hover:rotate-6 transition-transform">
                <MapPin className="text-white w-5 h-5 md:w-6 md:h-6" />
              </div>
              <span className="font-black text-xl md:text-2xl tracking-tighter" style={{ color: '#0F6E56' }}>WEJHA</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {[
                { name: 'Accueil', path: '/' },
                { name: 'Destinations', path: '/catalogue' },
                { name: 'Wilayas', path: '/wilayas' },
                { name: 'Découvrir', path: '/discover' },
                { name: 'Le Défi', path: '/game' },
                { name: 'À propos', path: '/about' }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative font-bold transition-all duration-200 group ${
                    location.pathname === item.path ? 'text-[#0F6E56]' : 'text-gray-600 hover:text-[#0F6E56]'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                    location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                    style={{ backgroundColor: '#0F6E56' }} />
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button onClick={onOpenAuth} className="px-5 py-2.5 rounded-xl border-2 font-bold transition-all border-[#0F6E56] text-[#0F6E56] hover:bg-[#0F6E56] hover:text-white">
                <User className="inline-block mr-2 w-4 h-4" /> Connexion
              </button>
              <button className="lg:hidden p-2" onClick={() => setShowMobileMenu(!showMobileMenu)}><Menu /></button>
            </div>
          </div>
          
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} className="lg:hidden bg-white border-t border-gray-100 overflow-hidden">
                {[
                  { name: 'Accueil', path: '/' },
                  { name: 'Destinations', path: '/catalogue' },
                  { name: 'Wilayas', path: '/wilayas' },
                  { name: 'Découvrir', path: '/discover' },
                  { name: 'Le Défi', path: '/game' },
                  { name: 'À propos', path: '/about' }
                ].map((item) => (
                  <Link key={item.name} to={item.path} onClick={() => setShowMobileMenu(false)} className="block w-full text-left px-6 py-4 font-bold text-gray-700 hover:bg-gray-50">{item.name}</Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="relative pb-12">
        {children}
      </main>

      <footer className="bg-[#05281E] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[#0F6E56] flex items-center justify-center">
                  <MapPin className="text-white w-6 h-6" />
                </div>
                <span className="font-black text-2xl tracking-tighter">WEJHA AI</span>
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
                <li><Link to="/about" className="hover:text-white transition-colors">À propos</Link></li>
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
  onSearch: (params: { wilaya: string, type: string }) => void;
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
    <section style={{ position:'relative', minHeight:'clamp(580px,88vh,960px)', overflow:'hidden', display:'flex', alignItems:'stretch' }}>
      {HERO_SLIDES.map((img, i) => (
        <div key={i} style={{
          position:'absolute', inset:0,
          transition:'opacity 1.4s ease',
          opacity: i === slide ? 1 : 0,
          zIndex: i === slide ? 1 : 0,
        }}>
          <img src={img.src} alt={img.label} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', animation: i === slide ? 'kenBurns 18s ease-in-out infinite' : 'none', transformOrigin:'center center' }} />
        </div>
      ))}
      <div style={{ position:'absolute', inset:0, zIndex:1, background:'linear-gradient(135deg, rgba(5,40,30,.88) 0%, rgba(15,110,86,.72) 45%, rgba(5,30,20,.80) 100%)' }} />
      
      <div style={{ position:'relative', zIndex:10, width:'100%', maxWidth:1280, margin:'0 auto', padding:'clamp(3rem,7vw,6rem) clamp(1rem,4vw,3rem) clamp(2.5rem,5vw,4rem)', display:'flex', flexDirection:'row', flexWrap:'wrap', gap:'clamp(2rem,4vw,4rem)', alignItems:'center' }}>
        <div style={{ flex:'1 1 380px', minWidth:0 }}>
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, marginBottom:'clamp(.75rem,2vw,1.25rem)', padding:'.4em 1.1em', borderRadius:999, background:'rgba(255,255,255,.15)', backdropFilter:'blur(14px)', border:'1px solid rgba(255,255,255,.28)' }}>
              <Sparkles size={13} color="#FDE68A" />
              <span style={{ color:'white', fontWeight:600, fontSize:'clamp(.72rem,.65rem + .35vw,.85rem)', letterSpacing:'.02em' }}>{HERO_SLIDES[slide].label} · 50 sites d'exception</span>
            </div>
            <h1 style={{ fontFamily:'Playfair Display, serif', fontSize:'clamp(2rem,2rem + 2.5vw,4rem)', lineHeight:1.1, fontWeight:800, color:'white', margin:'0 0 clamp(.75rem,2vw,1.25rem)' }}>Explorez les trésors<br/>cachés de l'Algérie</h1>
            <p style={{ color:'rgba(255,255,255,.82)', fontSize:'clamp(.95rem,.9rem + .4vw,1.15rem)', lineHeight:1.65, margin:'0 0 clamp(1.5rem,3vw,2.5rem)', maxWidth:500 }}>Réservez votre créneau pour visiter les sites patrimoniaux les plus emblématiques du pays — intelligemment avec Wejha AI.</p>
            <div style={{ display:'flex', gap:'clamp(1.5rem,3vw,3rem)', flexWrap:'wrap', alignItems:'center', marginBottom:'clamp(1rem,2vw,1.5rem)' }}>
              {[ { icon: MapPin, value:'58', label:'Wilayas' }, { icon: Star, value:'50', label:'Sites Phares' }, { icon: Users, value:'100%', label:'Authenticité' } ].map((s,i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap:14 }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30"><s.icon size={22} color="white" /></div>
                  <div>
                    <div style={{ fontWeight:900, fontSize:'clamp(1.4rem,1.3rem + .6vw,1.9rem)', color:'white', lineHeight:1 }}>{s.value}</div>
                    <div style={{ fontSize:'clamp(.8rem,.75rem + .25vw,.95rem)', color:'rgba(255,255,255,.75)', lineHeight:1.5, marginTop:3 }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.7, delay:0.2 }} style={{ flex:'1 1 340px', minWidth:0 }}>
          <div style={{ background:'rgba(255,255,255,.97)', backdropFilter:'blur(20px)', borderRadius:'clamp(1rem,2vw,1.5rem)', padding:'clamp(1.1rem,2.5vw,1.8rem)', boxShadow:'0 24px 64px rgba(0,0,0,.22)', border:'1px solid rgba(255,255,255,.7)' }}>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))', gap:'clamp(.6rem,1vw,.9rem)', marginBottom:'clamp(.6rem,1vw,.9rem)' }}>
              <div>
                <label style={{ display:'flex', alignItems:'center', gap:5, fontWeight:700, fontSize:'clamp(.72rem,.7rem + .15vw,.82rem)', color:'#3a3a3a', marginBottom:6 }}><MapPin size={12} color="#0F6E56" /> Destination</label>
                <select value={searchWilaya} onChange={e => setSearchWilaya(e.target.value)} style={{ width:'100%', padding:'.6em .8em', borderRadius:10, border:'2px solid #E5E7EB', background:'#F9FAFB', fontSize:'clamp(.82rem,.78rem + .2vw,.9rem)', cursor:'pointer', outline:'none', color:'#222' }}>
                  <option>Toutes les wilayas</option>
                  {WILAYAS.map(w => <option key={w.number}>{w.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display:'flex', alignItems:'center', gap:5, fontWeight:700, fontSize:'clamp(.72rem,.7rem + .15vw,.82rem)', color:'#3a3a3a', marginBottom:6 }}><Calendar size={12} color="#0F6E56" /> Date</label>
                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} style={{ width:'100%', padding:'.6em .8em', borderRadius:10, border:'2px solid #E5E7EB', background:'#F9FAFB', fontSize:'clamp(.82rem,.78rem + .2vw,.9rem)', outline:'none', color:'#222', boxSizing:'border-box' }} />
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'clamp(.6rem,1vw,.9rem)', marginBottom:'clamp(.8rem,1.2vw,1.1rem)' }}>
              <div>
                <label style={{ display:'flex', alignItems:'center', gap:5, fontWeight:700, fontSize:'clamp(.72rem,.7rem + .15vw,.82rem)', color:'#3a3a3a', marginBottom:6 }}><Users size={12} color="#0F6E56" /> Visiteurs</label>
                <select value={visitorCount} onChange={e => setVisitorCount(Number(e.target.value))} style={{ width:'100%', padding:'.6em .8em', borderRadius:10, border:'2px solid #E5E7EB', background:'#F9FAFB', fontSize:'clamp(.82rem,.78rem + .2vw,.9rem)', cursor:'pointer', outline:'none', color:'#222' }}>
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} pers.</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontWeight:700, fontSize:'clamp(.72rem,.7rem + .15vw,.82rem)', color:'#3a3a3a', display:'block', marginBottom:6 }}>Type</label>
                <select value={searchType} onChange={e => setSearchType(e.target.value)} style={{ width:'100%', padding:'.6em .8em', borderRadius:10, border:'2px solid #E5E7EB', background:'#F9FAFB', fontSize:'clamp(.82rem,.78rem + .2vw,.9rem)', cursor:'pointer', outline:'none', color:'#222' }}>
                  <option>Tous</option><option>Historique</option><option>Nature</option><option>Sahara</option><option>Plage</option>
                </select>
              </div>
            </div>
            <button onClick={handleSearch} style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'clamp(.75rem,1.5vw,1rem)', borderRadius:10, border:'none', background:'linear-gradient(135deg,#0F6E56,#1D9E75)', color:'white', fontWeight:700, fontSize:'clamp(.9rem,.85rem + .3vw,1.05rem)', cursor:'pointer', boxShadow:'0 6px 22px rgba(15,110,86,.38)', transition:'all .2s' }} className="hover:scale-[1.02] active:scale-95">
              <Search size={16} /> Rechercher <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── App Component ───────────────────────────────────────────────────────────

export default function App() {
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<SiteCategory | 'Tous'>('Tous');
  const [visitorCount, setVisitorCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState('2026-05-24');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('CIB');
  const [heroSearchFilters, setHeroSearchFilters] = useState({ wilaya: 'Toutes les wilayas', type: 'Tous' });
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSiteSelect = (site: Site) => {
    setSelectedSite(site);
    setBookingConfirmed(false);
    setShowBookingModal(true);
  };

  const filteredSites = useMemo(() => {
    return SITES.filter(site => {
      const matchesCategory = categoryFilter === 'Tous' || site.categories.includes(categoryFilter);
      const matchesHeroWilaya = heroSearchFilters.wilaya === 'Toutes les wilayas' || site.wilaya === heroSearchFilters.wilaya;
      const matchesHeroType = heroSearchFilters.type === 'Tous' || site.categories.includes(heroSearchFilters.type as any);
      const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           site.wilaya.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesHeroWilaya && matchesHeroType && matchesSearch;
    });
  }, [categoryFilter, heroSearchFilters, searchQuery]);

  return (
    <Layout onOpenAuth={() => setShowAuthModal(true)}>
      <Routes>
        <Route path="/" element={
          <div className="animate-in fade-in duration-1000">
            <HeroSection selectedDate={selectedDate} setSelectedDate={setSelectedDate} visitorCount={visitorCount} setVisitorCount={setVisitorCount} onSearch={setHeroSearchFilters} />
            
            {/* How it Works Section */}
            <section className="bg-white py-20 md:py-32">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16 md:mb-24">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#0F6E56' }}>Comment ça marche ?</h2>
                  <p className="text-gray-500 max-w-xl mx-auto">Trois étapes simples pour une aventure inoubliable au cœur du patrimoine algérien.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                  {[
                    { icon: Search, title: 'Découvrez', desc: 'Explorez notre catalogue de 50 sites historiques et naturels via notre recherche intelligente ou l\'IA.' },
                    { icon: Calendar, title: 'Planifiez', desc: 'Choisissez votre date et votre créneau horaire en fonction de l\'affluence en temps réel.' },
                    { icon: CreditCard, title: 'Vivez', desc: 'Recevez votre pass numérique instantanément et profitez d\'une visite fluide et authentique.' }
                  ].map((item, i) => (
                    <div key={i} className="text-center group">
                      <div className="w-20 h-20 bg-[#F0F9F7] rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
                        <item.icon size={32} className="text-[#0F6E56]" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Offers Section (Moved here from top) */}
            <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#0F6E56' }}>Incontournables</h2>
                  <p className="text-gray-600 max-w-lg">Découvrez les sites les plus visités et les mieux notés de notre catalogue sélectionné par Wejha AI.</p>
                </div>
                <Link to="/catalogue" className="hidden md:flex items-center gap-2 text-[#0F6E56] font-bold hover:gap-3 transition-all">Voir tout <ArrowRight size={20} /></Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {SITES.slice(0, 3).map((site) => (
                  <motion.div key={site.id} whileHover={{ y:-10 }} className="bg-white rounded-3xl overflow-hidden shadow-xl group cursor-pointer" onClick={() => handleSiteSelect(site)}>
                    <div className="relative h-64 overflow-hidden">
                      <img src={site.image} alt={site.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-[#0F6E56] flex items-center gap-1"><MapPin size={12} /> {site.wilaya}</div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[#0F6E56] transition-colors">{site.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500"><Star className="text-yellow-400 fill-yellow-400" size={16} /><span className="font-bold text-gray-900">{site.rating}</span></div>
                        <span className="font-black text-[#0F6E56]">{site.price} DZD</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Stats / Chiffres Clés Section */}
            <section className="py-20 bg-gradient-to-br from-[#0F6E56] to-[#05281E] text-white">
              <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
                  {[
                    { value: '50+', label: 'Sites Patrimoniaux' },
                    { number: 58, label: 'Wilayas Couvertes' },
                    { value: '100%', label: 'Paiement Sécurisé' },
                    { value: '24/7', label: 'Support AI' }
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="text-4xl md:text-6xl font-black mb-2">{stat.value || stat.number}</div>
                      <div className="text-white/60 text-sm md:text-base font-bold uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Why Wejha Section */}
            <section className="py-20 md:py-32 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
                  <div className="flex-1">
                    <h2 className="text-3xl md:text-5xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, serif', color: '#0F6E56' }}>Pourquoi choisir Wejha ?</h2>
                    <div className="space-y-8">
                      {[
                        { icon: Zap, title: 'Rapidité & Fluidité', desc: 'Finies les files d\'attente. Réservez votre accès en moins de 2 minutes.' },
                        { icon: Shield, title: 'Préservation', desc: 'Nous aidons à réguler les flux pour protéger nos sites millénaires.' },
                        { icon: Star, title: 'Expérience Premium', desc: 'Des guides audio et des informations exclusives via notre IA.' }
                      ].map((feature, i) => (
                        <div key={i} className="flex gap-6">
                          <div className="w-12 h-12 rounded-2xl bg-white shadow-lg flex items-center justify-center flex-shrink-0">
                            <feature.icon className="text-[#0F6E56]" size={24} />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                            <p className="text-gray-500">{feature.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 relative">
                    <div className="absolute -inset-4 bg-[#0F6E56] rounded-[3rem] rotate-3 opacity-10"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000" 
                      className="relative rounded-[3rem] shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-700" 
                      alt="Constantine bridges" 
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Game Promotion Section */}
            <section className="max-w-7xl mx-auto px-4 py-20">
              <div className="bg-gradient-to-br from-[#0F6E56] to-[#05281E] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1D9E75]/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-8 backdrop-blur-md">
                    <Trophy className="text-amber-400" size={32} />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Connaissez-vous votre pays ?</h2>
                  <p className="text-white/70 max-w-xl mx-auto mb-10 text-lg">Testez vos connaissances sur le patrimoine algérien et tentez de gagner le badge d'Ambassadeur Wejha.</p>
                  <Link to="/game" className="inline-flex items-center gap-3 px-10 py-4 bg-white text-[#0F6E56] font-black rounded-2xl hover:scale-105 transition-all shadow-xl">
                    Jouer maintenant <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </section>
          </div>
        } />

        <Route path="/game" element={<HeritageGame />} />
        <Route path="/discover" element={<AlgeriaFeed />} />

        <Route path="/catalogue" element={
          <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#0F6E56' }}>Destinations</h1>
                <p className="text-gray-600">Explorez {filteredSites.length} sites exceptionnels à travers le pays.</p>
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
              {filteredSites.map((site) => (
                <motion.div key={site.id} layout whileHover={{ y:-5 }} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 group cursor-pointer" onClick={() => handleSiteSelect(site)}>
                  <div className="relative h-48 overflow-hidden"><img src={site.image} alt={site.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" /><div className="absolute bottom-3 left-3 flex gap-2"><div className="px-2 py-1 bg-[#0F6E56] text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">{site.categories[0]}</div></div><div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-md"><div className="text-[10px] font-black text-[#0F6E56]">{site.wilayaNumber}</div></div></div>
                  <div className="p-5"><div className="flex items-center gap-1 text-gray-400 mb-1"><MapPin size={10} /><span className="text-[10px] font-bold uppercase tracking-widest">{site.wilaya}</span></div><h3 className="font-bold text-lg mb-3 line-clamp-1">{site.name}</h3><div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-auto"><div className="flex items-center gap-1"><Star size={14} className="text-yellow-400 fill-yellow-400" /><span className="text-sm font-bold">{site.rating}</span></div><div className="text-[#0F6E56] font-black">{site.price === 0 ? 'Gratuit' : `${site.price} DZD`}</div></div></div>
                </motion.div>
              ))}
            </div>
            {filteredSites.length === 0 && (
              <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-200"><div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6"><Compass className="text-gray-300 w-10 h-10" /></div><h3 className="text-2xl font-bold text-gray-400 mb-4">Aucun site trouvé</h3><button onClick={() => { setCategoryFilter('Tous'); setHeroSearchFilters({ wilaya: 'Toutes les wilayas', type: 'Tous' }); }} className="text-[#0F6E56] font-bold underline">Réinitialiser les filtres</button></div>
            )}
          </div>
        } />

        <Route path="/wilayas" element={
          <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-16"><h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#0F6E56' }}>Nos 58 Wilayas</h1><p className="text-gray-600 max-w-2xl mx-auto">Explorez le patrimoine algérien wilaya par wilaya. Chaque région recèle des joyaux uniques à découvrir.</p></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
              {WILAYAS.map((w) => (
                <motion.div key={w.number} whileHover={{ scale:1.05, y:-5 }} onClick={() => { setHeroSearchFilters({ wilaya: w.name, type: 'Tous' }); navigate('/catalogue'); }} className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all cursor-pointer text-center group border border-gray-50"><div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white font-black text-xl md:text-2xl transition-transform group-hover:rotate-12" style={{ background: 'linear-gradient(135deg, #0F6E56 0%, #1D9E75 100%)' }}>{w.number}</div><h3 className="font-bold group-hover:text-[#0F6E56] transition-colors">{w.name}</h3><div className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-2">{w.siteCount} sites phares</div></motion.div>
              ))}
            </div>
          </div>
        } />

        <Route path="/about" element={
          <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center" style={{ fontFamily: 'Playfair Display, serif', color: '#0F6E56' }}>À Propos de Wejha</h1>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-12">
              <div className="text-center"><p className="text-2xl leading-relaxed text-gray-600 mb-8 font-medium">"Wejha" signifie <span className="text-[#0F6E56] font-bold">Destination</span>.</p><p>Notre mission est de digitaliser l'accès au patrimoine algérien tout en préservant l'authenticité de l'expérience voyageur.</p></div>
              <div className="grid md:grid-cols-2 gap-8"><div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-[#F0F9F7]"><Sparkles className="text-amber-500 mb-6 w-10 h-10" /><h3 className="text-2xl font-bold mb-4" style={{ color: '#0F6E56' }}>Notre Vision</h3><p className="text-gray-600">Devenir le compagnon de route incontournable pour chaque Algérien et touriste étranger souhaitant explorer notre riche histoire.</p></div><div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-[#F0F9F7]"><Zap className="text-blue-500 mb-6 w-10 h-10" /><h3 className="text-2xl font-bold mb-4" style={{ color: '#0F6E56' }}>Propulsé par l'IA</h3><p className="text-gray-600">Wejha AI analyse les flux et vos préférences pour vous suggérer les meilleurs moments de visite et des itinéraires optimisés.</p></div></div>
              <div className="bg-[#0F6E56] text-white p-12 rounded-[3rem] text-center shadow-2xl"><h3 className="text-3xl font-bold mb-6">Prêt à explorer ?</h3><p className="mb-10 text-white/80">Rejoignez des milliers de voyageurs qui font confiance à Wejha pour leurs aventures.</p><button onClick={() => navigate('/catalogue')} className="px-12 py-4 bg-white text-[#0F6E56] font-black rounded-2xl hover:scale-105 transition-all shadow-lg">Lancer la recherche</button></div>
            </div>
          </div>
        } />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <AiChat 
        onSelectSite={(siteName) => {
          // Robust matching: trim and handle common prefixes/suffixes like "The", "La", "Le", etc.
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

      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[60] p-4">
            <motion.div initial={{ scale:0.9, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.9, opacity:0 }} className="bg-white rounded-[2rem] p-12 max-w-md w-full relative shadow-2xl"><button onClick={() => setShowAuthModal(false)} className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"><X /></button><div className="text-center mb-10"><div className="w-16 h-16 bg-[#F0F9F7] rounded-2xl flex items-center justify-center mx-auto mb-6"><User className="text-[#0F6E56] w-8 h-8" /></div><h2 className="text-3xl font-bold mb-3" style={{ color: '#0F6E56' }}>Connexion</h2><p className="text-gray-500">Accédez à vos réservations et favoris.</p></div><div className="space-y-4"><button className="w-full py-4 bg-[#0F6E56] text-white font-bold rounded-xl shadow-lg hover:shadow-[#0F6E56]/30 transition-all">S'identifier</button><button className="w-full py-4 border-2 border-gray-100 font-bold rounded-xl hover:border-[#0F6E56] transition-all">Créer un compte</button></div></motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBookingModal && selectedSite && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 md:p-4">
            <motion.div initial={{ opacity:0, y:50 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:50 }} className="bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
              {!bookingConfirmed ? (
                <div className="p-6 md:p-10"><div className="flex items-center justify-between mb-8"><h2 className="font-bold text-2xl md:text-3xl" style={{ fontFamily: 'Playfair Display, serif', color: '#0F6E56' }}>Réserver mon passage</h2><button onClick={() => setShowBookingModal(false)} className="p-2 hover:bg-gray-100 rounded-full"><X /></button></div><div className="bg-[#F0F9F7] p-6 rounded-3xl mb-8 flex flex-col md:flex-row gap-6 items-center"><img src={selectedSite.image} className="w-24 h-24 rounded-2xl object-cover shadow-lg" /><div><h3 className="text-xl font-bold text-[#0F6E56] mb-1">{selectedSite.name}</h3><p className="text-sm text-gray-500 flex items-center gap-1"><MapPin size={12} /> {selectedSite.wilaya}</p></div><div className="ml-auto text-center"><div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total</div><div className="text-2xl font-black text-[#0F6E56]">{selectedSite.price * visitorCount} DZD</div></div></div><div className="space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="p-4 border-2 border-[#0F6E56]/10 rounded-2xl"><label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Visiteurs</label><div className="flex items-center justify-between"><button onClick={() => setVisitorCount(Math.max(1, visitorCount - 1))} className="w-8 h-8 rounded-lg bg-gray-100 font-bold">-</button><span className="font-bold text-lg">{visitorCount}</span><button onClick={() => setVisitorCount(visitorCount + 1)} className="w-8 h-8 rounded-lg bg-gray-100 font-bold">+</button></div></div><div className="p-4 border-2 border-[#0F6E56]/10 rounded-2xl"><label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Paiement</label><select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as any)} className="w-full bg-transparent font-bold outline-none"><option value="CIB">Carte CIB</option><option value="Edahabia">Edahabia</option><option value="Cash">Sur place</option></select></div></div><button onClick={() => { setBookingReference(`ALG-${new Date().getFullYear()}-${Math.floor(Math.random() * 90000) + 10000}`); setBookingConfirmed(true); }} className="w-full py-5 bg-[#0F6E56] text-white font-black text-lg rounded-2xl shadow-xl hover:shadow-[#0F6E56]/40 transition-all flex items-center justify-center gap-3"><CreditCard /> Confirmer la réservation</button></div></div>
              ) : (
                <div className="p-10 text-center py-20"><div className="w-24 h-24 bg-[#0F6E56] rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce"><CheckCircle2 className="text-white w-12 h-12" /></div><h2 className="text-3xl font-bold text-[#0F6E56] mb-4">C'est réservé !</h2><p className="text-gray-500 mb-8 max-w-sm mx-auto">Votre billet pour <span className="font-bold">{selectedSite.name}</span> a été généré avec succès.</p><div className="bg-gray-50 p-6 rounded-2xl mb-10 border-2 border-dashed border-gray-200"><div className="text-[10px] font-bold text-gray-400 uppercase mb-1">Référence</div><div className="text-2xl font-black tracking-widest text-gray-800">{bookingReference}</div></div><div className="flex flex-col sm:flex-row gap-4"><button className="flex-1 py-4 bg-gray-900 text-white font-bold rounded-xl flex items-center justify-center gap-2"><Download size={18} /> Télécharger</button><button onClick={() => setShowBookingModal(false)} className="flex-1 py-4 border-2 border-gray-100 font-bold rounded-xl hover:border-[#0F6E56]">Fermer</button></div></div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
