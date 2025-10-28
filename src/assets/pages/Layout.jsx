import { Outlet, Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { useAutorizacion } from "../hooks/AutorizacionSegura";

function Layout() {
  const { user, isAuthenticated, logout } = useAutorizacion();
  const navigate = useNavigate();

  const manajarLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Navbar expanded="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Mi Proyecto</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                {isAuthenticated && user?.rol === 'ADMINISTRATIVO' && (
                  <NavDropdown.Item as={Link} to="/proyectos">Proyectos</NavDropdown.Item>
                )}
                {isAuthenticated && user?.rol === 'ALUMNO' && (
                  <NavDropdown.Item as={Link} to="/games">Games</NavDropdown.Item>
                )}
              </NavDropdown>
              {isAuthenticated ? (
                <Button variant="outline-success" onClick={manajarLogout}>Cerrar Sesión</Button>
              ) : (
                <Nav.Link as={Link} to="/">Iniciar Sesión</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section>
        <Outlet />
      </section>
    </>
  );
}

export default Layout;