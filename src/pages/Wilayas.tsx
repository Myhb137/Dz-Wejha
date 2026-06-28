import React, { useState } from 'react';
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
              <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="text-center mb-16"><h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif', color: '#0F6E56' }}>Nos 58 Wilayas</h1><p className="text-gray-600 max-w-2xl mx-auto">Explorez le patrimoine algérien wilaya par wilaya. Chaque région recèle des joyaux uniques à découvrir.</p></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
              {WILAYAS.map((w) => (
                <motion.div key={w.number} whileHover={{ scale:1.05, y:-5 }} onClick={() => { setHeroSearchFilters({ wilaya: w.name, type: 'Tous' }); navigate('/catalogue'); }} className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all cursor-pointer text-center group border border-gray-50"><div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white font-black text-xl md:text-2xl transition-transform group-hover:rotate-12" style={{ background: 'linear-gradient(135deg, #0F6E56 0%, #1D9E75 100%)' }}>{w.number}</div><h3 className="font-bold group-hover:text-[#0F6E56] transition-colors">{w.name}</h3><div className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mt-2">{w.siteCount} sites phares</div></motion.div>
              ))}
            </div>
          </div>
        } />


        
  );
}
