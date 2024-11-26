import { Search, ChevronDown } from 'lucide-react';
import { BusinessFilters } from '../../types/';
import { categories } from '../../utils/categories'; // Importar categorías

interface BusinessFiltersProps {
  filters: BusinessFilters;
  onFilterChange: (filterName: string, value: string) => void; // Cambié el tipo para que reciba ambos parámetros
}

export const BusinessFilterBar: React.FC<BusinessFiltersProps> = ({ filters, onFilterChange }) => {
  const allCategoriesOption = { id: '0', name: 'Todas las categorías', slug: 'todas-las-categorias', icon: ChevronDown };
  const allCategories = [allCategoriesOption, ...categories]; // Añadimos la opción de todas las categorías al inicio

  const statusOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'active', label: 'Activos' },
    { value: 'inactive', label: 'Inactivos' },
  ];

  return (
    <div className="flex gap-4 mb-6">
      {/* Filtro de búsqueda */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)} // Llamamos a onFilterChange pasando 'search' y el valor
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>

      {/* Filtro de categorías */}
      <div className="relative">
        <select
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)} // Llamamos a onFilterChange pasando 'category' y el valor
          className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          {allCategories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
      </div>

      {/* Filtro de estado */}
      <div className="relative">
        <select
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value)} // Llamamos a onFilterChange pasando 'status' y el valor
          className="appearance-none pl-4 pr-10 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
      </div>
    </div>
  );
};
