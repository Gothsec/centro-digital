import { useState, useEffect } from 'react';
import { supabase } from "../../lib/supabase";

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
  const [formData, setFormData] = useState<Omit<Negocio, 'id' | 'categorias'>>({
    nombre: '',
    descripcion: '',
    whatsapp: '',
    instagram: '',
    facebook: '',
    hora_a: '',
    hora_c: '',
  });

  const [selectedCategorias, setSelectedCategorias] = useState<string[]>([]);

  const categorias = [
    "Restaurante",
    "Mexicano",
    "Belleza",
    "Peluqueria",
    "Ropa",
    "Fitness",
    "Gimnasio",
    "Libreria",
    "Cultura",
    "Cafe",
    "Pasteleria",
    "Salud",
    "Dentista",
    "Educacion",
    "Veterinaria",
    "Tecnologia",
    "Spa",
    "Turismo",
    "Panaderia",
    "Construccion",
    "Negocios"
  ];

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
        .filter(categoria => categoria && categoria.nombre)
        .map(categoria => categoria.nombre);
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
      .eq('id', negocio?.id);

    if (error) {
      console.error(error);
      return;
    }

    console.log("Formulario enviado");
    onClose();
    window.location.reload();
  };

  const handleCategoriaChange = (categoria: string) => {
    setSelectedCategorias(prevSelected => 
      prevSelected.includes(categoria) 
        ? prevSelected.filter(c => c !== categoria) 
        : [...prevSelected, categoria]
    );
  };

  return (
    <aside className="p-4 bg-white rounded-lg border max-h-screen overflow-y-auto">
      <h1 className="mb-4 text-2xl font-bold text-center">Editar negocio</h1>

      <form onSubmit={handleSubmit}>
        <label className="block mb-1 font-medium" htmlFor="nombre">Nombre</label>
        <input
          id="nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          required
          type="text"
        />

        <label className="block mb-1 font-medium" htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          required
          cols={30}
          rows={4}
        ></textarea>

        <label className="block mb-1 font-medium" htmlFor="whatsapp">WhatsApp</label>
        <input
          id="whatsapp"
          value={formData.whatsapp}
          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          required
          type="tel"
        />

        <label className="block mb-1 font-medium" htmlFor="instagram">Instagram</label>
        <input
          id="instagram"
          value={formData.instagram}
          onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          required
          type="url"
        />

        <label className="block mb-1 font-medium" htmlFor="facebook">Facebook</label>
        <input
          id="facebook"
          value={formData.facebook}
          onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
          className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          required
          type="url"
        />

        <div className="flex gap-4 items-end mb-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium" htmlFor="hora-a">Hora de apertura</label>
            <input
              id="hora-a"
              value={formData.hora_a}
              onChange={(e) => setFormData({ ...formData, hora_a: e.target.value })}
              className="p-2 border border-gray-300 rounded-md w-full"
              required
              type="time"
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium" htmlFor="hora-c">Hora de cierre</label>
            <input
              id="hora-c"
              value={formData.hora_c}
              onChange={(e) => setFormData({ ...formData, hora_c: e.target.value })}
              className="p-2 border border-gray-300 rounded-md w-full"
              required
              type="time"
            />
          </div>
        </div>

        <label className="block mb-1 font-medium">Categorías</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {categorias.map((categoria) => (
            <div className='flex gap-1 items-center text-xs' key={categoria}>
              <input
                id={categoria}
                type='checkbox'
                checked={selectedCategorias.includes(categoria)}
                onChange={() => handleCategoriaChange(categoria)}
              />
              <label htmlFor={categoria}>{categoria}</label>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button type="button" className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600" onClick={onClose}>
            Cancelar
          </button>
          <button className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600" type="submit">
            Modificar
          </button>
        </div>
      </form>
    </aside>
  );
};

export default EditSection;
