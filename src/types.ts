export type SiteCategory = 'Historique' | 'Nature' | 'Sahara' | 'Religieux' | 'UNESCO' | 'Aventure' | 'Culture' | 'Architecture' | 'Plage' | 'Vue Panoramique' | 'Luxe' | 'Famille' | 'Neige' | 'Vie Nocturne' | 'Musée' | 'Randonnée' | 'Monument' | 'Jardin';

export interface Site {
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
  description: string;
}

export type TimeSlot = {
  time: string;
  crowdLevel: 'Faible' | 'Modérée' | 'Forte' | 'Complet';
};

export type PaymentMethod = 'CIB' | 'Edahabia' | 'Cash';
