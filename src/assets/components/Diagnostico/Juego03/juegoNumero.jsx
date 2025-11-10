import { useState, useEffect } from "react";
import "../../../css/DiagnosticoCSS/Juego03Css/JuegoNumero.css";

function JuegoNumero({ onFinish, roundsLimit = 10 }) {
  // 🔢 Números y sus palabras
  const numbers = [
    { value: "1", word: "One" },
    { value: "2", word: "Two" },
    { value: "3", word: "Three" },
    { value: "4", word: "Four" },
    { value: "5", word: "Five" },
    { value: "6", word: "Six" },
    { value: "7", word: "Seven" },
    { value: "8", word: "Eight" },
    { value: "9", word: "Nine" },
    { value: "10", word: "Ten" },
  ];

  // 📅 Días de la semana
  const days = [
    { value: "Lunes", word: "Monday" },
    { value: "Martes", word: "Tuesday" },
    { value: "Miércoles", word: "Wednesday" },
    { value: "Jueves", word: "Thursday" },
    { value: "Viernes", word: "Friday" },
    { value: "Sábado", word: "Saturday" },
    { value: "Domingo", word: "Sunday" },
  ];

  const [currentItem, setCurrentItem] = useState(null);
  const [options, setOptions] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [finished, setFinished] = useState(false);
  const totalRounds = roundsLimit;

  useEffect(() => {
    generateRound();
  }, []);

  const generateRound = () => {
    // 👇 Decide si esta ronda será de número o de día
    const isNumberRound = Math.random() < 0.5;
    const dataset = isNumberRound ? numbers : days;
    const randomIndex = Math.floor(Math.random() * dataset.length);
    const correct = dataset[randomIndex];

    // 🌀 Obtiene opciones incorrectas
    const incorrect = dataset
      .filter((item) => item.word !== correct.word)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    // 🔀 Mezcla las opciones
    const newOptions = [...incorrect, correct].sort(() => Math.random() - 0.5);

    setCurrentItem({ ...correct, isNumberRound });
    setOptions(newOptions);
    setFeedback("");
  };

  const handleChoice = (choice) => {
    if (choice === currentItem.word) {
      setFeedback("✅ ¡Correcto!");
      setScore((s) => s + 1);
    } else {
      setFeedback("❌ Incorrecto");
    }

    if (round < totalRounds) {
      setTimeout(() => {
        setRound((r) => r + 1);
        generateRound();
      }, 1200);
    } else {
      setTimeout(() => {
        setFinished(true);
        if (onFinish) onFinish(score + (choice === animals[current].name ? 1 : 0));
      }, 1200);
    }
  };

  if (finished) {
    return (
      <div className="number-game-container">
        <h1 className="number-game-title">🎉 ¡Juego completado!</h1>
        <p className="number-final-score">
          Puntaje final: <strong>{score}</strong> / <strong>{totalRounds}</strong>
        </p>
      </div>
    );
  }

  return (
    <div className="number-game-container">
      <h1 className="number-game-title">Juego — Números o Días 🎯</h1>
      <p className="number-game-instructions">
        Observa lo que aparece y elige su nombre correcto en inglés.
      </p>

      {currentItem && (
        <>
          <div className="number-display">
            {currentItem.isNumberRound
              ? currentItem.value
              : currentItem.value.toUpperCase()}
          </div>

          <div className="number-options">
            {options.map((opt) => (
              <button
                key={opt.word}
                className="number-option-button"
                onClick={() => handleChoice(opt.word)}
              >
                {opt.word}
              </button>
            ))}
          </div>

          <p className="number-feedback">{feedback}</p>
          <p className="number-progress">
            Ronda {round}/{totalRounds} — Puntos: {score}
          </p>
        </>
      )}
    </div>
  );
}

export default JuegoNumero;