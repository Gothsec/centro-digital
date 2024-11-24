import { MapPin, Clock, Pencil, Trash2 } from 'lucide-react';
import { Business } from '../../types';
import BusinessImage from '../../data/images'; // Importa el componente BusinessImage

interface BusinessCardProps {
  business: Business;
  viewMode: 'grid' | 'list';
  onEdit?: (business: Business) => void;  // Se hace opcional
  onDelete?: (business: Business) => void; // Se hace opcional
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business, viewMode, onEdit, onDelete }) => {
  // Define la URL de la imagen
  const imageUrl = `https://lweekzkloveifncmfsuq.supabase.co/storage/v1/object/public/images/business-${business.slug}.jpg`;

  // Definimos las clases de estado para ambos modos
  const statusClass = business.activo ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600';
  const statusText = business.activo ? 'Activo' : 'Inactivo';

  // Vista en grid (como estaba antes)
  if (viewMode === 'grid') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-all overflow-hidden">
        <div className="relative w-full aspect-video bg-gray-100">
          <BusinessImage business={business} imageUrl={imageUrl} />
          <div className={`absolute top-3 left-3 p-2 bg-white rounded-md font-semibold ${statusClass}`}>
            {statusText}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{business.nombre}</h3>
          <p className="text-sm text-gray-500">{business.categoria}</p>
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{business.direccion}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2" />
              <span>{business.horario}</span>
            </div>
          </div>
        </div>
        {/* Botones opcionales de editar y eliminar */}
        {(onEdit || onDelete) && (
          <div className="flex items-center justify-between gap-3 p-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              {onEdit && (
                <button onClick={() => onEdit(business)} className="text-gray-600 hover:text-gray-800">
                  <Pencil className="w-5 h-5" />
                </button>
              )}
              {onDelete && (
                <button onClick={() => onDelete(business)} className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Vista en lista
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden">
          <BusinessImage business={business} imageUrl={imageUrl} />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{business.nombre}</h3>
          <p className="text-sm text-gray-500">{business.categoria}</p>
          <div className="mt-2 text-sm text-gray-600">{business.direccion}</div>
          <div className="mt-1 text-sm text-gray-600">{business.horario}</div>
          {/* Estado de actividad debajo del horario */}
          <div className={`mt-4 text-sm font-semibold px-3 py-1 inline-block rounded-full ${statusClass}`}>
            {statusText}
          </div>
        </div>
      </div>

      {/* Botones opcionales de editar y eliminar */}
      {(onEdit || onDelete) && (
        <div className="flex items-center gap-3">
          {onEdit && (
            <button onClick={() => onEdit(business)} className="text-gray-600 hover:text-gray-800">
              <Pencil className="w-5 h-5" />
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(business)} className="text-red-600 hover:text-red-800">
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
