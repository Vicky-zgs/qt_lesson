import React, { Component } from 'react'
import { Layout, Menu, Input, Button, Table, Select, Form } from 'antd';
import { LockOutlined } from '@ant-design/icons'
import './index.less'
import SiderMenu from '../Sider/index.js'
import axios from 'axios'
import Item from 'antd/lib/list/Item';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class ManageComment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      searchData: null,
      columns: [
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username',
          render: text => <a>{text}</a>,
        },
        {
          title: '密码',
          dataIndex: 'password',
          key: 'password',
        },
        {
          title: '性别',
          dataIndex: 'gender',
          key: 'gender',
        },
        {
          title: '电子邮箱',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: '等级',
          dataIndex: 'grade',
          key: 'grade',
        },
        {
          title: '用户类型',
          dataIndex: 'isManager',
          key: 'isManager',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span>
              <Button style={{ marginRight: 10 }} onClick={(e) => this.changeUser(record)}>编辑 </Button>
              <Button onClick={(e) => this.deleteUser(record.id)}>删除 </Button>
            </span>
          ),
        },
      ],
      show_addUser: false,  // 是否显示添加用户的表单
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
      },
      // 添加 中 输入的数据
      id: '',
      email: '',
      username: '',
      password: '',
      grade: '', // 等级 
      gender: '', // 性别 1(男) 0(女) 
      isManager: '', // 是否是管理员 0(普通用户) 1(管理员)
      // 点击 编辑 后，点击的那条数据
      change_user: '',
      change_user_after: '', // 编辑完成后的数据
      show_changeUser: false,  // 是否显示编辑表单

    }
  }

  componentDidMount() {
    axios.get('/admin/listusers').then((res) => {
      console.log('用户信息',res.data.data)
      const result = res.data.data
      const temp_data = []
      // 需要对数据进行转换 拿到的 1：男/管理员 0：女/普通用户
      for (let i = 0; i < result.length; i++) {
        const temp_isManager = result[i].isManager === 1 ? '管理员' : '普通用户';
        const temp_gender = result[i].gender === '1' ? '男' : '女'

        //push数据
        temp_data.push({
          id: result[i].id,
          email: result[i].email,
          username: result[i].username,
          password: result[i].password,
          grade: result[i].grade,
          gender: temp_gender,
          isManager: temp_isManager,
        })
      }
      this.setState({
        data: temp_data
      })
      console.log('管理员管理用户页面Data', temp_data)
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

  // 点击 搜索
  handleSubmit = (e) => {
    var state = this
    let url = "http://localhost:8080/admin/listusers";//接口地址
    let kw = this.state.searchData;
    fetch(url, {
      method: 'post',
      body: kw,
      credentials: 'include',//解决fetch跨域session丢失
    }).then(function (res) {
      return res.json();
    }).then(function (json) {
      // console.log(json.data)
      const result = json.data
      const temp_data = []
      // 需要对数据进行转换 拿到的 1：男/管理员 0：女/普通用户
      for (let i = 0; i < result.length; i++) {
        const temp_isManager = result[i].isManager === 1 ? '管理员' : '普通用户';
        const temp_gender = result[i].gender === '1' ? '男' : '女'

        //push数据
        temp_data.push({
          email: result[i].email,
          username: result[i].username,
          password: result[i].password,
          grade: result[i].grade,
          gender: temp_gender,
          isManager: temp_isManager,
        })
      }
      state.setState({
        data: temp_data
      })
      // console.log('Data', state.state.data)
    })
  }

  addUser = (e) => {
    // 点击 添加 出现添加用户的表单
    this.setState({
      show_addUser: true
    })
  }

  closeAddUser = (e) => {
    // 点击添加表单中的取消 
    this.setState({
      show_addUser: false
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

  onGenderChange = (e) => {
    // 获取用户选择的性别
    this.setState({
      gender: e
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

  // 点击 添加表单中的 "提交" 触发的方法
  handleAddUser = (e) => {
    let url = "http://localhost:8080/admin/saveuser";//接口地址
    let data = new FormData();
    let that = this
    let msg = {
      'username': this.state.username,
      'email': this.state.email,
      'password': this.state.password,
      'grade': this.state.grade,
      'isManager': this.state.isManager,
      'gender': this.state.gender,
    }
    // console.log('添加用户的信息：',msg)
    for (const key in msg) {
      data.append(key, msg[key])
    }
    fetch(url, {
      method: 'post',
      body: data,
      credentials: 'include'
    }).then(function () {
      alert('提交成功')
      that.setState({
        show_addUser: false
      })
    }).catch(function (err) {
      alert('提交失败, 报错', err)
    })
  }

  // 点击 删除
  deleteUser = (id) => {
    // console.log('删除的用户id',id)
    let url = "http://localhost:8080/admin/deleteuser";//接口地址
    let that = this
    fetch(url, {
      method: 'post',
      body: id,
      credentials: 'include'//解决fetch跨域session丢失
    }).then(function (res) {
      return res.json();
  }).then(function (json) {
    const result = json.data
    const temp_data = []
    // 需要对数据进行转换 拿到的 1：男/管理员 0：女/普通用户
    for (let i = 0; i < result.length; i++) {
      const temp_isManager = result[i].isManager === 1 ? '管理员' : '普通用户';
      const temp_gender = result[i].gender === '1' ? '男' : '女'

      //push数据
      temp_data.push({
        email: result[i].email,
        username: result[i].username,
        password: result[i].password,
        grade: result[i].grade,
        gender: temp_gender,
        isManager: temp_isManager,
      })
    }
    that.setState({
      data: temp_data
    })
  })
}

  // 点击 编辑 
  changeUser = (data) => {
    console.log('点击编辑的data', data)
    this.setState({
      change_user: data,
    }, () => {
      this.setState({
        show_changeUser: true
      })
      // console.log('编辑用户的信息', this.state.change_user)
    })
  }
  // 编辑 后 点击 "提交"
  handleChangeUser = (e) => {
    let url = "http://localhost:8080//admin/modifyuser";//接口地址

    const result = this.state
      const temp_data = []
        const temp_isManager = result.change_user.isManager === '管理员' ? 1 : 0;
        const temp_gender = result.change_user.gender === '男' ? 1 : 0;

        //push数据
        temp_data.push({
          gender: temp_gender,
          isManager: temp_isManager,
        })

    let change_data = new FormData();
    let that = this
    let msg = {
      'id': this.state.change_user.id,
      'email': this.state.change_user.email,
      'username': this.state.username ? this.state.username : this.state.change_user.username,
      'password': this.state.password ? this.state.password : this.state.change_user.password,
      'grade': this.state.grade ? this.state.grade : this.state.change_user.grade,
      'isManager': this.state.isManager ? this.state.isManager : temp_data[0].isManager,
      'gender': this.state.gender ? this.state.gender : temp_data[0].gender,
    }
    // console.log('编辑用户的信息：', msg)
    for (const key in msg) {
      change_data.append(key, msg[key])
    }
    fetch(url, {
      method: 'post',
      body: change_data,
      credentials: 'include'
    }).then(function (res) {
      return res.json();
  }).then(function (json) {
      alert('编辑成功')
      // console.log('编辑后的用户信息', json.data)
      that.setState({
        show_changeUser: false,
      },() => {
        window.location.reload(true)
      })
    }).catch(function (err) {
      alert('提交失败, 报错', err)
    })
  }

  render() {
    const { Option } = Select;
    return (
      <Layout>
        <SiderMenu />
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
            用户信息管理
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
                  <Button onClick={this.addUser}>添加</Button>
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
        <div className={this.state.show_addUser ? 'addUser' : 'close_addUser'}>
          <Form onFinish={this.handleAddUser} {...this.state.layout} name="nest-messages" validateMessages={this.state.validateMessages} className="form">
            <Form.Item name="email" label="邮箱" rules={[{ type: 'email', required: true }]} >
              <Input name="email" placeholder={this.state.email} defaultValue={this.state.email} onChange={this.handleChange} />
            </Form.Item>
            <Form.Item name="username" label="用户实名" rules={[{ required: true }]}>
              <Input name="username" placeholder={this.state.username} onChange={this.handleChange} />
            </Form.Item>
            <Form.Item
              // 输入密码的规则
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  validator: (rule, value = '', callback) => {
                    try {
                      if (value.length == '') {
                        callback('请输入密码')
                      } else if ((value.length < 8) || (value.length > 14)) {
                        callback('密码长度须为8~14之间')
                      }
                      callback();
                    } catch (err) {
                      callback(err);
                    }
                  }
                }
              ]}
            >
              <Input.Password
                name="password"
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
                placeholder="请输入重置的密码"
                onChange={this.handleChange}
              />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password2"
              rules={[
                { required: true, message: '密码' },
                {
                  validator: (rule, value = '', callback) => {
                    try {
                      if (value !== this.state.password) {
                        callback('两次密码不相同')
                      }
                      callback();
                    } catch (err) {
                      callback(err);
                    }
                  }
                }
              ]}>
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
                placeholder="再次输入密码"
              />
            </Form.Item>

            <Form.Item name="grade" label="等级" rules={[{ required: true }]} >
              <Input name="grade" onChange={this.handleChange} />
            </Form.Item>

            <Form.Item name="isManager" label="用户类型" rules={[{ required: true }]} >
              <Select
                onChange={(e) => { this.setState({ isManager: e }) }}
                allowClear
              >
                <Option value="0">普通用户</Option>
                <Option value="1">管理员</Option>
              </Select>
            </Form.Item>

            <Form.Item name="gender" label="性别" rules={[{ required: true }]}>
              <Select
                onChange={this.onGenderChange}
                allowClear
              >
                <Option value="1">男</Option>
                <Option value="0">女</Option>
              </Select>
            </Form.Item>

            <div style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)' }}>
              <Button type="primary" style={{ margin: '0 10px', backgroundColor: 'white', border: '1px solid gray', color: 'gray' }} onClick={this.closeAddUser}>
                取消
              </Button>
              <Button type="primary" htmlType="submit" >
                提交
              </Button>
            </div>
          </Form>
        </div>

        {/* 点击编辑后弹出来 */}
        <div className={this.state.show_changeUser ? 'changeUser' : 'close_changeUser'}>
          <Form onFinish={this.handleChangeUser} {...this.state.layout} name="nest-messages" validateMessages={this.state.validateMessages} className="form">
            <Form.Item name="email" label="邮箱" >
              {this.state.change_user.email}
            </Form.Item>
            <Form.Item name="username" label="用户实名" >
              <Input name="username" placeholder={this.state.change_user.username} onChange={this.handleChange} />
            </Form.Item>
            <Form.Item
              // 输入密码的规则
              label="密码"
              name="password"
              rules={[
                {
                  validator: (rule, value = '', callback) => {
                    try {
                      if (value.length == '') {
                        callback('请输入密码')
                      } else if ((value.length < 8) || (value.length > 14)) {
                        callback('密码长度须为8~14之间')
                      }
                      callback();
                    } catch (err) {
                      callback(err);
                    }
                  }
                }
              ]}
            >
              <Input.Password
                name="password"
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
                placeholder="请输入重置的密码"
                onChange={this.handleChange}
              />
            </Form.Item>

            <Form.Item
              label="密码"
              name="password2"
              rules={[
                { message: '密码' },
                {
                  validator: (rule, value = '', callback) => {
                    try {
                      if (value !== this.state.password) {
                        callback('两次密码不相同')
                      }
                      callback();
                    } catch (err) {
                      callback(err);
                    }
                  }
                }
              ]}>
              <Input.Password
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
                placeholder="再次输入密码"
              />
            </Form.Item>

            <Form.Item name="grade" label="等级"  >
              <Input name="grade" onChange={this.handleChange} placeholder={this.state.change_user.grade} />
            </Form.Item>

            <Form.Item name="isManager" label="用户类型" >
              <Select
                onChange={(e) => { this.setState({ isManager: e }) }}
                allowClear
                placeholder={this.state.change_user.isManager}
              >
                <Option value="0">普通用户</Option>
                <Option value="1">管理员</Option>
              </Select>
            </Form.Item>

            <Form.Item name="gender" label="性别" >
              <Select
                onChange={this.onGenderChange}
                allowClear
                placeholder={this.state.change_user.gender}
              >
                <Option value="1">男</Option>
                <Option value="0">女</Option>
              </Select>
            </Form.Item>

            <div style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)' }}>
              <Button type="primary" style={{ margin: '0 10px', backgroundColor: 'white', border: '1px solid gray', color: 'gray' }} onClick={() => { this.setState({ show_changeUser: false }) }}>
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

export default ManageComment