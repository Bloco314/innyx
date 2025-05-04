import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { isLoggedIn } from '../services/service'

import LoginPage from '../components/Pages/LoginPage.vue'
import ProductEdit from '../components/Pages/ProductEdit.vue'
import ProductCreate from '../components/Pages/ProductCreate.vue'
import ProductList from '../components/Pages/ProductList.vue'
import CategoryCreate from '../components/Pages/CategoryCreate.vue'
import CategoryList from '../components/Pages/CategoryList.vue'
import CategoryEdit from '../components/Pages/CategoryEdit.vue'

const routes: Array<RouteRecordRaw> = [
  // Rota pública
  { path: '/', component: LoginPage },

  // Rotas protegidas
  { path: '/produtos/criar', name: 'ProductCreate', component: ProductCreate, meta: { requiresAuth: true } },
  { path: '/produtos/editar/:id', name: 'ProductEdit', component: ProductEdit, props: true, meta: { requiresAuth: true } },
  { path: '/produtos/listar', name: 'ProductList', component: ProductList, meta: { requiresAuth: true } },
  { path: '/categorias/criar', name: 'CategoriaCreate', component: CategoryCreate, meta: { requiresAuth: true } },
  { path: '/categorias/editar/:id', name: 'CategoriaEdit', component: CategoryEdit, props: true, meta: { requiresAuth: true } },
  { path: '/categorias/listar', name: 'CategoriaList', component: CategoryList, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const auth = await isLoggedIn()
    if (!auth) return next('/')
  }
  next()
})

export default router
