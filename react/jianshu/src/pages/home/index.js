// 首页页面

import React,  { Component } from 'react'
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Writer from './components/Writer'
import axios from 'axios'
import { connect } from 'react-redux'
import {
   HomeWrapper,
   HomeLeft,
   HomeRight
} from './style'

class Home extends Component {
  componentDidMount() {
    // 请求首页上的数据
    axios.get('/api/home.json').then((res) => {
      console.log(res)
      const result = res.data.data
      const action = {
        type: 'change_home_data',
        topicList: result.topicList,
        articleList: result.articleList,
        recommendList: result.recommendList
      }
      this.props.changeHomeData(action)
    })
  }
  render () {
    return (
      <HomeWrapper>
        <HomeLeft>
          <img className="banner-img" src="https://upload-images.jianshu.io/upload_images/15517692-7a1b517edb1eff6d.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240" alt="" />
          <Topic />
          <List />
        </HomeLeft>
        <HomeRight>
          <Recommend />
          <Writer />
        </HomeRight>
      </HomeWrapper>
    )
  }
}

const mapDispatch = (dispatch) => ({
  changeHomeData(action) {
    dispatch(action)
  }
})

export default connect(null, mapDispatch)(Home)