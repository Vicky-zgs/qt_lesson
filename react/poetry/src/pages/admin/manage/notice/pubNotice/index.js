import React, { Component } from 'react'
import { Layout, Menu, Input, Button, Table } from 'antd';
import './index.less'
import SiderMenu from '../../Sider/index.js'
import axios from 'axios'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class PubNotice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      noticeText: '',  // 输入的通知内容
      managerEmail: ''   // 当前管理员的email
    }
  }

  componentDidMount() {
    // 获取登录用户的信息
    axios.get('/isManager').then((res) => {
      // console.log('登录用户的信息',res.data.data)
      let managerId = res.data.data.isManager
      let email = res.data.data.email
      if (managerId === 1) {
        // 登录者是管理员
        this.setState({
          managerEmail: email
        },() => {
          // console.log('当前用户email:', this.state.managerEmail)
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  handleText = (e) => {
    // console.log('通知：', e.target.value)
    this.setState({
      noticeText: e.target.value
    })
  }

  handleSubmit = (e) => {
    // 点击 发布 触发的方法  将通知的内容传到后端
    let url = "http://localhost:8080/admin/writenotice";//接口地址
    let data = new FormData();
    let msg = {
      'content': this.state.noticeText,
      'email': this.state.managerEmail,
    }
    console.log('提交通知的内容：',msg)
    for (const key in msg) {
        data.append(key,msg[key])
    }
    fetch(url,{
        method: 'post',
        body: data,
        credentials: 'include'
    }).then(function () {
      alert('发布成功')
    })
  }

  render() {
    return (
      <Layout>
        <SiderMenu />
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
            发布通知
          </Header>
          <Content style={{ margin: '24px 16px 0' }} >
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <div className="content" style={{ padding: 24, minHeight: 360 }}>
                <textarea className="pub_notice"
                  onChange={this.handleText}
                  cols="60" rows="10"
                  placeholder="请输入通知内容"
                  style={{fontSize: '1.1em'}}>
                </textarea>
                <Button className="submit" onClick={this.handleSubmit} style={{fontSize: '1.1em'}}>发布</Button>
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>@古诗文鉴赏</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default PubNotice