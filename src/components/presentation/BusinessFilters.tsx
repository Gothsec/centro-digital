import { Search, ChevronDown } from 'lucide-react';
import { BusinessFilters } from '../../types/';
import { categories } from '../../utils/categories'; // Importar categorías

interface BusinessFiltersProps {
  filters: BusinessFilters;
  onFilterChange: (filters: BusinessFilters) => void;
}

export const BusinessFilterBar: React.FC<BusinessFiltersProps> = ({ filters, onFilterChange }) => {
  // Añadir la opción de "Todas las categorías"
  const allCategoriesOption = { id: '0', name: 'Todas las categorías', slug: 'todas-las-categorias', icon: ChevronDown };
  
  const allCategories = [allCategoriesOption, ...categories]; // Añadimos la opción de todas las categorías al inicio

  const statusOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'active', label: 'Activos' },
    { value: 'inactive', label: 'Inactivos' },
  ];

  return (
    <div className="flex gap-4 mb-6 flex-wrap">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="w-full min-w-60 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
      </div>

      <div className='flex gap-4 flex-wrap'>
        <div className="relative">
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
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

        <div className="relative">
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value as BusinessFilters['status'] })}
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
    </div>
  );
};
