import { useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import useCategorias from "../hooks/useCategories";
import useDepartments from "../hooks/useDepartments";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const [nombre, setNombre] = useState("");
  const [hora_a, setApertura] = useState("");
  const [hora_c, setCierre] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [categorias, setCategoria] = useState<string[]>([]);
  const [descripcion, setDescripcion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [error, setError] = useState("");
  const [ciudadesFiltradas, setCiudadesFiltradas] = useState<string[]>([]);

  const categoriasArray = useCategorias();
  const departamentos = useDepartments();

  // Función para obtener latitud y longitud a partir de la dirección
  const obtenerCoordenadas = async () => {
    if (!direccion || !ciudad || !departamento) return;

    const direccionCompleta = `${direccion}, ${ciudad}, ${departamento}`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      direccionCompleta
    )}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        return { lat: parseFloat(lat), lon: parseFloat(lon) };
      } else {
        setError("No se pudo encontrar la dirección.");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener las coordenadas:", error);
      setError("Error al obtener las coordenadas.");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validar que la hora de apertura no sea después de la de cierre
    if (hora_a >= hora_c) {
      setError("La hora de apertura debe ser anterior a la hora de cierre.");
      return;
    } else {
      setError("");
    }

    const slug = nombre
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9-]/g, "-")
      .trim()
      .split(" ")
      .join("-")
      .toLowerCase();

    const coordenadas = await obtenerCoordenadas();
    if (!coordenadas) return; // Si no se puede obtener coordenadas, no continuar

    const { lat, lon } = coordenadas;

    const formData = {
      nombre,
      hora_a,
      hora_c,
      whatsapp,
      instagram,
      facebook,
      categorias,
      descripcion,
      direccion,
      ciudad,
      departamento,
      lat,
      lng: lon,
      slug,
    };

    const { data, error: dbError } = await supabase
      .from("negocios")
      .insert([formData]);

    if (dbError) {
      console.error("Error al insertar datos: ", dbError);
    } else {
      console.log("Datos insertados correctamente: ", data);
      window.location.href = `/${slug}`;
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setCategoria([selectedValue]);
  };

  const handleDepartamentoChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const departamentoSeleccionado = e.target.value;
    setDepartamento(departamentoSeleccionado);

    // Filtrar las ciudades según el departamento seleccionado
    setCiudadesFiltradas(departamentos[departamentoSeleccionado] || []);
    setCiudad(""); // Limpiar la ciudad cuando cambia el departamento
  };

  return (
    <motion.div
      className="w-full min-h-screen flex justify-center items-center bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.form
        className="bg-white shadow-md rounded-lg p-5 m-4 w-full max-w-2xl"
        onSubmit={handleSubmit}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-4">
          Registrar negocio
        </h1>

        {error && (
          <motion.p
            className="text-red-500 text-start mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.p>
        )}

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="nombre">
                Nombre
              </label>
              <input
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="hora_a">
                Hora de Apertura
              </label>
              <input
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                type="time"
                id="hora_a"
                value={hora_a}
                onChange={(e) => setApertura(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="hora_c">
                Hora de Cierre
              </label>
              <input
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                type="time"
                id="hora_c"
                value={hora_c}
                onChange={(e) => setCierre(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="whatsapp">
                WhatsApp
              </label>
              <input
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                type="tel"
                id="whatsapp"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="instagram">
                Instagram
              </label>
              <input
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                type="url"
                id="instagram"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1" htmlFor="facebook">
                Facebook
              </label>
              <input
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
                type="url"
                id="facebook"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Categorías */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="categorias">
              Categorías
            </label>
            <select
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
              id="categorias"
              onChange={handleCategoryChange}
              required
            >
              <option value="" disabled selected>
                Selecciona una categoría
              </option>
              {categoriasArray.map((categoria, index) => (
                <option key={index} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1" htmlFor="descripcion">
              Descripción
            </label>
            <textarea
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300 mb-4"
              placeholder="Tu descripción ..."
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              cols={30}
              rows={4}
              required
            ></textarea>
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="direccion">
              Dirección
            </label>
            <input
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
              id="direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Ingresa la dirección"
              required
            />
          </div>

          {/* Departamento */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="departamento">
              Departamento
            </label>
            <select
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
              id="departamento"
              value={departamento}
              onChange={handleDepartamentoChange}
              required
            >
              <option value="" disabled>
                Selecciona un departamento
              </option>
              {Object.keys(departamentos).map((dep, index) => (
                <option key={index} value={dep}>
                  {dep}
                </option>
              ))}
            </select>
          </div>

          {/* Ciudad */}
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="ciudad">
              Ciudad
            </label>
            <select
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
              id="ciudad"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
              required
            >
              <option value="" disabled>
                Selecciona una ciudad
              </option>
              {ciudadesFiltradas.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>

        <motion.button
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Crear Negocio
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default RegisterPage;
