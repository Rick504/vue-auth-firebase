export interface CreateChat {
  category?: string
  senderEmail: string
  recipientsEmails: string[]
  title: string
  content: string
}
