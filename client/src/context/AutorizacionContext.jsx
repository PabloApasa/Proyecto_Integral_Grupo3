import { createContext, useState, useMemo, useCallback, useEffect } from "react";
import usuarioGuardados from "../data/usuarios.json";

// 1. crea el contexto
export const AutorizacionesContext = createContext(null);

// 2. componente proveedor del contexto de Autenticacion
export function AutorizacionesProvider({ children }) {

  const [usuariosBD, setUsuariosBD] = useState([]);

  //const [user, setUser] = useState(null);
  //const [isLoading, setIsLoading] = useState(false); // 🔹 agregado

  const [user, setUser] = useState(() => {
    try {
      const usuarioAlmacenado = localStorage.getItem('LOCAL_STORAGE_KEY');
      return usuarioAlmacenado ? JSON.parse(usuarioAlmacenado) : null;
    } catch {
      localStorage.removeItem('LOCAL_STORAGE_KEY');
      return null;
    }
  });

  const buscarUsuarios = useCallback(async () => {
    try {
      const res = await axios.get('/api/obtenerUsuarios');
      setUsuariosBD(res.data);
      console.log('Usuarios cargados:' ,res.data);
    } catch (err) {
      console.error('Error al cargar los usuarios:', err);
    }
  }, []);

  const login = useCallback((credentials) => {
    console.log(usuariosBD);
    try {
      const usuarioEncontrado = usuariosBD.find(
        (u) => u.username === credentials.username && u.password === credentials.password);
      if (usuarioEncontrado) {
        const { password, ...userWithoutPassword } = usuarioEncontrado;
        setUser(userWithoutPassword);
        return { success: true };
      } else {
        //si no se encuetra el ususario o credencial no coinciden
        setUser (null);
        //retorna un objeto de error
        return { success: false, message: 'Credenciales inválidas' };
      }
    } catch (err) {
      //errores inesperados en el find, aunque es de importancia en carga de datos
      console.error('Error al iniciar sesión:', error.message);
      setUser(null);
      setIsLoading(false);
      return { success: false, message: 'Error al iniciar sesión' };
    }
  }, [usuariosBD]);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('LOCAL_STORAGE_KEY', JSON.stringify(user));
    } else {
      localStorage.removeItem('LOCAL_STORAGE_KEY');
    }
  }, [user]);

  useEffect(() => {
    buscarUsuarios;
  },[]);

  const valorDelContexto = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    login,
    logout,
    usuariosBD
  }), [user, login, logout, usuariosBD]);

  // 3. Proveer el valor del contexto a los hijos
  return (
    <AutorizacionesContext.Provider value={valorDelContexto}>
      {children}
    </AutorizacionesContext.Provider>
  );
}
