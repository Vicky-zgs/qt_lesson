// 侧边栏组件

import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import './index.less'
import { UserOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

const { Sider } = Layout;
const { SubMenu } = Menu;

class SiderMenu extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   menuNum: ''  // 点击的菜单数字代号
    // }
  }

  // onClick (e) {
  //   // 点击任何一个menuItem都会触发
  //   // console.log(e.key) // 点击的menuItem的key值
  //   this.setState({
  //     menuNum: e.key
  //   })
  // }

  render() {
    return (
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
          <Menu theme="dark" 
            mode="inline" 
            defaultSelectedKeys={['2']} 
            // onClick={this.onClick.bind(this)}
          >
          <SubMenu key="sub1" icon={<UserOutlined />} title="个人信息管理">
              <Menu.Item key="1">
                <Link to="/admin/myInfo">我的信息</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/admin/collection">我的收藏</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<UserOutlined />} title="用户信息管理">
              <Menu.Item key="3">
                <Link to="/admin/manageUser">
                  用户信息
                </Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Link to="/admin/manageComment">
                  用户评论
                </Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<UserOutlined />} title="古诗词管理">
              <Menu.Item key="5">
                <Link to="/admin/managePoetry">诗词</Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/admin/managePoetryDynasty">朝代管理</Link>
              </Menu.Item>
              <Menu.Item key="7">
                <Link to="/admin/managePoetryType">古诗类型</Link>
              </Menu.Item>
              <Menu.Item key="8">
                <Link to="/admin/managePoet">诗人</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<UserOutlined />} title="后台管理">
              <Menu.Item key="9">
                <Link to="/admin/notice">
                  通知管理
                </Link>
              </Menu.Item>
              <Menu.Item key="10">上传资源管理</Menu.Item>
            </SubMenu>
          </Menu>
          <Link to="/"
            className="back_home" 
            style={{ position: 'absolute',left: '0',bottom: '0',color: '#f0f0f0',margin: '1vh 2vw'}}>
            返回主页
          </Link>
        </Sider>
    )
  }
}

export default SiderMenu