<template>
  <div id="LoginForm" class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%">
      <h2 class="text-center mb-3 gap-5 ">
        <button @click="toggleLoginVisibility(true)" class="btn border">Entrar</button>
        <button @click="toggleLoginVisibility(false)" class="btn border">Registro</button>
      </h2>
      <LoginForm v-if="showLogin" />
      <RegisterForm v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'

const showLogin = ref(true)

const toggleLoginVisibility = (value: boolean) => {
  showLogin.value = value
}

</script>

