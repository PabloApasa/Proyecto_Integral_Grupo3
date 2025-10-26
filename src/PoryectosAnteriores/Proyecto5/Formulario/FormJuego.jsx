
import { useEffect, useCallback, useState } from "react";
import ModificarJuego from "../Formulario/ModificarJuego";
import BuscarJuego from "../Formulario/BuscarJuego";
import "../../../assets/css/P_5/FormJuego.css"; 

function FormJuego() {
  const [juegos, setJuegos] = useState([]);
  const [formulario, setFormulario] = useState({
    id: "",
    nombre: "",
    precio: "",
    tipo: "",
    estado: true,
    modificado: true,
  });

  useEffect(() => {
    console.log(juegos);
  }, [juegos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const agregarJuego = (e) => {
    e.preventDefault();
    const nuevoJuego = {
      ...formulario,
      id: Date.now(),
      nombre: formulario.nombre,
      precio: parseFloat(formulario.precio),
      tipo: formulario.tipo,
    };

    setJuegos([...juegos, nuevoJuego]);
    setFormulario({
      id: "",
      nombre: "",
      precio: "",
      tipo: "",
      estado: true,
      modificado: true,
    });
  };

  const agregar_modificado = (juego_modificado) => {
    const nuevo_arreglo = juegos.map((j) =>
      j.id === juego_modificado.id ? juego_modificado : j
    );
    setJuegos(nuevo_arreglo);
  };

  const modificar = useCallback((j) => {
    setJuegos((prevJuegos) =>
      prevJuegos.map((a) =>
        a.id === j.id ? { ...a, modificado: !a.modificado } : a
      )
    );
  }, []);

  return (
    <div className="form-juego-container">
      <div className="form-juego-box">
        <h2>📋 Administrar Juegos</h2>

        {/* Formulario */}
        <form onSubmit={agregarJuego} className="form-juego-form">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre del juego"
            value={formulario.nombre}
            onChange={handleChange}
            required
          />
          <input
            min="0"
            type="number"
            name="precio"
            placeholder="Precio unitario"
            value={formulario.precio}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="tipo"
            placeholder="Tipo o categoría"
            value={formulario.tipo}
            onChange={handleChange}
            required
          />

          <button type="submit">Agregar Juego</button>
        </form>

        {/* Lista de juegos */}
        {juegos.length > 0 && <h3 className="lista-titulo">🎮 Lista de juegos</h3>}

        <ul className="lista-juegos">
          {juegos.map((j) => (
            <li key={j.id} className="juego-item">
              {j.modificado === false ? (
                <ModificarJuego juego={j} funcion_modificar={agregar_modificado} />
              ) : (
                <div>
                  ID: {j.id} — <strong>{j.nombre}</strong> — 💲{j.precio} — {j.tipo}
                </div>
              )}
              <button onClick={() => modificar(j)} className="btn-modificar">
                ✏️ Modificar
              </button>
            </li>
          ))}
        </ul>

        {/* Buscador */}
        <BuscarJuego juegos={juegos}>Texto</BuscarJuego>
      </div>
    </div>
  );
}

export default FormJuego;