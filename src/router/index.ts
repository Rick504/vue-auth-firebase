import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login/LoginView.vue'
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
