<template>
  <div class="d-flex flex-column justify-content-center align-items-center h-100 mt-5">
    <h1>Support</h1>
    <TableTickets :tickets="ticketsData" />
    <div class="mt-3">
      <a class="btn btn-success" href="/support-chat">Entrar em contato com suporte.</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TableTickets from './chat/TableTickets.vue'
import { Ticket } from '@/types/chat'

const ticketsData = ref<Ticket[]>([
  { id: 1, title: 'Problema no login', lastResponse: '2025-03-01', status: 'Aberto' },
  { id: 2, title: 'Erro no pagamento', lastResponse: '2025-03-02', status: 'Fechado' },
  { id: 3, title: 'Dúvida sobre o produto', lastResponse: '2025-03-03', status: 'Em andamento' },
])


</script>
