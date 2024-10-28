import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";

const Home: React.FC = () => {
  const [negocios, setNegocios] = useState<any[]>([]);
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNegocios = async () => {
      const { data, error } = await supabase.from("negocios").select("*");
      if (error) {
        setError(error.message);
        return;
      }
      setNegocios(data);
    };
    fetchNegocios();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Negocios</h1>
        <Link
          to={`/register`}
          className="inline-flex items-center text-white font-semibold bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md transition duration-200"
        >
          Crear negocio
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {negocios.map((negocio) => (
          <Link
            to={`/${negocio.slug}`}
            key={negocio.id}
            className="block p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-white"
          >
            <div className="border rounded-md bg-gray-300 w-full h-48 mb-3 flex items-center justify-center">
              <span className="text-gray-600">Imagen del negocio</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {negocio.nombre}
            </h2>
            <p className="text-gray-600">
              {negocio.descripcion.slice(0, 100)}...
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
