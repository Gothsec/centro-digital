import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  const [negocios, setNegocios] = useState<any[]>([]);
  const [, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const handleNegocioClick = (slug: string) => {
    navigate(`/${slug}`);
  };

  return (
    <motion.div 
      className="container mx-auto p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex justify-between items-center mb-6"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Negocios</h1>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to={`/register`}
            className="inline-flex items-center text-white font-semibold bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md transition duration-200"
          >
            Crear negocio
          </Link>
        </motion.div>
      </motion.div>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
      >
        {negocios.map((negocio) => (
          <motion.div 
            key={negocio.id}
            className="block p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-white cursor-pointer"
            onClick={() => handleNegocioClick(negocio.slug)}
            whileHover={{ scale: 1.05 }}
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
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Home;
