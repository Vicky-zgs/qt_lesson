// 首页页面

import React,  { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import { Redirect } from 'react-router-dom' // 路由的重定向
import {
  LoginWrapper,
  LoginBox,
  Input,
  Button
} from './style.js'

class Login extends Component {

  render () {
    const { loginState } = this.props
    if (!loginState) {
      // 如果没有登录就返回这个组件
      return (
        <LoginWrapper>
          <LoginBox>
            {/* 取到input框中的dom结构并且存在account和password中, 并且点击登录后执行login函数 */}
            <Input placeholder="账号" ref={(input) => {this.account = input}} />
            <Input placeholder="密码" type="password" ref={(input) => {this.password = input}} />
            <Button onClick={() => this.props.login(this.account, this.password)}>登录</Button>
          </LoginBox>
        </LoginWrapper>
      )
    } else {
      // 如果login值为true, 重定向到首页
      return <Redirect to="/" />
    }
  }
}

const mapState = (state) => ({
  loginState: state.login.get('login')
})

const mapDispatch = (dispatch) => ({
  login(accountElem, passwordElem) {
    console.log(accountElem.value, passwordElem.value)
    const action = actionCreators.login(accountElem.value, passwordElem.value)
    action(dispatch)
  }
})

export default connect(mapState, mapDispatch)(Login)