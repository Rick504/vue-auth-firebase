<template>
  <div class="profile d-flex flex-column justify-content-center align-items-center gap-3 p-5 m-5 border border-black">
      <div class="w-100 text-center">
        <a v-if="!store.user.provider" href="update-account" type="button" class="btn border-black px-5 w-50 py-2">
          Atualizar senha
        </a>
      </div>
      <DeletedAccount class="w-100 text-center" />
  </div>
</template>

<script setup lang="ts">
import DeletedAccount from './components/DeletedAccount.vue'
import { useStore } from '@/stores'

 const store = useStore()

</script>
