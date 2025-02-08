import http from './config/axios'
import { LoginWithGoole } from '../types/auth'

class AuthService {
  public async login(email: string, password: string) {
    try {
      const response = await http.post('/login', { email, password })
      return response.data
    } catch (error) {
      throw error
    }
  }

  public async loginWithGoogle(LoginWithGoole: LoginWithGoole) {
    try {
      const response = await http.post('/login/provider/google', LoginWithGoole)

      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default AuthService
