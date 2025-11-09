import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../css/DiagnosticoCSS/Juego02Css/Imagenes.css";

function Imagenes() {
  const navigate = useNavigate();

  const animals = [
    {
      name: "Dog",
      img: "/Img-Juego02/perro.gif",
      options: ["Dog", "Dgo", "Doc", "Doggy", "Bog"],
    },
    {
      name: "Cat",
      img: "/Img-Juego02/gato.gif",
      options: ["Kat", "Cat", "Cut", "Cart", "Caat"],
    },
    {
      name: "Monkey",
      img: "/Img-Juego02/mono.gif",
      options: ["Monkei", "Monkey", "Mokey", "Monky", "Moneky"],
    },
    {
      name: "Chicken",
      img: "/Img-Juego02/gallina.gif",
      options: ["Chiken", "Chicken", "Chickon", "Cheken", "Chickn"],
    },
    {
      name: "Bird",
      img: "/Img-Juego02/pajaro.gif",
      options: ["Bird", "Bierd", "Burd", "Birb", "Brid"],
    },
  ];

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    shuffleOptions();
  }, [current]);

  const shuffleOptions = () => {
    const shuffled = [...animals[current].options].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
    setFeedback("");
  };

  const handleChoice = (choice) => {
    if (choice === animals[current].name) {
      setFeedback("✅ ¡Correcto!");
      setScore((s) => s + 1);
    } else {
      setFeedback("❌ Incorrecto");
    }

    setTimeout(() => {
      if (current < animals.length - 1) {
        setCurrent((c) => c + 1);
      } else {
        navigate("/diagnostico/juego03");
      }
    }, 1200);
  };

  const animal = animals[current];

  return (
    <div className="image-game-container">
      <h1 className="image-game-title">Juego — Animales 🐾</h1>
      <p className="image-game-instructions">
        Observa la imagen y elige el nombre correcto en inglés.
      </p>

      <div className="image-box">
        <img
          src={animal.img}
          alt={animal.name}
          className="animal-gif"
        />
      </div>

      <div className="options-container">
        {shuffledOptions.map((option) => (
          <button
            key={option}
            className="animal-option-button"
            onClick={() => handleChoice(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <p className="image-feedback">{feedback}</p>
      <p className="image-progress">
        Ronda {current + 1}/{animals.length} — Puntos: {score}
      </p>
    </div>
  );
}

export default Imagenes;