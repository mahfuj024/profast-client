import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import { router } from './Routs/Router';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist bg-stone-100'>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
