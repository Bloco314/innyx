import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import LoginPage from '../components/Pages/LoginPage.vue'
import HomePage from '../components/Pages/HomePage.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: LoginPage },
  { path: '/home', name: 'Home', component: HomePage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
