import { useState, useMemo, useCallback } from 'react';
import { LogOut, LayoutGrid, List } from 'lucide-react';
import { Business, BusinessFilters } from '../../types/';
import { BusinessCard } from '../presentation/BusinessCardDashboard';
import { BusinessFilterBar } from '../presentation/BusinessFilters';
import { DeleteConfirmationModal } from '../presentation/DeleteConfirmation';
import { BusinessModal } from '../presentation/BusinessModal';
import { useBusinesses } from '../../hooks/useBusinesses';
import { supabase } from '../../lib/supabase';
import slugify from 'slugify';
import { Link } from 'react-router-dom';

export const DashboardContainer = () => {
  const { businesses, isLoading, error } = useBusinesses();
  const [filters, setFilters] = useState<BusinessFilters>({
    search: '',
    category: 'Todas las categorías',
    status: 'all',
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [businessToDelete, setBusinessToDelete] = useState<Business | undefined>();
  const [businessToEdit, setBusinessToEdit] = useState<Business | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Memoized filtered businesses
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

  // Memoized handlers
  const handleDeleteBusiness = useCallback(async () => {
    if (businessToDelete) {
      try {
        const { error } = await supabase
          .from('negocios')
          .delete()
          .eq('id', businessToDelete.id);

        if (error) throw error;

        window.location.reload();
      } catch (error) {
        console.error('Error deleting business:', error);
      }
      setBusinessToDelete(undefined);
      setIsModalOpen(false);
    }
  }, [businessToDelete]);

  const handleEditBusiness = useCallback(async (updatedBusiness: Partial<Business>) => {
    if (!businessToEdit) return;

    try {
      const slug = updatedBusiness.nombre 
        ? slugify(updatedBusiness.nombre.toLowerCase())
        : businessToEdit.slug;

      let lat = businessToEdit.lat;
      let lng = businessToEdit.lng;

      if (
        updatedBusiness.direccion !== businessToEdit.direccion ||
        updatedBusiness.ciudad !== businessToEdit.ciudad ||
        updatedBusiness.departamento !== businessToEdit.departamento
      ) {
        try {
          const direccionCompleta = `${updatedBusiness.direccion}, ${updatedBusiness.ciudad}, ${updatedBusiness.departamento}`;
          const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccionCompleta)}`;
          
          const response = await fetch(url);
          const data = await response.json();
          
          if (data.length > 0) {
            lat = parseFloat(data[0].lat);
            lng = parseFloat(data[0].lon);
          }
        } catch (error) {
          console.error('Error getting coordinates:', error);
        }
      }

      const { error } = await supabase
        .from('negocios')
        .update({
          nombre: updatedBusiness.nombre,
          descripcion: updatedBusiness.descripcion,
          whatsapp: updatedBusiness.whatsapp || null,
          facebook: updatedBusiness.facebook || null,
          instagram: updatedBusiness.instagram || null,
          categoria: updatedBusiness.categoria,
          hora_a: updatedBusiness.hora_a,
          hora_c: updatedBusiness.hora_c,
          slug,
          departamento: updatedBusiness.departamento,
          ciudad: updatedBusiness.ciudad,
          direccion: updatedBusiness.direccion,
          lat,
          lng,
          activo: updatedBusiness.activo
        })
        .eq('id', businessToEdit.id);

      if (error) throw error;

      window.location.reload();
    } catch (error: any) {
      console.error('Error updating business:', error.message);
    }

    setBusinessToEdit(null);
    setIsEditModalOpen(false);
  }, [businessToEdit]);

  const handleOpenModal = useCallback((business: Business) => {
    setBusinessToDelete(business);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setBusinessToDelete(undefined);
    setIsModalOpen(false);
  }, []);

  const handleOpenEditModal = useCallback((business: Business) => {
    setBusinessToEdit(business);
    setIsEditModalOpen(true);
  }, []);

  const handleCloseEditModal = useCallback(() => {
    setBusinessToEdit(null);
    setIsEditModalOpen(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className='flex gap-1 items-center'>
            <Link to='/'>
              <img className='size-7' src="../../../public/favicon.svg" alt="Logo de centro digital" />
            </Link>
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </header>

      <main className="p-6">
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

        <BusinessFilterBar
          filters={filters}
          onFilterChange={setFilters}
        />

        <div className={viewMode === 'list' ? 'space-y-6' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'}>
          {filteredBusinesses.map((business) => (
            <BusinessCard
              key={business.id}
              business={business}
              viewMode={viewMode}
              onDelete={() => handleOpenModal(business)}
              onEdit={() => handleOpenEditModal(business)}
            />
          ))}
        </div>
      </main>

      <DeleteConfirmationModal
        business={businessToDelete!}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleDeleteBusiness}
      />

      {businessToEdit && (
        <BusinessModal
          business={businessToEdit}
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onSave={handleEditBusiness}
        />
      )}
    </div>
  );
};