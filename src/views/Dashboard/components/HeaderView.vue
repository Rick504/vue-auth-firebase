<template>
  <EmailConfirmed v-if="!store.user.emailConfirmed" />
  <div class="d-flex justify-content-end w-100 p-3">

    <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="bi bi-gear"></i>
    </button>
    <ul class="dropdown-menu p-2" aria-labelledby="dropdownMenuButton1">
      <li class="p-1"><a class="dropdown-item" href="/">Página principal</a></li>
      <li class="p-1"><a class="dropdown-item" href="/profile">Conta</a></li>
      <li class="p-1"><a class="dropdown-item" href="/support">Suporte</a></li>
      <li class="p-1"><button class="dropdown-item" @click="logout">Sair</button></li>
    </ul>
  </div>

  </div>
</template>
<script setup lang="ts">
import EmailConfirmed from '../../../components/EmailConfirmed.vue'
import router from '@/router'
import { useStore } from '@/stores/index'
const store = useStore()

const logout = () => {
  router.push('/login')
  store.resetUser()
}
</script>
