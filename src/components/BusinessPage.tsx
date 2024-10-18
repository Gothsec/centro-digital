import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const BusinessPage: React.FC = () => {
  const { businessName } = useParams<{ businessName: string }>();
  const [businessData, setBusinessData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBusinessData() {
      if (businessName) {
        const { data, error } = await supabase
          .from('negocios')
          .select('*')
          .eq('slag', businessName);
        if (error) {
          console.error('Error fetching business data:', error);
        } else {
          if (data.length === 0) {
            navigate('/404'); // Redirige a la página 404 si la ruta es inválida (no se encuentra el negocio)
          } else {
            setBusinessData(data[0]);
          }
        }
      }
    }
    fetchBusinessData();
  }, [businessName, navigate]);

  if (!businessData) return null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{businessData.nombre}</h1>
      <p>{businessData.descripcion}</p>
      <p>WhatsApp: {businessData.whatsapp}</p>
      <p>Facebook: {businessData.facebook}</p>
      <p>Instagram: {businessData.instagram}</p>
      <p>Horario: {businessData.hora_a} - {businessData.hora_c}</p>
    </div>
  );
};

export default BusinessPage;
