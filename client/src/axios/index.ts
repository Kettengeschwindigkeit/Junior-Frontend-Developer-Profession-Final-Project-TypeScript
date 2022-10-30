import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
})

instance.interceptors.request.use((config: any) => {
    config.headers.Authorization = window.localStorage.getItem("ACCESS_KEY")
    return config
})

export default instance
