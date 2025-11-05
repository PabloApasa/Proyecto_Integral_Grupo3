
import { useContext } from "react";
import { AutorizacionesContext } from "../../../../client/src/assets/context/AutorizacionContext";

export function useAutorizacion() {
  const context = useContext(AutorizacionesContext);

  if (context === null) {
    throw new Error('useAutorizacion debe ser usado dentro de un AutorizacionesProvider');
  }

  return context;
}