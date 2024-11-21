import { useState, useEffect } from 'react';

// Definir una interfaz para las props
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
  const [imageExists, setImageExists] = useState(false);

  useEffect(() => {
    const checkImage = async () => {
      try {
        const res = await fetch(imageUrl);
        if (res.ok) {
          setImageExists(true);
        } else {
          setImageExists(false);
        }
      } catch (error) {
        setImageExists(false);
      }
    };

    checkImage();
  }, [imageUrl]);

  const imageSrc = imageExists
    ? `https://lweekzkloveifncmfsuq.supabase.co/storage/v1/object/public/images/business-${business.slug}.jpg`
    : '../../public/default-image.webp';

  return (
    <img
      src={imageSrc}
      alt={business.nombre}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    />
  );
};

export default BusinessImage;
