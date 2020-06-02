// 分享列表组件

import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
import './index.less'
import { UserOutlined, LockOutlined, MobileOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import axios from 'axios'

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listNum: 5,
      userEmail: '',
      show: false,
      name: '',
      dynasty: '',
      author: '',
      content: '',
      type: ''
    }
  }

  loadMore() {
    this.setState({
      listNum: this.state.listNum + 2
    })
  }

  upLoad() {
    this.setState({
      show: true
    });
  }

  cancel() {
    this.setState({
      show: false
    });
  }

  // input输入框的防抖函数
  debounce = (fn, wait) => {
    let timerId = null;
    return function (input) {
      input.persist();
      if (timerId !== null) clearTimeout(timerId);
      timerId = setTimeout(fn, wait, input)
    }
  }

  handleChange = (e) => {
    // 获取各个input框中输入的值
    let inputValue = e.target.value
    let inputName = e.target.name
    this.setState({
      [inputName]: inputValue
    }, () => {
      // console.log(this.state)
    })
  }

  handleContentChange = (e) => {
    this.setState({
      content: e.target.value
    })
  }

  componentDidMount() {
    // 获取当前评论人的email
    axios.get('/isManager').then((res) => {
      // console.log('isManager',res.data)
      let email = res.data.data.email
      this.setState({
        userEmail: email
      }, () => {
        // console.log('评论页面的用户email', this.state.userEmail)
      })
    }).catch(err => {
      console.log(err)
    })
  }

  handleSubmit = (e) => {
    // 点击上传
    let url = "http://localhost:8080/upload";//接口地址
    let newPoetry = new FormData();
    let that = this;
    let msg = {
      'name': this.state.name,
      'dynasty': this.state.dynasty,
      'author': this.state.author,
      'content': this.state.content,
      'type': this.state.type
    }
    console.log('上传资源的数据', msg)
    for (const key in msg) {
      newPoetry.append(key, msg[key])
    }
    if (this.state.userEmail === '') {
      alert('请登录')
    } else {
      fetch(url, {
        method: 'post',
        body: newPoetry,
        credentials: 'include'

      }).then(function (res) {
        return res.json();
      }).then(function (json) {
        alert(json.description)
        that.setState({
          show: false
        })
        // window.location.href = json.nextAction;
      })
    }
  }

  render() {
    const { list } = this.props;
    return (
      <div
        className="content-list"
      >
        {
          list.map((item, index) => {
            if ((index < this.state.listNum) && (item.author)) {
              return (
                <div className="content-item" key={index}>

                  <span className="title" >
                    <Link to={"/poetInfo/" + item.id} >
                      {item.name}
                    </Link>
                  </span>
                  <span className="author">
                    {item.dynasty}:{item.author}
                  </span>
                  <div className="content">
                    {item.content}
                  </div>
                  <div className="border"></div>
                  <div className="content-tag">
                    {item.type}
                  </div>

                </div>
              )
            } else {
              return
            }
          })
        }
        {/* <div onClick={() => this.loadMore()} className="loadMore">
          <p>点击加载更多</p>
        </div> */}
        <Button onClick={() => this.upLoad()} className="upLoad">上传</Button>
        <div className={this.state.show ? 'showUpLoadForm' : 'upLoadForm'}>
          <Form onFinish={this.handleSubmit}>
            <Form.Item name="name" rules={[{ required: true, message: '请输入诗名' }]} className="formItem" label="诗名：">
              <Input
                name="name"
                placeholder="诗名"
                onChange={this.debounce(this.handleChange, 1000)}
              />
            </Form.Item>

            <Form.Item
              name="dynasty"
              rules={[{ required: true, message: '请输入朝代' }]} className="formItem" label="朝代：">
              <Input
                name="dynasty"
                placeholder="朝代"
                onChange={this.debounce(this.handleChange, 1000)}
              />
            </Form.Item>

            <Form.Item
              name="author"
              rules={[{ required: true, message: '请输入诗人姓名' }]} className="formItem" label="诗人姓名：">
              <Input
                name="author"
                placeholder="诗人姓名"
                onChange={this.debounce(this.handleChange, 1000)}
              />
            </Form.Item>
            <Form.Item name="content"
              className="formItem" label="诗文内容：">
              <textarea className="content"
                name="content"
                onChange={this.handleContentChange}
                cols="60" rows="10"
                placeholder="请输入内容">
              </textarea>
              <Button className="distinguish" block >图片上传</Button>
              {/* <form action="/uploadimg" method="post" encType="multipart/form-data">
                <input type="file" name="file" accept="image/*"/><br/>
                <input type="submit" value="立刻上传"/>
              </form> */}
            </Form.Item>
            <Form.Item
              name="type"
              rules={[{ required: true, message: '请输入标签类型' }]} className="formItem" label="标签类型：">
              <Input
                name="type"
                placeholder="标签类型"
                onChange={this.debounce(this.handleChange, 1000)}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="upload-form-button" block >上传</Button>
            <Button type="primary" className="upload-form-button" block onClick={() => this.cancel()} >取消</Button>
          </Form>
        </div>

      </div>
    )
  }
}

export default List