import { useState, useMemo, useCallback } from 'react';
import { ImageCarousel } from '../presentation/ImageCarousel';
import { CategoryCarousel } from '../presentation/CategoryCarousel';
import { BusinessCard } from '../presentation/BusinessCard';
import { Footer } from '../presentation/Footer';
import { categories } from '../../utils/categories';
import { useFavorites } from '../../hooks/useFavorites';
import { getCategoryIcon } from '../../utils/categories';
import { useBusinesses } from '../../hooks/useBusinesses'; // Asegúrate de que este hook funcione correctamente.
import { Heart } from 'lucide-react';  // Icono de corazón para el botón
import { SearchBar } from '../presentation/SearchBar';

const CAROUSEL_IMAGES = [
  {
    id: 1,
    url: "https://lweekzkloveifncmfsuq.supabase.co/storage/v1/object/public/images/profile-2.jpg",
    alt: "Shop 1"
  },
  {
    id: 2,
    url: "https://lweekzkloveifncmfsuq.supabase.co/storage/v1/object/public/images/profile-3.jpg",
    alt: "Shop 2"
  },
  {
    id: 3,
    url: "https://lweekzkloveifncmfsuq.supabase.co/storage/v1/object/public/images/profile-1.jpg",
    alt: "Shop 3"
  }
];

export const BusinessListingContainer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);  // Estado para mostrar solo favoritos
  const [page, setPage] = useState(1);  // Página actual para la paginación
  const { favorites, toggleFavorite } = useFavorites();

  // Usamos el hook useBusinesses para obtener los negocios
  const { businesses, isLoading, error } = useBusinesses();

  // Memorizar el filtrado de negocios para evitar que se recalculen en cada render
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const matchesSearch = business.nombre && business.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory
        ? business.categoria && business.categoria.toLowerCase() === selectedCategory.toLowerCase()
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [businesses, searchTerm, selectedCategory]);

  // Filtrar los negocios favoritos si 'showFavorites' es true
  const businessesToShow = useMemo(() => {
    // Si está activado el filtro de favoritos, solo se muestran los favoritos
    return showFavorites
      ? filteredBusinesses.filter(business => favorites.has(business.id))  // Solo los favoritos
      : filteredBusinesses;  // Todos los negocios filtrados según la búsqueda y categoría
  }, [filteredBusinesses, favorites, showFavorites]);

  // Mostrar solo los negocios de la página actual (8 por página)
  const businessesToDisplay = useMemo(() => {
    return businessesToShow.slice(0, page * 8);  // Limitamos los negocios mostrados
  }, [businessesToShow, page]);

  // Funciones para el carrusel de imágenes
  const handlePrevious = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? CAROUSEL_IMAGES.length - 1 : prev - 1
    );
  }, []);

  const handleNext = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === CAROUSEL_IMAGES.length - 1 ? 0 : prev + 1
    );
  }, []);

  const handleToggleFavorites = useCallback(() => {
    setShowFavorites((prev) => !prev);
  }, []);

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);  // Aumentar la página para cargar más negocios
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Carrusel de imágenes */}
        <ImageCarousel
          images={CAROUSEL_IMAGES}
          currentIndex={currentImageIndex}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onDotClick={setCurrentImageIndex}
        />

        {/* Barra de búsqueda */}
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

        {/* Carrusel de categorías */}
        <div className="mt-2">
          <CategoryCarousel
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>

        {/* Mostrar mensaje de carga o los negocios filtrados */}
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
                const CategoryIcon = getCategoryIcon(business.categoria);  // Obtener el icono de la categoría
                return (
                  <BusinessCard
                    key={business.id}
                    business={business}
                    onFavorite={() => toggleFavorite(business.id)}
                    isFavorite={favorites.has(business.id)}
                    categoryIcon={CategoryIcon}  // Pasar el icono de la categoría
                  />
                );
              })
            )}
          </div>
        )}

        {/* Botón de "Cargar más" */}
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
      </div>
      <Footer />
    </>
  );
};
