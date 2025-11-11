import React from "react";

export default function Controles({ rendirse, reiniciarJuego, juegoTerminado }) {
  return (
    <div>
      <button onClick={rendirse} disabled={juegoTerminado}>Me rindo</button>
      <button onClick={reiniciarJuego}>Reiniciar</button>
    </div>
  );
}