import React from 'react';
import { motion } from 'motion/react';
import { Heart, Share2, MapPin, DollarSign, Clock, Star, ArrowRight } from 'lucide-react';
import { CategoryTag } from './AdvancedFilters';

type SiteCategory = 'Historique' | 'Nature' | 'Sahara' | 'Religieux' | 'UNESCO' | 'Aventure' | 'Culture' | 'Architecture' | 'Plage' | 'Vue Panoramique' | 'Luxe' | 'Famille' | 'Neige' | 'Vie Nocturne' | 'Musée';

interface SiteCardProps {
  id: number;
  name: string;
  wilaya: string;
  categories: SiteCategory[];
  price: number;
  rating: number;
  duration: string;
  accessibility: string;
  image: string;
  onSelect?: (id: number) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
  variant?: 'grid' | 'featured';
}

export function SiteCard({
  id,
  name,
  wilaya,
  categories,
  price,
  rating,
  duration,
  accessibility,
  image,
  onSelect,
  isFavorite = false,
  onToggleFavorite,
  variant = 'grid'
}: SiteCardProps) {
  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        className="group relative overflow-hidden  rounded-3xl bg-white shadow-2xl border border-gray-50 cursor-pointer h-full"
        onClick={() => onSelect?.(id)}
      >
        {/* Image container */}
        <div className="relative h-80 md:h-96 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Badge */}
          <div className="absolute top-6 left-6">
            <CategoryTag category={categories[0]} size="md" />
          </div>

          {/* Favorite button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.(id);
            }}
            className="absolute top-6 right-6 p-3 bg-white/90 rounded-full backdrop-blur hover:bg-white transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart size={20} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <MapPin size={14} />
                {wilaya}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-[#0F6E56] transition-colors">
                {name}
              </h3>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-lg">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-gray-900">{rating.toFixed(1)}</span>
              </div>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                <DollarSign size={18} className="text-[#0F6E56]" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Prix</p>
                <p className="font-bold text-gray-900">{price.toLocaleString('fr-DZ')} DA</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Clock size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Durée</p>
                <p className="font-bold text-gray-900">{duration}</p>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 3).map(cat => (
                <CategoryTag key={cat} category={cat} size="sm" />
              ))}
              {categories.length > 3 && (
                <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-bold">
                  +{categories.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* CTA */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.(id);
            }}
            className="w-full py-3 bg-[#0F6E56] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#0D5544] transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Découvrir <ArrowRight size={18} />
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Grid variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl bg-white shadow-lg border border-gray-50 cursor-pointer h-full flex flex-col"
      onClick={() => onSelect?.(id)}
    >
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Badge */}
        <div className="absolute top-4 left-4">
          <CategoryTag category={categories[0]} size="sm" />
        </div>

        {/* Favorite button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(id);
          }}
          className="absolute top-4 right-4 p-2 bg-white/90 rounded-full backdrop-blur hover:bg-white transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Heart size={18} className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-3">
          <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-[#0F6E56] transition-colors mb-1">
            {name}
          </h3>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <MapPin size={12} />
            {wilaya}
          </p>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
          <div className="flex items-center gap-1.5 p-2 bg-emerald-50 rounded-lg">
            <DollarSign size={14} className="text-[#0F6E56]" />
            <span className="font-semibold">{price >= 1000 ? `${(price / 1000).toFixed(0)}k` : price} DA</span>
          </div>
          <div className="flex items-center gap-1.5 p-2 bg-yellow-50 rounded-lg">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Duration and Accessibility */}
        <div className="text-xs text-gray-600 space-y-1 mb-4 flex-1">
          <p className="flex items-center gap-1">
            <Clock size={12} /> {duration}
          </p>
          <p className="text-[#0F6E56] font-semibold">✓ {accessibility}</p>
        </div>

        {/* CTA */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onSelect?.(id);
          }}
          className="w-full py-2 bg-[#0F6E56] text-white rounded-lg font-bold text-sm hover:bg-[#0D5544] transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Découvrir
        </motion.button>
      </div>
    </motion.div>
  );
}
