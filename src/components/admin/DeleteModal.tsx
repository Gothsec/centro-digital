import { motion } from "framer-motion";

interface ModalDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({
  isOpen,
  onClose,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {" "}
      <motion.div
        className="bg-white p-5 rounded"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        {" "}
        <h2 className="text-lg">Confirmar eliminación</h2>{" "}
        <p>¿Estás seguro de que quieres eliminar esto?</p>{" "}
        <div className="flex justify-end mt-4">
          {" "}
          <button
            onClick={onClose}
            className="mr-2 bg-gray-300 text-gray-800 px-4 py-2 rounded"
          >
            {" "}
            Cerrar{" "}
          </button>{" "}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              onDelete();
              onClose();
            }}
          >
            {" "}
            Eliminar{" "}
          </button>{" "}
        </div>{" "}
      </motion.div>{" "}
    </motion.div>
  );
};

export default ModalDelete;
