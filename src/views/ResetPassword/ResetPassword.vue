<template>
  <div class="d-flex justify-content-end w-100">
    <a href="/" class="btn">Voltar</a>
  </div>
  <div class="d-flex flex-column align-items-center justify-content-center vh-100">
     <form @submit.prevent="sendPassword" class="border border-3 p-5">
        <div class="mb-3">
          <label for="password" class="form-label">Nova senha</label>
          <input
              id="password"
              type="password"
              v-model="password"
              class="form-control"
              placeholder="Digite sua senha"
              required
            />
        </div>
        <div class="mb-3 position-relative">
          <label for="password" class="form-label">Confirme sua senha</label>
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
          <p  v-if="errorConfirmPassword" class="text-danger">As senhas não são iguais.</p>
          <p  v-if="errorLengthPassword" class="text-danger">Campo deve ter pelo menos {{minPassword}} caracteres.</p>
        </div>
        <button type="submit" class="btn btn-success w-100">Criar nova senha</button>
      </form>
  </div>
</template>
<script setup lang="ts">
import router from '@/router'
import UserService from '@/services/UserService'
import validator from 'validator'
import { ref } from 'vue'
import { useRoute } from 'vue-router';

const password = ref('')
const confirmPassword = ref('')
const errorConfirmPassword = ref(false)
const errorLengthPassword = ref(false)
const minPassword = 6

const route = useRoute();
const token = route.query.resetToken as string;

const userService = new UserService()

const isMinLength = (value: string, min: number) => {
  return validator.isLength(value, { min })
}

function clearErrors() {
  errorConfirmPassword.value = false
  errorLengthPassword.value = false
}

function sendPassword() {
  clearErrors()

  if (password.value !== confirmPassword.value) {
    errorConfirmPassword.value = true
    return
  }

   if (!isMinLength(password.value, minPassword)) {
    errorLengthPassword.value = true
    return
  }

  const passwords = {
    newPassword: password.value,
    confirmNewPassword: confirmPassword.value
  }

  if (token) {
    userService.refreshPasswordToken(passwords, token).then(
      () => {
        router.push('/reset-password-success')
      }
    ).catch(
      (error) => {
        console.log('error:', error)
      }
    )
  }
}

</script>
