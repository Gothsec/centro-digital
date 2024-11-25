import { useState, useEffect } from 'react';

interface Business {
  slug: any;
  id: string;
  nombre: string;
}

interface BusinessImageProps {
  business: Business;
  imageUrl: string;
}

const BusinessImage = ({ business, imageUrl }: BusinessImageProps) => {
  const [imageExists, setImageExists] = useState<boolean>(true); // Asumimos que la imagen existe por defecto

  useEffect(() => {
    const checkImage = async () => {
      try {
        const res = await fetch(imageUrl);

        if (!res.ok) {
          setImageExists(false); // Si la imagen no existe o hay un error de carga
        }
      } catch (error) {
        setImageExists(false); // Si hay un error en la solicitud fetch
      }
    };

    checkImage();
  }, [imageUrl]);

  // Imagen predeterminada (debería estar en la carpeta public)
  const defaultImage = '/default-image.png';  // Ruta absoluta

  return (
    <img
      src={imageExists ? imageUrl : defaultImage}  // Si la imagen existe, mostrarla, si no, mostrar la imagen predeterminada
      alt={business.nombre}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    />
  );
};

export default BusinessImage;