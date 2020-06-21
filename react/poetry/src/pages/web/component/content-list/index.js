// 内容列表组件

import React, { Component } from 'react'
import './index.less'
import { StarOutlined, DownloadOutlined, CopyOutlined, StarFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listNum: 5,
      isColl: false
    }
  }

  loadMore() {
    this.setState({
      listNum : this.state.listNum + 2
    })
  }

  // 点击收藏触发的方法
  collectPoetry (poetryId) {
    // console.log('收藏的诗词的id', poetryId)
    let url = "http://localhost:8080/addcoll";//接口地址
    let id = poetryId
    let that = this
    fetch(url, {
      method: 'post',
      body: id,
      credentials: 'include'//解决fetch跨域session丢失
    }).then(function (res) {
      return res.json();
    }).then(function (json) {
      console.log(json.data)
      alert(json.description);
      that.setState({
        data:json.data
      })
      window.location.reload(true)
    }).catch(function(err) {
      alert('请登录！')
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
            if ((index < this.state.listNum) && (item.birthday) ) {
              // 诗人列表
              return (
                <div className="content-item" key={index}>

                  <span className="poet_title" >
                    {/* 传id给详情页 */}
                    <Link to={"/poetInfo/" + item.id} >
                      {item.name}
                    </Link>
                  </span>
                  <span className="poet_name">{item.birthday}~{item.deathday}</span>
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
            } else if ((index < this.state.listNum) && (item.poetname) && (item.id)){
              // 诗词列表
              return (
                <div className="content-item" key={index} >

                  <span className="poet_title" style={{textAlign:'left', backgroundColor: '#aec6caf6'}}>
                    {/* 传id给详情页 */}
                    <Link to={"/poetryInfo/" + item.id + '/' + item.name} >
                      {item.name}
                    </Link>
                  </span>
                  <span className="poet_name">
                    <Link style={{color:'black'}} to={"/poetInfo/" + item.authoruid} >{item.dynastyname}：{item.poetname}</Link>  
                  </span>
                  <div className="content" style={{backgroundColor: '#aec6caf6'}}>
                    {item.content}
                  </div>
                  <div className="tool">
                    <div className="shoucang" onClick={(e) => this.collectPoetry(item.id)}><StarOutlined /></div>
                    <div className="xiazai"><DownloadOutlined /></div>
                    <div className="fuzhi"><CopyOutlined /></div>
                  </div>
                  <div className="border"></div>
                  <div className="content-tag">
                    {item.type}
                  </div>

                </div>
              )
            } else if((index < this.state.listNum) && item.num) {
              // 推荐页面的列表组件
              return (
                <div className="content-item" key={index} >

                  <span className="poet_title" style={{textAlign:'left', backgroundColor: '#aec6caf6'}}>
                    {/* 传id给详情页 */}
                    <Link to={"/poetryInfo/" + item.poetryid + '/' + item.name} >
                      {item.name}
                    </Link>
                  </span>
                  <span className="poet_name">
                    <Link to={"/poetInfo/" + item.authoruid} style={{color: 'black'}}>
                      {item.dynastyname}：{item.poetname}
                    </Link>
                  </span>
                  <div className="content" style={{backgroundColor: '#aec6caf6'}}>
                    {item.content}
                  </div>
                  <div className="tool">
                    <div className="shoucang" onClick={(e) => this.collectPoetry(item.poetryid)}><StarOutlined /></div>
                    <div className="xiazai"><DownloadOutlined /></div>
                    <div className="fuzhi"><CopyOutlined /></div>
                  </div>
                  <div className="border"></div>
                  <div className="content-tag">
                    <span>{item.type}</span>
                    <span className="coll_num">收藏数：{item.num}</span>
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