import React from 'react'
import { Card } from 'antd'
import './index.less'
import Login from './login.js'
import Register from './register.js'
import { Link } from 'react-router-dom'
import img from '../../../utils/img.png'

class LoginAndRegister extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      key: 'tab1',
      noTitleKey: 'app',
      tabList: [
        {
          key: 'tab1',
          tab: '登录',
        },
        {
          key: 'tab2',
          tab: '注册',
        },
      ],
      contentList: {
        tab1: <Login history={this.props.history} />,
        tab2: <Register history={this.props.history} />,
      }
    }
  }

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  render () {
    const loginStyle = {
      backgroundImage: `url(${img})`,
      backgroundRepeat: 'repeat-y',
      backgroundAttachment: 'fixed',
      backgroundSize: '100% 100%',
      opacity: '1'
    }
    return (
      <div className="login" style={loginStyle}>
        <Link to="/web/index" className="loginTitle">古诗文鉴赏</Link>
        <Card
          className="login-form"
          tabList={this.state.tabList}
          activeTabKey={this.state.key}
          onTabChange={key => {
          this.onTabChange(key, 'key');
        }}
        >
          {this.state.contentList[this.state.key]}
        </Card>
      </div>
    )
  }
}

export default LoginAndRegister