import { useState, useEffect } from 'react';

interface PhotoGalleryProps {
  photos: string[]; // Lista de fotos (URLs de las imágenes de productos)
  businessName: string;
}

export const PhotoGallery = ({ photos, businessName }: PhotoGalleryProps) => {
  const [imageExists, setImageExists] = useState<Map<string, boolean>>(new Map());

  useEffect(() => {
    const checkImages = async () => {
      const checks = await Promise.all(
        photos.map(async (photo) => {
          try {
            const res = await fetch(photo, { method: 'HEAD' }); // Usamos HEAD para solo verificar existencia, no descargar la imagen completa
            return res.ok;
          } catch {
            return false;
          }
        })
      );

      const newImageStates = new Map<string, boolean>();
      photos.forEach((photo, index) => {
        newImageStates.set(photo, checks[index]);
      });

      setImageExists(newImageStates);
    };

    if (photos.length) {
      checkImages();
    }
  }, [photos]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {photos.map((photo, index) => {
        const photoSrc = imageExists.get(photo) ? photo : '/public/default-image.webp';
        return (
          <div key={photo} className="relative aspect-square overflow-hidden rounded-lg">
            <img
              src={photoSrc}
              alt={`${businessName} photo ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              loading="lazy" // Lazy loading de imágenes
            />
          </div>
        );
      })}
    </div>
  );
};
