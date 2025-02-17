<template>
  <LoaderPage v-if="store.loader" />
  <HeaderView v-if="store.user.name && store.user.email" />
  <RouterView />
</template>

<script setup lang="ts">
import LoaderPage from '../components/LoaderPage.vue'
import { useStore } from '@/stores/index'
import HeaderView from '@/views/Dashboard/components/HeaderView.vue'

const store = useStore()
</script>
