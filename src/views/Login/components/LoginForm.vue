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

        <div class="mt-4">
          <button type="submit" class="btn btn-primary w-100">Entrar</button>
          <button @click.prevent="loginWithGoogle" class="btn border w-100 mt-2">
            <img
              src="/imgs/icons/svg/google.svg"
              width="20"
              class="me-2"
              alt="Google"
            />
            Entrar com Google
          </button>
        </div>
      </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../../../firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import AuthService from '../../../services/AuthService'
import UserService from '../../../services/UserService'
import { LoginWithGoole } from '../../../types/auth'

import { useStore } from '../../../stores/index'
const store = useStore()

const router = useRouter()
const email = ref('')
const password = ref('')
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
  try {
    if (email.value && password.value) {
      const userAuth = await authService.login(email.value, password.value)
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

const loginWithGoogle = async () => {
  isLoader(true)
  const provider = new GoogleAuthProvider()
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { user }: any = await signInWithPopup(auth, provider)
    const { displayName, email, photoURL } = user
    const dataGoogle: LoginWithGoole = {
      provider: 'google',
      idTokenGoogle: import.meta.env.VITE_PROVIDER_ID_GOOGLE,
      user: {
        name: displayName,
        email: email,
        photo: photoURL,
      },
    }

    const userAuthGoogle = await authService.loginWithGoogle(dataGoogle)
    if (userAuthGoogle) {
      const userInfo = await getInfoUser()
      store.user = userInfo
      router.push('/dashboard')
      errorLogin.value = false
      isLoader(false)
    }
  } catch {
    isLoader(false)
    console.error('Erro ao autenticar com Google:')
  }
}
</script>

<style>
/* Certifique-se de importar os ícones do Bootstrap no seu projeto */
@import 'https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css';
</style>
