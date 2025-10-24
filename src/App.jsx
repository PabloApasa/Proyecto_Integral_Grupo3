import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import Home from './assets/pages/Home';
import AboutUs from './assets//pages/AboutUs';
import Error from './assets/pages/Error';
import Layout from './assets/pages/Layout';
import InfoPersonal from './assets/pages/InfoPersonal';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (
    <Container>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="infoPersonal" element={<InfoPersonal />} />
          <Route path="*" element={<Error />} />
        </Route >
      </Routes>
    </Container>
  )
}

export default App
