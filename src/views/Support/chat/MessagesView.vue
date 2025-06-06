<template>
  <BtnBack link="/support" />
  <div class="w-100 px-5">
    <div class="support-messages-container mt-5">
      <div class="chat-header">
        <h3>Mensagens do Suporte</h3>
      </div>
      <div v-if="!messages || messages.length === 0" role="alert">
        Carregando mensagens...
      </div>
      <div v-else class="messages-list" ref="messagesList">
        <ul class="list-group">
          <li v-for="(message) in sortedMessages" :key="message.id"
          :class="['list-group-item', getMessageClass(message.authorName)]">
          <div class="message-header">
              <strong>{{ message.authorName }}</strong>
              <span class="message-date">{{ formatDate(message.timestamp) }}</span>
            </div>
            <div class="message-content">{{ message.content }}</div>
          </li>
        </ul>
        <button v-if="messages.length > 0" class="btn btn-primary scroll-btn" @click="scrollToLastMessage" :class="{ 'd-none': !showScrollButton }">
          Ir para última mensagem
        </button>
      </div>
      <div class="response-section" v-if="canRespond">
        <textarea v-model="response" class="response-input" placeholder="Responder"></textarea>
        <div v-if="errorSendMessage" class="text-danger w-100" role="alert">
          A resposta deve ter no mínimo 10 caracteres.
        </div>
        <button class="btn btn-success" @click="sendMessage">Enviar resposta</button>
      </div>
      <div v-else class="text-center" ref="scrollButton">
          Aguarde a resposta do suporte.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watchEffect, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import ChatService from '@/services/ChatService'
import BtnBack from '@/components/BtnBack.vue'
import { formatDate } from '@/utils/formatDate'
import { CreateMessageChat } from '@/types/chat'
import router from '@/router'
import { useStore } from '@/stores/index'

const store = useStore()
const route = useRoute()
const chatId = route.params.id
const chatService = new ChatService()
const messages = ref<CreateMessageChat[]>([])
const response = ref('')
const errorSendMessage = ref(false)
const showScrollButton = ref(false)
const messagesList = ref<HTMLElement | null>(null)

onMounted(async () => {
  store.setLoader(true)
  const result = await chatService.getMessagesChat(chatId as string)
  if (result) store.setLoader(false)
  messages.value = result.messages.sort((a, b) => a.timestamp._seconds - b.timestamp._seconds)

  await nextTick()
  checkScroll()
})

const checkScroll = () => {
  if (messagesList.value) {
    showScrollButton.value = messagesList.value.scrollHeight > messagesList.value.clientHeight
  }
}

watchEffect(() => {
  messages.value.length
  nextTick(checkScroll)
})

const getMessageClass = (authorName: string) => {
  return authorName === store.user.name ? 'other-message' : 'own-message'
}

const scrollToLastMessage = () => {
  if (messagesList.value) {
    messagesList.value.scrollTop = messagesList.value.scrollHeight
    showScrollButton.value = false
  }
}

const sortedMessages = computed(() => messages.value)

const canRespond = computed(() => {
  const lastMessage = messages.value[messages.value.length - 1]
  return lastMessage && lastMessage.authorName !== store.user.name
})

const sendMessage = async () => {
  if (response.value.trim().length < 10) {
    errorSendMessage.value = true
    return
  }
  errorSendMessage.value = false

  if (!response.value || !chatId) {
    errorSendMessage.value = true
    return
  }
  const senderId = messages.value.length > 0 ? messages.value[0].senderId : null

  if (!store.user.name || !store.user.email) {
    return router.push({ name: 'Login' })
  }

  if (senderId) {
    const dataSendMessage: CreateMessageChat = {
      content: response.value,
      authorName: store.user.name,
      authorEmail: store.user.email,
      senderId: senderId,
      chatId: chatId as string
    }

    await chatService.createMessagesChat(dataSendMessage)
    router.go(0)
  }
}
</script>

<style scoped>
.scroll-btn {
  background-color: rgb(100, 100, 223);
  border-radius: 30px;
  position: sticky;
  bottom: 10px;
  left: 43%;
  align-self: flex-start;
  z-index: 1;
}

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
