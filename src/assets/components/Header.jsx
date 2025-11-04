
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { NavLink } from "react-router-dom"

// Header ahora acepta props para pasar elementos extra (como botones de Login/Logout)
function Header({ authButtons }) {
    return (
        <header>
            <Navbar expand="lg" className="bg-dark navbar-dark shadow-lg">
                <Container>
                    {/* Contenedor del Logo y Nombre */}
                    <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
                        <span className="me-2 text-warning fs-5">🚀</span>
                        Trabajo Integrador
                    </Navbar.Brand>

                    {/* El botón de hamburguesa para móviles */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    {/* El contenido del menú */}
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                        <Nav className="me-auto"> {/* Dejamos el me-auto aquí para separar los enlaces principales de los de autenticación */}
                            <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>

                            {/* Menú desplegable principal - Usando NavLink para navegación interna */}
                            <NavDropdown title="Proyectos del grupo" id="basic-nav-dropdown" align="start">
                                <NavDropdown.Item as={NavLink} to="/proyecto2">Proycto_Grupal_2</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={NavLink} to="/proyecto3">Proyecto_Grupal_3</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={NavLink} to="/proyecto4">Proyecto_Grupal_4</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={NavLink} to="/proyecto5">Proyecto_Grupal_5</NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link as={NavLink} to="/aboutus">Acerca de nuestro grupo</Nav.Link>
                            <Nav.Link as={NavLink} to="/infopersonal">Informacion personal de los integrantes</Nav.Link>
                        </Nav>

                        {/* 🌟 Punto de Inyección de Lógica de Autenticación */}
                        {authButtons}

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;