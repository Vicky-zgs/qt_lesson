import loadable from '../utils/loadable'

const webLayout = loadable(() => import('../pages/web/layout'))

const routes = [
  {
    path: '/web',
    component: webLayout
  }
]

export default routes