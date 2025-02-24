<template>
  <div>
    <div>
      <button type="button" class="btn border-danger text-danger w-50 py-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Deletar conta
      </button>
    </div>

    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Deseja mesmo deletar sua conta?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-footer">
            <button @click="deleteAccount" type="button" class="btn btn-danger" data-bs-dismiss="modal">Sim</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import UserService from '@/services/UserService'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores'

const store = useStore()
const router = useRouter()

const userService = new UserService()

async function deleteAccount() {
  await userService.deleteAccontUser()
  router.push('/login')
  store.resetUser()
}
</script>
