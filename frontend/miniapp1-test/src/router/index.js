// frontend/miniapp1/src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: App
  },
  // Добавьте другие маршруты по необходимости
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router