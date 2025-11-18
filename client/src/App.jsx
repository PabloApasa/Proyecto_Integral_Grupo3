// import react dom y bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useAutorizacion } from "./assets/hooks/AutorizacionSegura";

//estilo
import './assets/css/App.css'

// 🔹 Páginas del grupo
import Home from "./assets/pages/Home";
import AboutUs from "./assets/pages/AboutUs";
import InfoPersonal from "./assets/pages/InfoPersonal";
import Error from "./assets/pages/Error";
import Layout from "./assets/pages/Layout";

// 🔹 Proyectos anteriores
import Proyecto2 from './assets/components/Proyecto2';
import Proyecto3 from './assets/components/Proyecto3';
import Proyecto4 from './assets/PoryectosAnteriores/Proyecto4/Proyecto4App';
import Proyecto5 from './assets/PoryectosAnteriores/Proyecto5/Proyecto5App';


// 🔹 Sistema de autenticación
import Login from "./assets/pages/Login";
import Registrar from './assets/components/Registrar';
import NoAutorizado from "./assets/pages/NoAutorizado";
import FormularioRegistro from "./assets/components/FormularioRegistro/FormularioRegistro";
import ProtectorRutas from "./assets/components/ProtectorRutas";
import { AutorizacionesProvider } from "../../client/src/assets/context/AutorizacionContext";

// 🔹 Página o componente para alumnos
import Games from "./assets/pages/Games";


// 🔹 Juegos de Diagnostico
import BotonColor from "./assets/components/Diagnostico/Juego01/BotonColor";
import Imagenes from "./assets/components/Diagnostico/Juego02/Imagenes";
import JuegoNumero from "./assets/components/Diagnostico/Juego03/JuegoNumero";
import Juego04 from "./assets/components/Diagnostico/Juego04/Juego04";

// diagnostico
import Diagnostico from "./assets/components/Diagnostico/Diagnostico";
import Resultados from "./assets/components/FormularioRegistro/Resultados";

// Nota: la lógica de redirección (formularioregistro vs diagnostico) se gestiona
// a través de la navegación y acceso protegido. El flujo solicitado es:
// - Registrar: solo registra en BD y NO realiza login automático.
// - Login: el usuario inicia sesión y obtiene el rol `ALUMNO-INGLES`.
// - Layout: el enlace "Diagnóstico" para `ALUMNO-INGLES` apunta al formulario.
// - FormularioRegistro navega a `/diagnostico` al finalizar.
// Por eso no necesitamos una función RedireccionDiagnostico aquí.

function App() {
  return (
    <AutorizacionesProvider>
      <Container fluid>
        <Routes>
          {/* 🔸 Rutas públicas */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/registrar" element={<Registrar />} />*/}
          <Route path="/formularioregistro" element={<FormularioRegistro />} />
          <Route path="/unauthorized" element={<NoAutorizado />} />


          {/* 🔸 Rutas protegidas */}

          {/* 🔸 Layout principal con rutas protegidas */}
          <Route path="/" element={<Layout />}>

            {/* Redirección inicial: siempre ir a /home al abrir la aplicación */}
            <Route index element={<Navigate to="home" replace />} />

            {/* Rutas ABIERTAS a cualquier usuario con acceso al Layout */}
            <Route path="home" element={<Home />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="infoPersonal" element={<InfoPersonal />} />

            {/* Rutas de Proyectos públicas: accesibles sin iniciar sesión */}
            <Route path="proyecto2" element={<Proyecto2 />} />
            <Route path="proyecto3" element={<Proyecto3 />} />
            <Route path="proyecto4" element={<Proyecto4 />} />
            <Route path="proyecto5" element={<Proyecto5 />} />


            {/* 🔸 Ruta exclusiva para ALUMNO */}
            <Route
              path="games"
              element={
                <ProtectorRutas allowedRoles={["ALUMNO"]}>
                  <Games />
                </ProtectorRutas>
              }
            />

            <Route
              path="formularioregistro"
              element={
                <ProtectorRutas allowedRoles={['ALUMNO-INGLES']}>
                  <FormularioRegistro />
                </ProtectorRutas>
              }
            />

            <Route
              path="diagnostico"
              element={
                <ProtectorRutas allowedRoles={['ALUMNO-INGLES']}>
                  <Diagnostico />
                </ProtectorRutas>
              }
            />
            <Route
              path="Juego01"
              element={
                <ProtectorRutas allowedRoles={["ALUMNO"]}>
                  <BotonColor />
                </ProtectorRutas>
              }
            />
            <Route
              path="Juego02"
              element={
                <ProtectorRutas allowedRoles={["ALUMNO"]}>
                  <Imagenes />
                </ProtectorRutas>
              }
            />
            <Route
              path="Juego03"
              element={
                <ProtectorRutas allowedRoles={["ALUMNO"]}>
                  <JuegoNumero />
                </ProtectorRutas>
              }
            />
            <Route
              path="Juego04"
              element={
                <ProtectorRutas allowedRoles={["ALUMNO"]}>
                  <Juego04 />
                </ProtectorRutas>
              }
            />

            <Route
              path="resultados"
              element={
                <ProtectorRutas allowedRoles={["ADMIN"]}>
                  <Resultados />
                </ProtectorRutas>
              }
            />

            <Route path="registrar" element={<Registrar />} />

            {/* 🔸 Error por defecto */}
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Container>
    </AutorizacionesProvider>
  );
}

export default App;
