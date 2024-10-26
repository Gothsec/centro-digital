import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { Whatsapp } from "../components/icons/Whatsapp";
import { Facebook } from "../components/icons/Facebook";
import { Instagram } from "../components/icons/Instagram";
import { LeftArrow } from "../components/icons/LeftArrow";

interface BusinessData {
  nombre: string;
  descripcion: string;
  whatsapp: string;
  facebook: string;
  instagram: string;
  hora_a: string;
  hora_c: string;
}

const BusinessPage: React.FC = () => {
  const { businessName } = useParams<{ businessName: string }>();
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinessData = async () => {
      if (businessName) {
        setLoading(true);
        const { data, error } = await supabase
          .from("negocios")
          .select("*")
          .eq("slag", businessName);

        if (error) {
          setError("Error fetching business data");
          console.error("Error fetching business data:", error);
        } else if (data.length === 0) {
          navigate("/404"); // Redirige a la página 404 si no se encuentra el negocio
        } else {
          setBusinessData(data[0]);
        }
        setLoading(false);
      }
    };
    fetchBusinessData();
  }, [businessName, navigate]);

  if (loading) return <div className="text-center py-4">Cargando...</div>;
  if (error)
    return <div className="text-red-500 text-center py-4">{error}</div>;
  if (!businessData) return null;

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg">
      <span className="inline-flex items-center text-gray-400 cursor-pointer border-2 p-2 rounded-full" onClick={() => navigate(-1)}>
        <LeftArrow />
      </span>
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        {businessData.nombre}
      </h1>
      <p className="text-gray-600 mb-4">{businessData.descripcion}</p>
      <div className="mb-4">
        <a
          href={`https://wa.me/${businessData.whatsapp}`}
          className="inline-flex gap-2 items-center text-white font-semibold bg-[#25D366] py-2 px-4 rounded-md hover:opacity-80 transition-opacity"
        >
        <Whatsapp />
          <span>WhatsApp</span>
        </a>
      </div>
      <div className="mb-4">
        <a
          href={businessData.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex gap-2 items-center text-white font-semibold bg-blue-500 py-2 px-4 rounded-md hover:opacity-80 transition-opacity"
        >
        <Facebook />
        <span>Facebook</span>
        </a>
      </div>
      <div className="mb-4">
        <a
          href={businessData.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex gap-2 items-center text-white font-semibold bg-[linear-gradient(to_right,_#833ab4,_#fd1d1d,_#fcb045)] py-2 px-4 rounded-md hover:opacity-80 transition-opacity"
        >
        <Instagram />
          <span>Instagram</span>
        </a>
      </div>
      <p className="text-gray-600">
        <span className="font-semibold">Horario:</span> {businessData.hora_a} -{" "}
        {businessData.hora_c}
      </p>
    </div>
  );
};

export default BusinessPage;
