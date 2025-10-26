
import React from 'react';

// Componente genérico para mostrar un proyecto HTML
const Proyecto2 = ({ projectPath, title }) => {
    // La URL se construye a partir de la ruta base pública (ej: /proyecto-html-1/index.html)
    const fullUrl = `/${projectPath}index.html`;

    return (
        <div style={{ padding: '20px' }}>
            <h1>{title}</h1>
            <p>Este proyecto se está mostrando dentro de un iframe.</p>

            {/* Botón para volver al Home (usando Link de react-router-dom) */}
            {/* Asumo que ya tienes la importación de Link en este archivo o lo agregarás */}
            {/* <Link to="/" className="btn btn-secondary">Volver al Home</Link> */}

            <div style={{ height: '80vh', width: '100%', border: '1px solid #ccc', marginTop: '15px' }}>
                <iframe
                    src={fullUrl}
                    title={title}
                    style={{ width: '100%', height: '100%', border: 'none' }}
                // El 'frameBorder="0"' es una propiedad antigua, 'style={{ border: 'none' }}' es más moderno.
                />
            </div>
        </div>
    );
};

export default Proyecto2;