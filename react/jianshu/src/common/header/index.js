// 所有页面都有的头部

import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { actionCreators } from './store'
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

const Header = (props) => {
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
            in={props.focused}
            className="slide"
          >
            {/* slide-enter slide-enter-active   slide-exit slide-exit-active */}
            <NavSearch
              className={props.focused ? 'focused' : ''}
              // input框聚焦时就会触发onFocus方法
              onFocus={props.handleInputFocus}
              onBlur={props.handleInputBlur}  // input框失焦
            ></NavSearch>
          </CSSTransition>
          <span className={props.focused ? 'focused iconfont' : 'iconfont'}>&#xe623;</span>
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

const mapStateToProps = (state) => {
  return {
    focused: state.header.get('focused')
  }
}

// store.dispatch ===> props
const mapDispatchToProps = (dispatch) => {
  return {
    handleInputFocus() {
      // input搜索框聚焦时加上focused类名 
      // actionCreators.js 中会生成action
      dispatch(actionCreators.searchFocus())
    },
    handleInputBlur() {
      // input搜索框失焦时去掉focused类名
      // const action = {
      //   type: 'search_blur'
      // }
      // dispatch(action)
      dispatch(actionCreators.searchBlur())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)