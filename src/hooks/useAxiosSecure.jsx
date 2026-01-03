import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const axiosSecure = axios.create({
    baseURL: `http://localhost:4000`
})

function useAxiosSecure() {

    const { user } = useContext(AuthContext)

    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`
        return config;
    }, error => {
        return Promise.reject(error)
    })
    return axiosSecure;
}

export default useAxiosSecure