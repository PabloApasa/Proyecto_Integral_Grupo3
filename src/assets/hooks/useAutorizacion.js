import { useContext } from "react";
import { AutorizacionesContext } from "../context/AutorizacionContext";

export function useAutenticacion () {
    const context = useContext(AutorizacionesContext);

    if(context === null){
        throw new Error('No se ha encontrado el contexto de autenticación');
    }
    
    return context;
}