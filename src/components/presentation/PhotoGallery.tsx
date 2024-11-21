import { useState, useEffect } from 'react';

interface PhotoGalleryProps {
  photos: string[]; // Lista de fotos (URLs de las imágenes de productos)
  businessName: string;
}

export const PhotoGallery = ({ photos, businessName }: PhotoGalleryProps) => {
  const [imageExists, setImageExists] = useState<boolean[]>([]);

  useEffect(() => {
    // Verificar si cada imagen en `photos` existe
    const checkImages = async () => {
      const checks = await Promise.all(
        photos.map(async (photo) => {
          try {
            const res = await fetch(photo);
            return res.ok; // Si la respuesta es exitosa, la imagen existe
          } catch {
            return false; // Si ocurre un error (como no encontrar la imagen), la imagen no existe
          }
        })
      );
      setImageExists(checks);
    };

    checkImages();
  }, [photos]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {photos.map((photo, index) => {
        const photoSrc = imageExists[index] ? photo : '/default-image.webp'; // Si la imagen existe, usa la original, si no, usa la por defecto
        return (
          <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
            <img
              src={photoSrc}
              alt={`${businessName} photo ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        );
      })}
    </div>
  );
};
