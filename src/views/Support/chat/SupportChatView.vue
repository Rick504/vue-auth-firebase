<template>
  <BtnBack link="/support" />
  <div class="d-flex justify-content-center align-items-center h-100 mt-5">
    <form @submit.prevent="createChat" class="p-4 border rounded shadow-sm w-75">
      <div class="mb-3">
        <label for="options" class="form-label">Categoria</label>
        <select name="options" id="options" class="form-select" v-model="selectedCategory">
          <option v-for="(option, index) in categorys" :key="index" :value="option.value">{{ option.label }}</option>
        </select>
        <ErrorMessage v-if="errorCategory" text="Escolha uma categoria." />
      </div>

      <div class="mb-3">
        <label for="subject" class="form-label">Assunto</label>
        <input type="text" id="subject" v-model="subject" class="form-control" placeholder="Assunto do chat" />
        <ErrorMessage v-if="errorSubject" text="O assunto deve ter pelo menos 3 caracteres." />
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">Mensagem</label>
        <textarea id="message" v-model="message" class="form-control" placeholder="Digite sua mensagem" rows="3"></textarea>
        <ErrorMessage v-if="errorMessage" text="A mensagem deve ter pelo menos 10 caracteres." />
      </div>

      <div class="d-grid w-25 mx-auto">
        <button type="submit" class="btn btn-success">
          <strong>Criar</strong>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BtnBack from '@/components/BtnBack.vue'
import ErrorMessage from '@/components/messages/ErrorMessage.vue'

import { useStore } from '@/stores'
import ChatService from '@/services/ChatService'
import router from '@/router'
const store = useStore()

const chatService = new ChatService()

const subject = ref('')
const selectedCategory = ref('')
const message = ref('')

import { categories } from '@/data/support/categories.json'
const categorys = categories

const errorSubject = ref(false)
const errorCategory = ref(false)
const errorMessage = ref(false)
const emailSupport = import.meta.env.VITE_SUPPORT_EMAIL

function clearErrorsForm() {
  errorCategory.value = false
  errorSubject.value = false
  errorMessage.value = false
}

async function createChat() {
  try {
    store.setLoader(true)
    clearErrorsForm()

    if (!selectedCategory.value) {
      errorCategory.value = true
      store.setLoader(false)
      return
    }

    if (!subject.value || subject.value.length < 3) {
      errorSubject.value = true
      store.setLoader(false)
      return
    }

    if (!message.value || message.value.length < 10) {
      errorMessage.value = true
      store.setLoader(false)
      return
    }

    if (!store.user.email || !store.user.name) {
      errorMessage.value = true
      store.setLoader(false)
      return
    }

    const chatData = {
      category: selectedCategory.value,
      authorName: store.user.name,
      authorEmail: store.user.email,
      recipientsEmails: [emailSupport],
      title: subject.value,
      content: message.value,
      type: 'support'
    }

    const result = await chatService.chatCreate(chatData)
    if (result) {
      store.setLoader(false)
      router.push({ path: '/success/support-send-email' })
    }
  } catch (error) {
    console.error('Error creating chat:', error)
    store.setLoader(false)
  }
}
</script>
