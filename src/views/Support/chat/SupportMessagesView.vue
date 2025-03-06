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
          <li v-for="(message, index) in sortedMessages" :key="message.id"
          :class="['list-group-item', { 'own-message': index % 2 !== 0, 'other-message': index % 2 === 0 }]">
          <div class="message-header">
              <strong>{{ message.senderName }}</strong>
              <span class="message-date">{{ formatDate(message.timestamp) }}</span>
            </div>
            <div class="message-content">{{ message.content }}</div>
          </li>
        </ul>
      </div>
      <div class="response-section" v-if="!canRespond">
        <textarea v-model="response" class="response-input" placeholder="Responder"></textarea>
        <div v-if="errorSendMessage" class="text-danger w-100" role="alert">
          A resposta deve ter no mínimo 10 caracteres.
        </div>
        <button class="btn btn-success" @click="sendMessage">Enviar resposta</button>
      </div>
      <div v-else class="alert" role="alert">
        Aguarde a resposta do suporte.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import ChatService from '@/services/ChatService'
import BtnBack from '@/components/BtnBack.vue'
import { formatDate } from '@/utils/formatDate'
import { CreateMessageChat } from '@/types/chat'
import router from '@/router'

const route = useRoute()
const chatId = route.params.id
const chatService = new ChatService()
const messages = ref<CreateMessageChat[]>([])
const response = ref('')
const errorSendMessage = ref(false)

onMounted(async () => {
  const result = await chatService.getMessagesChat(chatId as string)
  messages.value = result.messages.sort((a, b) => a.timestamp._seconds - b.timestamp._seconds)
})

const sortedMessages = computed(() => messages.value)

const canRespond = computed(() => messages.value.length % 2 !== 0)

const sendMessage = async () => {
  if (response.value.trim().length < 10){
    errorSendMessage.value = true
    return
  }
  errorSendMessage.value = false

  if (!response.value || !chatId) {
    errorSendMessage.value = true
    return
  }
  const senderId = messages.value.length > 0 ? messages.value[0].senderId : null;

  if (senderId) {
    const dataSendMessage: CreateMessageChat = {
      content: response.value,
      senderId: senderId,
      chatId: chatId as string
    }

    await chatService.createMessagesChat(dataSendMessage)
    router.go(0)
  }
}
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

.own-message {
  align-self: flex-end;
  width: 40%;
  background-color: #d4edda;
}

.other-message {
  align-self: flex-start;
  width: 40%;
  background-color: #fffdfd;
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
