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
      <ErrorMessage v-if="textPositions.errorUserName" :text="textPositions.errorUserName" />

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
      <ErrorMessage v-if="textPositions.errorEmail" :text="textPositions.errorEmail" />

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
        <ErrorMessage v-if="textPositions.errorConfirmPassword" :text="textPositions.errorConfirmPassword" />
      </div>

      <TermText v-if="!props.updateAccount" />
      <ErrorMessage v-if="textPositions.errorRegisterUser" :text="textPositions.errorRegisterUser" />

      <div class="mt-4">
        <button type="submit" class="btn btn-success w-100">{{ props.updateAccount? 'Atualizar conta' : 'Registrar' }}</button>
      </div>
    </form>
    <div v-if="!props.updateAccount" class="text-center mt-3 mb-2">
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
import ErrorMessage from '@/components/messages/ErrorMessage.vue'

import { useStore } from '@/stores/index'
import router from '@/router'
const store = useStore()

const props = defineProps<{
  updateAccount: boolean
}>()

const userName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const userService = new UserService()


const textPositions = ref<{ [key: string]: string }>({
  errorUserName: '',
  errorEmail: '',
  errorConfirmPassword: '',
  errorRegisterUser: ''
})

if (store.user) {
  userName.value = store.user.name || ''
  email.value = store.user.email || ''
}

function clearErrorsForm() {
  setError('errorUserName', '')
  setError('errorEmail', '')
  setError('errorConfirmPassword', '')
  setError('errorRegisterUser', '')
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

const register = async () => {
  store.setLoader(true)
  clearErrorsForm()

  if (!validateMinLength('errorUserName', userName.value, 6) || !validateUserName(userName.value)) {
    store.setLoader(false)
    return
  }

  if (!isEmailValid(email.value)) {
    setError('errorEmail', 'Por favor, insira um e-mail válido.')
    store.setLoader(false)
    return
  }

  if (password.value !== confirmPassword.value) {
    setError('errorConfirmPassword', 'As senhas não são iguais.')
    store.setLoader(false)
    return
  }

  if (!validateMinLength('errorPassword', password.value, 6) || !validateMinLength('errorConfirmPassword', confirmPassword.value, 6)) {
    store.setLoader(false)
    return
  }

  try {
    if (userName.value && email.value && password.value) {
      const user: CreateUser = {
        name: userName.value.trim(),
        email: email.value.trim(),
        password: password.value,
      }

      if (!props.updateAccount) {
        clearErrorsForm()
        const userSave = await userService.registerUser(user)

        if (userSave) {
          const userInfo = await getInfoUser()
          store.user = userInfo as StoreUser
          router.push('/')
          store.setLoader(false)
        }

      } else {
        const userUpdateSuccess = await userService.updateAccontUser(user)
        if (userUpdateSuccess.status === 200) {
          router.push('/success/updated-account')
          store.resetUser()
          store.setLoader(false)
        }
      }
    }
  } catch {
    store.setLoader(false)
    setError('errorRegisterUser', 'Erro ao efetuar login, talvez este e-mail já está em uso. Tente fazer login ou cadastre-se com outro endereço de e-mail.')
  }
}

</script>
