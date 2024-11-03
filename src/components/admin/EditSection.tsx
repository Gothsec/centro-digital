import { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabaseClient";
import useCategorias from "../../hooks/useCategories";
import { motion } from "framer-motion";

interface Categoria {
  id: number;
  nombre: string;
}

interface Negocio {
  id: number;
  nombre: string;
  descripcion: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  hora_a: string;
  hora_c: string;
  categorias: Categoria[];
}

interface EditSectionProps {
  negocio: Negocio | null;
  onClose: () => void;
}

const EditSection: React.FC<EditSectionProps> = ({ negocio, onClose }) => {
  const [formData, setFormData] = useState<Omit<Negocio, "id" | "categorias">>({
    nombre: "",
    descripcion: "",
    whatsapp: "",
    instagram: "",
    facebook: "",
    hora_a: "",
    hora_c: "",
  });

  const [selectedCategorias, setSelectedCategorias] = useState<string[]>([]);

  const categorias = useCategorias();

  useEffect(() => {
    if (negocio) {
      setFormData({
        nombre: negocio.nombre,
        descripcion: negocio.descripcion,
        whatsapp: negocio.whatsapp,
        instagram: negocio.instagram,
        facebook: negocio.facebook,
        hora_a: negocio.hora_a,
        hora_c: negocio.hora_c,
      });
      const categoriasValidas = negocio.categorias
        .filter((categoria) => categoria && categoria.nombre)
        .map((categoria) => categoria.nombre);
      setSelectedCategorias(categoriasValidas);
    }
  }, [negocio]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData: Partial<Negocio> = {
      ...formData,
    };

    if (selectedCategorias.length > 0) {
      updatedData.categorias = selectedCategorias as any;
    }

    const { error } = await supabase
      .from("negocios")
      .update(updatedData)
      .eq("id", negocio?.id);

    if (error) {
      console.error(error);
      return;
    }

    console.log("Formulario enviado");
    onClose();
    window.location.reload();
  };

  const handleCategoriaChange = (categoria: string) => {
    setSelectedCategorias((prevSelected) =>
      prevSelected.includes(categoria)
        ? prevSelected.filter((c) => c !== categoria)
        : [...prevSelected, categoria]
    );
  };

  return (
    <motion.aside
      className="p-4 bg-white rounded-lg border max-h-screen overflow-y-auto"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {" "}
      <h1 className="mb-4 text-2xl font-bold text-center">
        Editar negocio
      </h1>{" "}
      <form onSubmit={handleSubmit}>
        {" "}
        <label className="block mb-1 font-medium" htmlFor="nombre">
          Nombre
        </label>{" "}
        <motion.input
          id="nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          required
          type="text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        />{" "}
        <label className="block mb-1 font-medium" htmlFor="descripcion">
          Descripción
        </label>{" "}
        <motion.textarea
          id="descripcion"
          value={formData.descripcion}
          onChange={(e) =>
            setFormData({ ...formData, descripcion: e.target.value })
          }
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          required
          cols={30}
          rows={4}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        ></motion.textarea>{" "}
        <label className="block mb-1 font-medium" htmlFor="whatsapp">
          WhatsApp
        </label>{" "}
        <motion.input
          id="whatsapp"
          value={formData.whatsapp}
          onChange={(e) =>
            setFormData({ ...formData, whatsapp: e.target.value })
          }
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          required
          type="tel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        />{" "}
        <label className="block mb-1 font-medium" htmlFor="instagram">
          Instagram
        </label>{" "}
        <motion.input
          id="instagram"
          value={formData.instagram}
          onChange={(e) =>
            setFormData({ ...formData, instagram: e.target.value })
          }
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          required
          type="url"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        />{" "}
        <label className="block mb-1 font-medium" htmlFor="facebook">
          Facebook
        </label>{" "}
        <motion.input
          id="facebook"
          value={formData.facebook}
          onChange={(e) =>
            setFormData({ ...formData, facebook: e.target.value })
          }
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          required
          type="url"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />{" "}
        <div className="flex gap-4 items-end mb-4">
          {" "}
          <div className="flex-1">
            {" "}
            <label className="block mb-1 font-medium" htmlFor="hora-a">
              Horario De Apertura
            </label>{" "}
            <motion.input
              id="hora-a"
              value={formData.hora_a}
              onChange={(e) =>
                setFormData({ ...formData, hora_a: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md w-full"
              required
              type="time"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            />{" "}
          </div>{" "}
          <div className="flex-1">
            {" "}
            <label className="block mb-1 font-medium" htmlFor="hora-c">
              Horario De cierre
            </label>{" "}
            <motion.input
              id="hora-c"
              value={formData.hora_c}
              onChange={(e) =>
                setFormData({ ...formData, hora_c: e.target.value })
              }
              className="p-2 border border-gray-300 rounded-md w-full"
              required
              type="time"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            />{" "}
          </div>{" "}
        </div>{" "}
        <label className="block mb-1 font-medium">Categorías</label>{" "}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {" "}
          {categorias.map((categoria) => (
            <div className="flex gap-1 items-center text-xs" key={categoria}>
              {" "}
              <input
                id={categoria}
                type="checkbox"
                checked={selectedCategorias.includes(categoria)}
                onChange={() => handleCategoriaChange(categoria)}
              />{" "}
              <label htmlFor={categoria}>{categoria}</label>{" "}
            </div>
          ))}{" "}
        </motion.div>{" "}
        <div className="flex justify-between">
          {" "}
          <motion.button
            type="button"
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {" "}
            Cancelar{" "}
          </motion.button>{" "}
          <motion.button
            className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {" "}
            Modificar{" "}
          </motion.button>{" "}
        </div>{" "}
      </form>{" "}
    </motion.aside>
  );
};

export default EditSection;
