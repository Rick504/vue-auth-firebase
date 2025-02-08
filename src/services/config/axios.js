import axios from 'axios'
import Cookies from 'js-cookie'

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_BACKEND,
  timeout: 10000, // Tempo de espera de 10 segundos
})

http.interceptors.request.use(
  (config) => {
    const token = Cookies.get('x-access-token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (response) => {
    const token = response.data?.token

    if (token) {
      Cookies.set('x-access-token', token, { expires: 1 / 24, secure: true })
    }
    return response
  },
  (error) => {
    console.error('Erro global de resposta:', error)
    return Promise.reject(error)
  },
)

export default http
