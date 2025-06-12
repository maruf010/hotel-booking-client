import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router";
import { router } from './Routes/Routes';
import AuthProvider from './Contexts/AuthProvider';
import { Toaster } from 'react-hot-toast';
import 'leaflet/dist/leaflet.css';
import { HelmetProvider } from 'react-helmet-async';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </HelmetProvider>
  </StrictMode>,
)
