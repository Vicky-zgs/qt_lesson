import loadable from '../utils/loadable'

const Home = loadable(() => import('../pages/web/layout'))  // 推荐
const Poetry = loadable(() => import('../pages/web/poetry'))   // 诗文
const Rhesis = loadable(() => import('../pages/web/rhesis'))   // 名句
const Author = loadable(() => import('../pages/web/author'))   // 作者
const Ancient = loadable(() => import('../pages/web/ancient'))   // 古籍

const webRoutes = [
  {
    menu: true,
    title: '推荐',
    path: '/web/index',
    component: Home
  },
  {
    menu: true,
    title: '诗文',
    path: '/web/poetry',
    component: Poetry
  },
  {
    menu: true,
    title: '名句',
    path: '/web/rhesis',
    component: Rhesis
  },
  {
    menu: true,
    title: '作者',
    path: '/web/author',
    component: Author
  },
  {
    menu: true,
    title: '古籍',
    path: '/web/ancient',
    component: Ancient
  }
]

export default webRoutes
