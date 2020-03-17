import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/courses',
    name: 'BrowseCourses',
    component: () => import('../views/BrowseCoursesPage.vue')
  },
  {
    path: '/schedule',
    name: 'ViewSchedule',
    component: () => import('../views/ViewSchedulePage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
