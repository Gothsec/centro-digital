import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import { supabase } from '../../lib/supabase';
import { BusinessForm } from '../../types';
import { RegisterBusinessForm } from '../presentation/RegisterBusinessForm';

export const RegisterBusinessContainer = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<BusinessForm>({
    nombre: '',
    descripcion: '',
    whatsapp: '',
    facebook: '',
    instagram: '',
    categoria: '',
    hora_a: '',
    hora_c: '',
    slug: '',
    departamento: '',
    ciudad: '',
    direccion: '',
    lat: 0,
    lng: 0,
    activo: true,
    image: null, // Imagen principal del negocio
    productImages: [], // Imágenes de productos (hasta tres)
  });

  // Función para obtener las coordenadas de la dirección ingresada
  const obtenerCoordenadas = async () => {
    const { direccion, ciudad } = formData;

    if (!direccion || !ciudad) return;

    const direccionCompleta = `${ciudad}, ${direccion}`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccionCompleta)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0]; // 'lon' es la longitud en la API de Nominatim
        return { lat: parseFloat(lat), lng: parseFloat(lon) }; // Usamos 'lng' para compatibilidad
      } else {
        setError('No se pudo encontrar la dirección.');
        return null;
      }
    } catch (error) {
      console.error('Error al obtener las coordenadas:', error);
      setError('Error al obtener las coordenadas.');
      return null;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      if (name === 'nombre') {
        newData.slug = slugify(value.toLowerCase());
      }
      return newData;
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      // Validar que el archivo es una imagen
      const validTypes = ['image/webp', 'image/webp'];
      if (validTypes.includes(file.type)) {
        if (index !== undefined) {
          // Si es una imagen de producto, almacenamos en el índice correspondiente
          setFormData((prev) => {
            const newProductImages = [...prev.productImages];
            newProductImages[index] = file;
            return { ...prev, productImages: newProductImages };
          });
        } else {
          // Si es la imagen principal, la almacenamos en el estado
          setFormData((prev) => ({ ...prev, image: file }));
        }
      } else {
        setError('Por favor, sube una imagen válida (Webp).');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validaciones antes de enviar los datos
    if (!formData.nombre.trim()) {
      setError('El nombre del negocio es obligatorio.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.descripcion.trim()) {
      setError('La descripción es obligatoria.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.categoria) {
      setError('La categoría es obligatoria.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.departamento) {
      setError('El departamento es obligatorio.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.ciudad) {
      setError('La ciudad es obligatoria.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.hora_a || !formData.hora_c) {
      setError('Se requieren las horas de apertura y cierre.');
      setIsSubmitting(false);
      return;
    }

    if (formData.hora_a >= formData.hora_c) {
      setError('La hora de apertura debe ser antes de la hora de cierre.');
      setIsSubmitting(false);
      return;
    }

    if (!formData.image) {
      setError('La imagen principal del negocio es obligatoria.');
      setIsSubmitting(false);
      return;
    }

    try {
      if (!supabase) {
        throw new Error('Conexión a la base de datos no disponible');
      }

      // Obtener coordenadas
      const coordenadas = await obtenerCoordenadas();
      if (!coordenadas) return; // Si no se puede obtener la coordenada, no seguimos adelante

      const { lat, lng } = coordenadas; // Asegúrate de obtener 'lat' y 'lng'

      let imageUrl = ''; // URL de la imagen principal
      if (formData.image) {
        const fileName = `business-${formData.slug}.webp`;
        const { data, error: uploadError } = await supabase
          .storage
          .from('images')
          .upload(fileName, formData.image, { contentType: 'image/webp' });

        if (uploadError) {
          throw new Error(uploadError.message || 'Error al subir la imagen');
        }

        const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(fileName);
        imageUrl = publicUrlData?.publicUrl || ''; // Obtener URL de la imagen principal
      }

      // Subir las imágenes de productos (hasta 3 imágenes)
      const productImageUrls: string[] = []; // Para almacenar las URLs de las imágenes de productos
      for (let i = 0; i < formData.productImages.length; i++) {
        const productImage = formData.productImages[i];
        if (productImage) {
          const productFileName = `business-${formData.slug}-${i + 1}.webp`;
          const { data: productData, error: productUploadError } = await supabase
            .storage
            .from('images')
            .upload(productFileName, productImage, { contentType: 'image/webp' });

          if (productUploadError) {
            throw new Error(productUploadError.message || `Error al subir la imagen de producto ${i + 1}`);
          }

          const { data: productPublicUrlData } = supabase.storage.from('images').getPublicUrl(productFileName);
          productImageUrls.push(productPublicUrlData?.publicUrl || ''); // Agregar URL de la imagen de producto
        }
      }

      // Preparar los datos para insertar en la base de datos
      const { image, productImages, ...submissionData } = formData;

      const dataToInsert = {
        ...submissionData,
        activo: true,
        lat,
        lng,
        // No insertamos imageUrl ni productImageUrls en la base de datos
      };

      console.log('Datos a insertar:', dataToInsert);

      // Insertar el negocio sin las URLs de las imágenes
      const { error: supabaseError } = await supabase.from('negocios').insert([dataToInsert]);

      if (supabaseError) {
        throw new Error(supabaseError.message || 'Error al insertar datos en la tabla de negocios');
      }

      // Si necesitas hacer algo con las URLs de las imágenes (por ejemplo, asociarlas con productos), hazlo aquí.
      // Por ahora, las URLs se suben, pero no se guardan en la base de datos.

      navigate('/'); // Redirigir a la página principal o a otra sección
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <RegisterBusinessForm
      formData={formData}
      error={error}
      isSubmitting={isSubmitting}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onBack={() => navigate('/')}
      onFileChange={handleFileChange}
    />
  );
};
