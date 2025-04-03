import { SendEmail } from '@/types/email'
import { httpEmails } from './config/axios'

class EmailService {
  public async sendEmailResetPassword(dataEmail: SendEmail) {
    try {
      const response = await httpEmails.post('/send-refrash-password', dataEmail)

      return response
    } catch (error) {
      throw error
    }
  }

  public async sendEmailActiveEmailAccount(dataEmail: SendEmail) {
    try {
      const response = await httpEmails.post('/send-active-account', dataEmail)

      return response
    } catch (error) {
      throw error
    }
  }
}

export default EmailService
