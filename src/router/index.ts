import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login/LoginView.vue'
import ResetPasswordEmail from '../views/ResetPassword/ResetPasswordEmail.vue'
import UpdateAcoount from '../views/Profile/components/UpdateAcoount.vue'
import SuccessPage from '../components/messages/SuccessPage.vue'
import useAuth from '../middleware/auth'
import SupportView from '@/views/Support/SupportView.vue'
import SupportChatView from '@/views/Support/chat/SupportChatView.vue'
import MessagesView from '@/views/Support/chat/MessagesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
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
      path: '/',
      name: 'dashboard',
      component: () => import('../views/Dashboard/DashboardView.vue'),
      beforeEnter: (to, from, next) => {
        useAuth()
        next()
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile/ProfileView.vue'),
      beforeEnter: (to, from, next) => {
        useAuth()
        next()
      },
    },
  ],
})

export default router
