import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import Login from './Login';

function Home() {
  return (
    <StyledWrapper>
      <Container>
        <div className="hero-section">
          <div className="logo-container">
            {/* Aquí irá el logo - puedes reemplazar el src con la ruta de tu imagen */}
            <img
              src="/image/GlamrockHelpy.jpg"
              alt="Logo del proyecto"
              className="logo"
            />
          </div>

          <div className="welcome-card">
            <h1 className="title">Bienvenido</h1>
            <p className="subtitle">Proyecto Integral - Grupo N°3</p>
            <p className="description">
              Explora nuestro proyecto desarrollado con las últimas tecnologías web.
              Navega por las diferentes secciones para conocer más sobre nuestro equipo y trabajo.
            </p>
          </div>

          <div className="features">
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <h3>Rápido</h3>
              <p>Desarrollado con React y Vite</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎨</div>
              <h3>Moderno</h3>
              <p>Diseño responsive y atractivo</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🚀</div>
              <h3>Innovador</h3>
              <p>Tecnologías de vanguardia</p>
            </div>
          </div>
        </div>
      </Container>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
    min-height: calc(100vh - 100px);
    padding: 40px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    
    .hero-section {
        text-align: center;
    }

    .logo-container {
        margin-bottom: 40px;
        animation: fadeInDown 1s ease-out;
    }

    .logo {
        width: 200px;
        height: 200px;
        object-fit: contain;
        filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
        transition: transform 0.3s ease;
        border-radius: 20px;
        background: white;
        padding: 20px;
    }

    .logo:hover {
        transform: scale(1.05) rotate(2deg);
    }

    .welcome-card {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 20px;
        padding: 50px 40px;
        margin: 0 auto 50px;
        max-width: 800px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: fadeInUp 1s ease-out 0.2s both;
    }

    .title {
        font-size: 3rem;
        font-weight: 800;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 20px;
    }

    .subtitle {
        font-size: 1.5rem;
        color: #764ba2;
        font-weight: 600;
        margin-bottom: 20px;
    }

    .description {
        font-size: 1.1rem;
        color: #555;
        line-height: 1.8;
        max-width: 600px;
        margin: 0 auto;
    }

    .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 30px;
        margin-top: 40px;
        max-width: 1000px;
        margin: 40px auto 0;
    }

    .feature-item {
        background: rgba(255, 255, 255, 0.95);
        padding: 40px 30px;
        border-radius: 20px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        animation: fadeInUp 1s ease-out both;
    }

    .feature-item:nth-child(1) {
        animation-delay: 0.3s;
    }

    .feature-item:nth-child(2) {
        animation-delay: 0.4s;
    }

    .feature-item:nth-child(3) {
        animation-delay: 0.5s;
    }

    .feature-item:hover {
        transform: translateY(-10px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }

    .feature-icon {
        font-size: 3rem;
        margin-bottom: 20px;
    }

    .feature-item h3 {
        font-size: 1.5rem;
        font-weight: 700;
        color: #667eea;
        margin-bottom: 15px;
    }

    .feature-item p {
        color: #666;
        font-size: 1rem;
        margin: 0;
    }

    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        .title {
            font-size: 2rem;
        }

        .subtitle {
            font-size: 1.2rem;
        }

        .welcome-card {
            padding: 30px 20px;
        }

        .logo {
            width: 150px;
            height: 150px;
        }

        .features {
            grid-template-columns: 1fr;
        }
    }
`;

export default Home;

