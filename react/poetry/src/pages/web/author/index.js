// 作者组件

import React, { Component } from 'react'
import Head from '../header/index'
import List from '../component/content-list/index.js'
import Tag from '../component/tag/index.js'
import axios from 'axios'
import './index.less'

class Author extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poetList: [],
      poetTag: []
    }
  }

  componentDidMount() {
    // 获取诗人页面显示的标签
    axios.get('/getpoet').then((res) => {
      // console.log('诗人页面的标签数据',res.data.data)
      this.setState({
        poetTag: res.data.data
      },() => {
        console.log('诗人页面的标签数据',this.state.poetTag)
      })
    }).catch((err) => {
      alert(err)
    })

    // 获取诗人显示列表的内容
    axios.get('/listpoets').then((res) => {
      console.log('诗人组件的内容',res)
      this.setState({
        poetList: res.data.data
      })
    })
  }

  render () {
    return (
      <div>
        <Head />
        <div className="HomeWrapper" style={{width: '70vw',margin: '2vh auto',position:'relative'}}>
            <List list={this.state.poetList}/>
          <Tag list={this.state.poetTag}/>
        </div>
      </div>
    )
  }
}

export default Author