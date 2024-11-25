import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { Business } from '../types';

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

export const useBusinesses = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBusinesses = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from('negocios')
        .select('*')
        .order('nombre', { ascending: true });

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      const formattedBusinesses = data?.map((business: any) => ({
        ...business,
        horario: business.hora_a && business.hora_c
          ? `${formatTo12Hour(business.hora_a)} - ${formatTo12Hour(business.hora_c)}`
          : 'No disponible',
        ubicacion: {
          lat: business.lat,
          lng: business.lng
        },
        redes: {
          whatsapp: business.whatsapp,
          facebook: business.facebook,
          instagram: business.instagram
        }
      }));

      setBusinesses(formattedBusinesses || []);
    } catch (err) {
      setError('Error al cargar los negocios');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);

  return {
    businesses,
    isLoading,
    error,
    refetch: fetchBusinesses
  };
};