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
          <div class="mt-3" v-if="errorLogin">
            <p class="text-danger">Usuário ou senha incorretos</p>
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
import AuthService from '../services/AuthService';
import { LoginWithGoole } from '../types/auth'

const router = useRouter();
const email = ref("");
const password = ref("");
const errorLogin = ref(false);

const showPassword = ref(false);

const authService = new AuthService();

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const login = async () => {
  try {
    if (email.value && password.value) {
      await authService.login(email.value, password.value);
      errorLogin.value = false;
      router.push("/dashboard");
    }
  } catch {
    errorLogin.value = true;
    console.error("Erro ao autenticar:");
  }
};

const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { user }: any = await signInWithPopup(auth, provider);
    const { displayName, email, photoURL } = user
    const dataGoogle: LoginWithGoole = {
      provider: 'google',
      idTokenGoogle: import.meta.env.VITE_PROVIDER_ID_GOOGLE,
      user: {
        name: displayName,
        email: email,
        photo: photoURL,
      }
    }

    await authService.loginWithGoogle(dataGoogle)
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
