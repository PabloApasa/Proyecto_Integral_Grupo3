import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Proyecto03() {
    // Inicializa el hook para manejar la navegación
    const navigate = useNavigate();

    // Función para manejar el botón "Volver"
    const handleVolver = () => {
        // Redirige al usuario a la ruta principal de la aplicación ('/')
        navigate('/');
    };

    return (
        <div className="proyecto3-container">
            <h1>¡Bienvenido al Proyecto Anterior!</h1>

            {/* El evento onclick se reemplaza por onClick y una función de React */}
            <button onClick={handleVolver}>Volver a la Aplicación Principal</button>

            <hr />

            <ul>
                {/* Los <li> y <a> se convierten en <li> y <Link>. 
                  Las rutas 'to' deben coincidir con las definidas en <Route> en App.jsx.
                */}

                {/* Asumiendo que el Ejercicio 1 se mapea a la ruta /ejercicio1 */}
                <li>
                    <a href="/public/Proyecto3/Ejercicio01/public/index.html">punto_1</a>
                </li>

                {/* Asumiendo que el Ejercicio 2 se mapea a la ruta /ejercicio2 */}
                <li>
                    <a href="/public/Proyecto3/Ejercicio02/punto2.html">punto_2</a>
                </li>
            </ul>
        </div>
    );
}

export default Proyecto03;