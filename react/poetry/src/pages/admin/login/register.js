// 注册组件
import React from 'react'
import {Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined, MobileOutlined } from '@ant-design/icons'
import './index.less'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
        username: '',
        email: '',
        password1: '',
    }
  }

  // input输入框的防抖函数
  debounce = (fn, wait) => {
    let timerId = null;
    return function(input) {
      input.persist();
      if (timerId !== null) clearTimeout(timerId);
      timerId = setTimeout(fn, wait, input)
    }
  }

  handleChange = (e) => {
    // 获取各个input框中输入的值
    let inputValue = e.target.value
    let inputName = e.target.name
    this.setState({
      [inputName]: inputValue
    }, () => {
      console.log(this.state)
    })
  }

  handleSubmit = (e) => {
    let url = "http://localhost:8080/register";//接口地址
    let user = new FormData();
    let msg = {
      'username': this.state.username,
      'email': this.state.email,
      'password': this.state.password1,
    }
    // console.log(msg)
    for (const key in msg) {
        user.append(key,msg[key])
    }
    fetch(url,{
        method: 'post',
        body: user,
    }).then(function (res) {
        return res.json();
    }).then(function (json) {
        alert(json.description)
        window.location.href=json.nextAction;
    })
}

  render() {
    return (
      <Form onFinish={this.handleSubmit}>
        <Form.Item name="username" rules={[{ required: true, message: '请输入你的用户名' }]}>
          <Input 
            name="username" 
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />} 
            placeholder="用户名" 
            onChange={this.debounce(this.handleChange, 1000)} 
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: '请输入正确格式的邮箱',
              validator: (rule, value = '', callback) => {
                try {
                  if (!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value))) {
                    callback('请输入正确格式的邮箱')
                  } 
                  callback();
                } catch(err) {
                  callback(err);
                }
              }
            }
          ]}>
          <Input 
            name="email" 
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />} 
            placeholder="邮箱" 
            onChange={this.debounce(this.handleChange, 1000)} 
          />
        </Form.Item>

        <Form.Item 
          // 输入密码的规则
          name="password1"
          rules={[
            { validator: (rule, value = '', callback) => {
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
            name="password1" 
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />} 
            placeholder="设置密码" 
            onChange={this.debounce(this.handleChange, 1000)} 
          />
        </Form.Item>

        <Form.Item
          name="password2"
          rules={[
            { required: true, message: '请再一次输入密码' },
            { validator: (rule, value = '', callback) => {
              try {
                if (value !== this.state.password1) {
                  callback('两次密码不相同')
                }
                callback();
              } catch(err) {
                callback(err);
              }
            }}
          ]}>
          <Input.Password 
            name="password2" 
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />} 
            placeholder="再次输入密码" 
            onChange={this.debounce(this.handleChange, 1000)}  />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="login-form-button" block >注册</Button>
      </Form>
    )
  }
}

export default Login