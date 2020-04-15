// 注册组件
import React from 'react'
import {Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined, MobileOutlined } from '@ant-design/icons'
import './index.less'

class Login extends React.Component {
  handleSubmit = (e) => {
    console.log('登录成功')
    this.props.history.push('/web/index')
  }

  render() {
    return (
      <Form onFinish={this.handleSubmit}>
        <Form.Item name="username" rules={[{ required: true, message: '请输入你的昵称' }]}>
          <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />} placeholder="你的昵称" />
        </Form.Item>

        <Form.Item
          name="userPhoneNum"
          // 输入手机号的规则
          rules={[
            { validator: (rule, value = '', callback) => {
              try {
                if (value.length == '') {
                  callback('请输入你的手机号码')
                } else if (value.length != 11) {
                  callback('请输入正确的手机号码')
                }
                callback();
              } catch(err) {
                callback(err);
              }
            }}
          ]}
        >
          <Input prefix={<MobileOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />} placeholder="你的手机号" />
        </Form.Item>

        <Form.Item 
          name="password" 
          // 输入密码的规则
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
          <Input.Password prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />} placeholder="设置密码" />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="login-form-button" block>注册</Button>
      </Form>
    )
  }
}

export default Login