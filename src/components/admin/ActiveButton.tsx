import { supabase } from "../../supabase/supabaseClient";

export default function ActiveButton(props: any) {

  const handleActive = async () => {
    const { error } = await supabase
      .from("negocios")
      .update({ activo: true })
      .eq("id", props.id);
      
      window.location.reload();
    
      if (error) {
      console.error("Error activating negocio:", error);
      alert(error.message);
    }
  }

  return (
    <button
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleActive}
    >
      Activar
    </button>
  );
}