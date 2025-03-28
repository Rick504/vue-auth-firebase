import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login/LoginView.vue'
import ResetPasswordEmail from '../views/ResetPassword/ResetPasswordEmail.vue'
import UpdateAcoount from '../views/Profile/components/UpdateAcoount.vue'
import SuccessPage from '../components/messages/SuccessPage.vue'
import ErrorPage from '../components/messages/ErrorPage.vue'
import useAuth from '../middleware/auth'
import SupportView from '@/views/Support/SupportView.vue'
import SupportChatView from '@/views/Support/chat/SupportChatView.vue'
import MessagesView from '@/views/Support/chat/MessagesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
      meta: { header: false },
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordEmail,
    },
    {
      path: '/update-account',
      name: 'update-account',
      component: UpdateAcoount,
      beforeEnter: (to, from, next) => {
        useAuth()
        next()
      },
    },
    {
      path: '/support',
      name: 'support',
      component: SupportView,
      meta: { header: true },
      beforeEnter: (to, from, next) => {
        useAuth()
        next()
      },
    },
    {
      path: '/support-chat',
      name: 'support-chat',
      component: SupportChatView,
      beforeEnter: (to, from, next) => {
        useAuth()
        next()
      },
    },
    {
      path: '/support-chat-messages/:id',
      name: 'MessagesView',
      component: MessagesView,
      props: true,
      beforeEnter: (to, from, next) => {
        useAuth()
        next()
      },
    },
    {
      path: '/success/:type',
      name: 'success-page',
      component: SuccessPage,
      meta: {
        contentMap: {
          'reset-password': {
            title: 'Senha redefinida com sucesso!',
            message: 'Agora você pode acessar sua conta com sua nova senha.',
            link: '/login',
            buttonText: 'Ir para login',
          },
          'updated-account': {
            title: 'Cadastro atualizado com sucesso!',
            message: 'Vá até a página de login para acessar sua conta.',
            link: '/login',
            buttonText: 'Ir para login',
          },
          'support-send-email': {
            title: 'E-mail enviado ao suporte com sucesso, aguarde o retorno de nossa equipe.',
            message: 'Vá até a página de suporte.',
            link: '/support',
            buttonText: 'Ir para suporte',
          },
          'email-confirmed': {
            title: 'E-mail confirmado com sucesso.',
            message: 'Vá até a página de login para acessar sua conta.',
            link: '/login',
            buttonText: 'Ir para login',
          },
        },
      },
    },
    {
      path: '/error/:type',
      name: 'error-page',
      component: ErrorPage,
      meta: {
        contentMap: {
          'expired-token': {
            title: 'Sessão expirada.',
            message: 'Realize o login novamente.',
            link: '/login',
            buttonText: 'Ir para login',
          },
          'account-deleted': {
            title: 'Essa conta foi deletada.',
            message: 'Realize um novo cadastro ou entre em contato com o suporte.',
            link: '/login',
            buttonText: 'Ir para tela inicial',
          },
        },
      },
    },
    {
      path: '/',
      name: 'dashboard',
      meta: { header: true },
      component: () => import('../views/Dashboard/DashboardView.vue'),
      beforeEnter: (to, from, next) => {
        useAuth()
        next()
      },
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { header: true },
      component: () => import('../views/Profile/ProfileView.vue'),
      beforeEnter: (to, from, next) => {
        useAuth()
        next()
      },
    },
  ],
})

export default router
