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
    path: '/addLocation',
    name: 'addLocation',
    component: () => import('../views/AppAddLocationView.vue'),
  },
  {
    path: '/editLocation/:id',
    name: 'editLocation',
    component: () => import('../views/AppEditLocationView.vue'),
  },
  {
    path: '/deleteLocation/:id',
    name: 'deleteLocation',
    component: () => import('../views/AppDeleteLocationView.vue'),
  },
  {
    path: '/editObject',
    name: 'editObject',
    component: () => import('../views/AppEditObjectView.vue'),
  },
  {
  path: '/addUser:id',
  name: 'addUser',
  component: () => import('../views/AppSearchUserView.vue'),
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
      {
        path: 'loan',
        name: 'Loans',
        component: () => import( '../views/MakeLoanView.vue'),
      },
      {
        path: 'loanHistory',
        name: 'LoanHistory',
        component: () => import(/* webpackChunkName: "about" */ '../views/LoansView.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('token');
  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
})
export default router
