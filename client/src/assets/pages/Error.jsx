import "../css/Error.css";
// importamos Link de react-router-dom si quieres un botón de regreso
import { Link } from 'react-router-dom';

function Error() {
    return (
        <div className="error-page">
            {/* Asegúrate que la clase sea 'error' sin el espacio extra */}
            <h1 className="error">Error</h1>
            <h2>La página no se ha encontrado</h2>

            {/* OPCIONAL: Añadir un botón o enlace de regreso (muy recomendado) */}
            <Link to="/" className="btn btn-primary btn-lg">
                Volver al inicio
            </Link>
        </div>
    )
};
export default Error;
