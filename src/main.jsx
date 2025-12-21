import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './router/Router';
import AuthProvider from './context/AuthProvider';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
Aos.init();

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='bg-[#EAEDED]'>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
)
