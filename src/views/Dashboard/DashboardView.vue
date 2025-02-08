<template>
  <div v-if="store.user" class="text-center mt-5">
    <div>
      <ImgProfile />
    </div>
    <p>Bem-vindo, {{ store.user.displayName }}</p>
    <p>Nome: {{ store.user.name }}</p>
    <p>Email: {{ store.user.email }}</p>
    <button class="btn border" @click="logout">Sair</button>
  </div>
  <div v-else>
    <p>Você não está logado.</p>
  </div>
</template>

<script setup lang="ts">
import router from '../../router';
import { useStore } from '../../stores/index'
import ImgProfile from './componentes/ImgProfile.vue'

const store = useStore()

const logout = () => {
  router.push("/");
  store.user = {}
}
</script>
