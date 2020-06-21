// 管理员管理通知的组件

import React, { Component } from 'react'
import { Layout, Menu, Input, Button, Table } from 'antd';
import './index.less'
import SiderMenu from '../Sider/index.js'
import axios from 'axios'
import { Link } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class ManageNotice extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],  // 表格显示的内容
      searchData: null,
      columns: [
        {
          title: '发布者邮箱',
          dataIndex: 'email',
          key: 'email',
          render: text => <a>{text}</a>,
        },
        {
          title: '通知内容',
          dataIndex: 'content',
          key: 'content',
        },
        {
          title: '发布时间',
          dataIndex: 'time',
          key: 'time',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span>
              <Button onClick={(e) => this.deleteNotice(record.id)}>删除</Button>
            </span>
          ),
        },
      ]
    }
  }

  componentDidMount() {
    // 获取当前所有通知
    axios.get('/admin/listnotics').then((res) => {
      // console.log('从后端获取的通知',res.data.data)
      this.setState({
        data: res.data.data
      })
      // console.log('通知数据:', this.state.data)
    }).catch(err => {
      console.log(err)
    })
  }

  search = (e) => {
    // console.log(e.target.value)
    // 获得输入框的值
    this.setState({
      searchData: e.target.value
    }, () => {
      console.log('searchData', this.state.searchData)
    })
  }

  handleSubmit = (e) => {
    var state = this
    // 点击 搜索 触发的方法
    let url = "http://localhost:8080/admin/listnotics";//接口地址
    let kw = this.state.searchData;
    fetch(url, {
      method: 'post',
      body: kw,
      credentials: 'include',//解决fetch跨域session丢失
    }).then(function (res) {
      return res.json();
    }).then(function (json) {
      console.log(json.data)
      state.setState({
        data: json.data
      })
      console.log('Data', state.state.data)
    })
  }

  deleteNotice = (id) => {
    // 点击删除触发的方法
    // console.log('删除的id',id)
    var state = this
    let url = "http://localhost:8080/admin/deletenotic";//接口地址
    fetch(url, {
      method: 'post',
      body: id,
      credentials: 'include'//解决fetch跨域session丢失
    }).then(function (res) {
      return res.json();
    }).then(function (json) {
      // console.log(json.data)
      state.setState({
        data: json.data
      },() => {
        alert('删除成功！')
      })
      // console.log('Data', state.state.data)
    })
  }


  render() {
    return (
      <Layout>
        <SiderMenu />
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
            通知管理
          </Header>
          <Content style={{ margin: '24px 16px 0' }} >
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <div className="content" style={{ padding: 24, minHeight: 360 }}>
                <div className="action">
                  <Link to="/admin/pubNotice" className="notice">
                    <Button>发布通知</Button>
                  </Link>
                  <div className="search">
                    <Input
                      placeholder="请输入关键字搜索"
                      className="input"
                      onChange={(e) => { this.search(e) }}
                    />
                    <Button onClick={this.handleSubmit}>搜索</Button>
                    <Button>删除</Button>
                  </div>
                </div>
                <Table
                  rowKey={(record, index) => `complete${record.id}${index}`}
                  rowSelection
                  columns={this.state.columns}
                  dataSource={this.state.data}
                  pagination={{
                    pageSize: 5,
                    defaultCurrent: 1
                  }}
                />
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>@古诗文鉴赏</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default ManageNotice