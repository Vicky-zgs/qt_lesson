import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Mine from '@/components/Mine'
import Detail from '@/components/Detail'
import Mine2 from '@/components/Mine2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      // 配置路由
      path: '/login', //在页面输入什么才能看到页面
      name: '/Login',
      component: Login,    // /login 对应哪个页面
    },
    {
      path: '/mine',
      name: '/Mine',
      component: Mine,
      // 配置子路由
      children: [
        {
          path: 'mine2',  // 子页面 这个路径不要/
          component: Mine2
        }
      ]
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail,
    },
  ]
})
