// 标签组件

import React, { Component } from 'react'
import './index.less'

class Tag extends Component {
  render() {
    return (
      <div className="tag">
        <div className="tag-item">小学古诗</div>
        <div className="tag-item">初中古诗</div>
        <div className="tag-item">高中古诗</div>
        <div className="tag-item">唐诗三百</div>
        <div className="tag-item">宋词三百</div>
        <div className="tag-item">宋词精选</div>
      </div>
    )
  }
}

export default Tag