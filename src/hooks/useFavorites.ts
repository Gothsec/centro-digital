import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('businessFavorites');
    return saved ? new Set(JSON.parse(saved)) : new Set<string>();
  });

  useEffect(() => {
    localStorage.setItem('businessFavorites', JSON.stringify([...favorites]));
  }, [favorites]);

  const toggleFavorite = (businessId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(businessId)) {
        newFavorites.delete(businessId);
      } else {
        newFavorites.add(businessId);
      }
      return newFavorites;
    });
  };

  return { favorites, toggleFavorite };
};