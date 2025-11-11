import { useState, useEffect } from "react";
import "../../../css/DiagnosticoCSS/Juego01Css/BotonColor.css";

function BotonColor({ onFinish, roundsLimit = 10 }) {
  const colors = [
    { name: "red", label: "Red", hex: "#e57373" },
    { name: "blue", label: "Blue", hex: "#64b5f6" },
    { name: "green", label: "Green", hex: "#81c784" },
    { name: "yellow", label: "Yellow", hex: "#fff176" },
    { name: "purple", label: "Purple", hex: "#ba68c8" },
  ];

  const generateRounds = () => {
    const base = Array(5).fill("normal").concat(Array(5).fill("inverse"));
    return base.sort(() => Math.random() - 0.5);
  };

  const [modeList] = useState(generateRounds());
  const [currentMode, setCurrentMode] = useState("");
  const [targetColor, setTargetColor] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [finished, setFinished] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [selected, setSelected] = useState(null);
  const totalRounds = roundsLimit;

  const nextRound = () => {
    const newColor = colors[Math.floor(Math.random() * colors.length)].name;
    setTargetColor(newColor);
    setCurrentMode(modeList[round - 1]);
    setFeedback("");
    setSelected(null);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 500);
  };

  useEffect(() => {
    nextRound();
  }, []);

  const handleChoice = (choice) => {
    setSelected(choice);
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
        if (onFinish) onFinish(score);
      }, 1000);
    }
  };

  const targetLabel =
    colors.find((c) => c.name === targetColor)?.label || "";
  const targetHex =
    colors.find((c) => c.name === targetColor)?.hex || "#ccc";

  if (finished) {
    return (
      <div className="color-game-container fade-in">
        <h1 className="color-game-title">🎉 ¡Juego completado!</h1>
        <p className="color-final-score">
          Puntaje final: <strong>{score}</strong> / <strong>{totalRounds}</strong>
        </p>
      </div>
    );
  }

  return (
    <div className={`color-game-container fade-in ${animate ? "fade-in" : ""}`}>
      <h1 className="color-game-title">Juego — Colores 🎨</h1>
      <p className="color-game-instructions">
        {currentMode === "normal"
          ? "Pulsa el color correcto según la palabra en inglés."
          : "Pulsa la palabra que coincide con el color mostrado."}
      </p>

      {currentMode === "normal" ? (
        <>
          <div className="color-buttons">
            {colors.map((c) => {
              const isSelected = selected === c.name;
              const isCorrect = selected && selected === targetColor;
              const isWrong = selected && selected !== targetColor && isSelected;

              return (
                <button
                  key={c.name}
                  className={`color-button ${isCorrect && isSelected
                      ? "correct"
                      : isWrong
                        ? "wrong"
                        : ""
                    }`}
                  style={{ backgroundColor: c.hex }}
                  onClick={() => handleChoice(c.name)}
                  disabled={!!selected}
                />
              );
            })}
          </div>
          <div className="color-word">{targetLabel}</div>
        </>
      ) : (
        <>
          <div
            className="color-display-box"
            style={{ backgroundColor: targetHex }}
          ></div>
          <div className="color-words">
            {colors.map((c) => {
              const isSelected = selected === c.label;
              const targetLabelWord =
                colors.find((clr) => clr.name === targetColor)?.label;
              const isCorrect = selected && selected === targetLabelWord;
              const isWrong =
                selected && selected !== targetLabelWord && isSelected;

              return (
                <button
                  key={c.label}
                  className={`color-word-button ${isCorrect && isSelected
                      ? "correct"
                      : isWrong
                        ? "wrong"
                        : ""
                    }`}
                  onClick={() => handleChoice(c.label)}
                  disabled={!!selected}
                >
                  {c.label}
                </button>
              );
            })}
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