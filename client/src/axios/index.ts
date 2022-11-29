import axios, { AxiosRequestConfig } from "axios"

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

instance.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers!.Authorization = localStorage.getItem("ACCESS_KEY")
    return config
})

export default instance
