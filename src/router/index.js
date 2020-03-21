import Vue from 'vue'
import Router from 'vue-router'
import login from "@/components/login/login.vue"
import home from "@/components/home.vue"
import shouye from "@/components/shouye"
import tschanxun from "@/components/tschanxun"
import tsjie from "@/components/tsjie"
import yhguanli from "@/components/yhguanli"
import tsguanli from "@/components/tsguanli"

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      redirect:"login",
      component:login,
    },
    {
      path: '/login',
      component:login,
      name:'login',
    },
    {
      path: '/home',
      component:home,
      name:'home',
      redirect:"/shouye",
      children:[
        {
          path: '/shouye',
          component:shouye,
          name:'shouye',
        },
        {
          path: '/tschanxun',
          component:tschanxun,
        },
        {
          path: '/tsjie',
          component:tsjie,
        },
        {
          path: '/yhguanli',
          component:yhguanli,
        },
        {
          path: '/tsguanli',
          component:tsguanli,
        },
      ]
    },

  ]
})
