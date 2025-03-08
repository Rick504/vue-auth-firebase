<template>
  <div class="d-flex flex-column justify-content-center align-items-center h-100 mt-5">
    <h1>Support</h1>
    <TableTickets :ticketsData="ticketsData" />
    <div class="mt-3">
      <a class="btn btn-success" href="/support-chat">Entrar em contato com suporte.</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TableTickets from './chat/TableTickets.vue'
import { MapAllChats, Ticket } from '@/types/chat'
import ChatService from '@/services/ChatService'

import { useStore } from '@/stores/index'
const store = useStore()

const chatService = new ChatService()
const ticketsData = ref<Ticket[]>([])
const type = 'support'

onMounted(async () => {
  try {
    store.setLoader(true)
    const result = await chatService.allChatsInfo(type)

    ticketsData.value = result.chatsInfo.map((chat: MapAllChats) => ({
      id: chat.id,
      title: chat.lastMessage.title,
      lastResponse: new Date(chat.updatedAt._seconds * 1000).toISOString().split('T')[0],
      status: chat.lastMessage.status
    }))
    store.setLoader(false)
  } catch (error) {
    store.setLoader(false)
    console.error('Erro ao buscar informações dos chats:', error)
  }
})
</script>
