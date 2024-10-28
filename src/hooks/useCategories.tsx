import { useEffect, useState } from "react";
import { categorias } from "../context/categories";

const useCategorias = () => {
  const [categoriasState, setCategoriasState] = useState<string[]>([]);

  useEffect(() => {
    setCategoriasState(categorias);
  }, []);

  return categoriasState;
};

export default useCategorias;