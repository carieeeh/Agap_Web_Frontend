import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/Layout/Public/LoginView.vue'
import DashboardView  from '@/views/Layout/Private/Dashboard/DashboardView.vue'
import PrivateView  from '@/views/Layout/Private/PrivateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'AGAP | Login',
      component: LoginView
    },
    {
      path: '/app',
      name: 'AGAP',
      component: PrivateView,
      children: [
        {
          path: '/app/dashboard',
          name: 'AGAP | Dashboard',
          component: DashboardView
        },
        {
          path: '/app/accounts',
          name: 'AGAP | Accounts',
          component: DashboardView
        },
        {
          path: '/app/interactive-map',
          name: 'AGAP | Interactive Map',
          component: DashboardView
        },
        {
          path: '/app/heatmap',
          name: 'AGAP | Heatmap',
          component: DashboardView
        },
      ],
    },
  ]
})

export default router
