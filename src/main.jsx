import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles.css'
import { CinemaFrontend } from './CinemaFrontend';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CinemaFrontend/>
    </BrowserRouter>
  </React.StrictMode>,
)