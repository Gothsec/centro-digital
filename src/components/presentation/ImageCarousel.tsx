import { useEffect, useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CarouselImage } from '../../types';

interface ImageCarouselProps {
  images: CarouselImage[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

export const ImageCarousel = ({
  images,
  currentIndex,
  onPrevious,
  onNext,
  onDotClick,
}: ImageCarouselProps) => {
  const [isSliding, setIsSliding] = useState(false);

  // Usamos useMemo para evitar re-renderizaciones innecesarias de los puntos
  const dots = useMemo(() => {
    return images.map((_, index) => (
      <button
        key={index}
        onClick={() => onDotClick(index)}
        className={`w-2 h-2 rounded-full transition-all ${
          index === currentIndex ? 'bg-white w-4' : 'bg-white/60'
        }`}
      />
    ));
  }, [images, currentIndex, onDotClick]);

  useEffect(() => {
    // Cambiar la imagen automáticamente cada 5 segundos
    const intervalId = setInterval(() => {
      setIsSliding(true);  // Iniciar el deslizamiento
      onNext(); // Cambiar a la siguiente imagen
    }, 5000);

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar
  }, [onNext]); // Solo depende de onNext, no de currentIndex

  useEffect(() => {
    // Cuando el cambio de imagen se haya completado, permitir que el deslizamiento se reinicie
    if (isSliding) {
      setIsSliding(false);
    }
  }, [currentIndex, isSliding]);

  return (
    <div className="relative w-full h-64 md:h-96 mb-8 overflow-hidden rounded-lg">
      {/* Contenedor de la imagen actual con efecto de deslizamiento */}
      <div
        className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
          isSliding ? 'transform translate-x-full' : 'transform translate-x-0'
        }`}
      >
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Botón anterior */}
      <button
        onClick={onPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Botón siguiente */}
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Puntos del carrusel (dots) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {dots}
      </div>
    </div>
  );
};
