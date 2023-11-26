import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/trousse',
      name: 'trousse',
      component: () => import('../views/TrousseView.vue')
    },
    {
      path: '/joke',
      name: 'joke',
      component: () => import('../views/JokeView.vue')
    },
    {
      path: '/prefer',
      name: 'prefer',
      component: () => import('../views/PreferView.vue')
    }
  ]
})

export default router
