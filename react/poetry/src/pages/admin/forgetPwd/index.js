// 忘记密码 组件
import React from 'react'
import { Form, Input, Button, Card } from 'antd'
import { UserOutlined, LockOutlined, MobileOutlined } from '@ant-design/icons'
import './index.less'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
    }
  }

  // input输入框的防抖函数
  debounce = (fn, wait) => {
    let timerId = null;
    return function (input) {
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
      // console.log(this.state)
    })
  }

  handleSubmit = (e) => {
    // 点击 发送邮件 后 触发的方法
    let url = "http://localhost:8080/changePassword";//接口地址
    // let user = new FormData();
    // let msg = {
    //   'username': this.state.username,
    //   'to_': this.state.email
    // }
    // console.log('找回密码页面发送的数据', msg)
    // for (const key in msg) {
    //   user.append(key, msg[key])
    // }
    // fetch(url,{
    //     method: 'post',
    //     body: user,
    // }).then(function (res) {
    //   alert('邮件发送成功')
    // }).catch((err) => {
    //   console.log(err)
    // })
    fetch(url, {
      method: 'post',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ username: this.state.username, to_: this.state.email })
    }).then(function (res) {
      alert('邮件发送成功')
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="forget_pwd">
        <Card className="login-form" title="找回密码">
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
              {
                required: true, message: '请输入正确格式的邮箱',
                validator: (rule, value = '', callback) => {
                  try {
                    if (!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value))) {
                      callback('请输入正确格式的邮箱')
                    }
                    callback();
                  } catch (err) {
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

          <Button type="primary" htmlType="submit" className="login-form-button" block >发送邮件</Button>
        </Form>
        </Card>
      </div>

    )
  }
}

export default Login