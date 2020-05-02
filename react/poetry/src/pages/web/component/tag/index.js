// 标签组件

import React, { Component } from 'react'
import './index.less'

class Tag extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('tag的list',this.props.list)
  }
  
  render() {
    const { list } = this.props
    return (
      // <div className="tag">
      //   <div className="tag-item">小学古诗</div>
      // </div>
      <div className="tag">
        {
          list.map((item, index) => {
            // 根据父组件传过来的不同list,展示不同的标签
            return (
              <div key={index} className="tag-item">{item.name}</div>
            )
          })
        }
      </div>
    )
  }
}

export default Tag