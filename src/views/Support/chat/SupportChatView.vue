<template>
  <BtnBack link="/support" />
  <div class="d-flex justify-content-center align-items-center h-100 mt-5">
    <form @submit.prevent="createChat" class="p-4 border rounded shadow-sm w-75">
      <div class="mb-3">
        <label for="options" class="form-label">Categoria</label>
        <select name="options" id="options" class="form-select">
          <option v-for="(option, index) in categorys" :key="index" :value="option.value">{{ option.label }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="subject" class="form-label">Assunto</label>
        <input type="text" :placeholder="subject" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">Mensagem</label>
        <textarea id="message" class="form-control" placeholder="Digite sua mensagem" rows="3"></textarea>
      </div>

      <button type="submit" class="btn btn-success">Iniciar chat</button>
    </form>
  </div>
</template>
<script setup lang="ts">
import BtnBack from '@/components/BtnBack.vue'

  const subject = 'Assunto do chat'
  const categorys = [
  { value: '1', label: 'Categoria 1' },
  { value: '2', label: 'Categoria 2' },
  { value: '3', label: 'Categoria 3' }
];

  function createChat() {
    // Create a new chat

  }
</script>
