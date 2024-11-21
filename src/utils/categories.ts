import { 
  Coffee, 
  Utensils, 
  ShoppingBag, 
  Book, 
  Scissors, 
  Laptop,
  Car,
  Dog,
  Shirt,
  Home,
  Briefcase,
  Dumbbell,
  Stethoscope,
  GraduationCap,
  Palette
} from 'lucide-react';

export const categories = [
  { id: '1', name: 'Cafés', icon: Coffee, slug: 'Cafés' },
  { id: '2', name: 'Restaurantes', icon: Utensils, slug: 'Restaurantes' },
  { id: '3', name: 'Retail', icon: ShoppingBag, slug: 'Retail' },
  { id: '4', name: 'Librerías', icon: Book, slug: 'Librerías' },
  { id: '5', name: 'Belleza y Bienestar', icon: Scissors, slug: 'Belleza y Bienestar' },
  { id: '6', name: 'Tecnología', icon: Laptop, slug: 'Tecnología' },
  { id: '7', name: 'Automotriz', icon: Car, slug: 'Automotriz' },
  { id: '8', name: 'Servicios para Mascotas', icon: Dog, slug: 'Servicios para Mascotas' },
  { id: '9', name: 'Moda', icon: Shirt, slug: 'Moda' },
  { id: '10', name: 'Hogar y Jardín', icon: Home, slug: 'Hogar y Jardín' },
  { id: '11', name: 'Servicios Profesionales', icon: Briefcase, slug: 'Servicios Profesionales' },
  { id: '12', name: 'Fitness', icon: Dumbbell, slug: 'Fitness' },
  { id: '13', name: 'Salud', icon: Stethoscope, slug: 'Salud' },
  { id: '14', name: 'Educación', icon: GraduationCap, slug: 'Educación' },
  { id: '15', name: 'Arte y Cultura', icon: Palette, slug: 'Arte y Cultura' }
];

export const getCategoryIcon = (categoryName: string) => {
  const category = categories.find(cat => cat.name === categoryName);
  return category ? category.icon : ShoppingBag;
};
