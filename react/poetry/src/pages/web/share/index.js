// 分享组件

import React, { Component } from 'react';
import List from '../component/share-list/index.js'
import Head from '../header/index';
import axios from 'axios';
import './index.less'

class Share extends Component {

  constructor(props) {
    super(props)
    this.state = {
      shareList: [],
      // TagList: []
    }
  }

  componentDidMount() {
    axios.get('/listallcheckuploads').then((res) => {
      console.log('分享页面数据',res.data.data)
      this.setState({
        shareList: res.data.data
      }, () => {
        // console.log('分享列表数据', this.state.ShareList)
      })
    })
  }

  render () {
    return (
      <div>
        <Head />
        <div className="wrapper_share">
          <List list={this.state.shareList} />
          {/* <Tag list={this.state.TagList}/> */}
        </div>
      </div>
    )
  }
}

export default Share