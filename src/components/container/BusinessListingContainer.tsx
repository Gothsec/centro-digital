import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion'; // Importar framer-motion
import { ImageCarousel } from '../presentation/ImageCarousel';
import { CategoryCarousel } from '../presentation/CategoryCarousel';
import { BusinessCard } from '../presentation/BusinessCard';
import { Footer } from '../presentation/Footer';
import { categories } from '../../utils/categories';
import { useFavorites } from '../../hooks/useFavorites';
import { getCategoryIcon } from '../../utils/categories';
import { useBusinesses } from '../../hooks/useBusinesses'; 
import { Heart } from 'lucide-react';
import { SearchBar } from '../presentation/SearchBar';

// Caché de imágenes
const imageCache = new Map();

// Cargar imagen con Lazy Loading
const fetchImage = (url: string) => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    if (imageCache.has(url)) {
      resolve(imageCache.get(url)!);
      return;
    }

    const image = new Image();
    image.src = url;
    image.loading = "lazy"; // Asegura que las imágenes se carguen de manera diferida

    image.onload = () => {
      imageCache.set(url, image);
      resolve(image);
    };

    image.onerror = () => {
      reject(new Error(`No se pudo cargar la imagen: ${url}`));
    };
  });
};

const CAROUSEL_IMAGES = [
  { id: 1, url: "https://lweekzkloveifncmfsuq.supabase.co/storage/v1/object/public/images/profile-1.jpg", alt: "Shop 1" },
  { id: 2, url: "https://lweekzkloveifncmfsuq.supabase.co/storage/v1/object/public/images/profile-2.jpg", alt: "Shop 2" },
  { id: 3, url: "https://lweekzkloveifncmfsuq.supabase.co/storage/v1/object/public/images/profile-3.jpg", alt: "Shop 3" },
];

export const BusinessListingContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [page, setPage] = useState(1);
  const { favorites, toggleFavorite } = useFavorites();

  const { businesses, isLoading, error } = useBusinesses();

  // Filtrar negocios de acuerdo al término de búsqueda y categoría seleccionada
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const matchesSearch = business.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      const matchesCategory = selectedCategory
        ? business.categoria?.toLowerCase() === selectedCategory.toLowerCase()
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [businesses, searchTerm, selectedCategory]);

  // Solo mostrar los favoritos si "showFavorites" está activado
  const businessesToShow = useMemo(() => {
    return showFavorites
      ? filteredBusinesses.filter(business => favorites.has(business.id))
      : filteredBusinesses;
  }, [filteredBusinesses, favorites, showFavorites]);

  // Paginar los negocios que se van a mostrar
  const businessesToDisplay = useMemo(() => businessesToShow.slice(0, page * 8), [businessesToShow, page]);

  // Pre-cargar las imágenes de los carruseles
  useEffect(() => {
    const imageUrls = [...CAROUSEL_IMAGES.map(image => image.url), ...businesses.map(business => business.imageUrl).filter(Boolean)];
    imageUrls.forEach(url => fetchImage(url).catch(error => console.error(error.message)));
  }, [businesses]);

  const handlePrevious = useCallback(() => {
    setCurrentImageIndex(prev => (prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentImageIndex(prev => (prev === CAROUSEL_IMAGES.length - 1 ? 0 : prev + 1));
  }, []);

  const handleToggleFavorites = useCallback(() => {
    setShowFavorites(prev => !prev);
  }, []);

  const handleLoadMore = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  return (
    <>
      <motion.div
        className="max-w-7xl mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ImageCarousel
          images={CAROUSEL_IMAGES}
          currentIndex={currentImageIndex}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onDotClick={setCurrentImageIndex}
        />

        <div className="mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md border p-6 max-w-2xl mx-auto">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <SearchBar value={searchTerm} onChange={setSearchTerm} />
              </div>
              <button
                onClick={handleToggleFavorites}
                className="inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium text-white bg-white/90 hover:bg-white hover:shadow-md transition-all"
              >
                <Heart
                  className={`h-5 w-5 ${showFavorites ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                />
                <span className={`ml-2 ${showFavorites ? 'text-red-500' : 'text-gray-500'}`}>
                  {showFavorites ? 'Ver todos los negocios' : 'Ver solo favoritos'}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <CategoryCarousel
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {isLoading ? (
          <div className="text-center mt-12">
            <p className="text-gray-500">Cargando negocios...</p>
          </div>
        ) : error ? (
          <div className="text-center mt-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {businessesToDisplay.length === 0 ? (
              <div className="col-span-full text-center">
                <p>No hay negocios disponibles.</p>
              </div>
            ) : (
              businessesToDisplay.map((business) => {
                const CategoryIcon = getCategoryIcon(business.categoria);
                return (
                  <motion.div
                    key={business.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <BusinessCard
                      business={business}
                      onFavorite={() => toggleFavorite(business.id)}
                      isFavorite={favorites.has(business.id)}
                      categoryIcon={CategoryIcon}
                    />
                  </motion.div>
                );
              })
            )}
          </div>
        )}

        {businessesToDisplay.length < businessesToShow.length && (
          <div className="text-center mt-6">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium text-blue-500 border-blue-500 hover:shadow-md transition-all"
            >
              Cargar más
            </button>
          </div>
        )}
      </motion.div>
      <Footer />
    </>
  );
};
