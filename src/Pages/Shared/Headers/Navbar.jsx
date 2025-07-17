import React from 'react'
import logo from "../../../assets/logo.png"
import { NavLink } from 'react-router'

function Navbar() {

    const navItem = <>
        <li><NavLink to="/" className={({ isActive }) => isActive ? " bg-blue-500 text-white" : ""}>Home</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? " bg-blue-500 text-white" : ""}>About</NavLink></li>
    </>

    return (
        <div className="navbar bg-base-100 shadow-sm sticky top-0 z-50 px-5">
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
                <p className='flex items-center'>
                    <img className='h-12 mb-6' src={logo} alt="" />
                    <span className='text-3xl font-bold'>Profast</span>
                </p>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItem}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    )
}

export default Navbar