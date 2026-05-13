import React from 'react';
import { motion } from 'motion/react';

export function SiteCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-50">
      <div className="relative h-64 md:h-96 bg-gradient-to-r from-gray-100 to-gray-50 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      <div className="p-8 md:p-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="h-4 w-20 bg-gray-100 rounded-full" />
          <div className="h-4 w-24 bg-gray-100 rounded-full" />
        </div>
        <div className="h-8 w-3/4 bg-gray-100 rounded-lg mb-4" />
        <div className="space-y-2 mb-6">
          <div className="h-4 w-full bg-gray-100 rounded-lg" />
          <div className="h-4 w-5/6 bg-gray-100 rounded-lg" />
        </div>
        <div className="pt-8 border-t border-gray-50 flex gap-6">
          <div className="h-6 w-16 bg-gray-100 rounded-lg" />
          <div className="h-6 w-20 bg-gray-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function FeedSkeleton() {
  return (
    <div className="space-y-12">
      {[...Array(3)].map((_, i) => (
        <SiteCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function GridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <SiteCardSkeleton key={i} />
      ))}
    </div>
  );
}
