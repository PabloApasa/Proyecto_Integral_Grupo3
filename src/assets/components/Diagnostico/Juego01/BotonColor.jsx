import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/DiagnosticoCSS/Juego01Css/BotonColor.css";

function BotonColor() {
  const navigate = useNavigate();

  // 🎨 Colores suaves para buena accesibilidad
  const colors = [
    { name: "red", label: "Red", hex: "#e57373" },
    { name: "blue", label: "Blue", hex: "#64b5f6" },
    { name: "green", label: "Green", hex: "#81c784" },
    { name: "yellow", label: "Yellow", hex: "#fff176" },
    { name: "purple", label: "Purple", hex: "#ba68c8" },
  ];

  const [targetColor, setTargetColor] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const totalRounds = 5;

  // 🔹 Generar color objetivo al inicio y en cada ronda
  const nextRound = () => {
    const randomColor =
      colors[Math.floor(Math.random() * colors.length)].name;
    setTargetColor(randomColor);
    setFeedback("");
  };

  useEffect(() => {
    nextRound();
  }, []);

  // 🔹 Cuando el jugador elige un color
  const handleChoice = (colorName) => {
    if (colorName === targetColor) {
      setFeedback("✅ ¡Correcto!");
      setScore((s) => s + 1);
    } else {
      setFeedback("❌ Incorrecto");
    }

    if (round < totalRounds) {
      setTimeout(() => {
        setRound((r) => r + 1);
        nextRound();
      }, 1000);
    } else {
      setTimeout(() => {
        navigate("/diagnostico/juego02"); // pasa al siguiente juego
      }, 1500);
    }
  };

  const targetLabel =
    colors.find((c) => c.name === targetColor)?.label || "";

  return (
    <div className="color-game-container">
      <h1 className="color-game-title">Juego — Colores 🎨</h1>
      <p className="color-game-instructions">
        Pulsa el botón del color que corresponde a la palabra en inglés.
      </p>

      <div className="color-buttons">
        {colors.map((c) => (
          <button
            key={c.name}
            className="color-button"
            style={{ backgroundColor: c.hex }}
            onClick={() => handleChoice(c.name)}
          />
        ))}
      </div>

      <div className="color-word">{targetLabel}</div>

      <p className="color-feedback">{feedback}</p>
      <p className="color-progress">
        Ronda {round}/{totalRounds} — Puntos: {score}
      </p>
    </div>
  );
}

export default BotonColor;