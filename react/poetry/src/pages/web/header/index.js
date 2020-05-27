import React from 'react'
import { Menu, Button, Input, Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './index.less'
import menus from '../../../Router/web'
import { SearchOutlined } from '@ant-design/icons';

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = ({
      current: 'home',
      isManager: '',  // 是不是管理员, false即不是管理员 是用户, 默认是用户
      search_data: ''
    })
  }

  componentDidMount () {
    axios.get('/isManager').then((res) => {
      console.log('isManager',res.data)
      let managerId = res.data.data.isManager
      if (managerId === 1) {
        // 登录者是管理员
        this.setState({
          isManager: true
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  handleClick = e => {
    // console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  search = (e) => {
    // 搜索框
    // console.log('搜索框输入', e.target.value)
    this.setState({
      search_data: e.target.value
    })
  }

  handleSearch = () => {
    let url = "http://localhost:8080/listpoetrybykw";//接口地址
    let that = this
    fetch(url,{
        method: 'post',
        body: that.state.search_data,
        credentials: 'include'//解决fetch跨域session丢失
    }).then(function (res) {
        return res.json();
    }).then(function (json) {
      console.log('搜索的',that.state.search_data)
      console.log('搜索后返回的数据',json.data)
        // window.location.href = {};
    })
  }

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
          <Link to="/collectionManage" target="_blank" rel="noopener noreferrer" >
            收藏管理
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/commentManage" target="_blank" rel="noopener noreferrer" >
            评论管理
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/lookNotice" target="_blank" rel="noopener noreferrer" >
            通知
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
        
        <div className="search_wrapper">
          <Input className="header-input" placeholder="搜索..." onChange={(e) => this.search(e)} />
          <SearchOutlined className="search_click" onClick={this.handleSearch}/>
        </div>

          <Button className="header-login login">
            <Link to="/login">登录</Link>
          </Button>

        {
          this.state.isManager
          ? <Button className="personalInfo">
              <Link to="/admin/collection">用户信息管理</Link>
            </Button>
          : <Dropdown overlay={menu} placement="bottomRight" className="personalInfo">
              <Button>个人信息</Button>
            </Dropdown>
        }
      </div>
    )
  }
}

export default Header