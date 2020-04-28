import React from 'react'
import { Menu, Button, Input, Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import './index.less'
import menus from '../../../Router/web'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      current: 'home'
    })
  }

  handleClick = e => {
    // console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    // 拿到menus中所有menu为true的字段
    const list = menus.filter(v => v.menu)
    const menuList = list.map((item, i) => {
      // 首页的导航栏
      return <Menu.Item key={i} >
        <Link to={item.path}>
          <span className="nav-text">{item.title}</span>
        </Link>
      </Menu.Item>
    })

    // 个人信息的下拉菜单
    const menu = (
      <Menu>
        <Menu.Item>
          <Link to="/personalInfo" target="_blank" rel="noopener noreferrer">
            个人信息
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/userManage" target="_blank" rel="noopener noreferrer" >
            用户管理
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/collectionManage" target="_blank" rel="noopener noreferrer" >
            收藏管理
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/commentManage" target="_blank" rel="noopener noreferrer" >
            评论管理
          </Link>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className="HeaderWrapper">
        <a href="#" className="header-title">古诗文鉴赏</a>
        <Menu className="menu" onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          {menuList}
        </Menu>
        
        <Input className="header-input" placeholder="搜索..." />

        <Button className="header-login">
          <Link to="/login">登录</Link>
        </Button>

        <Dropdown overlay={menu} placement="bottomRight" className="personalInfo">
          <Button>信息中心</Button>
        </Dropdown>
      </div>
    )
  }
}

export default Header