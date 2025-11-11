import React, { useState, useEffect } from "react";
import "../../../css/DiagnosticoCSS/Juego04Css/Juego04.css";

const partesIngles = ["eye", "mouth", "neck", "arm", "hair", "hand", "torso", "leg", "foot"];
const partesEspañol = ["ojo", "boca", "cuello", "brazo", "cabello", "mano", "torso", "pierna", "pie"];

function ErrorMessage({ onContinue }) {
  return (
    <div className="message message-error">
      <h2>Not correct 🙃</h2>
      <p>Try again! You can do it!</p>
      <button onClick={onContinue}>Try again</button>
    </div>
  );
}

function SuccessMessage({ onContinue }) {
  return (
    <div className="message message-success">
      <h2>VERY GOOD! 🎉</h2>
      <p>Great job!</p>
      <button onClick={onContinue}>Next</button>
    </div>
  );
}

function BodyPartButton({ name, top, left, onClick }) {
  return (
    <button
      onClick={() => onClick(name)}
      className="boton-parte"
      style={{ top, left }}
      aria-label={name}
    />
  );
}

function BodyImage({ onClickPart }) {
  const positions = [
    { top: "20%", left: "50%" }, // eye
    { top: "30%", left: "50%" }, // mouth
    { top: "38%", left: "50%" }, // neck
    { top: "48%", left: "23%" }, // arm
    { top: "10%", left: "50%" }, // hair
    { top: "60%", left: "8%" },  // hand
    { top: "53%", left: "50%" }, // torso
    { top: "75%", left: "35%" }, // leg
    { top: "92%", left: "35%" }, // foot
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
          top={positions[i].top}
          left={positions[i].left}
          onClick={onClickPart}
        />
      ))}
    </div>
  );
}

function Juego04() {
  const [currentWord, setCurrentWord] = useState(partesIngles[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const newRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * partesIngles.length);
    setCurrentWord(partesIngles[randomIndex]);
    setCurrentIndex(randomIndex);
    setShowError(false);
    setShowSuccess(false);
  };

  const handleClickPart = (partName) => {
    if (partName === currentWord) {
      setShowSuccess(true);
      setShowError(false);
    } else {
      setShowError(true);
      setShowSuccess(false);
    }
  };

  return (
    <div className="juego04-contenedor">
      <h1>Body Parts Game</h1>
      <p>Click on the correct body part.</p>

      <p>
        Find:{" "}
        <span className="palabra-actual">
          {currentWord.toUpperCase()}
        </span>
      </p>

      <BodyImage onClickPart={handleClickPart} />

      {showError && (
        <ErrorMessage onContinue={() => setShowError(false)} />
      )}

      {showSuccess && (
        <SuccessMessage onContinue={newRandomWord} />
      )}

      {/* opcional: para el profe o para el niño como ayuda */}
      {/* <p className="traduccion-hint">(= {partesEspañol[currentIndex]})</p> */}
    </div>
  );
  
}

export default Juego04;
