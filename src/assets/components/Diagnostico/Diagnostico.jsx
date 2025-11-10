// intalar npm install framer-motion para que se vea la transicion

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BotonColor from "./Juego01/BotonColor";
import Imagenes from "./Juego02/Imagenes";
import JuegoNumero from "./Juego03/JuegoNumero";
import Juego04 from "./Juego04/Juego04";

function Diagnostico() {
  const location = useLocation();
  const navigate = useNavigate();

  // 🧾 Datos que vienen del formulario o registro
  const { nombreUsuario = "Usuario", nombreCompleto = "Nombre y Apellido" } =
    location.state || {};

  const [currentGame, setCurrentGame] = useState(1);
  const [totalScore, setTotalScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const fondos = ["#ffe6f2", "#e6f7ff", "#e8ffe6", "#fffbe6"];

  const handleFinishGame = (score) => {
    setTotalScore((prev) => prev + score);

    if (currentGame < 4) {
      setShowTransition(true);
      setCountdown(3);

      let counter = 3;
      const interval = setInterval(() => {
        counter--;
        setCountdown(counter);
        if (counter === 0) {
          clearInterval(interval);
          setShowTransition(false);
          setCurrentGame((g) => g + 1);
        }
      }, 1000);
    } else {
      setFinished(true);
    }
  };

  const getResultado = (puntaje) => {
    if (puntaje < 4) return "Malo 😢";
    if (puntaje < 7) return "Bueno 🙂";
    return "Excelente 🌟";
  };

  // 🏁 Pantalla final del diagnóstico
  if (finished) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-screen bg-pink-100 text-center font-[Poppins]"
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold text-pink-600 mb-6"
        >
          ✅ ¡Diagnóstico completado!
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white shadow-lg rounded-3xl px-10 py-8 mb-8"
        >
          <p className="text-2xl mb-3 text-gray-700">
            <strong>👤 Nombre de usuario:</strong> {nombreUsuario}
          </p>
          <p className="text-2xl mb-3 text-gray-700">
            <strong>🪪 Nombre y apellido:</strong> {nombreCompleto}
          </p>
          <h2 className="text-3xl mt-6 text-gray-800 font-semibold">
            Puntaje total: {totalScore} / 8
          </h2>
          <h3 className="text-3xl mt-2 font-bold text-pink-600">
            {getResultado(totalScore)}
          </h3>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="bg-pink-500 text-white px-6 py-3 rounded-full text-2xl font-semibold shadow-md hover:bg-pink-600 transition"
        >
          🔙 Volver al inicio
        </motion.button>
      </motion.div>
    );
  }

  // 🌀 Pantalla de transición animada entre juegos
  if (showTransition) {
    return (
      <motion.div
        className="flex flex-col items-center justify-center h-screen text-center font-[Poppins]"
        style={{
          backgroundColor: fondos[currentGame - 1],
          transition: "background-color 0.5s ease",
        }}
      >
        <h1 className="text-3xl font-bold mb-6">🎮 Siguiente desafío en...</h1>
        <AnimatePresence mode="wait">
          <motion.h2
            key={countdown}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1.3 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.6 }}
            className="text-8xl font-extrabold text-gray-800"
          >
            {countdown}
          </motion.h2>
        </AnimatePresence>
      </motion.div>
    );
  }

  // 🎯 Pantalla de juegos
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen"
      style={{
        backgroundColor: fondos[currentGame - 1],
        transition: "background-color 0.5s ease",
      }}
    >
      {currentGame === 1 && <BotonColor onFinish={handleFinishGame} roundsLimit={2} />}
      {currentGame === 2 && <Imagenes onFinish={handleFinishGame} roundsLimit={2} />}
      {currentGame === 3 && <JuegoNumero onFinish={handleFinishGame} roundsLimit={2} />}
      {currentGame === 4 && <Juego04 onFinish={handleFinishGame} roundsLimit={2} />}
    </motion.div>
  );
}

export default Diagnostico;