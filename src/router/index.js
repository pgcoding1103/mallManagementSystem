import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Home from '../components/Home.vue'
import Employee from '../views/Employee.vue'
import Specification from '../views/Specification.vue'
import Category from '../views/Category.vue'
import Commodity from "../views/Commodity.vue"
import Message from '../views/Message.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'Welcome',
      path: '/welcome',
      component: Welcome,
    },
    {
      path: '/',
      component: Home,
      children: [
        { path: 'employee/:page', component: Employee, props: true },
        { path: 'specification/:page', component: Specification, props: true },
        { path: 'category/:page', component: Category, props: true },
        { path: 'message/:page', component: Message, props: true },
        { path: 'commodity/:page', component: Commodity, props: true },
      ],
    },
  ],
})
//路由前置守卫
router.beforeEach((to, from) => {
  if (isAuthenticated(to)) {
    // 将用户重定向到登录页面
    return { name: 'Welcome' }
  }
})

function isAuthenticated(to) {
  return (
    !localStorage.getItem('access_token') &&
    !localStorage.getItem('reflush_token') &&
    to.name !== 'Welcome'
  )
}
export default router
