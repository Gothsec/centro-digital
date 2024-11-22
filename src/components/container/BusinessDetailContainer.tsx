import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Clock, MapPin, ArrowLeft } from 'lucide-react';
import { BusinessMap } from '../presentation/BusinessMap';
import { ShareButtons } from '../presentation/ShareButtons';
import { PhotoGallery } from '../presentation/PhotoGallery';
import BusinessImage from '../../data/images';
import { getCategoryIcon } from '../../utils/categories';

// Función para convertir hora en formato de 24 horas a 12 horas con AM/PM
const formatTo12Hour = (time: string) => {
  const [hours, minutes] = time.split(':');
  let hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  
  if (hour > 12) {
    hour -= 12;
  }
  if (hour === 0) {
    hour = 12;
  }
  
  return `${hour}:${minutes} ${ampm}`;
};

export const BusinessDetailContainer = () => {
  const { id } = useParams();  // Obtener el ID de los parámetros de la URL
  const [business, setBusiness] = useState<any>(null); // Estado para el negocio
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [error, setError] = useState<string | null>(null); // Estado de error

  // Función para obtener el negocio desde Supabase
  const fetchBusiness = async () => {
    try {
      setIsLoading(true);
      setError(null); // Resetear error

      // Consultar la tabla 'negocios' usando el ID del negocio
      const { data, error } = await supabase
        .from('negocios')
        .select('*')
        .eq('id', id)
        .single(); // Usar .single() porque esperamos un único resultado

      if (error) {
        throw new Error(error.message);
      }

      // Crear el objeto `ubicacion` con lat y lng
      const ubicacion = {
        lat: data.lat,  // Suponiendo que 'lat' es un campo en la base de datos
        lng: data.lng,  // Suponiendo que 'lng' es un campo en la base de datos
      };

      // Crear el objeto `redes` con los campos de las redes sociales
      const redes = {
        whatsapp: data.whatsapp || undefined,
        facebook: data.facebook || undefined,
        instagram: data.instagram || undefined,
      };

      // Concatenar `hora_a` y `hora_c` para formar el string `horario` en formato 12 horas
      const horario = data.hora_a && data.hora_c 
        ? `${formatTo12Hour(data.hora_a)} - ${formatTo12Hour(data.hora_c)}` 
        : 'No disponible'; // Si falta alguno de los horarios, ponemos un valor por defecto

      // Establecer los datos del negocio con las propiedades 'ubicacion', 'redes' y 'horario' incluidas
      setBusiness({ ...data, ubicacion, redes, horario });

    } catch (err: any) {
      setError('Business not found or error fetching data');
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Realizar la consulta cuando el componente se monta o cuando cambia el id
  useEffect(() => {
    if (id) {
      fetchBusiness();
    }
  }, [id]);

  // Mostrar mensaje de carga o error
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header Skeleton */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column Skeleton */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Skeleton */}
              <div className="aspect-video rounded-xl overflow-hidden bg-gray-300 animate-pulse"></div>

              {/* Business Info Skeleton */}
              <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
                <div className="h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded w-2/3 animate-pulse"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
              </div>

              {/* Photo Gallery Skeleton */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="h-6 bg-gray-300 rounded w-1/3 animate-pulse mb-4"></div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-300 animate-pulse rounded h-32"></div>
                  <div className="bg-gray-300 animate-pulse rounded h-32"></div>
                  <div className="bg-gray-300 animate-pulse rounded h-32"></div>
                </div>
              </div>
            </div>

            {/* Right Column Skeleton */}
            <div className="space-y-8">
              {/* Map Skeleton */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="h-6 bg-gray-300 rounded w-1/2 animate-pulse mb-4"></div>
                <div className="bg-gray-300 animate-pulse h-48 rounded"></div>
              </div>

              {/* Share Skeleton */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="h-6 bg-gray-300 rounded w-1/3 animate-pulse mb-4"></div>
                <div className="bg-gray-300 animate-pulse h-12 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!business) {
    return <div>Business not found</div>;
  }

  const CategoryIcon = getCategoryIcon(business.categoria);

  const imageUrl = `https://lweekzkloveifncmfsuq.supabase.co/storage/v1/object/public/images/business-${business.slug}.jpg`;

  const images = [`https://lweekzkloveifncmfsuq.supabase.co/storage/v1/object/public/images/business-${business.slug}-1.jpg`, `https://lweekzkloveifncmfsuq.supabase.co/storage/v1/object/public/images/business-${business.slug}-2.jpg`, `https://lweekzkloveifncmfsuq.supabase.co/storage/v1/object/public/images/business-${business.slug}-3.jpg`]

  const defaultImages = ['../../../public/default-image.webp', '../../../public/default-image.webp', '../../../public/default-image.webp']

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <a
            href="/"
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-6 w-6" />
          </a>
          <h1 className="text-3xl font-bold">{business.nombre}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image */}
            <div className="aspect-video rounded-xl overflow-hidden">
              <BusinessImage business={business} imageUrl={imageUrl}/>
            </div>

            {/* Business Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <CategoryIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{business.categoria}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{business.horario}</span> {/* Mostrar el horario formateado */}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{business.direccion}</span>
                </div>
              </div>
              
              <p className="mt-4 text-gray-700">{business.descripcion}</p>
            </div>

            {/* Photo Gallery */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Photos</h2>
              {/* Pasar las imágenes de los productos a la galería */}
              <PhotoGallery photos={images} businessName={business.nombre} />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Map */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Location</h2>
              <BusinessMap
                ubicacion={business.ubicacion} // Ahora 'ubicacion' es un objeto con lat y lng
                nombre={business.nombre}
                direccion={business.direccion}
              />
            </div>

            {/* Share */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Contact & Share</h2>
              <ShareButtons business={business} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
