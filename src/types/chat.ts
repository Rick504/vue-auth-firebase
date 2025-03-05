export interface CreateChat {
  category?: string
  senderEmail: string
  recipientsEmails: string[]
  title: string
  content: string
}

export interface Ticket {
  id: number
  subject: string
  lastResponse: string
  status: string
}
