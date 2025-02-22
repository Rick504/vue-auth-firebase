import { SendEmailRefrashPassword } from '@/types/email'
import { httpEmails } from './config/axios'

class EmailService {
  public async sendEmailResetPassword(dataEmail: SendEmailRefrashPassword) {
    try {
      const response = await httpEmails.post('/send-refrash-password', dataEmail)

      return response
    } catch (error) {
      throw error
    }
  }
}

export default EmailService
