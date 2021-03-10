import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginUser from '@/components/views/LoginUser'
import Register from '@/components/views/Register'
import Principal from '@/components/views/Principal'
import Direcctions from '@/components/views/Direcctions'

Vue.use(VueRouter)

const routes = [
  {
    path: '/fotos/:id',
    name: 'fotos',
    component: () => import(/* webpackChunkName: "Fotos" */ '@/components/views/Fotos.vue')
  },
  {
    path: '/',
    name: 'LoginUser',
    component: LoginUser
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/principal',
    name: 'Principal',
    component: Principal
  },
  {
    path: '/Direcctions',
    name: 'Direcctions',
    component: Direcctions
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
