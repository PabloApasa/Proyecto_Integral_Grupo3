import React, { useState } from "react";
import "../../../css/DiagnosticoCSS/Juego04Css/Juego04.css";

const partesIngles = ["eye", "mouth", "neck", "arm", "hair", "hand", "torso", "leg", "foot"];
const partesEspañol = ["ojo", "boca", "cuello", "brazo", "cabello", "mano", "torso", "pierna", "pie"];

function BotonParteCuerpo({ nombre, arriba, izquierda, onClick }) {
  return (
    <button
      onClick={() => onClick(nombre)}
      className="boton-parte"
      style={{ top: arriba, left: izquierda }}
    />
  );
}

function ImagenCuerpo({ onClickBotonParteCuerpo }) {
  const posiciones = [
    { top: "20%", left: "50%" },  // eye
    { top: "30%", left: "50%" },  // mouth
    { top: "38%", left: "50%" },  // neck
    { top: "48%", left: "23%" },  // arm
    { top: "10%", left: "50%" },  // hair
    { top: "60%", left: "8%" },   // hand
    { top: "53%", left: "50%" },  // torso
    { top: "75%", left: "35%" },  // leg
    { top: "92%", left: "35%" },  // foot
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
  const [mensaje, setMensaje] = useState("");
  const [score, setScore] = useState(0);

  const nuevaPalabraAleatoria = () => {
    const indiceAleatorio = Math.floor(Math.random() * partesIngles.length);
    setPalabraActual(partesIngles[indiceAleatorio]);
    setIndicePalabra(indiceAleatorio);
    setMensaje("");
  };

  const manejarClickParte = (nombreParte) => {
    if (nombreParte === palabraActual) {
      setMensaje("✅ ¡Correcto!");
      setScore((s) => s + 1);
      setTimeout(nuevaPalabraAleatoria, 1000);
    } else {
      setMensaje(`❌ Incorrecto — "${palabraActual}" significa "${partesEspañol[indicePalabra]}"`);
    }
  };

  return (
    <div className="juego04-contenedor">
      <h1>Juego de Anatomía en Inglés</h1>
      <p>Identifica las partes del cuerpo en inglés haciendo clic en ellas.</p>

      <p>
        Busca:{" "}
        <span className="palabra-actual">
          {palabraActual.toUpperCase()}
        </span>
      </p>

      <ImagenCuerpo onClickBotonParteCuerpo={manejarClickParte} />

      <p className={`mensaje-feedback ${mensaje.includes("❌") ? "incorrecto" : "correcto"}`}>
        {mensaje}
      </p>

      <p className="puntaje">Puntaje: {score}</p>
    </div>
  );
}

export default Juego04;