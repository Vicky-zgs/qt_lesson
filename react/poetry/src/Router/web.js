import loadable from '../utils/loadable'

const Home = loadable(() => import('../pages/web/recommend'))  // 推荐
const Poetry = loadable(() => import('../pages/web/poetry'))   // 诗文
const Author = loadable(() => import('../pages/web/author'))   // 作者
const Share = loadable(() => import('../pages/web/share'))   // 分享
const LookNotice = loadable(() => import('../pages/web/manage/notice/index.js'))   // 通知

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
    title: '作者',
    path: '/web/author',
    component: Author
  },
  {
    menu: true,
    title: '分享',
    path: '/web/share',
    component: Share
  },
  {
    menu: true,
    title: '通知',
    path: '/lookNotice',
    component: LookNotice
  }
]

export default webRoutes
