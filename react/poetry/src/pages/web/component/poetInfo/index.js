// 诗人详情页组件

import React, { Component } from 'react'
import Header from '../../header/index.js'
import './index.less'
import { StarOutlined, DownloadOutlined, CopyOutlined } from '@ant-design/icons'

class PoetInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poet_info: ''
    }
  }

  componentDidMount() {
    console.log('诗人id：', this.props.match.params.id) // props传过来的id
    let url = "http://localhost:8080/displaypoetbyid";//接口地址
    let id = this.props.match.params.id
    let that = this
    fetch(url, {
      method: 'post',
      body: id,
      credentials: 'include'//解决fetch跨域session丢失
    }).then(function (res) {
      return res.json();
    }).then(function (json) {
      console.log('诗人详情页的数据', json)
      that.setState({
        poet_info: json.data[0]
      })
      console.log('诗人详情',that.state.poet_info)
    })
  }

  render() {
    return (
      <div>
        <Header />
        <div className="wrapper_poetinfo" style={{width: '50vw'}}>
          <div className="content-item" >

            <span className="title" >
              {this.state.poet_info.name}
            </span>
            <span className="author">{this.state.poet_info.birthday}~{this.state.poet_info.deathday}</span>
            <div className="content">
              {this.state.poet_info.intro}
            </div>
            <div className="tool">
              <div className="shoucang"><StarOutlined /></div>
              <div className="xiazai"><DownloadOutlined /></div>
              <div className="fuzhi"><CopyOutlined /></div>
            </div>
            <div className="border"></div>
            <div className="content-tag">
              主要作品：{this.state.poet_info.masterwork}
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default PoetInfo