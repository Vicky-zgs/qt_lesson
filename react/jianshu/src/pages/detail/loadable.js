import React from 'react'
import Loadable from 'react-loadable'

// 使得detail变成异步组件
const LoadableComponent = Loadable({
  loader: () => import('./'),
  loading() {
    return <div>正在加载...</div>
  }
});

export default () => <LoadableComponent />
