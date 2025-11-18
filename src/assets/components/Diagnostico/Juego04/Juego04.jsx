import React, { useState, useEffect } from "react";
import "../../../css/DiagnosticoCSS/Juego04Css/Juego04.css";

const partesIngles = ["eye", "mouth", "neck", "arm", "hair", "hand", "torso", "leg", "foot"];

const partesEspañol = ["ojo", "boca", "cuello", "brazo", "cabello", "mano", "torso", "pierna", "pie"];

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

function BodyPartButton({ name, top, left, onClick }) {
  return (
    <button
      onClick={() => onClick(name)}
      className="boton-parte"
      style={{ top: top, left: left }}
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
    <div className="contenedor-imagen notranslate" translate="no">
      <img
        src="https://i.pinimg.com/736x/66/fe/22/66fe228a23b286497baeb12684c039bc.jpg"
        alt="Human body"
        className="imagen-cuerpo"
      />
      {partesIngles.map((part, i) => (
        <BodyPartButton
          key={part}
          name={part}
          top={posiciones[i].top}
          left={posiciones[i].left}
          onClick={onClickBotonParteCuerpo}
        />
      ))}
    </div>
  );
}

function Juego04({ onFinish, roundsLimit = null }) {
  const [palabraActual, setPalabraActual] = useState(partesIngles[0]);
  const [indicePalabra, setIndicePalabra] = useState(0);
  const [mostrarError, setMostrarError] = useState(false);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const nuevaPalabraAleatoria = () => {
    const indiceAleatorio = Math.floor(Math.random() * partesIngles.length);
    setPalabraActual(partesIngles[indiceAleatorio]);
    setIndicePalabra(indiceAleatorio);
    setMostrarError(false);
  };

  const finishGame = (finalScore) => {
    setFinished(true);
    // notificar al diagnóstico (el padre) con el puntaje de este juego
    if (typeof onFinish === "function") {
      // Pequeña demora para que el usuario vea el último estado
      setTimeout(() => onFinish(finalScore), 400);
    }
  };

  const manejarClickParte = (nombreParte) => {
    if (finished) return;

    const isCorrect = nombreParte === palabraActual;
    const newScore = isCorrect ? gameScore + 1 : gameScore;

    if (isCorrect) {
      // mostrar breve mensaje y avanzar
      alert("¡Correcto! 🎉");
    } else {
      setMostrarError(true);
    }

    const nextRounds = roundsPlayed + 1;
    setGameScore(newScore);
    setRoundsPlayed(nextRounds);
    if (roundsLimit != null && nextRounds >= roundsLimit) {
      finishGame(newScore);
    } else if (isCorrect) {
      nuevaPalabraAleatoria();
    }
    // si fue incorrecto, el usuario verá el mensaje y deberá pulsar continuar
  };

  return (
    <div className="juego04-contenedor">
      <h1> Juego de Anatomía en Inglés</h1>
      <p>Identifica las partes del cuerpo en inglés haciendo clic en ellas.</p>

      <p translate="no">
        Find:{" "}
        <span className="palabra-actual" translate="no">
          {palabraActual.toUpperCase()}
        </span>
      </p>

      <ImagenCuerpo onClickBotonParteCuerpo={manejarClickParte} />

      {mostrarError && (
        <MensajeError
          palabraIngles={palabraActual}
          traduccionEspanol={partesEspañol[indicePalabra]}
          continuar={() => {
            // continuar tras error: cerrar mensaje, avanzar ronda y decidir si termina
            setMostrarError(false);
            const nextRounds = roundsPlayed; // roundsPlayed ya fue incrementado en manejarClickParte
            if (roundsLimit != null && nextRounds >= roundsLimit) {
              finishGame(gameScore);
            } else {
              nuevaPalabraAleatoria();
            }
          }}
        />
      )}

      {finished && (
        <div className="resultado-juego04">
          <h3>Rondas completadas</h3>
          <p>Tu puntaje en este juego: <strong>{gameScore}</strong> / {roundsLimit ?? roundsPlayed}</p>
        </div>
      )}
    </div>
  );

}

export default Juego04;
