import { useState } from 'react';

function ModificarJuego({ juego, funcion_modificar }) {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("");

  const productos_mod = {
    id: juego.id,
    nombre: nombre.trim() === "" ? juego.nombre : nombre,
    precio: precio === 0 ? juego.precio : precio,
    tipo: tipo.trim() === "" ? juego.tipo : tipo,
    estado: estado.trim() === "" ? juego.estado : estado,
    modificado: true
  };

  return (
    <div className="modificar-box">
      <p><strong>ID:</strong> {juego.id}</p>

      <input placeholder={juego.nombre} type="text" onChange={(e) => setNombre(e.target.value)} />
      <input placeholder={juego.precio} type="number" onChange={(e) => setPrecio(parseFloat(e.target.value))} />
      <input placeholder={juego.tipo} type="text" onChange={(e) => setTipo(e.target.value)} />
      <input placeholder={String(juego.estado)} type="text" onChange={(e) => setEstado(e.target.value)} />

      <button onClick={() => funcion_modificar(productos_mod)}>💾 Guardar</button>
    </div>
  );
}

export default ModificarJuego;