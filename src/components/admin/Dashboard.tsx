import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import DeleteButton from "../admin/DeleteButton";
import { supabase } from "../../lib/supabase";
import EditSection from "./EditSection";
import ActiveButton from "./ActiveButton";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [negocios, setNegocios] = useState<any[]>([]);
  const [filteredNegocios, setFilteredNegocios] = useState<any[]>([]);
  const [, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNegocio, setSelectedNegocio] = useState<any | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const [selectedStatus, setSelectedStatus] = useState("activos");

  const categoriasArray = [
    "Restaurante", "Mexicano", "Belleza", "Peluqueria",
    "Ropa", "Fitness", "Gimnasio", "Libreria",
    "Cultura", "Cafe", "Pasteleria", "Salud",
    "Dentista", "Educacion", "Veterinaria", "Tecnologia",
    "Spa", "Turismo", "Panaderia", "Construccion", "Negocios"
  ];

  useEffect(() => {
    const fetchNegocios = async () => {
      const { data, error } = await supabase
        .from("negocios")
        .select("*");
      if (error) {
        setError(error.message);
        return;
      }
      setNegocios(data);
      setFilteredNegocios(data);
    };

    fetchNegocios();
  }, [navigate]);

  useEffect(() => {
    const filterNegocios = () => {
      let filtered = negocios;

      if (searchTerm) {
        filtered = filtered.filter((negocio) =>
          negocio.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (selectedCategory !== "todas") {
        filtered = filtered.filter((negocio) =>
          negocio.categorias.includes(selectedCategory)
        );
      }

      if (selectedStatus === "inactivos") {
        filtered = filtered.filter((negocio) => negocio.activo === false);
      } else if (selectedStatus === "activos") {
        filtered = filtered.filter((negocio) => negocio.activo === true);
      }

      setFilteredNegocios(filtered);
    };

    filterNegocios();
  }, [searchTerm, selectedCategory, selectedStatus, negocios]);

  const toggleEditSection = (negocio: any) => {
    setSelectedNegocio(negocio);
    setIsEditing(true);
  };

  const closeEditSection = () => {
    setIsEditing(false);
    setSelectedNegocio(null);
  };

  return (
    <div className="flex max-h-screen overflow-hidden bg-gray-100">
      <div className="py-8 px-4 flex-grow bg-white shadow-md rounded-lg" id="main-section">
        <header className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl text-gray-800">Dashboard</h1>
          <LogoutButton />
        </header>

        <div className="flex justify-between items-start mb-4">
          <h2 className="text-start text-xl md:text-2xl font-semibold text-gray-800">Negocios</h2>
          <div className="flex gap-3">
            <input
              className="border border-gray-300 rounded-lg w-64 md:w-72 py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              placeholder="Buscar por nombre..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="relative">
              <select
                className="border text-gray-500 border-gray-300 rounded-lg w-64 md:w-72 py-1.5 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="todas">Todas las categorías</option>
                {categoriasArray.map((categoria, index) => (
                  <option key={index} value={categoria}>{categoria}</option>
                ))}
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 stroke-gray-500 pointer-events-none"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M6 9l6 6l6 -6"></path>
              </svg>
            </div>
            <div className="relative">
              <select
                className="border text-gray-500 border-gray-300 rounded-lg w-32 py-1.5 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-8"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="activos">Activos</option>
                <option value="inactivos">Inactivos</option>
              </select>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 stroke-gray-500 pointer-events-none"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M6 9l6 6l6 -6"></path>
              </svg>
            </div>
            <button
              onClick={() => {
                setSelectedNegocio(null);
                setIsEditing(!isEditing);
              }}
              className="flex items-center justify-center text-gray-500 hover:text-indigo-500 border border-gray-300 rounded-md p-1 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M7 7l5 5l-5 5"></path>
                <path d="M13 7l5 5l-5 5"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex w-full">
          <section className="flex flex-1 flex-col gap-3 max-h-[27.5rem] overflow-y-scroll">
            {filteredNegocios.map((negocio) => (
              <article
                key={negocio.id}
                className="flex justify-between items-center border border-gray-300 py-2 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200"
              >
                <div className="flex gap-2 items-center">
                  <div className="border rounded-full bg-green-100 size-12" />
                  <div>
                    <h2 className="font-semibold text-sm mb-0.5 text-gray-800">{negocio.nombre}</h2>
                    <div className="flex gap-2 items-center">
                      {negocio.categorias && negocio.categorias.length > 0 ? (
                        negocio.categorias.map((categoria: string, index: number) => (
                          <span
                            key={`${negocio.id}-${index}`}
                            className="text-indigo-500 border border-indigo-500 py-0.5 px-2 rounded-full text-xs"
                          >
                            {categoria}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">Sin categorías</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {negocio.activo === true ? <DeleteButton id={negocio.id} /> : <ActiveButton id={negocio.id} />}
                  <button onClick={() => toggleEditSection(negocio)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                    Editar
                  </button>
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>
      {isEditing && selectedNegocio && (
        <EditSection 
          negocio={selectedNegocio} 
          onClose={closeEditSection} 
        />
      )}
    </div>
  );
};

export default Dashboard;
