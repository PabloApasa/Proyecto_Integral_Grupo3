import React from "react";

export default function IngresarNumero({ numeroIngresado, setNumeroIngresado, validarNumero, juegoTerminado }) {
  return (
    <div>
      <input
        type="number"
        value={numeroIngresado}
        onChange={(e) => setNumeroIngresado(e.target.value)}
        disabled={juegoTerminado}
      />
      <button onClick={validarNumero} disabled={juegoTerminado}>
        Verificar
      </button>
    </div>
  );
}