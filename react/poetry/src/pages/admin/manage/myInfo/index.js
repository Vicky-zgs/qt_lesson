import React, { Component } from 'react'
import { Layout, Menu, Input, Button, Table,  Form, Select  } from 'antd';
import './index.less'
import SiderMenu from '../Sider/index.js'
import axios from 'axios'
import { LockOutlined } from '@ant-design/icons'

const { Header, Content, Footer } = Layout;

class ManagerMyInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      getUser: [],  // 从后台获取的用户数据
      email_0: '',
      username_0: '',
      password_0: '',
      grander_0: '', // 性别 1(男) 0(女)
      id_0: '',
      isManager_0: '',
      grade_0: '',

      email: '',
      username: '',
      password: '',
      grander: '', // 性别 1(男) 0(女)
      id: '',
      isManager: '',
      grade: '',

      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 14 },
      },
      validateMessages: {
        required: '${name} is required!',
        types: {
          email: '${name} is not validate email!',
        },
        number: {
          range: '${name} must be between ${min} and ${max}',
        },
      }
    }
  }

  componentDidMount () {
    axios.get('/goPersonalInfo').then((res) => {
      console.log('获取个人信息',res.data.data)
      let data = res.data.data
      this.setState({
        // 直接用接口请求的值给这些值赋值
        email_0: data.email,
        username_0: data.username,
        gender_0: data.gender ? data.gender : '1',
        id_0: data.id,
        isManager_0: data.isManager,
        grade_0: data.grade
      })
    }).catch((err) => {
      console.log(err)
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

  // 提交修改
  handleSubmit = (e) => {
    let url = "http://localhost:8080/SavePersonalInfo";//接口地址
    let user = new FormData();
    let msg = {
      'username': this.state.username ? this.state.username : this.state.username_0,
      'email': this.state.email ? this.state.email : this.state.email_0,
      'password': this.state.password ? this.state.password : this.state.password,
      'gender':this.state.gender ? this.state.gender : this.state.gender_0,
      'id':this.state.id ? this.state.id : this.state.id_0,
      'isManager':this.state.isManager ? this.state.isManager : this.state.isManager_0,
      'grade':this.state.grade ? this.state.grade : this.state.grade_0
    }
    for (const key in msg) {
        user.append(key,msg[key])
    }
    console.log('用户修改的信息',msg)
    fetch(url,{
        method: 'post',
        body: user,
        credentials: 'include'//解决fetch跨域session丢失
    }).then(function (res) {
        return res.json();
    }).then(function (json) {
        alert(json.description)
    })
}

  render() {
    const { Option } = Select;
    return (
      <Layout>
        <SiderMenu />
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
            我的信息
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
          <div className="wrapper_info" >
          <Form onFinish={this.handleSubmit} {...this.state.layout} name="nest-messages" validateMessages={this.state.validateMessages} className="form">
            <Form.Item name="email" label="邮箱" rules={[{ type: 'email' }]} >
              <Input name="email" placeholder={this.state.email_0} onChange={this.handleChange}/>
            </Form.Item>
            <Form.Item name="username" label="用户实名" >
              <Input name="username" placeholder={this.state.username_0} onChange={this.handleChange} />
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
                if ((value.length < 8) || (value.length > 14)) {
                  callback('密码长度须为8~14之间')
                }
                callback();
              } catch(err) {
                callback(err);
              }
            }}
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
            { validator: (rule, value = '', callback) => {
              try {
                if (value !== this.state.password) {
                  callback('两次密码不相同')
                }
                callback();
              } catch(err) {
                callback(err);
              }
            }}
          ]}>
          <Input.Password
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />} 
            placeholder="再次输入密码"
          />
        </Form.Item>

        <Form.Item label="等级" >
              {this.state.grade_0}
            </Form.Item>

            <Form.Item name="gender" label="性别" >
          <Select
            placeholder={(this.state.gender_0 === '1') ? '男' : '女'}
            onChange={this.onGenderChange}
            allowClear
          >
            <Option value="1">男</Option>
            <Option value="0">女</Option>
          </Select>
        </Form.Item>

            <Form.Item wrapperCol={{ ...(this.state.layout).wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>@古诗文鉴赏</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default ManagerMyInfo