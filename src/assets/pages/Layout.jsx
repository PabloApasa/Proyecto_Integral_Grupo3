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
    
    return (
        <>
            <Header />
            <main>
                <h1>Bien venidos a : </h1>
                <Outlet></Outlet>
            </main>
        </>
    )
}

export default Layout;