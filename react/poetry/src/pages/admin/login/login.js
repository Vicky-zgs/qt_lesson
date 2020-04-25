// 登录组件
import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import axios from 'axios'
import { connect } from 'react-redux'
import { actionCreators } from './store'

class Login extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   email: "",
    //   pwd: ""
    // };
  }
  // nameInputChange(e) {
  //   this.setState({
  //     email: e.target.value
  //   })
  // }
  // pwdInputChange(e) {
  //   this.setState({
  //     pwd: e.target.value
  //   })
  // }

  componentDidMount() {
    const { loginState } = this.props
    console.log(loginState)
  }
  // 点击了htmlType为submit的Button后就会触发onFinish, 然后执行的方法
  // handleSubmit = (e) => {
    // let url = "http://localhost:8080/login";//接口地址
    // let user = new FormData();
    // alert(this.state.pwd)
    // let msg = { 'email': this.state.email, 'password': this.state.pwd }
    // for (const key in msg) {
    //   user.append(key, msg[key])
    // }
    // axios.post(url, {
    //   body: user,
    // }).then(function (res) {
    //   return res.json();
    // }).then(function (json) {
    //   alert(json.description)
    //   window.location.href = json.nextAction;
    // })
  // }



  render() {
    return (
      <Form onFinish={this.handleSubmit}>

        <Form.Item name="email" rules={[{ required: true, message: '请输入你的邮箱' }]}>
          <Input
            // 取到input框中的dom结构并且存在email和password中
            ref={(input) => {this.email = input}}
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />} placeholder="你的手机号或邮箱"
          />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
          <Input.Password
            ref={(input) => {this.password = input}}
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

        <Button 
          type="primary" 
          htmlType="submit" 
          className="login-form-button" 
          block
          onClick={() => this.props.login(this.email, this.password)}
        >
          登录
        </Button>
      </Form>
    )
  }
}

const mapState = (state) => ({
  loginState: state.login.get('isLogin')
})

const mapDispatch = (dispatch) => ({
  login(accountElem, passwordElem)  {
    let url = "http://localhost:8080/login";//接口地址
    let user = new FormData();
    let msg = { 'email': accountElem.props.value, 'password': passwordElem.props.value }
    // console.log(msg)
    for (const key in msg) {
      user.append(key, msg[key])
    }
    const action = actionCreators.login(url, user)
    action(dispatch)
  }
})

export default connect(mapState, mapDispatch)(Login)