import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import './index.less'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Manager extends Component {
  render() {
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <SubMenu key="sub1" icon={<UserOutlined />} title="个人信息管理">
              <Menu.Item key="1">个人信息</Menu.Item>
              <Menu.Item key="2">我的收藏</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<UserOutlined />} title="用户信息管理">
              <Menu.Item key="3">用户信息</Menu.Item>
              <Menu.Item key="4">用户评论</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<UserOutlined />} title="古诗词管理">
              <Menu.Item key="5">诗人</Menu.Item>
              <Menu.Item key="6">古诗朝代与类别</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<UserOutlined />} title="后台管理">
              <Menu.Item key="7">通知</Menu.Item>
              <Menu.Item key="8">上传资源</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
            古诗文管理
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              content
        </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>@古诗文鉴赏</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Manager