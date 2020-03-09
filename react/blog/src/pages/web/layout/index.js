// 引入web.js, 给首页上的组件匹配路由

import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import routes from '../../../Router/web'
import { Layout, Col, BackTop } from 'antd'

import HeaderCustom from '../header'
import SiderCustom from '../sider'

import './index.less'

const { Content, Footer } = Layout

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const contentHeight = document.body.clientHeight - 64 - 70
    return (
      <div>
        <Layout className="wrapper">
          {/* 头部 (固定不动的) */}
          <HeaderCustom></HeaderCustom>

          {/* 侧边个人详情 (固定不动的) 先上下布局 后左右布局 */}
          <Layout className="wrapper-container">
            <Layout className="wrapper-content">
              <Content style={{ display:'flex', paddingTop: 24, margin: 0, minHeight: contentHeight, height: '100%', overflow: 'initial' }}>
                <Col // 左边的侧边栏
                  lg={{ span: 5, offset: 1 }}
                  md={{ span: 6, offset: 1 }}
                  xs={{ span: 0 }}
                >
                  <SiderCustom />
                </Col>
                <Col // 右边的list列表组件
                  lg={{ span: 16, offset: 1 }}
                  md={{ span: 16, offset: 1 }}
                  xs={{ span: 24 }} className="about-wrapper"
                >
                  {/* 首页list组件 */}
                  {
                    routes.map(({ path, key, component, ...props }, index) => (
                      <Route
                        key={index}
                        exact
                        path={path}
                        component={component}
                        {...props}
                      />
                    ))
                  }
                </Col>
              </Content>
            </Layout>
            <Footer>@personal blog</Footer>
          </Layout>
        </Layout>

      </div>
    )
  }
}

export default Index