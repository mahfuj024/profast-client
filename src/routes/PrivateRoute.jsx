import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, useLocation } from 'react-router'

function PrivateRoute({ children }) {

    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    if(loading){
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>
    }

    return children;
}

export default PrivateRoute