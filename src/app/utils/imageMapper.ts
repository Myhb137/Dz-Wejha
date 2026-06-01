export const locationImages: Record<string, string> = {
  "Ghardaïa Old Town": "https://images.pexels.com/photos/12687479/pexels-photo-12687479.png",
  "Fort Santa Cruz": "https://images.pexels.com/photos/37627570/pexels-photo-37627570.jpeg",
  "Fort Beni Hammad": "https://images.pexels.com/photos/33605163/pexels-photo-33605163.jpeg",
  "Ruines de Djemila": "https://images.pexels.com/photos/10264100/pexels-photo-10264100.jpeg",
  "Jardin d'Essai du Hamma": "https://images.pexels.com/photos/31973975/pexels-photo-31973975.jpeg",
  "Taghit Oasis": "https://images.pexels.com/photos/35025788/pexels-photo-35025788.jpeg",
  "Ghoufi Canyon": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/93/2c/8b/the-ghoufi-canyon-is.jpg?w=1200&h=-1&s=1",
  "Plage de Madagh": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/8a/73/74/la-plus-belle-plage.jpg?w=1000&h=-1&s=1",
  "Monts du Hoggar": "https://images.pexels.com/photos/8581654/pexels-photo-8581654.jpeg",
  "Oasis de Bou Saada": "https://images.pexels.com/photos/11387356/pexels-photo-11387356.jpeg",
  "Dunes de Sebiba": "https://images.pexels.com/photos/30218477/pexels-photo-30218477.jpeg",
  "Palmeraie de Touggourt": "https://images.pexels.com/photos/7931934/pexels-photo-7931934.jpeg",
  "Dunes de l'Erg Occidental": "https://images.pexels.com/photos/12033762/pexels-photo-12033762.jpeg",
  "Vallée de la Saoura": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/B%C3%A9ni-Abb%C3%A9s_Oued_saoura.JPG/1280px-B%C3%A9ni-Abb%C3%A9s_Oued_saoura.JPG",
  "Ksar de Timimoun": "https://images.pexels.com/photos/27443274/pexels-photo-27443274.jpeg",
  "Grand Erg Oriental": "https://images.pexels.com/photos/12214734/pexels-photo-12214734.jpeg",
  "Corniche d'Oran": "https://images.pexels.com/photos/8874194/pexels-photo-8874194.jpeg",
  "Côte de Ténès": "https://images.pexels.com/photos/14692955/pexels-photo-14692955.jpeg",
  "Plage Paradise Skikda": "https://images.pexels.com/photos/12961082/pexels-photo-12961082.jpeg",
  "Marina Sidi Fredj": "https://www.touring-algeria.com/online/wp-content/uploads/2025/12/Sidi_Fredj.jpg",
  "Plage Ain Achir": "https://images.pexels.com/photos/35571563/pexels-photo-35571563.jpeg",
  "Sablettes Beach Alger": "https://i0.wp.com/www.24hdz.dz/wp-content/uploads/2021/02/145062074_10157592396051034_3432915428098182600_n.jpg?fit=960%2C720&ssl=1",
  "Chenoua Beach": "https://wildyness.com/media/preview/7280/large",
  "Plage Tichy": "https://coinventmediastorage.blob.core.windows.net/media-storage-container/gphoto_ChIJlWtfcSLR8hIR5S0gEfzehRs_0.jpg",
  "Plage les Andalouses": "https://beachsearcher.fr/images/beaches/12201029/DZ201029_fit_550_300.jpg"
};

const DEFAULT_IMAGE = "https://images.pexels.com/photos/1525041/pexels-photo-1525041.jpeg?auto=compress&cs=tinysrgb&w=800"; // Cap Carbon fallback

export const getMappedImage = (locationName: string, originalImage: string): string => {
  // Use mapping if available
  if (locationImages[locationName]) {
    return locationImages[locationName];
  }
  
  // Fallback to local image if it's a known correct local image
  if (originalImage.startsWith('/')) {
    return originalImage;
  }
  
  // Otherwise, return default image to prevent random incorrect Pexels URLs
  return DEFAULT_IMAGE;
};
