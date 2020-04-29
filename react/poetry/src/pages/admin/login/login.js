// 登录组件
import React from 'react'
import {Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      email:"",
      pwd:"",
      isLogin: false
    };
  }
    nameInputChange(e) {
        console.log(e.target.value)
      this.setState({
            email: e.target.value
        })
    }
    pwdInputChange(e) {
        this.setState({
            pwd: e.target.value
        })
    }
  // 点击了htmlType为submit的Button后就会触发onFinish, 然后执行的方法
  handleSubmit = (e) => {
      let url = "http://localhost:8080/login";//接口地址
      let user = new FormData();
      let msg = {'email':this.state.email,'password':this.state.pwd}
      for (const key in msg) {
          user.append(key,msg[key])
      }
      fetch(url,{
          method: 'post',
          body: user,
          credentials: 'include',
      }).then(function (res) {
          return res.json();
      }).then(function (json) {
          alert(json.description)
          console.log(json)
          window.location.href=json.nextAction;
          this.setState({
            isLogin: true
          })
      })
    }

  render() {
    return (
      <Form onFinish={this.handleSubmit}>

        <Form.Item name="email" rules={[{ required: true, message: '请输入你的手机号或邮箱' }]}>
          <Input
      onChange={(e) => { this.nameInputChange(e) }}
      prefix={<UserOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />} placeholder="你的手机号或邮箱"
      />
        </Form.Item>

      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password
      onChange={(e) => { this.pwdInputChange(e) }}
      prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />} placeholder="密码"
      />
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