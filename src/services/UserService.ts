import { CreateUser, NewPasswords } from '../types/user'
import { http } from './config/axios'

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

  public async deleteAccontUser() {
    try {
      const response = await http.delete('/delete/user')

      return response
    } catch (error) {
      throw error
    }
  }

  public async requestPasswordReset(email: string) {
    try {
      const response = await http.post('/request/password/reset', { email })

      return response.data
    } catch (error) {
      throw error
    }
  }

  public async refreshPasswordToken(passwords: NewPasswords, token: string) {
    try {
      const response = await http.post('/refresh/password/token', passwords, {
        headers: {
          reset_token: `Bearer ${token}`,
        },
      })

      return response.data
    } catch (error) {
      throw error
    }
  }

  public async getRememberUser(token: string) {
    try {
      const response = await http.get('/token/info', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default UserService
