import React from 'react'
import { Menu } from 'antd';
import { Button, Input } from 'antd'
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

    return (
      <div className="HeaderWrapper">
        <Link to="/web/index" className="header-title">
          古诗文鉴赏
        </Link>
        <Menu className="menu" onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
          {menuList}
        </Menu>
        
        <Input className="header-input" placeholder="搜索..." />

        <Button className="header-login">
          <Link to="/login">登录</Link>
        </Button>
      </div>
    )
  }
}

export default Header