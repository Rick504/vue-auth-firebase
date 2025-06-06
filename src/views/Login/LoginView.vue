<template>
  <div id="LoginForm" class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%">
      <h2 class="d-flex justify-content-around mb-3">
        <BtnLoudSquid @click="toggleLoginVisibility(true)" text="Entrar" />
        <BtnLoudSquid @click="toggleLoginVisibility(false)" text="Registro" />
      </h2>

      <div>
        <LoginForm v-if="showLogin" />
        <RegisterForm v-else :updateAccount="false" :fieldEmail="true" />
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

        <ErrorMessage v-if="errorLoginGoole" :text="textErrorLoginGoogle" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref } from 'vue'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import BtnLoudSquid from '@/components/BtnLoudSquid.vue'

import { auth } from '@/firebase'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { LoginWithGoole } from '@/types/auth'
import AuthService from '@/services/AuthService'
import UserService from '@/services/UserService'
import ErrorMessage from '@/components/messages/ErrorMessage.vue'

import router from '@/router'
import { StoreUser } from '@/types/user'

import { useStore } from '@/stores/index'
const store = useStore()

const authService = new AuthService()
const showLogin = ref(true)
const errorLoginGoole = ref(false)
const textErrorLoginGoogle = ref('Erro ao realizar login com Google, tente novamente mais tarde, caso não tenha sucesso entre em contato com suporte.')

const userService = new UserService()

onMounted(() => {
  store.loader = false
})

const toggleLoginVisibility = (value: boolean) => {
  showLogin.value = value
}

const getInfoUser = async () => {
  const { data } = await userService.getUserInfo()
  return data
}

const loginWithGoogle = async () => {
  store.setLoader(true)
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
      store.setLoader(false)
    }
  } catch (error){
    store.setLoader(false)
    errorLoginGoole.value = true
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    textErrorLoginGoogle.value = error.response.data.error
  }

}

</script>

