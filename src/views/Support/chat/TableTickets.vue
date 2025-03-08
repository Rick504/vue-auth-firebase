<template>
  <div class="w-75">
    <h3 class="mt-5">Solicitações recentes</h3>
    <div v-if="tickets.length > 0">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Assunto</th>
            <th scope="col">Última resposta</th>
            <th scope="col">Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in tickets" :key="ticket.id">
            <th scope="row">
              <button class="btn" @click="goToChat(ticket.id.toString())">
                <strong>{{ ticket.title }}</strong>
              </button>
            </th>
            <td>{{ formatDate(ticket.lastResponse) }}</td>
            <td>{{ getStatusLabel(ticket.status) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="alert alert-info" role="alert">
      Não há solicitações recentes.
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, watch } from 'vue'
import { Ticket } from '@/types/chat'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const props = defineProps<{ ticketsData: Ticket[] }>()
const tickets = ref(props.ticketsData || [])
const router = useRouter()
const shouldShowAlert = computed(() => !tickets.value.length)

watch(() => props.ticketsData, (newTickets) => {
  tickets.value = newTickets
}, { immediate: true })

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'open':
      return 'Aberto';
    case 'closed':
      return 'Fechado';
    default:
      return 'Desconhecido';
  }
}

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('pt-BR', options)
}

const goToChat = (id: string) => {
  router.push({ name: 'MessagesView', params: { id } })
}
</script>
