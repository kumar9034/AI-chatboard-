import axios from "axios";

const axiosInstant = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export default axiosInstant