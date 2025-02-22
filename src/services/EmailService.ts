import { httpEmails } from './config/axios'

class UserService {
  public async sendEmailResetPassword() {
    try {
      const response = await httpEmails.post('/send-email')

      return response
    } catch (error) {
      throw error
    }
  }
}

export default UserService
