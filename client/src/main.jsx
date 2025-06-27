import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// Context imports
import { ThemeProvider } from './assets/context/ThemeContext'
import { AuthProvider } from './assets/context/AuthContext.jsx'
import { SocketProvider } from './assets/context/SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <SocketProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
