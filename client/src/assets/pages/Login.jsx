import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAutorizacion } from "../hooks/AutorizacionSegura";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

  const { login, isAuthenticated, user } = useAutorizacion();
  const navigate = useNavigate();

  const captchaContainerRef = useRef(null);

  // 👇 esto es solo para mostrar si cargó o no
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
        navigate("/proyectos", { replace: true });
      } else if (user?.rol === "ALUMNO") {
        navigate("/games", { replace: true });
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
    <Container
      fluid
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <Card style={{ width: "100%", maxWidth: "400px" }} className="shadow-sm">
        <Card.Body className="p-4">
          <Card.Title as="h2" className="text-center mb-2">
            Iniciar Sesión
          </Card.Title>

          {/* 🔍 indicador para saber si llegó el script */}
          <p
            style={{
              fontSize: 12,
              color: grecaptchaLoaded ? "green" : "red",
              marginBottom: 12,
            }}
          >
            reCAPTCHA en login:{" "}
            {grecaptchaLoaded ? "cargado ✅" : "no cargado ❌"}
          </p>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa tu Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {/* 👇 acá debería dibujarse */}
            <div
              ref={captchaContainerRef}
              className="d-flex justify-content-center mb-3"
              style={{ minHeight: 90 }}
            ></div>

            {loginError && (
              <Alert variant="danger" className="mt-3">
                {loginError}
              </Alert>
            )}

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Entrar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
