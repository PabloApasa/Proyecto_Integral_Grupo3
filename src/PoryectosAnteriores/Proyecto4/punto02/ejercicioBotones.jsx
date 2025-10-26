
import { useJuegoDeClicks } from './useJuegoDeClicks';
import '../../../assets/css/P_4/styles/estilosBotones.css';

function EjercicioBotones() {
    const {
        colorBotones,
        resultado,
        tiempoRestante,
        juegoActivo,
        clicsExitosos,
        TIEMPO_LIMITE,
        iniciarJuego,
        manejarClickEnElBoton,
    } = useJuegoDeClicks();

    return (
        <>
            <div className="contenedor-juego">
                <h1 className="titulo"> Desafío de Velocidad de Clic </h1>
                <p> Tienes {TIEMPO_LIMITE} segundos para presionar un botón. Si lo logras, el tiempo se reinicia.</p>

                <h2>Clicks Exitosos: {clicsExitosos}</h2>

                {juegoActivo && (
                    <h2 style={{ color: tiempoRestante <= 1 ? 'red' : 'inherit' }}>
                        Tiempo Restante: {tiempoRestante}s
                    </h2>
                )}

                <p className="mensaje-resultado">{resultado}</p>

                {/* Botón de Inicio/Reinicio */}
                {!juegoActivo && (
                    <button onClick={iniciarJuego} className="boton-inicio">
                        {clicsExitosos > 0 ? 'Reiniciar Juego' : 'Iniciar Juego'}
                    </button>
                )}

                <div className="contenedor-botones">
                    {colorBotones.map((c, i) => (
                        <button
                            key={i}
                            disabled={!juegoActivo}
                            onClick={manejarClickEnElBoton}
                            style={{ backgroundColor: c }}
                            className="boton-color"
                        >
                            Boton {i + 1}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default EjercicioBotones;