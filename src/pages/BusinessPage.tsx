import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabaseClient";
import { Whatsapp } from "../../public/icons/Whatsapp";
import { Facebook } from "../../public/icons/Facebook";
import { Instagram } from "../../public/icons/Instagram";
import { LeftArrow } from "../../public/icons/LeftArrow";
import { Share } from "../../public/icons/Share";
import ShareModal from "../components/ShareModal";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Función para convertir el formato de hora a 12 horas
const convertTo12HourFormat = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  const period = hour >= 12 ? "pm" : "am";
  const adjustedHour = hour % 12 || 12; // Convierte "0" a "12" para la medianoche
  return `${adjustedHour}:${minute.toString().padStart(2, "0")}${period}`;
};

const BusinessPage: React.FC = () => {
  const { businessName } = useParams<{ businessName: string }>();
  const [businessData, setBusinessData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBusinessData = async () => {
      if (businessName) {
        setLoading(true);
        const { data, error } = await supabase
          .from("negocios")
          .select("*")
          .eq("slug", businessName);

        if (error) {
          setError("Error fetching business data");
          console.error("Error fetching business data:", error);
        } else if (data.length === 0) {
          navigate("/404");
        } else {
          setBusinessData(data[0]);
        }

        setLoading(false);
      }
    };
    fetchBusinessData();
  }, [businessName, navigate]);

  const isOpen = () => {
    if (!businessData) return false;
    const now = new Date();
    const [openHour, openMinute] = businessData.hora_a.split(":").map(Number);
    const [closeHour, closeMinute] = businessData.hora_c.split(":").map(Number);
    const openTime = new Date();
    openTime.setHours(openHour, openMinute, 0);
    const closeTime = new Date();
    closeTime.setHours(closeHour, closeMinute, 0);
    return now >= openTime && now <= closeTime;
  };

  const horarioClass = isOpen() ? "text-green-600" : "text-red-600";

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Skeleton height={350} />
        <section className="px-8 py-6 flex">
          <div className="mr-8 max-w-[50%]">
            <Skeleton height={50} width={200} />
            <Skeleton count={3} />
          </div>
          <div className="flex-1">
            <Skeleton height={350} />
          </div>
        </section>
      </motion.div>
    );
  }

  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  if (!businessData) return null;

  return (
    <motion.div
      className="bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span
        className="absolute top-8 left-8 inline-flex items-center text-gray-400 cursor-pointer border-2 p-2 rounded-full"
        onClick={() => navigate("/")}
      >
        <LeftArrow />
      </span>
      <div className="w-full h-48 bg-gray-600 text-white flex items-center justify-center">
        Imagen del negocio
      </div>
      <section className="px-8 py-6 flex">
        <div className="mr-8 max-w-[50%]">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">
              {businessData.nombre}
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded"
            >
              <Share />
            </button>
          </div>
          <p className="text-gray-600 mb-3 text-pretty">
            {businessData.descripcion}
          </p>
          <p className={`${horarioClass} mb-4`}>
            <span className="font-semibold">Horario:</span>{" "}
            {convertTo12HourFormat(businessData.hora_a)} - {convertTo12HourFormat(businessData.hora_c)}
          </p>
          <div className="mb-4 flex gap-3 flex-wrap">
            {businessData.categorias.map((categoria: string) => (
              <span
                key={categoria}
                className="inline-block text-blue-600 font-medium border border-current rounded-full px-4 py-1 text-center"
              >
                {categoria}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            <a
              target="_blank"
              href={`https://api.whatsapp.com/send?phone=${businessData.whatsapp}&text=Hola! 👋. Vengo de parte de centro-digital.com`}
              className="inline-flex gap-2 items-center text-white font-semibold bg-[#25D366] py-2 px-4 rounded-md hover:opacity-80 transition-opacity"
            >
              <Whatsapp /> <span>WhatsApp</span>
            </a>
            <a
              href={`https://m.me/${businessData.facebook}?text=Hola! 👋. Vengo de parte de centro-digital.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex gap-2 items-center text-white font-semibold bg-blue-500 py-2 px-4 rounded-md hover:opacity-80 transition-opacity"
            >
              <Facebook /> <span>Facebook</span>
            </a>
            <a
              href={businessData.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex gap-2 items-center text-white font-semibold bg-[linear-gradient(to_right,_#833ab4,_#fd1d1d,_#fcb045)] py-2 px-4 rounded-md hover:opacity-80 transition-opacity"
            >
              <Instagram /> <span>Instagram</span>
            </a>
          </div>
        </div>

        {/* Mapa interactivo con Leaflet */}
        <div className="flex-1 max-w-full">
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
            <MapContainer
              center={[businessData.lat, businessData.lng]}
              zoom={13}
              style={{ height: "350px", width: "100%" }}
              whenCreated={(map: { invalidateSize: () => any; }) => map.invalidateSize()} // Ajusta el tamaño del mapa correctamente
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[businessData.lat, businessData.lng]}>
                <Popup>{businessData.direccion}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </section>
      {isModalOpen && <ShareModal onClose={() => setIsModalOpen(false)} />}
    </motion.div>
  );
};

export default BusinessPage;
