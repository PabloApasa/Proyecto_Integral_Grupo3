import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AutorizacionesProvider } from './context/AutorizacionesContext.jsx'

// import './index.css'

export default function Main() {
  return (
    <div>
      <h1>hola</h1>
    </div>
  )


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AutorizacionesProvide>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AutorizacionesProvide>
  </StrictMode>

);}
