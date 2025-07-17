import React from 'react'
import Navbar from '../Pages/Shared/Headers/Navbar'
import { Outlet } from 'react-router'
import Footer from '../Pages/Shared/Footer/Footer'

function Rootlayoutes() {
  return (
    <div className='max-w-[1500px] mx-auto'>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default Rootlayoutes