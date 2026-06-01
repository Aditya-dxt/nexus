import React from 'react'
import ReactDOM from 'react-dom/client'
import { NexusProvider } from './context/NexusContext'
import App from './App'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NexusProvider>
      <App />
    </NexusProvider>
  </React.StrictMode>,
)
