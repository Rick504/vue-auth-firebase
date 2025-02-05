<template>
  <div class="container d-flex justify-content-center align-items-center min-vh-100">
    <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%;">
      <h2 class="text-center mb-3">Login</h2>

     <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">E-mail</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="form-control"
            placeholder="Digite seu e-mail"
            required
          />
        </div>

        <div class="mb-3 position-relative">
          <label for="password" class="form-label">Senha</label>
          <div class="input-group">
            <input
              id="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              class="form-control"
              placeholder="Digite sua senha"
              required
            />
            <button
              type="button"
              class="btn btn-outline-secondary"
              @click="togglePasswordVisibility"
            >
              <i :class="showPassword ? 'bi bi-eye' : 'bi bi-eye-slash'"></i>
            </button>
          </div>
        </div>

        <div class="mt-4">
          <button type="submit" class="btn btn-primary w-100">Entrar</button>
          <button @click.prevent="loginWithGoogle" class="btn border w-100 mt-2">
            <img src="../../public/imgs/icons/svg/google.svg" width="20" class="me-2" alt="Google">
            Entrar com Google
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const router = useRouter();
const email = ref("");
const password = ref("");

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const login = async () => {
  const userSendData = {
    email: email.value,
    password: password.value,
  }
  try {
    if (email.value && password.value) {
      console.log('userSendData:', userSendData)
      router.push("/dashboard");
    }
  } catch {
    console.error("Erro ao autenticar:");
  }
};

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Usuário autenticado com Google:", result.user);
    router.push("/dashboard");
  } catch {
    console.error("Erro ao autenticar com Google:");
  }
};
</script>

<style>
/* Certifique-se de importar os ícones do Bootstrap no seu projeto */
@import "https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css";
</style>
