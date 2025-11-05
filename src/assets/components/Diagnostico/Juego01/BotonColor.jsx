import { useNavigate } from "react-router-dom";

function BotonColor() {
  const navigate = useNavigate();

  const handleContinuar = () => {
    navigate("/diagnostico/juego02");
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Juego de Botones, se subirá pronto 🎮</h1>

      <button
        style={{
          marginTop: "30px",
          padding: "10px 25px",
          fontSize: "1.1rem",
          borderRadius: "10px",
          backgroundColor: "#0d6efd",
          color: "white",
          border: "none",
          cursor: "pointer",
          transition: "all 0.3s ease"
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#084298")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#0d6efd")}
        onClick={handleContinuar}
      >
        Continuar →
      </button>
    </div>
  );
}

export default BotonColor;