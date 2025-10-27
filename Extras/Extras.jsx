import { useState } from "react";

function App() {
  const [page, setPage] = useState("Home");
  const [logged, setLogged] = useState(false);

  const go = (page) => setPage(page);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Proyecto Integral - Grupo 3</h1>

      <nav>
        <button onClick={() => go("Home")}>Home</button>
        <button onClick={() => go("About")}>About</button>
        <button onClick={() => go("Perfil")}>Perfil</button>
      </nav>

      <hr />

      {page === "Home" && <h2>Bienvenido a la página principal</h2>}

      {page === "About" && <h2>Esta es la página de información</h2>}

      {page === "Perfil" &&
        (logged ? (
          <div>
            <h2>Perfil del usuario</h2>
            <p>Nombre: Juan Pérez</p>
            <p>Email: calbomagenta69@gmail.com</p>
            <button onClick={() => setLogged(false)}>Cerrar sesión</button>
          </div>
        ) : (
          <div>
            <h2>Por favor, inicia sesión</h2>
            <button onClick={() => setLogged(true)}>Iniciar sesión</button>
          </div>
        ))}

      {page !== "Home" && page !== "About" && page !== "Perfil" && (
        <h2>la paguina no ha sido encontrada</h2>
      )}
    </div>
  );
}

export default App;
