import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: (resolve) => require(['../components/login'], resolve)
    },
    {
      path: '/index',
      name: 'Index',
      component: (resolve) => require(['../components/home'], resolve)
    }
  ]
})
