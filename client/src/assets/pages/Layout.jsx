import { Outlet, Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { useAutorizacion } from "../hooks/AutorizacionSegura";

function Layout() {
  const { user, isAuthenticated, logout } = useAutorizacion();
  const navigate = useNavigate();

  console.log("Usuario Autenticado:", isAuthenticated);
  console.log("Rol del Usuario:", user?.rol);

  const manejarLogout = () => {
    logout();
    navigate("/home");
  };

  // Determinamos los roles para enlaces condicionales
  const isAdmin = user?.rol === 'ADMIN';
  const isAlumno = user?.rol === 'ALUMNO';
  const isAlumnoIngles = user?.rol === "ALUMNO-INGLES";

  // 🌟 DEFINICIÓN DE LA LÓGICA DE AUTENTICACIÓN (a inyectar en Header) 🌟
  const AuthAndRoleNavigation = (
    <Nav>
      {/* Enlaces Condicionales por Rol (Solo si está autenticado) */}
      {isAuthenticated && (
        <>

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
      <Navbar expand="lg" bg="light" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/">Proyecto Integral Grupo 3</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>
              <Nav.Link as={Link} to="/infopersonal">InfoPersonal</Nav.Link>


              {/* 🔽 Menú desplegable para los proyectos */}
              <NavDropdown title="Proyectos" id="proyectos-dropdown">
                {/* Solo ADMINISTRATIVO puede ver Proyectos */}
                {isAuthenticated && user?.rol === "ADMIN" && (
                  <>
                    <NavDropdown.Item as={Link} to="/proyectos">
                      Panel de Proyectos
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/proyecto2">
                      Proyecto 2
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/proyecto3">
                      Proyecto 3
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/proyecto4">
                      Proyecto 4
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/proyecto5">
                      Proyecto 5
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>

              {/* 🎮 Menú desplegable para Games (solo para ALUMNO) */}
              {isAuthenticated && user?.rol === "ALUMNO" && (
                <NavDropdown title="Games" id="games-dropdown">
                  <NavDropdown.Item as={Link} to="/juego01">
                    🎨 Juego 01 - Botón Color
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/juego02">
                    🖼️ Juego 02 - Imágenes
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/juego03">
                    🔢 Juego 03 - Números
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/juego04">
                    ⏰ Juego 04 - Días/Semana
                  </NavDropdown.Item>
                </NavDropdown>
              )}

              {/* Diagnostico (solo para ALUMNO-INGLES) */}
              {isAuthenticated && user?.rol === "ALUMNO-INGLES" && (
                <Nav.Link as={Link} to="/diagnostico">Diagnóstico</Nav.Link>
              )}

              {/* ✅ Resultados: solo visible para ADMINISTRATIVO */}
              {isAuthenticated && user?.rol === "ADMIN" && (
                <Nav.Link as={Link} to="/resultados">Resultados</Nav.Link>
              )}



              {/* ✅ NUEVO LINK: TestIngles - Visible solo para ALUMNO */}
              {isAuthenticated && user?.rol === "ALUMNO" && (
                <Nav.Link as={Link} to="/registrar">Nuevo usuario de ingles</Nav.Link>
              )}
            </Nav>

            {/* 🔒 Login / Logout */}
            {isAuthenticated ? (
              <Button variant="outline-danger" onClick={manejarLogout}>
                Cerrar Sesión
              </Button>
            ) : (
              <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="p-3">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
