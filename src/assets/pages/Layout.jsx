import { Outlet } from "react-router-dom";
//import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import Header from "../components/Header"
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useAutorizacion } from "../hooks/useAutorizacion "


function Layout() {
    const { user, isAuthenticated, logot } = useAutorizacion();
    const navigate = useNavigate();

    const manejarLogot = () => {
        logot();
        navigate("/");
    }

    /*return (
        <>
            <Header />
            <main>
                <h1>Bien venidos a : </h1>
                <Outlet></Outlet>
            </main>
        </>
    )*/

    return (
        <>
            <Navbar expan="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand>Mi Proyecto</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                {isAuthenticated && user?.rol === 'ADMINISTRATIVO'
                                    || user?.rol === 'ALUMNO'
                                    && (<NavDropdown.Item href="/games">Games</NavDropdown.Item>)}
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                            {isAuthenticated ?
                                (<Button variant="outline-success" onClick={manejarLogout}>carrar sesiont</Button>) :
                                (<Nav.Link href="/">iniciar sesion</Nav.Link>)}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <section>
                <Outlet></Outlet>
            </section>

        </>
    )
}

export default Layout;