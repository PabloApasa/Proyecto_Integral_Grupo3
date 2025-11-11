import { useState, useMemo } from 'react';

function BuscarJuego({ juegos }) {
  const [ingreso, setIngreso] = useState(0);
  const [busqueda, setBusqueda] = useState(false);

  const ingresar = (e) => {
    setBusqueda(false);
    setIngreso(parseInt(e.target.value));
  };

  const handleClick = () => {
    setBusqueda(true);
  };

  const resultado = useMemo(() => {
    return juegos.filter((producto) => producto.id === ingreso);
  }, [juegos, ingreso]);

  return (
    <div className="buscar-box">
      <h3>🔍 Buscar Juego</h3>

      <input 
        onChange={ingresar} 
        placeholder="Ingrese ID del juego"
        type="number"
      />
      <button onClick={handleClick}>Buscar</button>

      {busqueda && (
        resultado.length > 0 ? (
          <div className="resultado-box">
            <p><strong>ID:</strong> {resultado[0].id}</p>
            <p><strong>Nombre:</strong> {resultado[0].nombre}</p>
            <p><strong>Precio:</strong> ${resultado[0].precio}</p>
            <p><strong>Tipo:</strong> {resultado[0].tipo}</p>
            <p><strong>Estado:</strong> {String(resultado[0].estado)}</p>
          </div>
        ) : (
          <h4>🚫 El juego ingresado no fue encontrado.</h4>
        )
      )}
    </div>
  );
}

export default BuscarJuego;