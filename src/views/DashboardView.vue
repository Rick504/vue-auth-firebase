<template>
  <div v-if="user" class="text-center mt-5">
    <div>
      <img class="rounded-pill" :src="user.photoURL" alt="Foto de perfil" />
    </div>
    <p>Bem-vindo, {{ user.displayName }}</p>
    <p>Email: {{ user.email }}</p>
    <button class="btn border" @click="logout">Sair</button>
  </div>
  <div v-else>
    <p>Você não está logado.</p>
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import UserService from '../services/UserService';

export default {
  name: 'UserProfile',
  setup() {
    const user = ref(auth.currentUser);
    const router = useRouter();

    auth.onAuthStateChanged((currentUser) => {
      user.value = currentUser;
    });

    const getInfoUser = async () => {
        const userService = new UserService();
        const userInfo = await userService.getUserInfo();
        console.log('userInfo:', userInfo);
    };

    const logout = async () => {
      try {
        await signOut(auth);
        router.push('/');
        user.value = null;
      } catch (error) {
        console.error('Erro ao deslogar:', error);
      }
    };

    onMounted(() => {
      getInfoUser();
    });

    return { user, logout };
  }
};
</script>
