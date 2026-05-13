import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Menu, Home, Compass, MapPin, Sparkles, Trophy, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

const navItems = [
  { name: 'Accueil', path: '/', icon: Home },
  { name: 'Destinations', path: '/catalogue', icon: Compass },
  { name: 'Wilayas', path: '/wilayas', icon: MapPin },
  { name: 'Découvrir', path: '/discover', icon: Sparkles },
  { name: 'Le Défi', path: '/game', icon: Trophy },
  { name: 'À propos', path: '/about', icon: Info }
];

export function MobileNav({ isOpen, onClose, currentPath }: MobileNavProps) {
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-screen w-full max-w-sm bg-white shadow-2xl z-40 flex flex-col lg:hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <h3 className="font-black text-xl" style={{ color: '#0F6E56' }}>Menu</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                return (
                  <motion.div
                    key={item.path}
                    whileHover={{ x: 8 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.path}
                      onClick={onClose}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                        isActive
                          ? 'bg-[#0F6E56] text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon size={20} />
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Footer actions */}
            <div className="p-6 border-t border-gray-100 space-y-3">
              <button className="w-full px-4 py-3 bg-white border-2 border-[#0F6E56] text-[#0F6E56] rounded-xl font-bold hover:bg-[#0F6E56] hover:text-white transition-all">
                Connexion
              </button>
              <button className="w-full px-4 py-3 bg-[#0F6E56] text-white rounded-xl font-bold hover:bg-[#0D5544] transition-all">
                S'inscrire
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Mobile bottom nav for mobile screens
export function MobileBottomNav({ currentPath }: { currentPath: string }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-20">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.slice(0, 5).map(item => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? 'text-[#0F6E56]'
                  : 'text-gray-500'
              }`}
            >
              <Icon size={20} className={isActive ? 'fill-current' : ''} />
              <span className="text-xs font-bold">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
