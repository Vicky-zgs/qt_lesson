// 首页页面

import React,  { Component } from 'react'
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Writer from './components/Writer'
import {
   HomeWrapper,
   HomeLeft,
   HomeRight
} from './style'

class Home extends Component {
  render () {
    return (
      <HomeWrapper>
        <HomeLeft>
          <img className="banner-img" src="https://upload-images.jianshu.io/upload_images/15517692-7a1b517edb1eff6d.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/360/h/240" />
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

export default Home