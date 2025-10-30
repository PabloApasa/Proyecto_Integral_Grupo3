/***import { useState, useEffect } from "react";

const map = {
    1: "uno",
    2: "dos",
    3: "tres",  
    4: "cuatro",
    5: "cinco",
    6: "seis",
    7: "siete",
    8: "ocho",
    9: "nueve",
    10: "diez",
};

export default function JuegoNumero() {
    const Total=10;
    const [asked , setAsked] = useState(0);
    const [score , setScore] = useState(0);
    const [number , setNumber] = useState(null);
    const [opcion , setOpcion] = useState([]);
    const [feedback , setFeedback] = useState("");

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  function makeOptions(correctNumber) {
    const correctWord = map[correctNumber];
    const opts = new Set([correctWord]);
    while (opts.size < 3) {
      opts.add(map[randInt(1, 10)]);
    }
    return shuffle([... opts]);
  }

  const nextQuestion = () => {
    if (asked >= qTotal) return;
    const newNumber = randInt(1, 10);
    setNumber(newNumber);
    setOptions(makeOptions(newNumber));
    setFeedback("");
    setAsked((a) => a + 1);
  };

  const handleChoice = (word) => {
    if (word === map[number]) {
      setFeedback("¡Es correcto!");
      setScore((s) => s + 1);
    } else {
      setFeedback(`Es incorrecto, era "${map[number]}"`);
    }
  };

  useEffect(() => {
    nextQuestion();
  }, []);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md text-center">
      <h1 className="text-xl font-bold mb-2">Juego — Números en inglés</h1>
      <p className="text-gray-600 mb-4">
        Pulsa la palabra en inglés que corresponde al número mostrado.
      </p>

      {number && <div className="text-6xl font-bold my-4">{number}</div>}

      <div className="flex justify-center gap-3 flex-wrap mb-3">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleChoice(opt)}
            className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-blue-100"
          >
            {opt}
          </button>
        ))}
      </div>

      /*de aqui asia abajo saque de chatgpt por que era algo ams que agregar y le daba un poco mas de estilo*/
/***
      <p className="font-semibold mb-2">{feedback}</p>

      <p className="text-sm text-gray-500">
        Pregunta {asked}/{qTotal} — Puntos: {score}
      </p>

      {asked < qTotal ? (
        <button
          onClick={nextQuestion}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Siguiente
        </button>
      ) : (
        <p className="text-green-600 font-semibold mt-3">
          🎉 ¡Fin del juego! Puntuación: {score}/{qTotal}
        </p>
      )}
    </div>
  );
}
  */