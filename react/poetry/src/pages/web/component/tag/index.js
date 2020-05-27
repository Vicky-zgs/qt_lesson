// 标签组件

import React, { Component } from 'react'
import './index.less'
import { Link } from 'react-router-dom'


class Tag extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dynasty_list : []
    }
  }


  clickDynasty = (id) => {
    // console.log('点击的朝代id', id)
    let url = "http://localhost:8080/listalldynastybyid"//接口地址
    let that = this

    // 获得当前诗词的内容
    fetch(url, {
      method: 'post',
      body: id,
      credentials: 'include'//解决fetch跨域session丢失
    }).then(function (res) {
      return res.json();
    }).then(function (json) {
      console.log('分类后的诗词数据', json)
      that.setState({
        dynasty_list: json.data
      })
      console.log('诗词详情', that.state.dynasty_list)
    })
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
            } else if (item.endtime) {
              // 朝代的标签
              return (
                <Link to={{
                  pathname : "/poetry/dynasty/" + item.id
                  }}
                  key={index} onClick={() => this.clickDynasty(item.id)}  >
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