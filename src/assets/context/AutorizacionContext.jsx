import { createContext, useState, useMemo, useCallback } from "react";
import usuarioGuardados from "../data/usuarios.json";

// 1. crea el contexto
export const AutorizacionesContext = createContext(null);

// 2. componente proveedor del contexto de Autenticacion
export function AutorizacionesProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 🔹 agregado

  const login = useCallback((credentials) => {
    try {
      setIsLoading(true); // 🔹 comenzamos "carga"
      const usuarioEncontrado = usuarioGuardados.find(
        (u) =>
          u.username === credentials.username &&
          u.password === credentials.password
      );

      if (usuarioEncontrado) {
        const { password, ...userWithoutPassword } = usuarioEncontrado; // quitamos la password
        setUser(userWithoutPassword);
        setIsLoading(false);
        return { success: true }; // retorna exito inmediato
      } else {
        setUser(null);
        setIsLoading(false);
        return {
          success: false,
          message:
            "Credenciales inválidas. Por favor, verifica usuario y contraseña",
        };
      }
    } catch (error) {
      console.error("Login failed due to unexpected error:", error.message);
      setUser(null);
      setIsLoading(false);
      return {
        success: false,
        message: "Ocurrió un error inesperado durante el login.",
      };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const valorDelContexto = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading, // 🔹 agregado al contexto
      login,
      logout,
    }),
    [user, isLoading, login, logout]
  );

  // 3. Proveer el valor del contexto a los hijos
  return (
    <AutorizacionesContext.Provider value={valorDelContexto}>
      {children}
    </AutorizacionesContext.Provider>
  );
}