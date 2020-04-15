// 首页布局组件

import React, { Component } from 'react'
import './layout.less'
import List from '../component/content-list/index.js'
import Tag from '../component/tag/index.js'

class WebLayout extends Component {
  render () {
    return (
      <div className="HomeWrapper">
        <List />
        <Tag />
      </div>
    )
  }
}

export default WebLayout