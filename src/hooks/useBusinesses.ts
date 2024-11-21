import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Business } from '../types'; // Asumiendo que tienes un tipo Business para tus negocios

// Función para convertir la hora a formato 12 horas con AM/PM
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

// Hook personalizado para obtener negocios desde Supabase
export const useBusinesses = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los negocios desde Supabase
  const fetchBusinesses = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from('negocios').select('*');

      if (error) {
        throw new Error(error.message);
      }

      // Formatear el horario de los negocios
      const businessesWithFormattedHours = data?.map((business: any) => {
        const formattedHorario = business.hora_a && business.hora_c
          ? `${formatTo12Hour(business.hora_a)} - ${formatTo12Hour(business.hora_c)}`
          : 'No disponible';

        return {
          ...business,
          horario: formattedHorario
        };
      });

      setBusinesses(businessesWithFormattedHours || []);
    } catch (err) {
      setError('Hubo un error al obtener los negocios.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinesses();
  }, []); // Solo se ejecuta una vez al montar el componente

  return {
    businesses,
    isLoading,
    error
  };
};
