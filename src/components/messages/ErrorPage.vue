<template>
  <div class="d-flex flex-column align-items-center justify-content-center vh-100">
    <h3>{{ content.title }}</h3>
    <p>{{ content.message }}</p>
    <div>
      <a :href="content.link">
        <button class="btn btn-success">{{ content.buttonText }}</button>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { SuccessPageContent } from '@/types/contentType'

const route = useRoute();

const content = computed(() => {
  const type = route.params.type as string;
  const map = route.meta.contentMap as Record<string, SuccessPageContent>;

  return map?.[type] || {
    title: 'Operação não realizada.',
    message: 'A ação não foi concluída.',
    link: '/',
    buttonText: 'Voltar para início'
  };
});
</script>
