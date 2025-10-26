
import { useState, useEffect } from 'react';

const TIEMPO_LIMITE = 9;
const COLORES_BASE = ['#FF0000', '#0000FF', '#00FF00',
    '#FFFF00', '#00FFFF', '#FF00FF', '#800000',
    '#008000', '#000080', '#808000', '#800080',
    '#008080', '#808080', '#C0C0C0', '#FFFFFF', '#000000'];

export function useJuegoDeClicks() {
    const [colorBotones, setColorBotones] = useState(COLORES_BASE.slice(0, 4));
    const [resultado, setResultado] = useState('Presiona Iniciar para comenzar el desafío.');
    const [tiempoRestante, setTiempoRestante] = useState(TIEMPO_LIMITE);
    const [juegoActivo, setJuegoActivo] = useState(false);
    const [clicsExitosos, setClicsExitosos] = useState(0);

    const reiniciarTemporizador = () => setTiempoRestante(TIEMPO_LIMITE);

    useEffect(() => {
        if (!juegoActivo) return;

        const intervalId = setInterval(() => {
            setTiempoRestante(prevTiempo => prevTiempo - 1);
        }, 1000);

        return () => clearInterval(intervalId);

    }, [juegoActivo, clicsExitosos]);

    useEffect(() => {
        if (tiempoRestante === 0 && juegoActivo) {
            setJuegoActivo(false);
            setResultado(`¡Tiempo agotado! 😭 Perdiste. Lograste ${clicsExitosos} clics.`);
        }
    }, [tiempoRestante, juegoActivo, clicsExitosos]);


    const iniciarJuego = () => {
        setJuegoActivo(true);
        setClicsExitosos(0);
        setResultado('¡A jugar! Haz un click rápido para empezar el conteo.');
        reiniciarTemporizador();
    };

    const manejarClickEnElBoton = () => {
        if (!juegoActivo) {
            setResultado('Presiona "Reiniciar Juego" para volver a empezar.');
            return;
        }

        reiniciarTemporizador();
        setClicsExitosos(prev => prev + 1);


        const nuevosColores = colorBotones.map(() => {
            const inideAleatorio = Math.floor(Math.random() * COLORES_BASE.length);
            return COLORES_BASE[inideAleatorio];
        });


        const conteo = nuevosColores.reduce((acc, color) => {
            acc[color] = (acc[color] || 0) + 1;
            return acc;
        }, {});

        const haGanado = Object.values(conteo).some(count => count >= 3);

        if (haGanado) {
            setJuegoActivo(false);
            setResultado(`¡GANASTE! 🎉 Lograste ${clicsExitosos + 1} clics. Presiona Reiniciar.`);
        } else {
            setResultado('Sigue intentando... 😅 ¡Rápido, vuelve a hacer click!');
        }

        setColorBotones(nuevosColores);
    };

    return {
        colorBotones,
        resultado,
        tiempoRestante,
        juegoActivo,
        clicsExitosos,
        TIEMPO_LIMITE,
        iniciarJuego,
        manejarClickEnElBoton,
    };
}