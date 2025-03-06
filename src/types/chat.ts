export interface CreateChat {
  category?: string
  senderEmail: string
  recipientsEmails: string[]
  title: string
  content: string
}

export interface Ticket {
  id: number
  title: string
  lastResponse: string
  status: string
}

export interface MapAllChats {
  id: string
  lastMessage: {
    title: string
    status: string
  }
  updatedAt: {
    _seconds: number
  }
}
