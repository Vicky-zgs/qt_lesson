// 古诗组件

import React, { Component } from 'react'
import Head from '../header/index'
import List from '../component/content-list/index.js'
import Tag from '../component/tag/index.js'
import axios from 'axios'
import './index.less'

class Poetry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poetryList: []
    }
  }

  componentDidMount () {
    axios.get('/listallpoetrys').then((res) => {
      this.setState({
        poetryList: res.data.data
      },() =>{
        console.log('诗词列表数据',this.state.poetryList)
      })
    })
  }

  render () {
    return (
      <div>
        <Head />
        <div className="wrapper">
          <List list={this.state.poetryList} />
          <Tag list={this.state.poetryList}/>
        </div>
      </div>
    )
  }
}

export default Poetry