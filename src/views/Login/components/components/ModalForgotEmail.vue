<template>
  <div>
    <button class="btn" type="button" data-bs-toggle="modal" data-bs-target="#ModalForgotEmail">
       Esqueceu a senha?
    </button>

    <div class="modal fade" id="ModalForgotEmail" tabindex="-1" aria-labelledby="ModalForgotEmail" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="ModalForgotEmailLabel">Esqueci Minha Senha</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Enviamos um e-mail com as instruções para redefinir sua senha. Verifique sua caixa de entrada
              (e também a pasta de spam) e siga o link para criar uma nova senha.</p>
            <p>Caso não receba o e-mail em alguns minutos, tente novamente ou entre em contato com o suporte.</p>
            <p>Digite seu e-mail abaixo:</p>
            <input type="text">
          </div>
          <div class="modal-footer d-flex justify-content-start">
            <button @click="sendEmail" type="button" class="btn btn-success px-5" data-bs-dismiss="modal">
              <strong>Enviar</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
 async function sendEmail() {
    console.log('sendEmail')
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
