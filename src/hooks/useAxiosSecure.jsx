import axios from 'axios'
import React from 'react'

const axiosSecure = axios.create({
    baseURL: `http://localhost:4000`
})

function useAxiosSecure() {
    return axiosSecure;
}

export default useAxiosSecure