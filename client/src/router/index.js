import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { forVisitors: true }
  },
  {
    path: '/auth',
    name: 'Authentication',
    component: () => import('../views/Auth.vue'),
    meta: { forVisitors: true }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { requireAuth: true }

  },
  {
    path: '/pin',
    name: 'Pin',
    component: () => import('../views/AddPin.vue'),
    meta: { requireAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
