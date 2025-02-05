# vue-auth-firebase

This template should help get you started developing with Vue 3 in Vite.

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
pnpm test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
pnpm build
pnpm test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

# 📌 Autenticação com Firebase no Vue.js + Bootstrap 5

Este projeto implementa autenticação com Firebase no Vue.js utilizando Bootstrap 5 para estilização. Ele permite login com **e-mail e senha** e **Google Sign-In**.

## 🚀 Configuração do Firebase

Para que a autenticação funcione corretamente, siga os passos abaixo:

### Criar um Projeto no Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com/).
2. Clique em **"Adicionar projeto"** e siga as instruções.
3. No painel do projeto, vá para **"Configurações do Projeto" → "SDK de configuração"**.
4. Copie as credenciais do Firebase (chave `firebaseConfig`).

### Instalar o Firebase no Projeto Vue.js

Execute o seguinte comando no terminal dentro do diretório do seu projeto:

```sh
pnpm add firebase

```

Crie um arquivo chamado firebase.js na pasta src e cole suas credenciais:

// src/firebase.js

```javascript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'SUA_API_KEY',
  authDomain: 'SEU_AUTH_DOMAIN',
  projectId: 'SEU_PROJECT_ID',
  storageBucket: 'SEU_STORAGE_BUCKET',
  messagingSenderId: 'SEU_MESSAGING_SENDER_ID',
  appId: 'SEU_APP_ID',
}

// Inicializa o Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
```

⚠️ Não compartilhe suas credenciais publicamente! Para proteger sua chave API, você pode armazená-la em variáveis de ambiente (.env).
