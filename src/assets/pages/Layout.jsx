import { Outlet } from "react-router-dom";
//import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import Header from "../components/Header"

function Layout() {
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