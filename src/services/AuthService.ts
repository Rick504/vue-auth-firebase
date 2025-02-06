import http from './config/axios'
import Cookies from 'js-cookie'

class AuthService {
  public async login(email: string, password: string) {
    try {
      const response = await http.post('/login', { email, password })
      const token = response.data?.token

      if (token) {
        Cookies.set('x-access-token', token, { expires: 7, secure: true })
      }

      return response.data
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      throw error
    }
  }
}

export default AuthService
