import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'
import Footer from '../components/Footer'
import { ToastContainer } from "react-toastify";

function MainLayouts() {
  return (
    <div className='max-w-[1500px] mx-auto urbanist-font'>
      <ToastContainer position="top-right" autoClose={1000} />
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default MainLayouts