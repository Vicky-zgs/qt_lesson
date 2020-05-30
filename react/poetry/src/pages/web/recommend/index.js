// 首页布局组件

import React, { Component } from 'react'
import './layout.less'
import List from '../component/content-list/index.js'
import Tag from '../component/tag/index.js'
import Head from '../header/index'
import axios from 'axios'

class WebLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      RecommendList: [],
      TagList: []
    }
  }

  componentDidMount() {
    axios.get('/getrecommend').then((res) => {
      this.setState({
        RecommendList: res.data.data
      }, () => {
        console.log('推荐列表数据', this.state.RecommendList)
      })
    })

      // axios.get('/getpoetrytype').then((res) => {
      //   this.setState({
      //     TagList: res.data.data
      //   },() =>{
      //     console.log('推荐组件标签数据',this.state.TagList)
      //   })
      // })
  }

  render() {
    return (
      <div>
        <Head />
        <div className="wrapper_recommend">
          <List list={this.state.RecommendList} />
          {/* <Tag list={this.state.TagList}/> */}
        </div>
      </div>
    )
  }
}


export default WebLayout