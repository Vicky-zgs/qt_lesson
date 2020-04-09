// 写文章 组件

import React,  { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom' // 路由的重定向

class Write extends Component {

  render () {
    const { loginState } = this.props
    if (loginState) {
      // 如果登录了就进入 写文章 页面
      return (
        <div>写文章页面</div>
      )
    } else { // 如果没有登录就去登录页面
      return <Redirect to="/login" />
    }
  }
}

const mapState = (state) => ({
  loginState: state.login.get('login')
})

export default connect(mapState, null)(Write)