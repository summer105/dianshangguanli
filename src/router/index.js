import Vue from 'vue'
import Router from 'vue-router'
import login from "@/components/login/login.vue"
import home from "@/components/home.vue"

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/login',
      component:login,
      name:'login',
    },
    {
      path: '/',
      component:home,
      name:'home',
    }
  ]
})
