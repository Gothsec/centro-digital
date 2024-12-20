import { useState, useEffect } from "react";
import { departamentos } from "../context/departments";

const useDepartments = () => {
  const [departamentosState, setDepartamentosState] = useState<{ [key: string]: string[] }>({});
  
  useEffect(() => {
    setDepartamentosState(departamentos);
  }, []);

  return departamentosState;
};

export default useDepartments;
