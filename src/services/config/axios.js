import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_BACKEND,
  timeout: 10000, // Tempo de espera de 10 segundos
})

// Interceptadores (opcional)
http.interceptors.request.use(
  (config) => {
    // Aqui você pode adicionar cabeçalhos personalizados (exemplo: token de autenticação)
    // config.headers['Authorization'] = 'Bearer ' + token;
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Aqui você pode lidar com erros globais
    console.error('Erro global de resposta:', error)
    return Promise.reject(error)
  },
)

export default http
