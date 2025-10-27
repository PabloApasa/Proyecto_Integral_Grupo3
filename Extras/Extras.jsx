import { useState } from "react";
function App() {
 
    const [page, setPage] = useState("Home");
    const [loagged, setLoagged] = useState(false);

    const go = (page) => setPage(page);

    return {
        <div style= { textAlign: "center", marginTop: "20px" }>
            <h1> proyecto integrel Gupo 3</h1>

            <nav>
                <button onClick={() => go("Home")}>Home</button>
                <button onClick={() => go("About")}>About</button>
                <button onClick={() => go("Perfil")}>Perfil</button>
            </nav>

            <hr />

            {page === "Home" && <h2>Bienvenido a la pagina principal</h2>}

            {page === "About" && <h2>Esta es la pagina de informacion</h2>}

            {page === "Perfil" && (
                loagged ? (
                    <div>
                        <h2>perfil del usaurio</h2>
                        <p>Nombre: Juan Perez</p>
                        <p>Email: calbomagenta69@gmail.com</p>
                        <button onClick={() => setLoagged(false)}>Cerrar Sesion</button>
                    </div>
                ) : (
                    <div>
                        <h2>Por favor inicia sesion</h2>
                        <button onClick={() => setLoagged(true)}>Iniciar Sesion</button>
                    </div>
                )
            )}
            {page !== "Home" && page !== "About" && page !== "Perfil" && ( 
            <h2>no sea encontrado la pagina solicitada</h2>  )}
        </div>
    );
    }
}
 export default App;