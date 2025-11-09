import React, { useState, useEffect } from "react";
import "../../../css/DiagnosticoCSS/Juego04Css/Juego04.css";

const partesIngles = ["eye", "mouth", "neck", "arm", "hair", "hand", "torso", "leg", "foot"];
const partesEspañol = ["ojo", "boca", "cuello", "brazo", "cabello", "mano", "torso", "pierna", "pie"];

function ErrorMessage({ onContinue }) {
  return (
    <div className="message message-error" translate="no">
      <h2>Not correct 🙃</h2>
      <p>Try again! You can do it!</p>
      <button onClick={onContinue}>Try again</button>
    </div>
  );
}

function SuccessMessage({ onContinue }) {
  return (
    <div className="message message-success" translate="no">
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
      translate="no"
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
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [femaleVoice, setFemaleVoice] = useState(null);

  // Cargar voces disponibles del navegador
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const englishFemale = voices.find(
        (v) => v.lang.startsWith("en") && v.name.toLowerCase().includes("female")
      ) || voices.find((v) => v.lang === "en-US");
      setFemaleVoice(englishFemale);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  // Función para hablar
  const speakWord = (word) => {
    if ("speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(word);
      utter.lang = "en-US";
      utter.rate = 1;
      if (femaleVoice) utter.voice = femaleVoice; // usar voz femenina
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }
  };

  // Cada vez que cambia la palabra, la pronuncia
  useEffect(() => {
    speakWord(currentWord);
  }, [currentWord, femaleVoice]);

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
      setScore((prev) => prev + 10);
      setStreak((prev) => prev + 1);
    } else {
      setShowError(true);
      setShowSuccess(false);
      setStreak(0);
    }
  };

  return (
    <div className="juego04-contenedor notranslate" translate="no">
      <h1 translate="no">Body Parts Game</h1>
      <p translate="no">Click on the correct body part.</p>

      <div className="hud" translate="no">
        <span>Score: {score}</span>
        <span>Streak: {streak}</span>
      </div>

      <p translate="no">
        Find:{" "}
        <span className="palabra-actual" translate="no">
          {currentWord.toUpperCase()}
        </span>
      </p>

      <button
        type="button"
        className="voice-button"
        onClick={() => speakWord(currentWord)}
        translate="no"
      >
        🔊 Hear again
      </button>

      <BodyImage onClickPart={handleClickPart} />

      {showError && <ErrorMessage onContinue={() => setShowError(false)} />}
      {showSuccess && <SuccessMessage onContinue={newRandomWord} />}
    </div>
  );
}

export default Juego04;
