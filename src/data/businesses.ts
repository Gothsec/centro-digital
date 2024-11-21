import { supabase } from '../lib/supabase'; // Importamos el cliente de Supabase
import { Business } from '../types'; // El tipo de los negocios

export const getBusinesses = async (): Promise<Business[]> => {
  const { data, error } = await supabase
    .from('negocios')  // Nombre de la tabla donde guardas los negocios
    .select('*'); // Seleccionamos todas las columnas de la tabla

  if (error) {
    console.error('Error al obtener los negocios', error);
    throw new Error('No se pudieron obtener los negocios');
  }

  return data as Business[];  // Convertimos la respuesta en el tipo correcto
};