interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded">
        <h2 className="text-lg">Confirmar eliminación</h2>
        <p>¿Estás seguro de que quieres eliminar esto?</p>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded">
            Cerrar
          </button>
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded" 
            onClick={() => { 
              onDelete();
              onClose();
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDelete;
