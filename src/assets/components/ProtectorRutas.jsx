import { Navigate } from "react-router-dom";
import { useAutenticacion } from "../../hooks/useAutenticacion";
import { Spinner, Container, Alert } from "react-bootstrap"

const ProtectorRutas = ({ allowedRoles, children }) => {
    const { isAuthenticated, user, isLoading } = useAutenticacion();

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && allowedRoles.includes(user?.rol)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectorRutas;