const Error404: React.FC = () => {
  return (
    <div className="h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="text-center space-y-6">
        {/* Animación de la ilustración */}
        <div className="animate-pulse flex justify-center">
          <div className="bg-blue-600 text-white p-4 rounded-full">
            <span className="text-4xl font-bold">404</span>
          </div>
        </div>
        
        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          Oops! Página No Encontrada.
        </h1>
        
        {/* Subtítulo */}
        <p className="text-lg md:text-xl text-gray-600">
          La página que estás buscando no existe o ha sido removida.
        </p>

        {/* Animación del botón */}
        <div className="mt-8">
          <a
            href="/"
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-full text-lg font-medium transform transition-all duration-300 hover:scale-105 hover:bg-blue-700"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
};

export default Error404;
