import React, { Component } from 'react'
import Header from '../header/index'
import './index.less'
import { Form, Input, Button, Select } from 'antd';
import axios from 'axios'
import { LockOutlined } from '@ant-design/icons'

class PersonalInfo extends Component {

  constructor(props) {
    super(props)
    this.state = {
      getUser: [],  // 从后台获取的用户数据
      email: '',
      username: '',
      password: '',
      grander: '', // 性别 1(男) 0(女)
      id: '',
      isManager: '',
      isVIP: '',
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

  componentDidMount() {
    axios.get('/goPersonalInfo').then((res) => {
      console.log(res)
      let data = res.data.data
      this.setState({
        // 直接用接口请求的值给这些值赋值
        email: data.email,
        username: data.username,
        gender: data.gender,
        id: data.id,
        isManager: data.isManager,
        isVIP: data.isVIP,
        grade: data.grade
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

  handleSubmit = (e) => {
    let url = "http://localhost:8080/SavePersonalInfo";//接口地址
    let user = new FormData();
    let msg = {
      'username': this.state.username,
      'email': this.state.email,
      'password': this.state.password,
      'gender':this.state.gender,
      'id':this.state.id,
      'isManager':this.state.isManager,
      'isVIP':this.state.isVIP,
      'grade':this.state.grade
    }
    console.log('用户修改的信息',msg)
    for (const key in msg) {
        user.append(key,msg[key])
    }
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
      <div>
        <Header />
        <div className="wrapper">
          <div className="infoTitle">
            更改个人信息
          </div>
          <Form onFinish={this.handleSubmit} {...this.state.layout} name="nest-messages" validateMessages={this.state.validateMessages} className="form">
            <Form.Item name="email" label="邮箱" rules={[{ type: 'email', required: true }]} >
              <Input name="email" placeholder={this.state.email} defaultValue={this.state.email} onChange={this.handleChange}/>
            </Form.Item>
            <Form.Item name="username" label="用户实名" rules={[{ required: true }]}>
              <Input name="username" placeholder={this.state.username} onChange={this.handleChange} />
            </Form.Item>
            <Form.Item 
          // 输入密码的规则
          label="密码"
          name="password"
          rules={[
            { required: true,
              validator: (rule, value = '', callback) => {
              try {
                if (value.length == '') {
                  callback('请输入密码')
                } else if ((value.length < 8) || (value.length > 14)) {
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
            { required: true, message: '密码' },
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
              {this.state.grade}
            </Form.Item>

            <Form.Item name="gender" label="性别" rules={[{ required: true }]}>
          <Select
            placeholder={this.state.gender}
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
      </div >
    )
  }
}

export default PersonalInfo