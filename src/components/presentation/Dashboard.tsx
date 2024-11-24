// components/dashboard/Dashboard.tsx
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Plus, Search } from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface Business {
  id: string
  name: string
  category: string
  address: string
  schedule: string
  image: string
  isActive: boolean
}

interface DashboardProps {
  businesses: Business[]
  isLoading: boolean
  pageCount: number
  currentPage: number
  setCurrentPage: (page: number) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
  categoryFilter: string
  setCategoryFilter: (category: string) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
  handleDelete: (id: string) => void
  handleSave: (business: Business) => void
  isAdding: boolean
  isEditing: boolean
  setIsAdding: (isAdding: boolean) => void
  setIsEditing: (isEditing: boolean) => void
  setSelectedBusiness: (business: Business | null) => void
  selectedBusiness: Business | null
}

export default function Dashboard({
  businesses,
  isLoading,
  pageCount,
  currentPage,
  setCurrentPage,
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  statusFilter,
  setStatusFilter,
  handleDelete,
  handleSave,
  isAdding,
  isEditing,
  setIsAdding,
  setIsEditing,
  setSelectedBusiness,
  selectedBusiness,
}: DashboardProps) {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button variant="destructive">Cerrar sesión</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Negocios</h2>
            <Button onClick={() => {
              setSelectedBusiness(null)
              setIsAdding(true)
              setIsEditing(true)
            }}>
              <Plus className="mr-2 h-4 w-4" /> Nuevo Negocio
            </Button>
          </div>
          
          {/* Filters */}
          <div className="flex gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar por nombre..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="Tecnología">Tecnología</SelectItem>
                <SelectItem value="Servicios Profesionales">Servicios Profesionales</SelectItem>
                <SelectItem value="Retail">Retail</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Activos</SelectItem>
                <SelectItem value="inactive">Inactivos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Businesses List */}
        <div className="space-y-4">
          {businesses.map((business) => (
            <div key={business.id} className="flex items-center justify-between rounded-lg border bg-white p-4 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-100" />
                <div>
                  <h3 className="font-semibold">{business.name}</h3>
                  <p className="text-sm text-gray-500">{business.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <div className={`h-2 w-2 rounded-full mr-2 ${business.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm">{business.isActive ? 'Activo' : 'Inactivo'}</span>
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        Eliminar
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>¿Estás seguro?</DialogTitle>
                        <DialogDescription>
                          Esta acción no se puede deshacer. Esto eliminará permanentemente el negocio {business.name}.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => {}}>Cancelar</Button>
                        <Button variant="destructive" onClick={() => handleDelete(business.id)}>
                          {isLoading ? "Eliminando..." : "Eliminar"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => {
                      setSelectedBusiness(business)
                      setIsEditing(true)
                    }}
                  >
                    Editar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="mt-4 flex justify-center gap-2">
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
          </div>
        )}
      </main>

      {/* Business Form */}
      <Sheet open={isEditing} onOpenChange={setIsEditing}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{isAdding ? 'Añadir Negocio' : 'Editar Negocio'}</SheetTitle>
            <SheetDescription>
              {isAdding ? 'Añade un nuevo negocio' : 'Modifica los datos del negocio aquí'}. Haz clic en guardar cuando termines.
            </SheetDescription>
          </SheetHeader>
          {(selectedBusiness || isAdding) && (
            <form onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const business = {
                id: selectedBusiness?.id || '',
                name: formData.get('name') as string,
                category: formData.get('category') as string,
                address: formData.get('address') as string,
                schedule: formData.get('schedule') as string,
                image: '/placeholder.svg',
                isActive: formData.get('isActive') === 'on'
              }
              handleSave(business)
            }} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" name="name" defaultValue={selectedBusiness?.name} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoría</Label>
                <Select name="category" defaultValue={selectedBusiness?.category}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tecnología">Tecnología</SelectItem>
                    <SelectItem value="Servicios Profesionales">Servicios Profesionales</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" name="address" defaultValue={selectedBusiness?.address} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule">Horario</Label>
                <Input id="schedule" name="schedule" defaultValue={selectedBusiness?.schedule} required />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="isActive" name="isActive" defaultChecked={selectedBusiness?.isActive} />
                <Label htmlFor="isActive">Activo</Label>
              </div>
              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </div>
            </form>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
