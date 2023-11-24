import Vue from 'vue'
import VueRouter from 'vue-router'
import AppLoginView from '../views/AppLoginView.vue'
import DashboardView from '../views/DashboardView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: AppLoginView
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/AppRegisterView.vue')
  },
  {
    path: '/addObject',
    name: 'addObject',
    component: () => import('../views/AppAddObjectView.vue'),
  },
  {
    path: '/editObject',
    name: 'editObject',
    component: () => import('../views/AppEditObjectView.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    children: [
      {
        path: 'ubi',
        name: 'Estantes',
        component: () => import(/* webpackChunkName: "about" */ '../views/LocationsView.vue'),
      },
      {
        path: 'objects',
        name: 'Objetos',
        component: () => import('../views/ObjectsView.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
