import React from 'react';
import styled from 'styled-components';

// IntegranteCard espera un prop 'integrante' con: { nombre, rol, image, datosExtra }
function IntegranteCard({ integrante }) {
    const { nombre = 'Nombre', rol = 'Rol', image = 'https://via.placeholder.com/150', datosExtra = '' } = integrante || {};

    return (
        <StyledWrapper>
            <div className="container noselect">
                <div className="canvas">
                    {/* 25 trackers para el efecto hover sin JS */}
                    {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} className={`tracker tr-${i + 1}`} />
                    ))}
                    <div id="card">
                        <p id="prompt">Grupo N°3</p>
                        <img className="avatar" src={image} alt={`${nombre} avatar`} />
                        <div className="title">{nombre}</div>
                        <div className="subtitle">{rol}</div>
                        {datosExtra && <div className="extra">{datosExtra}</div>}
                    </div>
                </div>
            </div>
        </StyledWrapper>
    );
}const StyledWrapper = styled.div`
    width: 100%;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;

    /*works janky on mobile :<*/
    .container {
        position: relative;
        width: 100%;
        max-width: 800px;
        height: 280px;
        transition: 200ms;
    }

    .container:active {
        transform: scale(0.98);
    }

    #card {
        position: absolute;
        inset: 0;
        z-index: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        transition: 700ms;
        background: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%);
        overflow: hidden;
        padding: 12px;
    }

    .avatar {
        width: 120px;
        height: 120px;
        object-fit: cover;
        border-radius: 50%;
        border: 4px solid rgba(255,255,255,0.7);
        z-index: 10;
        box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    }

    .extra {
        margin-top: 12px;
        font-size: 14px;
        color: rgba(255,255,255,0.95);
        text-align: center;
        max-width: 600px;
    }

    .subtitle {
        transform: translateY(12px);
        color: rgba(255,255,255,0.95);
        text-align: center;
        width: 100%;
        font-size: 16px;
        font-weight: 500;
    }

    .title {
        opacity: 1;
        transition-duration: 300ms;
        transition-timing-function: ease-in-out;
        transition-delay: 100ms;
        position: relative;
        margin-top: 12px;
        font-size: 1.5rem;
        font-weight: bold;
        color: white;
        text-align: center;
    }

    .tracker:hover ~ #card .title {
        opacity: 1;
    }

    #prompt {
        bottom: 8px;
        left: 12px;
        z-index: 20;
        font-size: 12px;
        font-weight: bold;
        transition: 300ms ease-in-out;
        position: absolute;
        max-width: 110px;
        color: rgb(255, 255, 255);
        opacity: 0.9;
    }

    .tracker {
        position: absolute;
        z-index: 200;
        width: 100%;
        height: 100%;
    }

    .tracker:hover {
        cursor: pointer;
    }

    .tracker:hover ~ #card #prompt {
        opacity: 0;
    }

    .tracker:hover ~ #card {
        transition: 300ms;
        filter: brightness(1.05);
    }

    .container:hover #card::before {
        transition: 200ms;
        content: '';
        opacity: 80%;
    }

    .canvas {
        perspective: 800px;
        inset: 0;
        z-index: 200;
        position: absolute;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
        gap: 0px 0px;
        grid-template-areas: "tr-1 tr-2 tr-3 tr-4 tr-5"
            "tr-6 tr-7 tr-8 tr-9 tr-10"
            "tr-11 tr-12 tr-13 tr-14 tr-15"
            "tr-16 tr-17 tr-18 tr-19 tr-20"
            "tr-21 tr-22 tr-23 tr-24 tr-25";
    }

    #card::before {
        content: '';
        background: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%);
        filter: blur(2rem);
        opacity: 30%;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
        transition: 200ms;
    }

    /* grid area assignments */
    ${Array.from({ length: 25 }).map((_, i) => `.tr-${i + 1} { grid-area: tr-${i + 1}; }`).join('\n  ')}

    /* hover transforms - keep original angles */
    .tr-1:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(20deg) rotateY(-10deg) rotateZ(0deg); }
    .tr-2:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(20deg) rotateY(-5deg) rotateZ(0deg); }
    .tr-3:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(20deg) rotateY(0deg) rotateZ(0deg); }
    .tr-4:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(20deg) rotateY(5deg) rotateZ(0deg); }
    .tr-5:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(20deg) rotateY(10deg) rotateZ(0deg); }
    .tr-6:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(10deg) rotateY(-10deg) rotateZ(0deg); }
    .tr-7:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(10deg) rotateY(-5deg) rotateZ(0deg); }
    .tr-8:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(10deg) rotateY(0deg) rotateZ(0deg); }
    .tr-9:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(10deg) rotateY(5deg) rotateZ(0deg); }
    .tr-10:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(10deg) rotateY(10deg) rotateZ(0deg); }
    .tr-11:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(0deg) rotateY(-10deg) rotateZ(0deg); }
    .tr-12:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(0deg) rotateY(-5deg) rotateZ(0deg); }
    .tr-13:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
    .tr-14:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(0deg) rotateY(5deg) rotateZ(0deg); }
    .tr-15:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(0deg) rotateY(10deg) rotateZ(0deg); }
    .tr-16:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(-10deg) rotateY(-10deg) rotateZ(0deg); }
    .tr-17:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(-10deg) rotateY(-5deg) rotateZ(0deg); }
    .tr-18:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(-10deg) rotateY(0deg) rotateZ(0deg); }
    .tr-19:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(-10deg) rotateY(5deg) rotateZ(0deg); }
    .tr-20:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(-10deg) rotateY(10deg) rotateZ(0deg); }
    .tr-21:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(-20deg) rotateY(-10deg) rotateZ(0deg); }
    .tr-22:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(-20deg) rotateY(-5deg) rotateZ(0deg); }
    .tr-23:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg); }
    .tr-24:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(-20deg) rotateY(5deg) rotateZ(0deg); }
    .tr-25:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(-20deg) rotateY(10deg) rotateZ(0deg); }

    .noselect {
        -webkit-touch-callout: none;
         /* iOS Safari */
        -webkit-user-select: none;
         /* Safari */
         /* Konqueror HTML */
        -moz-user-select: none;
         /* Old versions of Firefox */
        -ms-user-select: none;
         /* Internet Explorer/Edge */
        user-select: none;
         /* Non-prefixed version, currently
                                                                            supported by Chrome, Edge, Opera and Firefox */
    }
`;

export default IntegranteCard;