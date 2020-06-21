// 收藏管理界面

import React, { Component } from 'react'
import Head from '../../header/index.js'
import './index.less'
import { Input, Button, Table, Pagination } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'

class CollectionManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data : [],   // 显示的列表数据
      searchData: null,  // input框中输入的值
      columns: [
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
              <Button style={{ marginRight: 10 }}>
                <Link to={"/poetryInfo/" + record.poetryid + '/' + record.poetryname}>查看</Link>
              </Button>
              <Button onClick={(e) => this.deleteCollection(record.id)}>删除</Button>
            </span>
          ),
        },
      ]
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
      var state=this
    // 点击 搜索 触发的方法
    let url = "http://localhost:8080/listcollections";//接口地址
    let kw = this.state.searchData;
    fetch(url,{
        method: 'post',
        body: kw,
        credentials: 'include',//解决fetch跨域session丢失
    }).then(function (res) {
        return res.json();
    }).then(function (json) {
        console.log(json.data)
        state.setState({
            data:json.data
        })
        console.log('Data', state.state.data)
    })
  }

  deleteCollection = (id) => {
    // 点击删除触发的方法
    console.log('删除的id',id)
    var state=this
    let url = "http://localhost:8080/deletecoll";//接口地址
    fetch(url,{
        method: 'post',
        body: id,
        credentials: 'include'//解决fetch跨域session丢失
    }).then(function (res) {
        return res.json();
    }).then(function (json) {
        console.log(json.data)
        state.setState({
            data:json.data
        })
        console.log('Data', state.state.data)
    })
  }

  // checkCollection = (id) => {
  //   // 点击查看触发的方法
  //   console.log(id)
  // }

  render () {
    return (
      <div>
        <Head />
        <div className="wrapper_coll">
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
              columns={this.state.columns} 
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