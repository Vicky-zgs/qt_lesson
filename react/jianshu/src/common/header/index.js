// 所有页面都有的头部

import React, { Component } from 'react'
import { CSSTransition } from 'react-transition-group'
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  NavSearch,
  Addition,
  Button,
  SearchWrapper
} from './style.js'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focused: false
    }
    this.handleInputFocus = this.handleInputFocus.bind(this)
    this.handleInputBlur = this.handleInputBlur.bind(this)
  }

  handleInputFocus() {
    // 聚焦input框后给input框添加focused的类名
    this.setState({
      focused: true
    })
  }

  handleInputBlur() {
    // input框失焦
    this.setState({
      focused: false
    })
  }

  render() {
    return (
      <HeaderWrapper>
        <Logo />
        <Nav>
          <NavItem className="left active">首页</NavItem>
          <NavItem className="left">下载App</NavItem>
          <NavItem className="right">登录</NavItem>
          <NavItem className="right">
            <span className="iconfont">&#xe636;</span>
          </NavItem>
          <SearchWrapper>
            <CSSTransition 
              // 控制动画
              timeout={200} 
              in={this.state.focused}
              className="slide"
            >
              {/* slide-enter slide-enter-active   slide-exit slide-exit-active */}
              <NavSearch
                className={this.state.focused ? 'focused' : ''}
                // input框聚焦时就会触发onFocus方法
                onFocus={this.handleInputFocus}
                onBlur={this.handleInputBlur}  // input框失焦
              ></NavSearch>
            </CSSTransition>
            <span className={this.state.focused ? 'focused iconfont' : 'iconfont'}>&#xe623;</span>
          </SearchWrapper>
        </Nav>
        <Addition>
          <Button className="writting">
            <span className="iconfont">&#xe7c2;</span>
            写文章
          </Button>
          <Button className="reg">注册</Button>
        </Addition>
      </HeaderWrapper>
    )
  }
}

export default Header