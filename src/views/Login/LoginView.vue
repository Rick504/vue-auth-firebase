<template>
  <div id="LoginForm" class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%">
      <h2 class="d-flex justify-content-around mb-3">
        <button class="btn text-white btn-success border px-5" @click="toggleLoginVisibility(true)">Entrar</button>
        <button class="btn text-white btn-success border px-5" @click="toggleLoginVisibility(false)">Registro</button>
      </h2>

      <div>
        <LoginForm v-if="showLogin" />
        <RegisterForm v-else />
      </div>

      <div class="text-center">
          <button @click.prevent="loginWithGoogle" class="btn border">
            <img
              src="/imgs/icons/svg/google.svg"
              width="20"
              alt="Google"
            />
          </button>
        </div>

        <div class="mt-3 text-center" v-if="errorLoginGoole">
          <p class="text-danger">{{ textErrorLoginGoogle }}</p>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref } from 'vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'

import { auth } from '@/firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { LoginWithGoole } from '@/types/auth'
import AuthService from '@/services/AuthService'
import UserService from '@/services/UserService'

import { useStore } from '@/stores/index'
import router from '@/router'
import { StoreUser } from '@/types/user'
const store = useStore()

const authService = new AuthService()
const showLogin = ref(true)
const errorLoginGoole = ref(false)
const textErrorLoginGoogle = ref('Erro ao realizar login com Google, entre em contato com <a href="/suporte">suporte</a>.')

const userService = new UserService()

onMounted(() => {
  store.loader = false
})

const toggleLoginVisibility = (value: boolean) => {
  showLogin.value = value
}

const isLoader = (value: boolean) => {
  return (store.loader = value)
}

const getInfoUser = async () => {
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
      store.user = userInfo as StoreUser
      store.user.provider = true
      router.push('/')
      isLoader(false)
    }
  } catch (error){
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    textErrorLoginGoogle.value = error.response.data.error
    isLoader(false)
    errorLoginGoole.value = true
  }

}

</script>

