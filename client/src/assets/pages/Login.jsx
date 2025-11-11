import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAutorizacion } from "../hooks/AutorizacionSegura";
import styled from 'styled-components'
//import { Container, Form, Button, Card, Alert } from "react-bootstrap";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  const { login, isAuthenticated, user } = useAutorizacion();
  const navigate = useNavigate();

  const captchaContainerRef = useRef(null);

  const grecaptchaLoaded =
    typeof window !== "undefined" && typeof window.grecaptcha !== "undefined";
  useEffect(() => {
    let intervalId;

    const renderCaptcha = () => {
      if (
        typeof window !== "undefined" &&
        window.grecaptcha &&
        window.grecaptcha.render &&
        captchaContainerRef.current &&
        !captchaContainerRef.current.hasChildNodes()
      ) {
        console.log("🔵 Renderizando captcha en login...");
        window.grecaptcha.render(captchaContainerRef.current, {
          sitekey: "6LcMkwgsAAAAAMivXZ-9ElkxBfocvfIYaq-ZQiHl",
          callback: (token) => {
            setCaptchaToken(token);
            setLoginError("");
          },
        });
        clearInterval(intervalId);
      } else {
        console.log("🟠 Aún no está listo grecaptcha en login");
      }
    };

    intervalId = setInterval(renderCaptcha, 500);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.rol === "ADMINISTRATIVO") {
        navigate("/home", { replace: true });
      } else if (user?.rol === "ALUMNO") {
        navigate("/home", { replace: true });
      } else {
        navigate("/error", { replace: true });
      }
    }
  }, [isAuthenticated, navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!username || !password) {
      setLoginError("Por favor, ingresa usuario y contraseña.");
      return;
    }

    if (!captchaToken) {
      setLoginError("Por favor, verifica que no eres un robot.");
      return;
    }

    const result = await login({ username, password, captcha: captchaToken });

    if (!result.success) {
      setLoginError(result.message || "Error de autenticación desconocido.");
    }
  };

  return (
    <StyledWrapper>
      <div className="login-container">
        <div className="login-card">
          <div className="card-header">
            <div className="icon-container">
              <svg className="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h2 className="title">Iniciar Sesión</h2>
            <p className="subtitle">Ingresa tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <input
                  id="username"
                  type="text"
                  placeholder="Ingresa tu usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div
              ref={captchaContainerRef}
              className="d-flex justify-content-center mb-3"
              style={{ minHeight: 90 }}
            ></div>

            {loginError && (
              <div className="alert-error">
                <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                {loginError}
              </div>
            )}

            <button type="submit" className="btn-primary">
              <span>Entrar</span>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/registrar')}
            >
              <span>Registrarse</span>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="8.5" cy="7" r="4"></circle>
                <line x1="20" y1="8" x2="20" y2="14"></line>
                <line x1="23" y1="11" x2="17" y2="11"></line>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    
      .login-container {
        width: 100%;
        max-width: 450px;
        animation: fadeInUp 0.6s ease-out;
      }
    
      .login-card {
        background: rgba(255, 255, 255, 0.98);
        border-radius: 24px;
        padding: 40px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
      }
    
      .card-header {
        text-align: center;
        margin-bottom: 35px;
      }
    
      .icon-container {
        width: 80px;
        height: 80px;
        margin: 0 auto 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
      }
    
      .lock-icon {
        width: 40px;
        height: 40px;
        color: white;
      }
    
      .title {
        font-size: 2rem;
        font-weight: 800;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 10px;
      }
    
      .subtitle {
        color: #666;
        font-size: 0.95rem;
        margin: 0;
      }
    
      .login-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
    
      .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    
      label {
        font-weight: 600;
        color: #333;
        font-size: 0.9rem;
      }
    
      .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
      }
    
      .input-icon {
        position: absolute;
        left: 15px;
        width: 20px;
        height: 20px;
        color: #999;
        pointer-events: none;
      }
    
      .form-input {
        width: 100%;
        padding: 14px 14px 14px 45px;
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        font-size: 1rem;
        transition: all 0.3s ease;
        background: white;
      }
    
      .form-input:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
      }
    
      .form-input::placeholder {
        color: #aaa;
      }
    
      .alert-error {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 16px;
        background: #fee;
        border: 2px solid #fcc;
        border-radius: 12px;
        color: #c33;
        font-size: 0.9rem;
        animation: shake 0.4s ease;
      }
    
      .alert-icon {
        width: 20px;
        height: 20px;
        flex-shrink: 0;
      }
    
      .btn-primary,
      .btn-secondary {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 14px 24px;
        border: none;
        border-radius: 12px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        width: 100%;
      }
    
      .btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
      }
    
      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
      }
    
      .btn-primary:active {
        transform: translateY(0);
      }
    
      .btn-secondary {
        background: white;
        color: #667eea;
        border: 2px solid #667eea;
      }
    
      .btn-secondary:hover {
        background: #667eea;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
      }
    
      .btn-icon {
        width: 20px;
        height: 20px;
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
    
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
      }
    
      @media (max-width: 480px) {
        .login-card {
          padding: 30px 24px;
        }
    
        .title {
          font-size: 1.6rem;
        }
    
        .icon-container {
          width: 70px;
          height: 70px;
        }
    
        .lock-icon {
          width: 35px;
          height: 35px;
        }
      }
    `;

export default Login;