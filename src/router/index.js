import Vue from 'vue'
import VueRouter from 'vue-router'
import AppLoginView from '../views/AppLoginView.vue'
import DashboardView from '../views/DashboardView.vue'
// import CategoriasView from '../views/CategoriasView.vue'
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AppRegisterView.vue')
  },
  {

    path: '/addObject',
    name: 'addObject',
    component: () => import('../views/AppAddObjectView.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    children:[
      {
        path: 'categorias',
       
        component: () => import(/* webpackChunkName: "about" */ '../views/CategoriasView.vue'),

      },
      {

        path: 'objects',


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
