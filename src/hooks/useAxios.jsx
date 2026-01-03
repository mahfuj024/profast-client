import axios from "axios"

const axiosInsTance = axios.create({
    baseURL: `http://localhost:4000`
})

function useAxios() {
    return axiosInsTance;
}

export default useAxios