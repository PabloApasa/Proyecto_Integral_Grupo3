// 🔹Importaciones raeact dom y booststrap
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// 🔹 Estilos
import './assets/css/App.css'

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
import NoAutorizado from './assets/pages/NoAutorizado';
import FormularioRegistro from './assets/components/FormularioRegistro';
import ProtectorRutas from './assets/components/ProtectorRutas';
import { AutorizacionesProvider } from './assets/context/AutorizacionContext';

// 🔹 Página o componente para alumnos
import Games from './assets/pages/Games';

// 🔹 Pagina para Administrativos
import GamesResultados from './assets/pages/GamesResultados';

function App() {
  return (
    <AutorizacionesProvider>
      <Container fluid>
        <Routes>
          {/* 🔸 Rutas públicas y de autenticacion */}
          <Route path="/login" element={<Login />} />
          <Route path="/formularioregistro" element={<FormularioRegistro />} />
          <Route path="/unauthorized" element={<NoAutorizado />} />

          {/* 🔸 Layout principal con rutas protegidas */}
          <Route path="/" element={<Layout />}>

            {/* Redirección al login si entra sin loguearse */}
            <Route index element={<Navigate to="/home" />} />

            {/* Rutas ABIERTAS a cualquier usuario con acceso al Layout */}
            <Route path="home" element={<Home />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="infoPersonal" element={<InfoPersonal />} />

            {/* Rutas de Proyectos (Ahora ABIERTAS) */}
            <Route path="proyecto2" element={<Proyecto2 />} />
            <Route path="proyecto3" element={<Proyecto3 />} />
            <Route path="proyecto4" element={<Proyecto4 />} />
            <Route path="proyecto5" element={<Proyecto5 />} />

            {/* 🔸 Ruta PROTEGIDA 1: Solo para el rol ALUMNO */}
            <Route
              path="games"
              element={
                <ProtectorRutas allowedRoles={['ALUMNO']}>
                  <Games />
                </ProtectorRutas>
              }
            />

            {/* 🔸 Ruta PROTEGIDA 2: Solo para el rol ADMINISTRATIVO */}
            <Route
              path="games-resultados"
              element={
                <ProtectorRutas allowedRoles={['ADMINISTRATIVO']}>
                  {/* NOTA: Asegúrate de que el archivo GamesResultados.jsx exista en su ruta. */}
                  <GamesResultados />
                </ProtectorRutas>
              }
            />

            {/* 🔸 Ruta de Error: Captura cualquier ruta que no coincida con las anteriores */}
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </Container>
    </AutorizacionesProvider>
  );
}

export default App;