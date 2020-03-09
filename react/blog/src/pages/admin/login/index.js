import React from 'react'
import {Form, Input, Button, Card, Message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import './index.less'
import Particles from 'reactparticles.js'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      username: '',
      password: ''
    }
  }

  // 点击了htmlType为submit的Button后就会触发onFinish, 然后执行的方法
  handleSubmit = (e) => { 
    // 阻止冒泡事件
    // e.preventDefault()
    console.log('登录成功')
    sessionStorage.setItem('blogUser', '蜗牛')
    sessionStorage.setItem('menuItemKey', '0')
    // 登录成功后页面跳转
    this.props.history.push('/web/index')
  }

  render () {
    return (
      <div className="login">
        <Particles id="particles1" config="particles1.json" height="90%" />
        <Card className="login-form" style={{width: 300, borderRadius: 4 }}>
          <Form onFinish={this.handleSubmit}>

            <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input prefix={<UserOutlined style={{color: 'rgba(0,0,0,0.25)'}} />} placeholder="请输入用户名" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password prefix={<LockOutlined style={{color: 'rgba(0,0,0,0.25)'}} />} placeholder="请输入密码" />
            </Form.Item>

            <Button type="primary" htmlType="submit" className="login-form-button" block>Login</Button>
          </Form>
        </Card>
      </div>
    )
  }
}

export default Login