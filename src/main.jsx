import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from '../context/authContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <BrowserRouter>
  <React.StrictMode>
    <UserProvider>
    <App />
    </UserProvider>
    {/* <h1>App</h1> */}
  </React.StrictMode>
  // </BrowserRouter>,
)
