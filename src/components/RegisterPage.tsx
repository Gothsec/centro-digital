import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function RegisterPage() {
  const [nombre, setNombre] = useState("");
  const [hora_a, setApertura] = useState("");
  const [hora_c, setCierre] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [categorias, setCategoria] = useState<string[]>([]);
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");

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

    const formData = {
      nombre,
      hora_a,
      hora_c,
      whatsapp,
      instagram,
      facebook,
      categorias,
      descripcion,
      slug,
    };

    const { data, error: dbError } = await supabase.from("negocios").insert([formData]);

    if (dbError) {
      console.error("Error al insertar datos: ", dbError);
    } else {
      console.log("Datos insertados correctamente: ", data);
    }

    console.log("Formulario enviado", formData);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setCategoria([selectedValue]);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <form className="bg-white shadow-md rounded-lg p-5 m-4 w-full max-w-2xl" onSubmit={handleSubmit}>
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-4">Crear Negocio</h1>

        {error && <p className="text-red-500 text-start mb-2">{error}</p>} {/* Mostrar error */}

        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700" htmlFor="nombre">Nombre</label>
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
              <label className="block text-gray-700" htmlFor="hora_a">Hora de Apertura</label>
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
              <label className="block text-gray-700" htmlFor="hora_c">Hora de Cierre</label>
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
              <label className="block text-gray-700" htmlFor="whatsapp">WhatsApp</label>
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
              <label className="block text-gray-700" htmlFor="instagram">Instagram</label>
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
              <label className="block text-gray-700" htmlFor="facebook">Facebook</label>
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

          <div>
            <label className="block text-gray-700" htmlFor="categorias">Categorías</label>
            <select
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300"
              id="categorias"
              onChange={handleCategoryChange}
              required
            >
              <option value="">Selecciona una categoría</option>
              <option value="categoria-1">Categoría 1</option>
              <option value="categoria-2">Categoría 2</option>
              <option value="categoria-3">Categoría 3</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700" htmlFor="descripcion">Descripción</label>
            <textarea
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring focus:ring-blue-300 mb-4"
              placeholder="Tu descripción ..."
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              cols={30}
              rows={5}
              required
            ></textarea>
          </div>
        </div>

        <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200">
          Crear Negocio
        </button>
      </form>
    </div>
  );
}
