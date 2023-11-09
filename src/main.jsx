import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import routes from './Routes/Router.jsx'
import { RouterProvider } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import AuthProvider from './Provider/AuthProvider.jsx'
import "aos/dist/aos.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={routes} />
    </AuthProvider>
    <ToastContainer />
  </React.StrictMode>
)
