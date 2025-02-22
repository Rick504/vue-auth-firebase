import {http} from './config/axios'
import { LoginWithGoole, LoginUserSimple } from '../types/auth'

class AuthService {
  public async login(dataUser: LoginUserSimple) {
    try {
      const response = await http.post('/login', dataUser)
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
