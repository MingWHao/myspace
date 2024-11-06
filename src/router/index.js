import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import NotfoundView from '../views/NotfoundView.vue'
import RegisterView from '../views/RegisterView.vue'
import UserlistView from '../views/UserlistView.vue'
import UserprofileView from '../views/UserprofileView.vue'
const routes = [
  {
    path: '/myspace/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/myspace/login/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/myspace/404/',
    name: '404',
    component: NotfoundView
  },
  {
    path: '/myspace/register/',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/myspace/userlist/',
    name: 'userlist',
    component: UserlistView
  },
  {
    path: '/myspace/userprofile/:userId/',
    name: 'userprofile',
    component: UserprofileView
  },
  {
    path: '/myspace/:catchAll(.*)',
    redirect: '/404/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
