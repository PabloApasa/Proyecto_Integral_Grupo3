import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/Index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AutorizacionesProvider } from './assets/context/AutorizacionContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AutorizacionesProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AutorizacionesProvider>
  </StrictMode>,
)

