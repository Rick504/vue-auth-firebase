<template>
  <BtnBack link="/support" />
  <div class="w-100 px-5">
    <div class="support-messages-container mt-5">
    <div class="chat-header">
      <h3>Mensagens do Suporte</h3>
    </div>
    <div v-if="!messages || messages.length === 0" class="alert alert-danger" role="alert">
      Não há mensagens para este chat.
    </div>
    <div v-else class="messages-list">
      <ul class="list-group">
        <li v-for="message in messages" :key="message.id" class="list-group-item">
          <div class="message-header">
            <strong>{{ message.senderName }}</strong>
            <span class="message-date">{{ formatDate(message.timestamp) }}</span>
          </div>
          <div class="message-content">{{ message.content }}</div>
        </li>
      </ul>
    </div>
    <div class="response-section">
      <textarea class="response-input" placeholder="Responder"></textarea>
      <button class="btn btn-success">Enviar resposta</button>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ChatService from '@/services/ChatService'
import BtnBack from '@/components/BtnBack.vue'
import { Message } from '@/types/chat'
import { formatDate } from '@/utils/formatDate'

const route = useRoute()
const chatId = route.params.id as string

const chatService = new ChatService()

const messages = ref<Message[]>([])

onMounted(async () => {
  const result = await chatService.getMessagesChat(chatId)
  messages.value = result.messages
})
</script>

<style scoped>
.support-messages-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.chat-header {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
}

.messages-list {
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.list-group-item {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.message-content {
  font-size: 14px;
}

.response-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.response-input {
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.btn-success {
  align-self: flex-end;
}
</style>
