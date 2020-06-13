// 忘记密码 组件
import React from 'react'
import { Form, Input, Button, Card } from 'antd'
import { UserOutlined, LockOutlined, MobileOutlined } from '@ant-design/icons'
import './index.less'

class SetNewPwd extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      check: '',
      password1: ''
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
    // 点击 保存 后 触发的方法
    // console.log('验证码', this.state.check)
    // console.log('新密码', this.state.password1)
    let url = "http://localhost:8080/setNewPassword";//接口地址
    fetch(url, {
      method: 'post',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({ check: this.state.check, newPassword: this.state.password1 })
    }).then(function (res) {
      alert('邮件发送成功')
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="forget_pwd">
        <Card className="login-form" title="修改密码">
        <Form onFinish={this.handleSubmit}>

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

        <Form.Item name="username" rules={[{ required: true, message: '请输入验证邮件中的验证码' }]}>
            <Input
              name="check"
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
              placeholder="请输入验证邮件中的验证码"
              onChange={this.debounce(this.handleChange, 1000)}
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" className="login-form-button" block >保存修改</Button>
        </Form>
        </Card>
      </div>

    )
  }
}

export default SetNewPwd