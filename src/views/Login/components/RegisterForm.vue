<template>
  <div>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="userName" class="form-label">Nome</label>
        <input
          id="name"
          v-model="userName"
          type="text"
          class="form-control"
          placeholder="Digite seu nome"
          required
        />
      </div>
      <div class="mt-3" v-if="textPositions.errorUserName">
        <p class="text-danger">{{ textPositions.errorUserName }}</p>
      </div>

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
      <div class="mt-3" v-if="textPositions.errorEmail">
        <p class="text-danger">{{ textPositions.errorEmail }}</p>
      </div>

      <div class="mb-3 position-relative">
        <label for="password" class="form-label">Senha</label>
        <div class="input-group">
          <input
            id="password"
            type="password"
            v-model="password"
            class="form-control"
            placeholder="Digite sua senha"
            required
          />
        </div>
      </div>

      <div class="mb-3 position-relative">
        <label for="confirmPassword" class="form-label">Confirme sua senha</label>
        <div class="input-group">
          <input
            id="confirmPassword"
            type="password"
            v-model="confirmPassword"
            class="form-control"
            placeholder="Digite sua senha"
            required
          />
        </div>
        <div class="mt-3" v-if="textPositions.errorConfirmPassword">
          <p class="text-danger">{{ textPositions.errorConfirmPassword }}</p>
        </div>
      </div>

      <TermText />

      <div class="mt-4">
        <button type="submit" class="btn btn-success w-100">Registrar</button>
      </div>
    </form>
    <div class="text-center mt-3 mb-2">
      <small>Ou registre-se com:</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import validator from 'validator'
import TermText from './components/TermText.vue'
import UserService from '@/services/UserService'
import { CreateUser, StoreUser } from '@/types/user'

import { useStore } from '@/stores/index'
import router from '@/router'
const store = useStore()

const userName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const userService = new UserService()

const textPositions = ref({
  errorUserName: '',
  errorEmail: '',
  errorConfirmPassword: '',
})

function clearErrorsForm() {
  setError('errorUserName', '')
  setError('errorEmail', '')
  setError('errorConfirmPassword', '')
}

const getInfoUser = async () => {
  const userService = new UserService()
  const { data } = await userService.getUserInfo()
  return data
}

function validateMinLength(field: string, value: string, min: number) {
  if (!isMinLength(value, min)) {
    setError(field, `Campo deve ter pelo menos ${min} caracteres.`)
    return false
  }
  return true
}

function validateUserName(value: string) {
  const userNameRegex = /^[^\d]*$/
  if (!userNameRegex.test(value)) {
    setError('errorUserName', 'Nome de usuário não pode conter números.')
    return false
  }
  return true
}

const isEmailValid = (email: string) => {
  return validator.isEmail(email)
}

const isMinLength = (value: string, min: number) => {
  return validator.isLength(value, { min })
}

const setError = (position: string, text: string) => {
  textPositions.value[position] = text
}

const isLoader = (value: boolean) => {
  return (store.loader = value)
}

const register = async () => {
  isLoader(true)
  clearErrorsForm()

  if (!validateMinLength('errorUserName', userName.value, 6) || !validateUserName(userName.value)) {
    isLoader(false)
    return
  }

  if (!isEmailValid(email.value)) {
    setError('errorEmail', 'Por favor, insira um e-mail válido.')
    isLoader(false)
    return
  }

  if (password.value !== confirmPassword.value) {
    setError('errorConfirmPassword', 'As senhas não são iguais.')
    isLoader(false)
    return
  }

  if (!validateMinLength('errorPassword', password.value, 6) || !validateMinLength('errorConfirmPassword', confirmPassword.value, 6)) {
    isLoader(false)
    return
  }

  try {
    if (userName.value && email.value && password.value) {
      const user: CreateUser = {
        name: userName.value.trim(),
        email: email.value.trim(),
        password: password.value,
      }
      clearErrorsForm()
      const userSave = await userService.registerUser(user)
      if (userSave) {
        const userInfo = await getInfoUser()
        store.user = userInfo as StoreUser
        router.push('/dashboard')
        isLoader(false)
      }
    }
  } catch {
    isLoader(false)
  }
}

</script>
