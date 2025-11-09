import React, { useState } from "react";
import "../../../css/DiagnosticoCSS/Juego04Css/Juego04.css";

const partesIngles = [ "eye", "mouth", "neck", "arm", "hair", "hand", "torso", "leg", "foot"];

const partesEspañol = [ "ojo", "boca", "cuello", "brazo", "cabello", "mano", "torso", "pierna", "pie"];

function MensajeError({ palabraIngles, traduccionEspanol, continuar }) {
  return (
    <div className="mensaje-error">
      <h2>No es correcto, vuelve a intentarlo!</h2>
      <p>
        <strong>{palabraIngles}</strong> significa: <strong>{traduccionEspanol}</strong>
      </p>
      <button onClick={continuar}>Continuar</button>
    </div>
  );
}

function BotonParteCuerpo({ nombre, arriba, izquierda, onClick }) {
  return (
    <button
      onClick={() => onClick(nombre)}
      className="boton-parte"
      style={{ top: arriba, left: izquierda }}
    >
      {" "}
    </button>
  );
}

function ImagenCuerpo({ onClickBotonParteCuerpo }) {
  const posiciones = [
   
    { top: "20%", left: "50%" },  // eye (ojo)
    { top: "30%", left: "50%" },  // mouth (boca)
    { top: "38%", left: "50%" },  // neck (cuello)
    { top: "48%", left: "23%" },  // arm (brazo)
    { top: "10%", left: "50%" },   // hair (cabello)
    { top: "60%", left: "8%" },  // hand (mano)
    { top: "53%", left: "50%" },  // torso (torso)
    { top: "75%", left: "35%" },  // leg (pierna)
    { top: "92%", left: "35%" },  // foot (pie)
  ];

  return (
    <div className="contenedor-imagen">
      <img
        src="https://i.pinimg.com/736x/66/fe/22/66fe228a23b286497baeb12684c039bc.jpg"
        alt="Cuerpo humano"
        className="imagen-cuerpo"
      />
      {partesIngles.map((parte, i) => (
        <BotonParteCuerpo
          key={parte}
          nombre={parte}
          arriba={posiciones[i].top}
          izquierda={posiciones[i].left}
          onClick={onClickBotonParteCuerpo}
        />
      ))}
    </div>
  );
}

function Juego04() {
  const [palabraActual, setPalabraActual] = useState(partesIngles[0]);
  const [indicePalabra, setIndicePalabra] = useState(0);
  const [mostrarError, setMostrarError] = useState(false);

  const nuevaPalabraAleatoria = () => {
    const indiceAleatorio = Math.floor(Math.random() * partesIngles.length);
    setPalabraActual(partesIngles[indiceAleatorio]);
    setIndicePalabra(indiceAleatorio);
    setMostrarError(false);
  };

  const manejarClickParte = (nombreParte) => {
    if (nombreParte === palabraActual) {
      alert("¡Correcto! 🎉");
      nuevaPalabraAleatoria();
    } else {
      setMostrarError(true);
    }
  };

  return (
    <div className="juego04-contenedor">
      <h1> Juego de Anatomía en Inglés</h1>
      <p>Identifica las partes del cuerpo en inglés haciendo clic en ellas.</p>

      <p>
        Busca:{" "}
        <span className="palabra-actual">
          {palabraActual.toUpperCase()}
        </span>
      </p>

      <ImagenCuerpo onClickBotonParteCuerpo={manejarClickParte} />

      {mostrarError && (
        <MensajeError
          palabraIngles={palabraActual}
          traduccionEspanol={partesEspañol[indicePalabra]}
          continuar={nuevaPalabraAleatoria}
        />
      )}
    </div>
  );
}

export default Juego04;