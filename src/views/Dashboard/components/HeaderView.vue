<template>
  <div class="d-flex justify-content-end w-100 p-3">

    <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
      <i class="bi bi-gear"></i>
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
      <li><a class="dropdown-item" href="#">Conta</a></li>
      <li><button class="dropdown-item" @click="logout">Sair</button></li>
    </ul>
  </div>

  </div>
</template>
<script setup lang="ts">
import router from '@/router'
import { useStore } from '@/stores/index'
import { StoreUser } from '@/types/user'
const store = useStore()

const logout = () => {
  router.push('/')
  store.user = {
      name: null,
      email: null,
      photo: ''
    } as StoreUser
}
</script>
