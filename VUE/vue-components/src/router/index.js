import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import A from '@/components/pages/A'
import display from '@/components/display/display.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/pages/A',
      name: 'A',
      component: A
    },
    {
      path: '/display/display',
      name: 'display',
      component: display
    }
  ]
})
