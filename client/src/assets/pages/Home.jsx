import Login from "./Login";
import { Container, Row, Col } from "react-bootstrap";
import "../css/home.css";


function Home() {
  return (
    <div className="home-page">
      <div className="home-overlay"></div>

      <Container fluid className="home-content">
        <Row className="align-items-center">
          <Col md={6} className="text-section">
            <h1 className="home-title">Bienvenido a tu Aula Virtual 💫</h1>
            <p className="home-subtitle">
              Aprende inglés de forma interactiva y divertida.
              <br />
              Con juegos, desafíos y progreso personalizado.
            </p>
          </Col>

          <Col md={6} className="login-section">
            <div className="login-wrapper">
              <Login />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;

