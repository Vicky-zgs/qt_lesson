import React, { Component } from 'react'
import { Layout, Menu, Input, Button, Table, Select, Form } from 'antd';
import './index.less'
import SiderMenu from '../../Sider/index.js'
import axios from 'axios'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class ManageDynasty extends Component {
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
          title: '朝代id',
          dataIndex: 'id',
          key: 'id',
          render: text => <a>{text}</a>,
        },
        {
          title: '朝代名称',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: '开始年份',
          dataIndex: 'starttime',
          key: 'start',
        },
        {
          title: '结束年份',
          dataIndex: 'endtime',
          key: 'end',
        },
        {
          title: '简介',
          dataIndex: 'intro',
          key: 'intro',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span>
              <Button style={{ marginRight: 10 }} onClick={(e) => this.changeDynasty(record)}>编辑 </Button>
              <Button onClick={(e) => this.deleteCollection(record.id)}>删除</Button>
            </span>
          ),
        },
      ],

      show_addDynasty: false,
      show_changeDynasty: false,
      name: '',
      starttime: '',
      endtime: '',
      intro: '',

      change_dynasty: ''
    }
  }

  componentDidMount() {
    axios.get('/admin/listdynasty').then((res) => {
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

  handleChange = (e) => {
    // 获取输入框中输入的值
    let inputValue = e.target.value
    let inputName = e.target.name
    this.setState({
      [inputName]: inputValue
    })
  }

  handleSubmit = (e) => {
    var state = this
    // 点击 搜索 触发的方法
    let url = "http://localhost:8080/admin/listdynasty";//接口地址
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
    // console.log('删除的id',id)
    var state = this
    let url = "http://localhost:8080/admin/deletedynasty";//接口地址
    fetch(url, {
      method: 'post',
      body: id,
      credentials: 'include'//解决fetch跨域session丢失
    }).then(function(res) {
      alert('删除成功！')
    })
  }

  // 添加朝代后 点击 "提交"
  handleAddDynasty = (e) => {
    let url = "http://localhost:8080/admin/adddynasty";//接口地址
    let data = new FormData();
    let that = this
    let msg = {
      name: this.state.name,
      starttime: this.state.starttime,
      endtime: this.state.endtime,
      intro: this.state.intro,
    }
    console.log('添加朝代的信息：',msg)
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
        show_addDynasty: false
      })
    }).catch(function (err) {
      alert('提交失败, 报错',err)
    })
  }

  // 点击 编辑 
  changeDynasty = (data) => {
    this.setState({
      change_dynasty: data,
    }, () => {
      this.setState({
        show_changeDynasty: true
      })
      // console.log('编辑用户的信息', this.state.change_user)
    })
  }
  // 编辑 后 点击 "提交"
  handleChangeDynasty = (e) => {
    let url = "http://localhost:8080/admin/modifydynasty";

    let data = new FormData();
    let that = this
    // 传到后端的值 ， 如果没输入即不需要修改，就传原来的值
    let msg = {
      id: this.state.change_dynasty.id,
      name: this.state.change_dynasty.name,
      starttime: this.state.starttime ? this.state.starttime : this.state.change_dynasty.starttime,
      endtime: this.state.endtime ? this.state.endtime : this.state.change_dynasty.endtime,
      intro: this.state.intro ? this.state.intro : this.state.change_dynasty.intro,
    }
    // console.log('编辑朝代的信息：', msg)
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
        show_changeDynasty: false
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
            诗词朝代管理
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
                  <Button onClick={() => { this.setState({ show_addDynasty: true }) }}>添加</Button>
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
        <div className={this.state.show_addDynasty ? 'addDynasty' : 'close_addDynasty'}>
          <Form onFinish={this.handleAddDynasty} {...this.state.layout} name="nest-messages" validateMessages={this.state.validateMessages} className="form">
            <Form.Item name="name" label="朝代名称" rules={[{ required: true }]} >
              <Input name="name" onChange={this.handleChange} placeholder="例：唐朝" />
            </Form.Item>

            <Form.Item name="starttime" label="开始时间" rules={[{ required: true }]}>
              <Input name="starttime" onChange={this.handleChange} placeholder="例：公元618年" />
            </Form.Item>
            <Form.Item name="endtime" label="结束时间" rules={[{ required: true }]}>
              <Input name="endtime" onChange={this.handleChange} placeholder="例：公元907年" />
            </Form.Item>

            <Form.Item name="intro" label="朝代简述" rules={[{ required: true }]} >
              <textarea name="intro"
                onChange={(e) => { this.setState({ intro: e.target.value }) }}
                cols="40" rows="5"
                style={{ minHeight: '50px', maxHeight: '150px' }}
                placeholder="请输入朝代简述">
              </textarea>
            </Form.Item>

            <div style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', margin: '10px 0' }}>
              <Button type="primary" style={{ margin: '0 10px', backgroundColor: 'white', border: '1px solid gray', color: 'gray' }} onClick={() => { this.setState({ show_addDynasty: false }) }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit" >
                提交
              </Button>
            </div>
          </Form>
        </div>
      
        {/* 点击编辑后弹出来 */}
        <div className={this.state.show_changeDynasty ? 'changeDynasty' : 'close_changeDynasty'}>
          <Form onFinish={this.handleChangeDynasty} {...this.state.layout} name="nest-messages" validateMessages={this.state.validateMessages} className="form">
            <Form.Item name="name" label="朝代名称" >
              {this.state.change_dynasty.name}
            </Form.Item>

            <Form.Item name="starttime" label="开始时间" >
              <Input name="starttime" onChange={this.handleChange} placeholder={this.state.change_dynasty.starttime} />
            </Form.Item>
            <Form.Item name="endtime" label="结束时间" >
              <Input name="endtime" onChange={this.handleChange} placeholder={this.state.change_dynasty.endtime} />
            </Form.Item>

            <Form.Item name="intro" label="朝代简述" >
              <textarea name="intro"
                onChange={(e) => { this.setState({ intro: e.target.value }) }}
                cols="40" rows="5"
                style={{ minHeight: '50px', maxHeight: '150px' }}
                placeholder={this.state.change_dynasty.intro}>
              </textarea>
            </Form.Item>

            <div style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', margin: '10px 0' }}>
              <Button type="primary" style={{ margin: '0 10px', backgroundColor: 'white', border: '1px solid gray', color: 'gray' }} onClick={() => { this.setState({ show_changeDynasty: false }) }}>
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

export default ManageDynasty