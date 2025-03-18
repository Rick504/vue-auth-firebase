<template>
  <div>
    <div class="modal-overlay">
      <div class="modal-content">
        <div>
          <p>
            Email de confirmação foi enviado para:
            <strong>{{  store.user.email  }}</strong>
          </p>
          <p>Caso não tenha recebido, verifique seu spam.</p>
          <button class="btn btn-success" @click="resendEmail">Reenviar email</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/stores/index'
const store = useStore()

function resendEmail() {
  console.log('resendEmail')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: rgb(214, 212, 202);
  display: flex;
  justify-content: center;
  padding: 20px;
  width: 80%;
  height: 60%;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
}

button {
  margin-top: 10px;
  padding: 8px 16px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>
