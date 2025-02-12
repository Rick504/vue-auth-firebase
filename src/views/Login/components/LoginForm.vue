<template>
  <div>
     <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">E-mail</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Digite seu e-mail"
            required
          />
        </div>

        <div class="mb-3 position-relative">
          <label for="password" class="form-label">Senha</label>
          <div class="input-group">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="form-control"
              placeholder="Digite sua senha"
              required
            />
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="togglePasswordVisibility"
            >
              <i :class="showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'"></i>
            </button>
          </div>
          <div class="mt-3" v-if="errorLogin">
            <p class="text-danger">Usuário ou senha incorretos</p>
          </div>
        </div>

        <label for="rememberMe" class="py-3">
          <input v-model="rememberMe" type="checkbox" id="rememberMe">
          Lembrar | <a href="">Esqueceu a senha</a>?
        </label>

        <button type="submit" class="btn btn-primary w-100">Entrar</button>
      </form>
      <div class="text-center mt-3 mb-2">
        <small>Conectar com:</small>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthService from '@/services/AuthService'
import UserService from '@/services/UserService'
import { LoginUserSimple } from '@/types/auth'

import { useStore } from '@/stores/index'
const store = useStore()

const router = useRouter()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const errorLogin = ref(false)
const showPassword = ref(false)
const authService = new AuthService()

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const isLoader = (value: boolean) => {
  return (store.loader = value)
}

const getInfoUser = async () => {
  const userService = new UserService()
  const { data } = await userService.getUserInfo()
  return data
}

const login = async () => {
  isLoader(true)
  const userInfoAuth: LoginUserSimple = {
    email: email.value,
    password: password.value,
    rememberMe: rememberMe.value
  }
  try {
    if (email.value && password.value) {
      const userAuth = await authService.login(userInfoAuth)
      if (userAuth) {
        const userInfo = await getInfoUser()
        store.user = userInfo
        router.push('/dashboard')
        errorLogin.value = false
        isLoader(false)
      }
    }
  } catch {
    isLoader(false)
    errorLogin.value = true
    console.error('Erro ao autenticar:')
  }
}


</script>

<style>
/* Certifique-se de importar os ícones do Bootstrap no seu projeto */
@import 'https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css';
</style>
