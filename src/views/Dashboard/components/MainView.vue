<template>
  <div v-if="store.user" class="text-center mt-5">
    <div>
      <ImgProfile />
    </div>
    <p v-if="store.user.name">{{ store.user.name }}</p>
    <p>Email: {{ store.user.email }}</p>
  </div>
  <div v-else>
    <p>Você não está logado.</p>
  </div>
</template>

<script setup lang="ts">
import ImgProfile from './components/ImgProfile.vue'

import { useStore } from '@/stores/index'
const store = useStore()
</script>
