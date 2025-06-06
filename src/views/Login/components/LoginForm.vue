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
          <ErrorMessage v-if="errorLogin" text="Usuário ou senha incorretos" />
        </div>

        <label for="rememberMe" class="py-3 d-flex align-items-center">
          <div>
            <input v-model="rememberMe" type="checkbox" id="rememberMe"> Lembrar |
          </div>
          <ModalForgotEmail />
        </label>

        <div class="d-flex align-items-center justify-content-center">
          <BtnCuve type="submit" text="Entrar" />
        </div>
      </form>
      <div class="text-center mt-3 mb-2">
        <small>Conectar com:</small>
      </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthService from '@/services/AuthService'
import UserService from '@/services/UserService'
import { LoginUserSimple } from '@/types/auth'
import ModalForgotEmail from './components/ModalForgotEmail.vue'
import Cookies from 'js-cookie'
import ErrorMessage from '@/components/messages/ErrorMessage.vue'
import BtnCuve from '@/components/BtnCuve.vue'

import { useStore } from '@/stores/index'
import { StoreUser } from '@/types/user'
const store = useStore()

const router = useRouter()
const email = ref('')
const password = ref('')
const errorLogin = ref(false)
const showPassword = ref(false)
const authService = new AuthService()
const rememberMe = ref(false)

const userService = new UserService()

onMounted(async () => {
  const tokenRememberLogin = Cookies.get('remember_me')
  if (tokenRememberLogin) {
    store.tokenRememberLogin = tokenRememberLogin as string
    const { decoded_token } = await userService.getRememberUser(tokenRememberLogin)

    email.value = decoded_token.userDataJWT.email
    rememberMe.value = true
  }
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const getInfoUser = async () => {
  const userService = new UserService()
  const { data } = await userService.getUserInfo()
  return data
}

function removeTokenRemember() {
  if (!rememberMe.value) {
    Cookies.remove('remember_me')
    store.tokenRememberLogin = ''
  }
}

const login = async () => {
  removeTokenRemember()
  store.setLoader(true)
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
        store.user = userInfo as StoreUser
        router.push('/')
        errorLogin.value = false
        store.setLoader(false)
      }
    }
  } catch {
    store.setLoader(false)
    errorLogin.value = true
    console.error('Erro ao autenticar:')
  }
}


</script>

<style>
/* Certifique-se de importar os ícones do Bootstrap no seu projeto */
@import 'https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css';
</style>
