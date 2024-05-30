import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from '../context/authContext'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  // <BrowserRouter>
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <UserProvider>
    <App />
    </UserProvider>
    </QueryClientProvider>
    {/* <h1>App</h1> */}
  </React.StrictMode>
  // </BrowserRouter>,
)
