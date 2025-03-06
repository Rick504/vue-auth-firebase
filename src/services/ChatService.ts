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

  public async allChatsInfo(type: string) {
    try {
      const response = await http.post('/all-chats-info', { type })

      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default ChatService
