import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './routes/Routes';
import AuthProvider from './context/AuthProvider';
import Aos from 'aos';
import 'aos/dist/aos.css';
Aos.init();


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-[#EAEDED]'>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  </StrictMode>,
)
