
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { NavLink } from "react-router-dom"

function Header() {
    return (
        <header>
            <Navbar expand="lg" className="bg-dark navbar-dark"> {/* Usamos un fondo oscuro (bg-dark) y texto claro (navbar-dark) para que el logo/texto resalte */}
                <Container>
                    {/* Contenedor del Logo y Nombre */}
                    <Navbar.Brand href="#home" className="d-flex align-items-center">
                        {/* Aquí puedes agregar tu logo. Usa una etiqueta <img> y una clase para estilizarla */}
                        <img
                            src="ruta/a/tu/logo.png" // Reemplaza con la ruta real de tu logo
                            width="40"
                            height="40"
                            className="d-inline-block align-top me-2" // 'me-2' añade un margen a la derecha del logo
                            alt="Grupo N*3"
                        />
                        Trabajo Integrador
                    </Navbar.Brand>

                    {/* El botón de hamburguesa para móviles */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />

                    {/* El contenido del menú */}
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                        {/* 'justify-content-end' empuja los elementos del menú a la derecha */}
                        <Nav> {/* Eliminamos 'me-auto' que ponía el menú a la izquierda y centrado */}

                            <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>

                            {/* Aquí estará tu menú desplegable principal */}
                            <NavDropdown title="Proyectos del grupo" id="basic-nav-dropdown" align="end">
                                {/* 'align="end"' asegura que el desplegable aparezca a la derecha */}

                                <NavDropdown.Item href="/Proyecto2/index.html" target="_blank" rel="noopener noreferrer">Proycto_Grupal_2</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/Proyecto3/index.html" target="_blank" rel="noopener noreferrer">Proyecto_Grupal_3</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={NavLink} to="/proyecto4">Proyecto_Grupal_4</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={NavLink} to="/proyecto5">Proyecto_Grupal_5</NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link href="/aboutus">Acerca de nuestro grupo</Nav.Link>
                            <Nav.Link href="/infoPersonal">Informacion personal de los integrantes</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;