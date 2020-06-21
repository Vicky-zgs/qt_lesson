// 用户查看通知

import React, { Component } from 'react'
import Head from '../../header/index.js'
import { Input, Button, Table, Pagination } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './index.less'

class LookManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],   // 显示的列表数据
      columns: [
        {
          title: '发布者邮箱',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: '通知内容',
          dataIndex: 'content',
          key: 'content',
        },
        {
          title: '发布时间',
          dataIndex: 'time',
          key: 'time',
        }
      ]
    }
  }

  componentDidMount() {
    axios.get('/listnotics').then((res) => {
      // console.log(res.data.data)
      this.setState({
        data: res.data.data
      })
      // console.log('普通用户查看通知', this.state.data)
    }).catch(err => {
      console.log(err)
    })
  }

  checkCollection = (id) => {
    // 点击查看触发的方法
    console.log(id)
  }

  render() {
    return (
      <div>
        <Head />
        <div className="notice_wrapper">
          <Table
            rowKey={(record, index) => `complete${record.id}${index}`}
            columns={this.state.columns}
            dataSource={this.state.data}
            pagination={{
              pageSize: 5,
              defaultCurrent: 1
            }}
            style={{ margin: '20px 0' }}
            className="looknotice"
          />
        </div>
      </div>
    )
  }
}

export default LookManage