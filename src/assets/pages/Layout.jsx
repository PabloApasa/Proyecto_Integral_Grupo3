
import React from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Nav, Button } from "react-bootstrap";
// Importación corregida: asumo que Header está en una carpeta 'components'
import Header from '../components/Header';
// Importación corregida: asumo que el hook está en la carpeta 'context' o similar
// Reemplazamos AutorizacionSegura por AutorizacionContext (nombre más común)
import { useAutorizacion } from "../hooks/AutorizacionSegura";

function Layout() {
  // Ajusté el nombre del hook a useAutorizacion para mantener coherencia
  const { user, isAuthenticated, logout } = useAutorizacion();
  const navigate = useNavigate();

  const manejarLogout = () => {
    logout();
    // Redirigimos al Home o Login después de cerrar sesión
    navigate("/login");
  };

  // Determinamos los roles para enlaces condicionales
  const isAdmin = user?.rol === 'ADMINISTRATIVO';
  const isAlumno = user?.rol === 'ALUMNO';

  // 🌟 DEFINICIÓN DE LA LÓGICA DE AUTENTICACIÓN (a inyectar en Header) 🌟
  const AuthAndRoleNavigation = (
    <Nav>
      {/* Enlaces Condicionales por Rol (Solo si está autenticado) */}
      {isAuthenticated && (
        <>
          {/* 📊 ADMINISTRATIVO */}
          {isAdmin && (
            <Nav.Link as={Link} to="/GamesResultados">
              Resultados Games
            </Nav.Link>
          )}

          {/* 🎮 ALUMNO */}
          {isAlumno && (
            <Nav.Link as={Link} to="/Games">
              Games
            </Nav.Link>
          )}
        </>
      )}

      {/* 🔒 Botón Login/Logout */}
      {isAuthenticated ? (
        <Button variant="outline-danger" onClick={manejarLogout} className="ms-lg-3">
          Cerrar Sesión ({user?.username})
        </Button>
      ) : (
        <Nav.Link as={Link} to="/login" className="ms-lg-3">
          Iniciar Sesión
        </Nav.Link>
      )}
    </Nav>
  );

  return (
    <>
      {/* 🌟 Importamos Header y le pasamos la lógica de autenticación 🌟 */}
      <Header authButtons={AuthAndRoleNavigation} />

      <main className="p-3">
        {/* Aquí se renderiza el contenido de las rutas anidadas */}
        <Outlet />
      </main>
    </>
  );
}

export default Layout;