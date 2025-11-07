import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/DiagnosticoCSS/Juego01Css/BotonColor.css";

function BotonColor() {
  const navigate = useNavigate();

  // 🎨 Colores accesibles (pasteles)
  const colors = [
    { name: "red", label: "Red", hex: "#e57373" },
    { name: "blue", label: "Blue", hex: "#64b5f6" },
    { name: "green", label: "Green", hex: "#81c784" },
    { name: "yellow", label: "Yellow", hex: "#fff176" },
    { name: "purple", label: "Purple", hex: "#ba68c8" },
  ];

  // 🔄 Generar 10 rondas: 5 normales + 5 inversas (mezcladas)
  const generateRounds = () => {
    const base = Array(5).fill("normal").concat(Array(5).fill("inverse"));
    return base.sort(() => Math.random() - 0.5);
  };

  const [modeList, setModeList] = useState(generateRounds());
  const [currentMode, setCurrentMode] = useState("");
  const [targetColor, setTargetColor] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [finished, setFinished] = useState(false);
  const totalRounds = 10;

  // 🔹 Generar una nueva ronda
  const nextRound = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)].name;
    setTargetColor(newColor);
    setCurrentMode(modeList[round - 1]);
    setFeedback("");
  };

  useEffect(() => {
    nextRound();
  }, []);

  // 🔹 Cuando el jugador elige una opción
  const handleChoice = (choice) => {
    let correct = false;

    if (currentMode === "normal") {
      correct = choice === targetColor;
    } else {
      const targetLabel =
        colors.find((c) => c.name === targetColor)?.label || "";
      correct = choice === targetLabel;
    }

    if (correct) {
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
        setFinished(true);
      }, 1000);
    }
  };

  const targetLabel =
    colors.find((c) => c.name === targetColor)?.label || "";
  const targetHex =
    colors.find((c) => c.name === targetColor)?.hex || "#ccc";

  // 🏁 Pantalla final
  if (finished) {
    return (
      <div className="color-game-container">
        <h1 className="color-game-title">🎉 ¡Buen trabajo!</h1>
        <p className="color-final-score">
          Obtuviste <strong>{score}</strong> de <strong>{totalRounds}</strong> puntos.
        </p>
        <button
          className="continue-button"
          onClick={() => navigate("/diagnostico/juego02")}
        >
          Continuar ➡️
        </button>
      </div>
    );
  }

  // 🎮 Pantalla del juego
  return (
    <div className="color-game-container">
      <h1 className="color-game-title">Juego — Colores 🎨</h1>
      <p className="color-game-instructions">
        {currentMode === "normal"
          ? "Pulsa el color correcto según la palabra en inglés."
          : "Pulsa la palabra que coincide con el color mostrado."}
      </p>

      {currentMode === "normal" ? (
        <>
          {/* Variante 1 — Palabra → Color */}
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
        </>
      ) : (
        <>
          {/* Variante 2 — Color → Palabra */}
          <div
            className="color-display-box"
            style={{ backgroundColor: targetHex }}
          ></div>
          <div className="color-words">
            {colors.map((c) => (
              <button
                key={c.label}
                className="color-word-button"
                onClick={() => handleChoice(c.label)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </>
      )}

      <p className="color-feedback">{feedback}</p>
      <p className="color-progress">
        Ronda {round}/{totalRounds} — Puntos: {score}
      </p>
    </div>
  );
}

export default BotonColor;