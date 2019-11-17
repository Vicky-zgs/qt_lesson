import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
// js 懒加载
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      // 这样写即懒加载
      component: () => import('@/page/home/Home')
    },
    {
      path: '/city',
      name: 'City',
      component: () => import('@/page/city/City')
    }
  ]
})
