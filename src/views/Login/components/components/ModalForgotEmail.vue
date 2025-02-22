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
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="ModalForgotEmailLabel">Esqueci Minha Senha</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
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
          </div>
          <div class="modal-footer d-flex justify-content-start">
            <button @click="sendEmail" type="button" class="btn btn-success px-5">
              <strong>Enviar</strong>
            </button>
          </div>
        </div>
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
const msgError = ref('')
const erroEmail = ref(false)

const userService = new UserService()
const emailService = new EmailService()

const isEmailValid = (email: string) => {
  return validator.isEmail(email)
}

const insertError = (error: boolean, text: string) => {
  if (error) {
    erroEmail.value = true
    return (msgError.value = text)
  }

  erroEmail.value = false
  return (msgError.value = '')
}

async function sendEmail() {
  insertError(false, '')

  if (!isEmailValid(email.value)) {
    insertError(true, 'Por favor, insira um E-mail válido.')
    return
  }

  const dataEmail = {
    to: email.value,
    subject: 'Recuperação de Senha',
    text: 'Recebemos um pedido para redefinir a senha da sua conta. Para continuar, clique no botão abaixo:',
    link: 'www.linkrefrashsenha.com',
  }

  const responseEmailService = await userService
    .requestPasswordReset(dataEmail.to)
    .then((response) => {
      console.log('responseUserService:', response)
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

      console.log('errorUserService:', axiosError.response?.status)
    })

  if (responseEmailService) {
    const responseEmailService = emailService.sendEmailResetPassword(dataEmail)
    console.log('responseEmailService:', responseEmailService)
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
