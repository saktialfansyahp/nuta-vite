import { createRouter, createWebHistory } from 'vue-router'
import DiskonPage from '@/views/DiskonPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/diskon',
  },
  {
    path: '/diskon',
    name: 'DiskonPage',
    component: DiskonPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
