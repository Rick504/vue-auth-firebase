import http from './config/axios'

class AuthService {
  public async login(email: string, password: string){
    try {
      const response = await http.post('/login', { email, password })
      return response.data
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      throw error
    }
  }
}

export default AuthService

