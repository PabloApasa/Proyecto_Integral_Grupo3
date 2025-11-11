import React from 'react';
import styled from 'styled-components';

// IntegranteCard espera un prop 'integrante' con: { nombre, rol, image, datosExtra, github }
function IntegranteCard({ integrante }) {
    const { nombre = 'Nombre', rol = 'Rol', image = 'https://via.placeholder.com/150', datosExtra = '', github = '' } = integrante || {};

    return (
        <StyledWrapper>
            <div className="container noselect">
                <div id="card">
                    <p id="prompt">Grupo N°3</p>
                    <img className="avatar" src={image} alt={`${nombre} avatar`} />
                    <div className="title">{nombre}</div>
                    <div className="subtitle">{rol}</div>
                    {datosExtra && <div className="extra">{datosExtra}</div>}
                    {github && (
                        <a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-link"
                        >
                            <svg className="github-icon" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                            </svg>
                            GitHub
                        </a>
                    )}
                </div>
            </div>
        </StyledWrapper>
    );
} const StyledWrapper = styled.div`
    width: 100%;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;

    .container {
        position: relative;
        width: 100%;
        max-width: 800px;
        height: 280px;
        transition: all 300ms ease;
    }

    .container:hover {
        transform: translateY(-4px);
    }

    .container:active {
        transform: scale(0.98);
    }

    #card {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        transition: all 400ms ease;
        background: linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%);
        overflow: visible;
        padding: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .container:hover #card {
        filter: brightness(1.08);
        box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    }

    .avatar {
        width: 110px;
        height: 110px;
        object-fit: cover;
        border-radius: 50%;
        border: 4px solid rgba(255,255,255,0.7);
        z-index: 10;
        box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    }

    .extra {
        font-size: 14px;
        color: rgba(255,255,255,0.95);
        text-align: center;
        max-width: 600px;
    }

    .github-link {
        margin-top: 16px;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        background: rgba(255, 255, 255, 0.25);
        border: 2px solid rgba(255, 255, 255, 0.5);
        border-radius: 25px;
        color: white;
        text-decoration: none;
        font-size: 14px;
        font-weight: 600;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        cursor: pointer;
    }

    .github-link:hover {
        background: rgba(255, 255, 255, 0.4);
        border-color: rgba(255, 255, 255, 0.7);
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
        text-decoration: none;
    }

    .github-icon {
        flex-shrink: 0;
    }

    .subtitle {
        margin-top: 8px;
        color: rgba(255,255,255,0.95);
        text-align: center;
        width: 100%;
        font-size: 16px;
        font-weight: 500;
    }

    .title {
        margin-top: 12px;
        font-size: 1.5rem;
        font-weight: bold;
        color: white;
        text-align: center;
    }

    #prompt {
        position: absolute;
        bottom: 12px;
        left: 16px;
        font-size: 11px;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.8);
        letter-spacing: 0.5px;
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

    .container:hover #card::before {
        opacity: 50%;
    }

    .noselect {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
`;

export default IntegranteCard;