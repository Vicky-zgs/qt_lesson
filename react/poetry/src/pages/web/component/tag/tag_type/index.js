// 标签组件

import React, { Component } from 'react'
import './index.less'
import { Link } from 'react-router-dom'


class Tag extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // console.log('tag_type的list',this.props.list)
  }
  
  render() {
    const { list } = this.props
    return (
      <div className="tag1">
        {
          list.map((item, index) => {
            // 根据父组件传过来的不同list,展示不同的标签
            if (item.type) {
              // 诗词类别的标签
              return (
                <Link to={"/poetry/type/" + item.id} key={index} >
                  <div className="tag-item" >
                    {item.type}
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