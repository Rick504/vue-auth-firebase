<template>
  <div id="LoginForm" class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%">
      <h2 class="text-center mb-3 gap-5 ">
        <button @click="toggleLoginVisibility(true)" class="btn border">Entrar</button>
        <button @click="toggleLoginVisibility(false)" class="btn border">Registro</button>
      </h2>
      <LoginForm v-if="showLogin" />
      <RegisterForm v-else />

      <div class="text-center">
          <button @click.prevent="loginWithGoogle" class="btn border">
            <img
              src="/imgs/icons/svg/google.svg"
              width="20"
              alt="Google"
            />
          </button>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref } from 'vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'

import { auth } from '../../firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { LoginWithGoole } from '../../types/auth'
import AuthService from '../../services/AuthService'
import UserService from '../../services/UserService'

import { useStore } from '../../stores/index'
import router from '../../router'
const store = useStore()

const authService = new AuthService()
const showLogin = ref(true)

const toggleLoginVisibility = (value: boolean) => {
  showLogin.value = value
}

const isLoader = (value: boolean) => {
  return (store.loader = value)
}

const getInfoUser = async () => {
  const userService = new UserService()
  const { data } = await userService.getUserInfo()
  return data
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
      isLoader(false)
    }
  } catch {
    isLoader(false)
    console.error('Erro ao autenticar com Google:')
  }
}

</script>

