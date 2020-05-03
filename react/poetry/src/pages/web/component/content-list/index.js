// 内容列表组件

import React, { Component } from 'react'
import './index.less'
import { StarOutlined, DownloadOutlined, CopyOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listNum: 5
    }
  }

  loadMore() {
    this.setState({
      listNum : this.state.listNum + 2
    })
  }

  render() {
    const { list } = this.props
    return (
      <div
        className="content-list"
      >
        {
          list.map((item, index) => {
            if (index < this.state.listNum) {
              return (
                <div className="content-item" key={index}>

                  <span className="title" >
                    {/* 传id给详情页 */}
                    <Link to={"/poetInfo/" + item.id} >
                      {item.name}
                    </Link>
                  </span>
                  <span className="author">{item.birthday}~{item.deathday}</span>
                  <div className="content">
                    {item.intro}
                  </div>
                  <div className="tool">
                    <div className="shoucang"><StarOutlined /></div>
                    <div className="xiazai"><DownloadOutlined /></div>
                    <div className="fuzhi"><CopyOutlined /></div>
                  </div>
                  <div className="border"></div>
                  <div className="content-tag">
                    {item.masterwork}
                  </div>

                </div>
              )
            } else {
              return
            }
          })
        }
        <div onClick={() => this.loadMore()} className="loadMore">
          <p>点击加载更多</p>
        </div>
      </div>
    )
  }
}

export default List