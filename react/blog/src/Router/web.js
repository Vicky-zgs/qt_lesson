import loadable from '../utils/loadable'

import {
  HomeOutlined, 
  EditOutlined,
  StarOutlined,
  TeamOutlined
} from '@ant-design/icons'

const List = loadable(() => import('../pages/web/list/list'))  // 首页
const Archive = loadable(() => import('../pages/web/archive'))   // 归档
const Collect = loadable(() => import('../pages/web/collect'))   // 收藏
const About = loadable(() => import('../pages/web/about'))   // 关于

const webRoutes = [
  {
    menu: true,
    icon: HomeOutlined,
    title: '首页',
    path: '/web/index',
    component: List
  },
  {
    menu: true,
    icon: EditOutlined,
    title: '归档',
    path: '/web/archive',
    component: Archive
  },
  {
    menu: true,
    icon: StarOutlined,
    title: '收藏',
    path: '/web/collect',
    component: Collect
  },
  {
    menu: true,
    icon: TeamOutlined,
    title: '关于',
    path: '/web/about',
    component: About
  }
]

export default webRoutes
