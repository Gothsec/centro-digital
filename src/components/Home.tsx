import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Home: React.FC = () => {
  const [negocios, setNegocios] = useState<any[]>([]);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNegocios = async () => {
      const { data, error } = await supabase.from('negocios').select('*');
      if (error) {
        setError(error.message);
        return;
      }
      setNegocios(data);
    };
    fetchNegocios();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Negocios</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {negocios.map((negocio) => (
          <Link to={`/${negocio.slag}`} key={negocio.id} className="block p-4 border rounded shadow hover:bg-gray-100">
            <h2 className="text-xl font-semibold">{negocio.nombre}</h2>
            <p className="text-gray-600">{negocio.descripcion}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
