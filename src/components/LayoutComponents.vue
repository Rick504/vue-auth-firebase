<template>
  <LoaderPage v-if="store.loader" />
  <HeaderView v-if="shouldShowHeader" />
  <RouterView />
</template>

<script setup lang="ts">
import LoaderPage from '../components/LoaderPage.vue'
import { useRoute } from 'vue-router'
import HeaderView from '@/views/Dashboard/components/HeaderView.vue'
import { useStore } from '@/stores'
import { computed } from 'vue'

const store = useStore()
const route = useRoute()

const shouldShowHeader = computed(() => route.meta.header)
</script>
