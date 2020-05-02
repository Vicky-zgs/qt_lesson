// 首页布局组件

import React, { Component } from 'react'
import './layout.less'
import List from '../component/content-list/index.js'
import Tag from '../component/tag/index.js'
import Head from '../header/index'

class WebLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
  render () {
    return (
      <div>
        <Head />
        <div className="HomeWrapper">
          <List list={this.state.list}/>
      </div>
      </div>
    )
  }
}

export default WebLayout