<script setup lang="js">
import { computed } from 'vue'
import { useStore } from '../../../stores/index'

const store = useStore()

const profileImage = computed(() => {
  if (store.user?.photo === '') {
    return '/imgs/icons/png/profile.png'
  }

  return store.user?.photo?.trim()
})
</script>

<template>
  <img
    v-if="profileImage"
    width="100"
    class="rounded-pill"
    :src="profileImage"
    alt="Foto de perfil"
    />
</template>
