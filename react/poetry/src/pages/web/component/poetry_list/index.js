// 诗词内容组件

import React, { Component } from 'react'
import './index.less'
import { StarOutlined, DownloadOutlined, CopyOutlined } from '@ant-design/icons'

class PoetryList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="content-item" >

            <span className="title" >
              将进酒
            </span>
            <span className="author">唐代：李白</span>
            <div className="content">
              君不见黄河之水天上来，奔流到海不复回。
              君不见高堂明镜悲白发，朝如青丝暮成雪。
            </div>
            <div className="tool">
              <div className="shoucang"><StarOutlined /></div>
              <div className="xiazai"><DownloadOutlined /></div>
              <div className="fuzhi"><CopyOutlined /></div>
            </div>
            <div className="border"></div>
            <div className="content-tag">
              哀叹
            </div>

          </div>
        </div>
        </div>
    )
  }
}

export default PoetryList