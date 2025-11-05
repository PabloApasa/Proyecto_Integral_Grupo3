function Juego04() {
  const handleTerminar = () => {
    alert("Funcionalidad en desarrollo 🚧");
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>🎮 ¡Acá va el último juego!</h1>
      <button
        style={{
          marginTop: "30px",
          padding: "10px 25px",
          fontSize: "1.1rem",
          borderRadius: "10px",
          backgroundColor: "#198754",
          color: "white",
          border: "none",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#146c43")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#198754")}
        onClick={handleTerminar}
      >
        Terminar 🏁
      </button>
    </div>
  );
}

export default Juego04;