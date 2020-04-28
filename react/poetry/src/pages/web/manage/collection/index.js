// 收藏管理界面

import React, { Component } from 'react'
import Head from '../../header/index.js'
import './index.less'
import { Input, Button, Table, Pagination } from 'antd'
import axios from 'axios'

const columns = [
  {
    title: '古诗名',
    dataIndex: 'poetryname',
    key: 'poetryname',
    render: text => <a>{text}</a>,
  },
  {
    title: '作者名',
    dataIndex: 'poetname',
    key: 'poetname',
  },
  {
    title: '类别',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '收藏时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button style={{ marginRight: 10 }}>查看</Button>
        <Button>删除</Button>
      </span>
    ),
  },
];

// {
//   key: '1',
//   name: '将进酒',
//   author: '李白',
//   type: '哲理',
//   time: '2012/3/4'
// }
class CollectionManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data : [],
      searchData: ''
    }
  }

  componentDidMount () {
    axios.get('/listcollections').then((res) => {
      console.log(res.data.data)
      this.setState({
        data: res.data.data
      })
      console.log('Data', this.state.data)
    }).catch(err => {
      console.log(err)
    })
  }

  search = (e) => {
    // console.log(e.target.value)
    // 获得输入框的值
    this.setState({
      searchData: e.target.value
    }, () => {
      console.log('searchData', this.state.searchData)
    })
  }

  handleSubmit = (e) => {
    // 点击 搜索 触发的方法
    let url = "http://localhost:8080/listcollections";//接口地址
    let kw = new FormData();
    let msg = {'kw':this.state.searchData}
    for (const key in msg) {
      kw.append(key,msg[key])
    }
    fetch(url,{
        method: 'post',
        body: kw,
    }).then(function (res) {
        return res.json();
    }).then(function (json) {
        alert(json.description)
    })
  }

  render () {
    return (
      <div>
        <Head />
        <div className="wrapper">
            <p className="title">收藏管理</p>
            <div className="search">
              <Input 
                placeholder="请输入关键字搜索" 
                className="input"
                onChange={(e) => { this.search(e) }}
              />
              <Button onClick={this.handleSubmit}>搜索</Button>
              <Button>删除</Button>
            </div>
            <Table 
              rowKey={(record, index) => `complete${record.id}${index}`}
              rowSelection 
              columns={columns} 
              dataSource={this.state.data}
              pagination = {{
                pageSize:5,
                defaultCurrent:1
              }}
            />
        </div>
      </div>
    )
  }
}

export default CollectionManage