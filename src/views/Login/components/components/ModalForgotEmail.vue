<template>
  <div>
    <button class="btn" type="button" data-bs-toggle="modal" data-bs-target="#ModalForgotEmail">
      Esqueceu a senha?
    </button>

    <div
      class="modal fade"
      id="ModalForgotEmail"
      tabindex="-1"
      aria-labelledby="ModalForgotEmail"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <form @submit.prevent="sendEmail" class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="ModalForgotEmailLabel">Esqueci Minha Senha</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="clearModal"
            ></button>
          </div>
          <div class="modal-body">
            <p>
              Enviamos um e-mail com as instruções para redefinir sua senha. Verifique sua caixa de
              entrada (e também a pasta de spam) e siga o link para criar uma nova senha.
            </p>
            <p>
              Caso não receba o e-mail em alguns minutos, tente novamente ou entre em contato com o
              suporte.
            </p>
            <p>Digite seu e-mail abaixo:</p>
            <input v-model="email" type="text" />
            <p v-if="erroEmail" class="text-danger" v-text="msgError"></p>
            <p v-if="successSend" class="text-success mt-2">
              E-mail enviado com sucesso! <br>
              Por favor, verifique sua caixa de entrada.
            </p>
          </div>
          <div class="modal-footer d-flex justify-content-start">
            <button type="submit" class="btn btn-success px-5" :disabled="isSending">
              <strong>Enviar</strong>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import EmailService from '@/services/EmailService'
import UserService from '@/services/UserService'
import validator from 'validator'
import { ref } from 'vue'

const email = ref('')
const linkRefrashPassword = ref('')
const msgError = ref('')
const erroEmail = ref(false)
const isSending = ref(false)
const successSend = ref(false)

const userService = new UserService()
const emailService = new EmailService()

const clearModal = () => {
  isSending.value = false
  email.value = ''
}

const isEmailValid = (email: string) => {
  return validator.isEmail(email)
}

const insertError = (error: boolean, text: string) => {
  if (error) {
    erroEmail.value = true
    isSending.value = false
    return (msgError.value = text)
  }

  erroEmail.value = false
  return (msgError.value = '')
}

async function sendEmail() {
  isSending.value = true
  insertError(false, '')

  if (!isEmailValid(email.value)) {
    insertError(true, 'Por favor, insira um E-mail válido.')
    return
  }

  const responseEmailService = await userService
    .requestPasswordReset(email.value)
    .then((response) => {
      linkRefrashPassword.value =  response.resetLink
      successSend.value = true
      return response
    })
    .catch((error) => {
      const axiosError = error
      if (axiosError.response?.status === 404) {
        insertError(true, 'Usuário não encontrado.')
        return
      }

      if (axiosError.response?.status === 422) {
        insertError(true, `A redefinição de senha não está disponível para contas criadas com o Google. Use a opção 'Entrar com Google' na tela de login.`)
        return
      }
    })

  if (responseEmailService) {
     const dataEmail = {
      to: email.value,
      link: linkRefrashPassword.value,
    }

    const responseEmailService = await emailService.sendEmailResetPassword(dataEmail)

    if (responseEmailService)
      return isSending.value = true
  }
}
</script>

<style scoped>
#ModalForgotEmail {
  margin-top: 10rem;
}

.modal-content {
  padding: 1rem;
}
</style>
