import DeleteModal from "../admin/DeleteModal";
import { useState } from "react";
import { supabase } from "../../supabase/supabaseClient";

export default function DeleteButton(props: any) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleDelete = async () => {
    const { data: negocio, error } = await supabase
      .from("negocios")
      .update({ activo: false })
      .eq("id", props.id);

    window.location.reload();

    console.log(negocio);
    if (error) {
      console.error("Error deleting negocio:", error);
      alert(error.message);
    } else {
      console.log("Negocio deleted successfully");
      setModalOpen(false);
    }
  };

  return (
    <>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Eliminar
      </button>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onDelete={handleDelete}
      />
    </>
  );
}
