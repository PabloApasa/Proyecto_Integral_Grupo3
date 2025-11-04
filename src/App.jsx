import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// 🔹 Páginas del grupo
import Home from './assets/pages/Home';
import AboutUs from './assets/pages/AboutUs';
import InfoPersonal from './assets/pages/InfoPersonal';
import Error from './assets/pages/Error';
import Layout from './assets/pages/Layout';

// 🔹 Proyectos anteriores
import Proyecto2 from './assets/components/Proyecto2';
import Proyecto3 from './assets/components/Proyecto3';
import Proyecto4 from './PoryectosAnteriores/Proyecto4/Proyecto4App';
import Proyecto5 from './PoryectosAnteriores/Proyecto5/Proyecto5App';

// 🔹 Sistema de autenticación
import Login from './assets/pages/Login';
import Registrar from './assets/components/Registrar';
import NoAutorizado from './assets/pages/NoAutorizado';
import FormularioRegistro from './assets/components/FormularioRegistro/FormularioRegistro';
import ProtectorRutas from './assets/components/ProtectorRutas';
import { AutorizacionesProvider } from './assets/context/AutorizacionContext';

// 🔹 (opcional) Página o componente para alumnos
import Games from './assets/pages/Games';

function App() {
  return (
    <AutorizacionesProvider>
      <Container fluid>
        <Routes>
          {/* 🔸 Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} />
          <Route path="/formularioregistro" element={<FormularioRegistro />} />
          <Route path="/unauthorized" element={<NoAutorizado />} />

          {/* 🔸 Layout principal con rutas protegidas */}
          <Route path="/" element={<Layout />}>
            {/* Mostrar Home directamente al entrar */}
            <Route index element={<Home />} />

            {/* Rutas accesibles a todos los roles autenticados */}
            <Route path="home" element={<Home />} />

            <Route
              path="aboutus"
              element={
                <ProtectorRutas allowedRoles={['ADMINISTRATIVO', 'ALUMNO']}>
                  <AboutUs />
                </ProtectorRutas>
              }
            />

            <Route
              path="infoPersonal"
              element={
                <ProtectorRutas allowedRoles={['ADMINISTRATIVO', 'ALUMNO']}>
                  <InfoPersonal />
                </ProtectorRutas>
              }
            />

            {/* 🔸 Rutas exclusivas para ADMINISTRATIVO */}
            <Route
              path="proyecto2"
              element={
                <ProtectorRutas allowedRoles={['ADMINISTRATIVO']}>
                  <Proyecto2 projecPath="proyecto2" title="Proyecto 2" />
                </ProtectorRutas>
              }
            />
            <Route
              path="proyecto3"
              element={
                <ProtectorRutas allowedRoles={['ADMINISTRATIVO']}>
                  <Proyecto3 projecPath="proyecto3" title="Proyecto 3" />
                </ProtectorRutas>
              }
            />
            <Route
              path="proyecto4"
              element={
                <ProtectorRutas allowedRoles={['ADMINISTRATIVO']}>
                  <Proyecto4 />
                </ProtectorRutas>
              }
            />
            <Route
              path="proyecto5"
              element={
                <ProtectorRutas allowedRoles={['ADMINISTRATIVO']}>
                  <Proyecto5 />
                </ProtectorRutas>
              }
            />

            {/* 🔸 Ruta exclusiva para ALUMNO */}
            <Route
              path="games"
              element={
                <ProtectorRutas allowedRoles={['ALUMNO']}>
                  <Games />
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
