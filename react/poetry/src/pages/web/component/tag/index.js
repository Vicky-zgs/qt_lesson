// 标签组件

import React, { Component } from 'react'
import './index.less'
import { Link } from 'react-router-dom'


class Tag extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { list } = this.props
    return (
      <div className="tag">
        {
          list.map((item, index) => {
            // 根据父组件传过来的不同list,展示不同的标签
            if (item.birthday) {
              // 诗人页面的标签
              return (
                <Link to={"/poetInfo/" + item.id} key={index} >
                  <div className="tag-item" >
                    {item.name}
                  </div>
                </Link>
              )
            } else if (item.translation) {
              // 诗词页面的标签
              return (
                <Link to={"/web/poetry"} key={index} >
                  <div className="tag-item" >
                    {item.name}
                  </div>
                </Link>
              )
            } else if (item.start) {
              // 朝代的标签
              return (
                <Link to={"/poetry/dynasty/" + item.id} key={index} >
                  <div className="tag-item" >
                    {item.name}
                  </div>
                </Link>
              )
            } else {
              return 
            }
          })
        }
      </div>
    )
  }
}

export default Tag