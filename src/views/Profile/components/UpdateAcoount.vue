<template>
  <div class="container w-25 mt-5">
    <RegisterForm :updateAccount="true" :fieldEmail="false" />
  </div>
</template>
<script setup lang="ts">

import RegisterForm from '../../Login/components/RegisterForm.vue'

</script>
