import { CreateUser } from '../types/user'
import http from './config/axios'

class UserService {
  public async getUserInfo() {
    try {
      const response = await http.get('/user')

      return response.data
    } catch (error) {
      throw error
    }
  }

  public async registerUser(user: CreateUser) {
    try {
      const response = await http.post('/register', user)

      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default UserService
