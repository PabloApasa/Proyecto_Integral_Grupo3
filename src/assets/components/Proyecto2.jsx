import React from 'react';
// IMPORTANTE: Necesitas importar Link (y potencialmente useNavigate)
import { Link, useNavigate } from 'react-router-dom';

function Proyecto02() {
    // Usamos useNavigate para el botón de volver
    const navigate = useNavigate();

    // Función para manejar el "Volver"
    const handleVolver = () => {
        // Redirige al inicio de la aplicación
        navigate('/');
    };

    return (
        <div className="menu-container">

            {/* 1. Botón "Volver" usando useNavigate */}
            <button onClick={handleVolver}>Volver a la Aplicación Principal</button>

            {/* 2. Lista de Enlaces usando <Link> de React Router */}
            {/* Debes definir la ruta 'to' que corresponde a tu componente React. 
               Asumiremos que tus componentes Proyecto X se llaman a través de rutas: */}

            <a href="/Proyecto2/punto 1/punto1.html">punto_1</a>
            <a href="/Proyecto2/punto_2/punto02.html">punto_2</a>
            <a href="/Proyecto2/punto 3/punto3.html">punto_3</a>
            <a href="/Proyecto2/punto4/punto4.html">punto_4</a>
            <a href="/Proyecto2/punto5/punto5.html">punto_5</a>

        </div>
    );
}

export default Proyecto02;