import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Home from './assets/pages/Home';
import AboutUs from './assets//pages/AboutUs';
import Error from './assets/pages/Error';
import Layout from './assets/pages/Layout';
import InfoPersonal from './assets/pages/InfoPersonal';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './assets/pages/Login';
import ProtectorRutas from "";
import SinAutorizacionPAge from "";


//Importacion de proyectos anteriores
//import Proyecto1 from '../src/PoryectosAnteriores/Proyecto1/Proyecto1App'
import Proyecto2 from '../src/assets/components/Proyecto2'
import Proyecto3 from '../src/assets/components/Proyecto3'
import Proyecto4 from '../src/PoryectosAnteriores/Proyecto4/Proyecto4App'
import Proyecto5 from '../src/PoryectosAnteriores/Proyecto5/Proyecto5App'

function App() {

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/proyectos" element={<ProtectorRutas allowedRoles={["admin"]}><Proyectos /></ProtectorRutas>} />
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="infoPersonal" element={<InfoPersonal />} />
          <Route path="*" element={<Error />} />
          <Route path="/unauthorized" element={<SinAutorizacionPAge />} />

          {/*rutas de los proyectos anteriores */}
          <Route path="/proyecto2" element={<Proyecto2 projecPath="proyecto2" title="Proyecto 2" />} />
          <Route path="/proyecto3" element={<Proyecto3 projecPath="proyecto3" title="Proyecto 3" />} />
          <Route path="proyecto4" element={<Proyecto4 />} />
          <Route path="proyecto5" element={<Proyecto5 />} />
        </Route >
      </Routes>
    </Container>
  )
}

export default App
