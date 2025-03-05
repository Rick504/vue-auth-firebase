import { CreateChat } from '@/types/chat'
import { http } from './config/axios'

class ChatService {
  public async chatCreate(dataChat: CreateChat) {
    try {
      const response = await http.post('/chat-create', dataChat)

      return response
    } catch (error) {
      throw error
    }
  }
}

export default ChatService
