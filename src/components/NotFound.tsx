// src/components/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">404 - Página no encontrada</h1>
      <p>Lo sentimos, pero la página que estás buscando no existe.</p>
      <Link to="/" className="text-blue-500 hover:underline">Regresar al inicio</Link>
    </div>
  );
};

export default NotFound;
