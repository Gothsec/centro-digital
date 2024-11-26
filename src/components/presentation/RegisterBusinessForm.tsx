import { useEffect, useState } from 'react';
import { categories } from '../../utils/categories'; 
import { ArrowLeft } from 'lucide-react';
import { BusinessForm } from '../../types';
import useDepartments from '../../hooks/useDepartments';

interface RegisterBusinessFormProps {
  formData: BusinessForm;
  error: string | null;
  isSubmitting: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>, index?: number) => void;
}

export const RegisterBusinessForm: React.FC<RegisterBusinessFormProps> = ({
  formData,
  error,
  isSubmitting,
  onChange,
  onSubmit,
  onBack,
  onFileChange,  // Recibimos la función para manejar el cambio de archivo
}) => {
  const departamentos = useDepartments();  // Usamos el hook que trae los departamentos
  const [ciudadesFiltradas, setCiudadesFiltradas] = useState<string[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);

  // Al seleccionar un departamento, filtramos las ciudades
  useEffect(() => {
    if (formData.departamento) {
      setCiudadesFiltradas(departamentos[formData.departamento] || []);
    }
  }, [formData.departamento, departamentos]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo (solo webp)
    if (!file.type.includes('image/webp')) {
      setImageError('Only .webp images are allowed.');
      return;
    }

    // Validar tamaño (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setImageError('The image size must not exceed 2MB.');
      return;
    }

    setImageError(null); // Limpiar cualquier error previo
    onFileChange(e, index); // Llamamos a la función onFileChange original
  };

  // Comprobamos si hay error de imagen o si se está enviando
  const isSubmitDisabled = imageError !== null || isSubmitting;

  return (
    <div className="max-w-4xl mt-6 mx-auto p-6 bg-gray-50 shadow-lg rounded-lg">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Register Your Business</h1>

      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your business name"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe your business"
            required
          ></textarea>
        </div>

        {/* WhatsApp */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
          <input
            type="text"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter WhatsApp number"
          />
        </div>

        {/* Social Media URLs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
            <input
              type="text"
              name="facebook"
              value={formData.facebook}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Facebook URL"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
            <input
              type="text"
              name="instagram"
              value={formData.instagram}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Instagram URL"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="" disabled>Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>{category.name}</option>
            ))}
          </select>
        </div>

        {/* Time Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Opening Time</label>
            <input
              type="time"
              name="hora_a"
              value={formData.hora_a}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Closing Time</label>
            <input
              type="time"
              name="hora_c"
              value={formData.hora_c}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-2 gap-4">
            {/* Department */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                name="departamento"
                value={formData.departamento}
                onChange={onChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>Select a Department</option>
                {Object.keys(departamentos).map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <select
                name="ciudad"
                value={formData.ciudad}
                onChange={onChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="" disabled>Select a City</option>
                {ciudadesFiltradas.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={onChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter address"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Business Image: webp</label>
          <input
            type="file"
            name="image"
            accept="image/jpeg"
            onChange={handleImageChange} // Usamos la nueva función de manejo de imagen
            className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
          />
          {imageError && (
            <p className="text-red-500 text-sm mt-2">{imageError}</p>
          )}
          {formData.image && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(formData.image)}
                alt="Business preview"
                className="w-40 h-40 object-cover rounded"
              />
            </div>
          )}
        </div>

        {/* Product Images */}
        {[...Array(3)].map((_, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Product Image {index + 1}: webp
            </label>
            <input
              type="file"
              accept="image/jpeg"
              onChange={(e) => handleImageChange(e, index)} // Usamos la misma función para imágenes de productos
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
            />
            {formData.productImages[index] && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(formData.productImages[index])}
                  alt={`Product preview ${index + 1}`}
                  className="w-40 h-40 object-cover rounded"
                />
              </div>
            )}
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full p-2 rounded text-white ${isSubmitDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          disabled={isSubmitDisabled}
        >
          {isSubmitting ? 'Submitting...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
