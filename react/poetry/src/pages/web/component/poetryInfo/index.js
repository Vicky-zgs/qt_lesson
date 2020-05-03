// 诗人详情页组件

import React, { Component } from 'react'
import Header from '../../header/index.js'
import './index.less'
import PoetryList from '../poetry_list/index.js'

class PoetryInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poet_info: ''
    }
  }

  componentDidMount() {
    // console.log('诗人id：', this.props.match.params.id) // props传过来的id
    // let url = "http://localhost:8080/displaypoetbyid";//接口地址
    // let id = this.props.match.params.id
    // let that = this
    // fetch(url, {
    //   method: 'post',
    //   body: id,
    //   credentials: 'include'//解决fetch跨域session丢失
    // }).then(function (res) {
    //   return res.json();
    // }).then(function (json) {
    //   console.log('诗文详情页的数据', json)
    //   that.setState({
    //     poet_info: json.data[0]
    //   })
    //   console.log('诗文详情',that.state.poet_info)
    // })
  }

  render() {
    return (
      <div>
        <Header />
        <PoetryList />
      </div>
    )
  }
}

export default PoetryInfo