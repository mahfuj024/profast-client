import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';

function LoginWithGoogle({ name }) {

    const { googleLogin } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()

    // after login redirect back
    const from = location.state?.from?.pathname || "/";

    const handleLoginWithGoogle = () => {
        googleLogin()
            .then(result => {
                const user = result?.user
                if (user) {
                    toast("Login successful");
                    navigate(from, { replace: true })
                    console.log(user)
                }
            })
            .catch(error => {
                const errorMessage = error?.message
                if (errorMessage) {
                    toast("Invalid email or password ❌");
                    console.log(errorMessage)
                }
            })
    }

    return (
        <button onClick={handleLoginWithGoogle} className="btn text-base h-12 text-black border-[#e5e5e5] w-full bg-gray-50 ">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            {name} with Google
            <ToastContainer />
        </button>
    )
}

export default LoginWithGoogle