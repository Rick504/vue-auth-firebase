<template>
  <div class="w-75">
    <h3 class="mt-5">Solicitações recentes</h3>
    <div v-if="tickets.length === 0 || tickets === null" class="alert alert-info" role="alert">
      Não há solicitações recentes.
    </div>
    <div v-else>
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
              <button class="btn">
                <strong>{{ ticket.subject }}</strong>
              </button>
            </th>
            <td>{{ ticket.lastResponse }}</td>
            <td>{{ ticket.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Ticket } from '@/types/chat'

const props = defineProps<{ tickets: Ticket[] }>()

const tickets = props.tickets
</script>
