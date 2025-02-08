<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '../../../stores/index'

const store = useStore()

const profileImage = computed(() => {
  if (store.user?.photo === '') {
    return '/imgs/icons/png/profile.png'
  }

  return store.user?.photoURL?.trim() || store.user?.photo?.trim()
})
</script>

<template>
  <img width="100" class="rounded-pill" :src="profileImage" alt="Foto de perfil" />
</template>
