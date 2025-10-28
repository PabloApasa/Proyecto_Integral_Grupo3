import { Navigate } from "react-router-dom";
import { useAutorizacion } from "../hooks/AutorizacionSegura";
import { Spinner, Container } from "react-bootstrap";

const ProtectorRutas = ({ allowedRoles, children }) => {
    const { isAuthenticated, user, isLoading } = useAutorizacion();

    if (isLoading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">...Cargando Autenticación...</span>
                </Spinner>
                <p className="mt-2">...Verificando Sesión...</p>
            </Container>
        );
    }

    if (!isAuthenticated){
        return <Navigate to="/login" replace />
    }

    if (allowedRoles && !allowedRoles.includes(user?.rol)){
        return <Navigate to="/unauthorized" replace />
    }

    return children;
};

export default ProtectorRutas;