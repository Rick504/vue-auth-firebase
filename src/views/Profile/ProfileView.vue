<template>
  <div class="profile d-flex flex-column justify-content-center align-items-center gap-3 p-5 m-5 border border-white rounded-3 shadow-lg">
      <div class="w-100 text-center">
        <a v-if="!store.user.provider" href="update-account" type="button" >
          <BtnLoudSquid text="Atualizar conta" />
        </a>
      </div>
      <DeletedAccount class="w-100 text-center" />
  </div>
</template>

<script setup lang="ts">
import DeletedAccount from './components/DeletedAccount.vue'
import { useStore } from '@/stores'
import BtnLoudSquid from '@/components/BtnLoudSquid.vue'

 const store = useStore()

</script>
