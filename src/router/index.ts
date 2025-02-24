import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login/LoginView.vue'
import ResetPasswordEmail from '../views/ResetPassword/ResetPasswordEmail.vue'
import UpdateAcoount from '../views/Profile/components/UpdateAcoount.vue'
import SuccessReset from '../views/ResetPassword/SuccessReset.vue'
import useAuth from '../middleware/auth'

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
    },
    {
      path: '/reset-password-success',
      name: 'reset-password-success',
      component: SuccessReset,
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
