// 诗人详情页组件

import React, { Component } from 'react'
import Header from '../../header/index.js'
import './index.less'
import { StarOutlined, DownloadOutlined, CopyOutlined } from '@ant-design/icons'
import OtherInfo from '../otherInfo/index.js'

class PoetryInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poetry_info: ''
    }
  }

  // 换行要用到的方法
  autoSize() {
    let textarea = document.getElementById('reward-text');
    textarea.style.height = (textarea.scrollHeight + 10) + 'px';
  }

  componentDidUpdate() {
    this.autoSize();
  }

  componentDidMount() {
    console.log('诗词id：', this.props.match.params.id) // props传过来的id
    let url = "http://localhost:8080//displaypoetrybyid"//接口地址
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
        poetry_info: json.data[0]
      })
      console.log('诗人详情',that.state.poetry_info)
    })
  }

  render() {
    return (
      <div>
        <Header />
        {/* 诗歌内容 */}
        <div className="wrapper" style={{width:'50vw'}}>
          <div className="content-item" >

            <span className="title" >
              {this.state.poetry_info.name}
            </span>
            <span className="author">{this.state.poetry_info.dynastyname}：{this.state.poetry_info.poetname}</span>
            <textarea id="reward-text" className="content" style={{
            width: '100%',
            overflow: 'auto',
            wordBreak: 'break-all',
            color: '#000000',
            fontSize: '14px',
            border: 'none',
            bodyStyle: 'solid',
            backgroundColor: '#dadae7'
          }} value={this.state.poetry_info.content} readOnly></textarea>
            <div className="tool">
              <div className="shoucang"><StarOutlined /></div>
              <div className="xiazai"><DownloadOutlined /></div>
              <div className="fuzhi"><CopyOutlined /></div>
            </div>
            <div className="border"></div>
            <div className="content-tag">
              {this.state.poetry_info.type}
            </div>

          </div>
        </div>
        {/* 注释以及翻译 */}
        <OtherInfo list={this.state.poetry_info}/>
      </div>
    )
  }
}

export default PoetryInfo