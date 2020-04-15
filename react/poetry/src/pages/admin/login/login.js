// 登录组件
import React from 'react'
import {Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

class Login extends React.Component {
  constructor(props) {
    super(props)
  }

  // 点击了htmlType为submit的Button后就会触发onFinish, 然后执行的方法
  handleSubmit = (e) => {
    console.log('登录成功')
    // 登录成功后页面跳转
    this.props.history.push('/web/index')
  }

  render() {
    return (
      <Form onFinish={this.handleSubmit}>

        <Form.Item name="username" rules={[{ required: true, message: '请输入你的手机号或邮箱' }]}>
          <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />} placeholder="你的手机号或邮箱" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />} placeholder="密码" />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            忘记密码?
          </a>
        </Form.Item>

        <Button type="primary" htmlType="submit" className="login-form-button" block>登录</Button>
      </Form>
    )
  }
}

export default Login