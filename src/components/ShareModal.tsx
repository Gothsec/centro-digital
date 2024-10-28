const ShareModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://api.whatsapp.com/send?text=${url}`, '_blank');
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const shareOnInstagram = () => {
    alert("Instagram no permite compartir enlaces directamente desde un botón, puedes copiar el enlace y pegarlo en la aplicación.");
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?url=${url}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Enlace copiado al portapapeles!');
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50"> 
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Compartir 🎉</h1>
        <p className="text-gray-600 mb-4 text-center">Comparte este negocio con tus amigos y familia.</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button onClick={shareOnWhatsApp} className="bg-[#25D366] hover:bg-[#1DAE3E] text-white font-bold py-2 rounded transition-all duration-300 shadow-md">
            WhatsApp
          </button>
          <button onClick={shareOnFacebook} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-all duration-300 shadow-md">
            Facebook
          </button>
          <button onClick={shareOnInstagram} className="bg-gradient-to-r from-purple-500 to-red-500 hover:from-purple-400 hover:to-red-400 text-white font-bold py-2 rounded transition-all duration-300 shadow-md">
            Instagram
          </button>
          <button onClick={shareOnTwitter} className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 rounded transition-all duration-300 shadow-md">
            Twitter
          </button>
          <button onClick={copyLink} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded transition-all duration-300 shadow-md">
            Copiar Enlace
          </button>
        </div>
        <button onClick={onClose} className="w-full py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-all duration-300">Cerrar</button>
      </div>
    </div>
  );
};

export default ShareModal;
