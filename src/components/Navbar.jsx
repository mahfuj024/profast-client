import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import ProfastLogo from '../pages/Shared/ProfastLogo'
import { AuthContext } from '../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify';

function Navbar() {

  const { logOut, user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast("Sign out");
        navigate("/")
      })
      .catch(error => {
        if (error) {
          toast("An error happened.");
        }
      })
  }

  const navItem = [
    <li><NavLink to="/"></NavLink></li>,
    <li><NavLink className={({ isActive }) => isActive ? "bg-primary rounded-full font-bold" : ""} to="/services">Services</NavLink></li>,
    <li><NavLink className={({ isActive }) => isActive ? "bg-primary rounded-full font-bold" : ""} to="/coverage">Coverage</NavLink></li>,
    <li><NavLink className={({ isActive }) => isActive ? "bg-primary rounded-full font-bold" : ""} to="/sendParcel">Send A Parcel</NavLink></li>,
    <li><NavLink className={({ isActive }) => isActive ? "bg-primary rounded-full font-bold" : ""} to="/aboutUs">About Us</NavLink></li>,
    <li><NavLink className={({ isActive }) => isActive ? "bg-primary rounded-full font-bold" : ""} to="/pricing">Pricing</NavLink></li>,
    <li><NavLink className={({ isActive }) => isActive ? "bg-primary rounded-full font-bold" : ""} to="/BeARider">Be a Rider</NavLink></li>
  ]

  return (
    <div className="navbar sticky top-0 z-50 bg-white pl-2 pr-6 md:pl-4 md:pr-8 lg:px-8 py-2 md:py-4 lg:py-5 rounded-2xl">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {navItem}
          </ul>
        </div>
        <a><ProfastLogo></ProfastLogo></a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-8 text-base font-medium">
          {navItem}
        </ul>
      </div>
      <div className="navbar-end">
        {
          user ?
            <button onClick={handleLogOut} className='btn bg-white'>Log out</button>
            :
            <Link to="/login" className="btn bg-white">Sign In</Link>
        }

      </div>
      <ToastContainer />
    </div>
  )
}

export default Navbar