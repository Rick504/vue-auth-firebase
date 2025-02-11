<template>
  <div class="p-2">
    <small>
      Eu aceito os
      <a :href="termsLink">
        Termos e Condições
      </a>
      . <br>
    </small>
    <small class="text-start text-sm">
      Pode encontrar a nossa Política de Privacidade
      <a :href="privacyPolicy">
        aqui
      </a>
      .
    </small>
  </div>
</template>

<script setup lang="ts">
const termsLink = 'termsConditions';
const privacyPolicy = 'privacyPolicy';
</script>

