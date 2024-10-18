// src/components/BusinessPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const BusinessPage: React.FC = () => {
  const { businessName } = useParams<{ businessName: string }>();
  const [businessData, setBusinessData] = useState<any>(null);

  useEffect(() => {
    if (businessName) {
      async function fetchBusinessData() {
        const { data, error } = await supabase
          .from('negocios')
          .select('*')
          .eq('slag', businessName);
        if (error) {
          console.error('Error fetching business data:', error);
        } else {
          setBusinessData(data?.[0]);
        }
      }
      fetchBusinessData();
    }
  }, [businessName]);

  if (!businessData) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{businessData.nombre}</h1>
      <p>Descripción: {businessData.descripcion}</p>
      <p>WhatsApp: {businessData.whatsapp}</p>
      <p>Facebook: {businessData.facebook}</p>
      <p>Instagram: {businessData.instagram}</p>
      <p>Horario: {businessData.hora_a} - {businessData.hora_c}</p>

    </div>
  );
};

export default BusinessPage;
