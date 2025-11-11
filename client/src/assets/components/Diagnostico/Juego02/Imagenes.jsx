import { useState, useEffect } from "react";
import "../../../css/DiagnosticoCSS/Juego02Css/Imagenes.css";

function Imagenes({ onFinish, roundsLimit = 2 }) {
  const animals = [
    
    { name: "Dog", img: "/Img-Juego02/perro.gif", options: ["Dog", "Dgo", "Doc", "Doggy", "Bog"] },
    { name: "Cat", img: "/Img-Juego02/gato.gif", options: ["Kat", "Cat", "Cut", "Cart", "Caat"] },
    { name: "Monkey", img: "/Img-Juego02/mono.gif", options: ["Monkei", "Monkey", "Mokey", "Monky", "Moneky"] },
    { name: "Chicken", img: "/Img-Juego02/gallina.gif", options: ["Chiken", "Chicken", "Chickon", "Cheken", "Chickn"] },
    { name: "Bird", img: "/Img-Juego02/pajaro.gif", options: ["Bird", "Bierd", "Burd", "Birb", "Brid"] },
  ];

  // Tomamos un orden aleatorio y limitamos la cantidad según roundsLimit
  const [order] = useState(() =>
    animals.map((_, i) => i).sort(() => Math.random() - 0.5).slice(0, roundsLimit)
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    shuffleOptions();
  }, [currentIndex]);

  const shuffleOptions = () => {
    const shuffled = [...animals[order[currentIndex]].options].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
    setFeedback("");
  };

  const handleChoice = (choice) => {
    const correct = animals[order[currentIndex]].name;

    if (choice === correct) {
      setFeedback("✅ ¡Correcto!");
      setScore((s) => s + 1);
    } else {
      setFeedback("❌ Incorrecto");
    }

    setTimeout(() => {
      if (currentIndex < order.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setFinished(true);
        if (onFinish) onFinish(score + (choice === correct ? 1 : 0)); // ✅ Enviar puntaje final
      }
    }, 1000);
  };

  if (finished) {
    return (
      <div className="image-game-container">
        <h1 className="image-game-title">🎉 ¡Juego completado!</h1>
        <p className="image-final-score">
          Puntaje final: <strong>{score}</strong> / <strong>{order.length}</strong>
        </p>
      </div>
    );
  }

  const animal = animals[order[currentIndex]];

  return (
    <div className="image-game-container">
      <h1 className="image-game-title">Juego — Animales 🐾</h1>
      <p className="image-game-instructions">
        Observa la imagen y elige el nombre correcto en inglés.
      </p>

      <div className="image-box">
        <img src={animal.img} alt={animal.name} className="animal-gif" />
      </div>

      <div className="options-container">
        {shuffledOptions.map((option) => (
          <button key={option} className="animal-option-button" onClick={() => handleChoice(option)}>
            {option}
          </button>
        ))}
      </div>

      <p className="image-feedback">{feedback}</p>
      <p className="image-progress">
        Ronda {currentIndex + 1}/{order.length} — Puntos: {score}
      </p>
    </div>
  );
}

export default Imagenes;