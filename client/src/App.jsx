// import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";

// 🔹 Páginas del grupo
import Home from "./assets/pages/Home";
import AboutUs from "./assets/pages/AboutUs";
import InfoPersonal from "./assets/pages/InfoPersonal";
import Error from "./assets/pages/Error";
import Layout from "./assets/pages/Layout";

// 🔹 Sistema de autenticación
import Login from "./assets/pages/Login";
import NoAutorizado from "./assets/pages/NoAutorizado";
import FormularioRegistro from "./assets/components/FormularioRegistro";
import ProtectorRutas from "./assets/components/ProtectorRutas";
import { AutorizacionesProvider } from "../../client/src/assets/context/AutorizacionContext";

// 🔹 Página o componente para alumnos
import Games from "./assets/pages/Games";

// 🔹 💜 juego04 
import Juego04 from "./assets/components/Diagnostico/Juego04/Juego04";

function App() {
  return (
    <AutorizacionesProvider>
      <Container fluid>
        <Routes>
          {/* 🔸 Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/formularioregistro" element={<FormularioRegistro />} />
          <Route path="/unauthorized" element={<NoAutorizado />} />

          {/* 🔸 Layout principal con rutas protegidas */}
          <Route path="/" element={<Layout />}>
            {/* Redirección al login si entra sin loguearse */}
            <Route index element={<Navigate to="/login" />} />

            {/* Rutas accesibles a todos los roles autenticados */}
            <Route
              path="home"
              element={
                <ProtectorRutas allowedRoles={["ADMINISTRATIVO", "ALUMNO"]}>
                  <Home />
                </ProtectorRutas>
              }
            />

            <Route
              path="aboutus"
              element={
                <ProtectorRutas allowedRoles={["ADMINISTRATIVO", "ALUMNO"]}>
                  <AboutUs />
                </ProtectorRutas>
              }
            />

            <Route
              path="infoPersonal"
              element={
                <ProtectorRutas allowedRoles={["ADMINISTRATIVO", "ALUMNO"]}>
                  <InfoPersonal />
                </ProtectorRutas>
              }
            />

            {/* 🔸 Rutas exclusivas para ADMINISTRATIVO */}
            <Route
              path="proyecto2"
              element={
                <ProtectorRutas allowedRoles={["ADMINISTRATIVO"]}>
                  {/*<Proyecto2 />*/}
                </ProtectorRutas>
              }
            />
            <Route
              path="proyecto3"
              element={
                <ProtectorRutas allowedRoles={["ADMINISTRATIVO"]}>
                  {/*<Proyecto3 />*/}
                </ProtectorRutas>
              }
            />
            <Route
              path="proyecto4"
              element={
                <ProtectorRutas allowedRoles={["ADMINISTRATIVO"]}>
                  {/*<Proyecto4 />*/}
                </ProtectorRutas>
              }
            />
            <Route
              path="proyecto5"
              element={
                <ProtectorRutas allowedRoles={["ADMINISTRATIVO"]}>
                  {/*<Proyecto5 />*/}
                </ProtectorRutas>
              }
            />

            {/* 🔸 Ruta exclusiva para ALUMNO */}
            <Route
              path="games"
              element={
                <ProtectorRutas allowedRoles={["ALUMNO"]}>
                  <Games />
                </ProtectorRutas>
              }
            />

            {/* 🔸 💜 Ruta de tu juego */}
            <Route
              path="juego04"
              element={
                <ProtectorRutas allowedRoles={["ALUMNO"]}>
                  <Juego04 />
                </ProtectorRutas>
              }
            />

            {/* 🔸 Error por defecto */}
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Container>
    </AutorizacionesProvider>
  );
}

export default App;
