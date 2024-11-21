import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Category } from '../../types';
import { getCategoryIcon } from '../../utils/categories';

interface CategoryCarouselProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export const CategoryCarousel = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryCarouselProps) => {
  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById('category-carousel');
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative w-full">
      <div
        id="category-carousel"
        className="flex space-x-4 overflow-x-auto scrollbar-hide py-4 px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <button
          onClick={() => onSelectCategory(null)}
          className={`flex-shrink-0 px-4 py-2 rounded-full ${
            selectedCategory === null
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          All Categories
        </button>
        
        {categories.map((category) => {
          const Icon = getCategoryIcon(category.icon);
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.slug)}
              className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full ${
                selectedCategory === category.slug
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => scrollContainer('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <button
        onClick={() => scrollContainer('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};