import { Outlet, Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { useAutorizacion } from "../hooks/AutorizacionSegura";

function Layout() {
  const { user, isAuthenticated, logout } = useAutorizacion();
  const navigate = useNavigate();

  const manejarLogout = () => {
    logout();
    navigate("/login");
  };

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


              {/* 🔽 Menú desplegable visible SOLO si el usuario está autenticado */}
              {isAuthenticated && (
                <NavDropdown title="Proyectos / Juegos" id="proyectos-dropdown">
                  {/* ADMINISTRATIVO */}
                  {user?.rol === "ADMINISTRATIVO" && (
                    <>
                      <NavDropdown.Item as={Link} to="/proyectos">Panel de Proyectos</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} to="/proyecto2">Proyecto 2</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/proyecto3">Proyecto 3</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/proyecto4">Proyecto 4</NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/proyecto5">Proyecto 5</NavDropdown.Item>
                    </>
                  )}

                  {/* ALUMNO */}
                  {user?.rol === "ALUMNO" && (
                    <NavDropdown.Item as={Link} to="/games">Games</NavDropdown.Item>
                  )}
                </NavDropdown>
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