import {createContext , useState, useMemo, useCallback, useEffect} from "react";

import usu from '../data/usersData.json';
// import usuarioGuardado from '../data/usuarioGuardado.json';

import { useCallback } from "react";

// 1 . crear el contexto
export const AutorizacionesContext = createContext(null);

// 2 . componente proveedor del ontexto de autorizacion
export function AutorizacionesProvider = ({children}) => {

    const [usuariosBD, setUsuariosBD] = useState([]);

    //const [usuario, setUsuario] = useState(null);
    
    const[user, setUser] = useState(() => {
      try{
        const usuarioAlmacenado = localStorage.getItem('LOCAL_STORAGR_KEY');
        return usuarioAlmacenado ? JSON.parse(usuarioAlmacenado) : null;
      }  catch (error) {
        localStorage.removeItem('LOCAL_STORAGR_KEY');
        return null;
      }
    }
    );

    const buscarUsuarios = useCallback(async() => {
        try{
            const res = await axios.get('/api/obtenerUsuarios');
            setUsuariosBD(res.data);
        } catch (error) {
            console.error('Error al cargar jugadores:' res.data);  
        }
    }, []);

    const login = useCallback((credentials) => {
        console.log(usuariosBD);
        try{
            const usuarioEncontrado = usuariosBD.find(
                //const usuariosEncontrado = usuariosGurdados.find(
                u => u.username === credentials.username && u.password === credentials.password);
        if (usuarioEncontrado) {
            const { password, ...userWithoutPassword } = usuarioEncontrado;
            setUser(userWithoutPassword);
            return { success: true};
        } else {
            setUser(null);
            return { success: false, message: 'Credenciales inválidas' };
        }
        } catch (error){
            console.error('login failed due to unexpected error:', error.message);
            setUser(null);
            setIsLoading(false);
            return { success: false, message: 'Error inesperado al iniciar sesión' };

        }
    }, [usuariosBD];

    const loguot = useCallback(() => {
        setUser(null);
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    useEffect(() => {
        buscarUsuarios();
    }, []);

    const valorDelContexto = useMemo(() => ({
        user,
        isAuthenticated: !!user,
        login,
        logout,
        usuarioBD
    }), [user, login, logout, usuariosBD]);

    // 3 . proveer el valor del contexto a los hijos
    return(
        <AutorizacionesContext.Provider value = {valorDelContexto}>
            {children}
        </AutorizacionesContext.Provider>
    )
    )
}
