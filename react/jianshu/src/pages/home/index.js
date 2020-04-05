// 首页页面

import React,  { Component } from 'react'
import Topic from './components/Topic'
import List from './components/List'
import Recommend from './components/Recommend'
import Writer from './components/Writer'
import axios from 'axios'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import {
   HomeWrapper,
   HomeLeft,
   HomeRight,
   BackTop
} from './style'

class Home extends Component {
  componentDidMount() {
    this.props.changeHomeData()
    this.bindEvents()
  }

  bindEvents() {
    // 监听屏幕滚动
    window.addEventListener('scroll', this.props.changeScrollTopShow)
  }

  componentWillUnmount() {
    // 组件销毁时移除这个绑定事件
    window.removeEventListener('scroll', this.props.changeScrollTopShow)
  }

  handleScrollTop () {
    // 点击 回到顶部 后 页面回到最顶部
    window.scrollTo(0, 0)
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
        {
          this.props.showScroll 
          ? <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop> 
          : null
        }
      </HomeWrapper>
    )
  }
}

const mapState = (state) => ({
  showScroll: state.home.get('showScroll')
})

const mapDispatch = (dispatch) => ({
  // 获取首页数据
  changeHomeData() {
    const action = actionCreators.getHomeInfo()
    // dispatch(action)
    action(dispatch)
  },
  // 页面一滚动就执行, 更改showScroll数据
  changeScrollTopShow(e) { // 事件参数
    if (document.documentElement.scrollTop > 200) {
      // 当前页面的滚动条纵坐标位置
      dispatch(actionCreators.toggleTopShow(true))
    } else {  
      dispatch(actionCreators.toggleTopShow(false))
    }
  }
})

export default connect(mapState, mapDispatch)(Home)