import React, { Component } from 'react'
import { Layout, Menu, Input, Button, Table, Select, Form } from 'antd';
import './index.less'
import SiderMenu from '../../Sider/index.js'
import axios from 'axios'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class ManageType extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      searchData: null,
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
      },
      columns: [
        {
          title: '类型',
          dataIndex: 'type',
          key: 'type',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span>
              <Button style={{ marginRight: 10 }} onClick={(e) => this.changeType(record)} >编辑 </Button>
              <Button onClick={(e) => this.deleteCollection(record.id)}>删除</Button>
            </span>
          ),
        },
      ],

      show_addType: false,
      show_changeType: false,
      type: '',
      change_type: ''
    }
  }

  componentDidMount() {
    axios.get('/admin/listpoetrytypes').then((res) => {
      console.log(res.data.data)
      this.setState({
        data: res.data.data
      })
      // console.log('管理员管理用户页面Data', this.state.data)
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
      // console.log('searchData', this.state.searchData)
    })
  }

  handleSubmit = (e) => {
    var state = this
    // 点击 搜索 触发的方法
    let url = "http://localhost:8080/admin/listpoetrytypes";//接口地址
    let kw = this.state.searchData;
    fetch(url, {
      method: 'post',
      body: kw,
      credentials: 'include',//解决fetch跨域session丢失
    }).then(function (res) {
      return res.json();
    }).then(function (json) {
      // console.log(json.data)
      state.setState({
        data: json.data
      })
      // console.log('Data', state.state.data)
    })
  }

  deleteCollection = (id) => {
    // 点击删除触发的方法
    console.log('删除的id',id)
    var state = this
    let url = "http://localhost:8080/admin/deletepoetrytype";//接口地址
    fetch(url, {
      method: 'post',
      body: id,
      credentials: 'include'//解决fetch跨域session丢失
    }).then(function(res) {
      alert('删除成功！')
    })
  }

  // 添加诗词类型后 点击 "提交"
  handleAddType = (e) => {
    let url = "http://localhost:8080/admin/addtype";//接口地址
    let data = new FormData();
    let that = this
    let msg = {
      type: this.state.type
    }
    // console.log('添加诗词类型的信息：',msg)
    for (const key in msg) {
        data.append(key,msg[key])
    }
    fetch(url,{
        method: 'post',
        body: data,
        credentials: 'include'
    }).then(function () {
      alert('提交成功')
      that.setState({
        show_addType: false
      })
    }).catch(function (err) {
      alert('提交失败, 报错',err)
    })
  }

  // 点击 编辑 
  changeType = (data) => {
    this.setState({
      change_type: data,
    }, () => {
      this.setState({
        show_changeType: true
      })
      // console.log('编辑用户的信息', this.state.change_user)
    })
  }
  // 编辑 后 点击 "提交"
  handleChangeType = (e) => {
    let url = "http://localhost:8080/admin/modifytype";

    let data = new FormData();
    let that = this
    let msg = {
      id: this.state.change_type.id,
      type: this.state.type
    }
    // console.log('编辑诗词类型的信息：', msg)
    for (const key in msg) {
      data.append(key, msg[key])
    }
    fetch(url, {
      method: 'post',
      body: data,
      credentials: 'include'
    }).then(function () {
      alert('编辑成功')
      that.setState({
        show_changeType: false
      })
    }).catch(function (err) {
      alert('提交失败, 报错', err)
    })
  }

  render() {
    return (
      <Layout>
        <SiderMenu />
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
            诗词类型管理
          </Header>
          <Content style={{ margin: '24px 16px 0' }} >
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <div className="content" style={{ padding: 24, minHeight: 360 }}>
                <div className="search">
                  <Input
                    placeholder="请输入关键字搜索"
                    className="input"
                    onChange={(e) => { this.search(e) }}
                  />
                  <Button onClick={this.handleSubmit}>搜索</Button>
                  <Button>删除</Button>
                  <Button onClick={() => { this.setState({ show_addType: true }) }}>添加</Button>
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

        {/* 点击添加后弹出来 */}
        <div className={this.state.show_addType ? 'addType' : 'close_addType'}>
          <Form onFinish={this.handleAddType} {...this.state.layout} name="nest-messages" validateMessages={this.state.validateMessages} className="form">
            
            <Form.Item name="type" label="诗词类型" rules={[{ required: true }]} >
              <Input name="type" onChange={(e) => {this.setState({ type: e.target.value})}} placeholder="例：忧愤" />
            </Form.Item>

            <div style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', margin: '10px 0' }}>
              <Button type="primary" style={{ margin: '0 10px', backgroundColor: 'white', border: '1px solid gray', color: 'gray' }} onClick={() => { this.setState({ show_addType: false }) }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit" >
                提交
              </Button>
            </div>
          </Form>
        </div>

        {/* 点击编辑后弹出来 */}
        <div className={this.state.show_changeType ? 'changeType' : 'close_changeType'}>
          <Form onFinish={this.handleChangeType} {...this.state.layout} name="nest-messages" validateMessages={this.state.validateMessages} className="form">
            
            <Form.Item name="type" label="诗词类型" rules={[{ required: true }]} >
              <Input name="type" onChange={(e) => {this.setState({ type: e.target.value})}} placeholder="请输入修改的值" />
            </Form.Item>

            <div style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', margin: '10px 0' }}>
              <Button type="primary" style={{ margin: '0 10px', backgroundColor: 'white', border: '1px solid gray', color: 'gray' }} onClick={() => { this.setState({ show_changeType: false }) }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit" >
                提交
              </Button>
            </div>
          </Form>
        </div>
      
      </Layout>
    )
  }
}

export default ManageType