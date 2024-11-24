import { useState, useMemo } from 'react';
import { LogOut, LayoutGrid, List } from 'lucide-react';
import { Business, BusinessFilters } from '../../types/';
import { BusinessCard } from '../presentation/BusinessCardDashboard';
import { BusinessFilterBar } from '../presentation/BusinessFilters';
import { DeleteConfirmationModal } from '../presentation/DeleteConfirmation';
import { useBusinesses } from '../../hooks/useBusinesses';

export const DashboardContainer: React.FC = () => {
  const { businesses, isLoading, error } = useBusinesses();
  const [filters, setFilters] = useState<BusinessFilters>({
    search: '',
    category: 'Todas las categorías',
    status: 'all',
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [businessToDelete, setBusinessToDelete] = useState<Business | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const matchesSearch = business.nombre
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesCategory =
        filters.category === 'Todas las categorías' ||
        business.categoria === filters.category;
      const matchesStatus =
        filters.status === 'all' ||
        (filters.status === 'active' && business.activo) ||
        (filters.status === 'inactive' && !business.activo);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [businesses, filters]);

  const handleDeleteBusiness = () => {
    if (businessToDelete) {
      // Aquí agregarías la lógica para eliminar el negocio
      console.log(`Eliminando el negocio con id: ${businessToDelete.id}`);
      setBusinessToDelete(undefined); // Limpiamos el negocio seleccionado
      setIsModalOpen(false); // Cerramos el modal
    }
  };

  const handleOpenModal = (business: Business) => {
    setBusinessToDelete(business);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setBusinessToDelete(undefined);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold">
              Panel de control
            </h1>
            <button className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-semibold">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </header>

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        {/* Barra de vista y filtro */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4 items-center">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'list' ? 'bg-gray-100 text-gray-800' : 'hover:bg-gray-50 text-gray-600'}`}
              title="Vista de lista"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-all duration-200 ${viewMode === 'grid' ? 'bg-gray-100 text-gray-800' : 'hover:bg-gray-50 text-gray-600'}`}
              title="Vista en cuadrícula"
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filtro de negocios */}
        <BusinessFilterBar
          filters={filters}
          onFilterChange={setFilters}
        />

        {/* Contenedor de tarjetas */}
        <div className={viewMode === 'list' ? 'space-y-6' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}>
          {isLoading ? (
            <div className="text-center text-gray-500">Cargando...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            filteredBusinesses.map((business) => (
              <BusinessCard
                key={business.id}
                business={business}
                viewMode={viewMode}
                onDelete={() => handleOpenModal(business)} // Al hacer clic en eliminar, abre el modal
              />
            ))
          )}
        </div>
      </main>

      {/* Modal de confirmación */}
      <DeleteConfirmationModal
        business={businessToDelete!} // Usamos el negocio a eliminar
        isOpen={isModalOpen}
        onClose={handleCloseModal} // Llama a la función de cierre
        onConfirm={handleDeleteBusiness} // Llama a la función de confirmación
      />
    </div>
  );
};
