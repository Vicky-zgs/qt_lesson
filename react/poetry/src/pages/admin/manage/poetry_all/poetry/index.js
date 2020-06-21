import React, { Component } from 'react'
import { Layout, Menu, Input, Button, Table, Select, Form } from 'antd';
import './index.less'
import SiderMenu from '../../Sider/index.js'
import axios from 'axios'
import { Link } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class ManageVPoetry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      searchData: null,
      layout: {
        labelCol: { span: 5 },
        wrapperCol: { span: 16 },
      },
      columns: [
        {
          title: '诗词名',
          dataIndex: 'name',
          key: 'name',
          render: (text, record) => (
            <Link to={"/poetryInfo/" + record.id + '/' + record.name}>{text}</Link>
          ),
        },
        {
          title: '诗人名',
          dataIndex: 'poetname',
          key: 'poetname',
        },
        {
          title: '朝代',
          dataIndex: 'dynastyname',
          key: 'dynastyname',
        },
        {
          title: '诗词类型',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: '诗词内容',
          dataIndex: 'content',
          key: 'content',
        },
        {
          title: '注释',
          dataIndex: 'annotation',
          key: 'annotation',
        },
        {
          title: '翻译',
          dataIndex: 'translation',
          key: 'translation',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span>
              <Button style={{ marginRight: 10 }} onClick={(e) => this.changePoetry(record)} >编辑 </Button>
              <Button onClick={(e) => this.deleteCollection(record.id)}>删除</Button>
            </span>
          ),
        },
      ],
      show_addPoetry: false,
      show_changePoetry: false,
      id: '',
      name: '' ,
      dynastyname: '' ,
      type: '' ,
      poetname: '' ,
      content: '' ,
      annotation: '' ,
      translation: '' ,

      change_poetry: ''
    }
  }

  componentDidMount() {
    axios.get('/admin/listpoetry').then((res) => {
      // console.log(res.data.data)
      this.setState({
        data: res.data.data
      })
      // console.log('管理员管理诗词页面Data', this.state.data)
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
      // console.log('searchData', this.state.searchData)
    })
  }

  handleSubmit = (e) => {
    var state = this
    // 点击 搜索 触发的方法
    let url = "http://localhost:8080/admin/listpoetry";//接口地址
    let kw = this.state.searchData;
    fetch(url, {
      method: 'post',
      body: kw,
      credentials: 'include',//解决fetch跨域session丢失
    }).then(function (res) {
      return res.json();
    }).then(function (json) {
      // console.log(json.data)
      state.setState({
        data: json.data
      })
      // console.log('Data', state.state.data)
    })
  }

  deleteCollection = (id) => {
    // 点击删除触发的方法
    // console.log('删除的id',id)
    var state = this
    let url = "http://localhost:8080/admin/deletepoetry";//接口地址
    fetch(url, {
      method: 'post',
      body: id,
      credentials: 'include'//解决fetch跨域session丢失
    }).then(function (res) {
      return res.json();
    }).then(function (json) {
      // console.log(json.data)
      state.setState({
        data: json.data
      })
      // console.log('Data', state.state.data)
    })
  }

  handleChange = (e) => {
    // 获取输入框中输入的值
    let inputValue = e.target.value
    let inputName = e.target.name
    this.setState({
      [inputName]: inputValue
    })
  }

  // 添加诗词后 点击 "提交"
  handleAddPoetry = (e) => {
    let url = "http://localhost:8080/admin/addpoetry";
    let data = new FormData();
    let that = this
    let msg = {
      name: this.state.name ,
      dynastyname: this.state.dynastyname ,
      type: this.state.type ,
      poetname: this.state.poetname ,
      content: this.state.content ,
      annotation: this.state.annotation ,
      translation: this.state.translation
    }
    console.log('添加诗词的信息：',msg)
    for (const key in msg) {
        data.append(key,msg[key])
    }
    fetch(url,{
        method: 'post',
        body: data,
        credentials: 'include'
    }).then(function (res) {
      return res.json();
    }).then(function (json) {
      alert('提交成功')
      that.setState({
        show_addPoetry: false
      },() => {
        window.location.reload(true)
      })
    }).catch(function (err) {
      alert('提交失败, 报错',err)
    })
  }

  // 点击 编辑 
  changePoetry = (data) => {
    this.setState({
      change_poetry: data,
    }, () => {
      this.setState({
        show_changePoetry: true
      })
      console.log('编辑用户的信息', this.state.change_poetry)
    })
  }
  // 编辑 后 点击 "提交"
  handleChangePoetry = (e) => {
    let url = "http://localhost:8080/admin/modifypoetry";

    let data = new FormData();
    let that = this
    // 传到后端的值 ， 如果没输入即不需要修改，就传原来的值
    let msg = {
      id: this.state.change_poetry.id,
      name: this.state.change_poetry.name,
      dynastyname: this.state.dynastyname ? this.state.dynastyname : this.state.change_poetry.dynastyname,
      type: this.state.type ? this.state.type : this.state.change_poetry.type,
      poetname: this.state.poetname ? this.state.poetname : this.state.change_poetry.poetname,
      content: this.state.content ? this.state.content : this.state.change_poetry.content,
      annotation: this.state.annotation ? this.state.annotation : this.state.change_poetry.annotation,
      translation: this.state.translation ? this.state.translation : this.state.change_poetry.translation,
    }
    console.log('编辑诗词的信息：', msg)
    for (const key in msg) {
      data.append(key, msg[key])
    }
    fetch(url, {
      method: 'post',
      body: data,
      credentials: 'include'
    }).then(function () {
      alert('编辑成功')
      that.setState({
        show_changePoetry: false,
      },() => {
        window.location.reload(true)
      })
    }).catch(function (err) {
      alert('提交失败, 报错', err)
    })
  }

  render() {
    const { Option } = Select;
    return (
      <Layout>
        <SiderMenu />
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
            诗词管理
          </Header>
          <Content style={{ margin: '24px 16px 0' }} >
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <div className="content" style={{ padding: 24, minHeight: 360 }}>
                <div className="search">
                  <Input
                    placeholder="请输入关键字搜索"
                    className="input"
                    onChange={(e) => { this.search(e) }}
                  />
                  <Button onClick={this.handleSubmit}>搜索</Button>
                  <Button>删除</Button>
                  <Button onClick={() => { this.setState({ show_addPoetry: true }) }}>添加</Button>
                </div>
                <Table
                  rowKey={(record, index) => `complete${record.id}${index}`}
                  rowSelection
                  columns={this.state.columns}
                  dataSource={this.state.data}
                  pagination={{
                    pageSize: 5,
                    defaultCurrent: 1
                  }}
                />
              </div>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>@古诗文鉴赏</Footer>
        </Layout>

        {/* 点击添加后弹出来 */}
        <div className={this.state.show_addPoetry ? 'addPoet' : 'close_addPoet'}>
          <Form onFinish={this.handleAddPoetry} {...this.state.layout} name="nest-messages" validateMessages={this.state.validateMessages} className="form">
            <Form.Item name="name" label="诗名" rules={[{required: true }]} >
              <Input name="name" onChange={this.handleChange} placeholder="例：将进酒" />
            </Form.Item>

            <Form.Item name="poetname" label="诗人名" rules={[{ required: true }]}>
              <Input name="poetname" onChange={this.handleChange} />
            </Form.Item>
            <Form.Item name="dynastyname" label="朝代名" rules={[{ required: true }]}>
              <Input name="dynastyname" onChange={this.handleChange} />
            </Form.Item>
            <Form.Item name="type" label="诗词类型" rules={[{ required: true }]}>
              <Input name="type" onChange={this.handleChange} />
            </Form.Item>

            <Form.Item name="content" label="诗词内容" rules={[{ required: true }]} >
              <textarea name="content"
                  onChange={(e) => { this.setState({ content: e.target.value })}}
                  cols="40" rows="5"
                  style={{ minHeight: '50px',maxHeight: '150px'}}
                  placeholder="请输入诗词内容">
                </textarea>
            </Form.Item>

            <Form.Item name="annotation" label="诗词注释" rules={[{ required: true }]} >
              <textarea name="annotation"
                  onChange={(e) => { this.setState({ annotation: e.target.value })}}
                  cols="40" rows="5"
                  style={{ minHeight: '50px',maxHeight: '150px'}}
                  placeholder="请输入诗词注释">
                </textarea>
            </Form.Item>

            <Form.Item name="translation" label="诗词翻译" rules={[{ required: true }]} >
              <textarea name="translation"
                  onChange={(e) => { this.setState({ translation: e.target.value })}}
                  cols="40" rows="5"
                  style={{ minHeight: '50px',maxHeight: '150px'}}
                  placeholder="请输入诗词翻译">
                </textarea>
            </Form.Item>

            <div style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', margin: '10px 0' }}>
              <Button type="primary" style={{ margin: '0 10px', backgroundColor: 'white', border: '1px solid gray', color: 'gray' }} onClick={() => {this.setState({ show_addPoetry: false })}}>
                取消
              </Button>
              <Button type="primary" htmlType="submit" >
                提交
              </Button>
            </div>
          </Form>
        </div>
      
      {/* 点击编辑后弹出来 */}
      <div className={this.state.show_changePoetry ? 'changePoetry' : 'close_changePoetry'}>
          <Form onFinish={this.handleChangePoetry} {...this.state.layout} name="nest-messages" validateMessages={this.state.validateMessages} className="form">
            <Form.Item name="name" label="诗名" >
              {this.state.change_poetry.name}
            </Form.Item>

            <Form.Item name="poetname" label="诗人名" >
              <Input name="poetname" onChange={this.handleChange} placeholder={this.state.change_poetry.poetname} />
            </Form.Item>
            <Form.Item name="dynastyname" label="朝代名" >
              <Input name="dynastyname" onChange={this.handleChange} placeholder={this.state.change_poetry.dynastyname} />
            </Form.Item>
            <Form.Item name="type" label="诗词类型">
              <Input name="type" onChange={this.handleChange} placeholder={this.state.change_poetry.type} />
            </Form.Item>

            <Form.Item name="content" label="诗词内容" >
              <textarea name="content"
                  onChange={(e) => { this.setState({ content: e.target.value })}}
                  cols="40" rows="5"
                  style={{ minHeight: '50px',maxHeight: '150px'}}
                  placeholder={this.state.change_poetry.content}>
                </textarea>
            </Form.Item>

            <Form.Item name="annotation" label="诗词注释" >
              <textarea name="annotation"
                  onChange={(e) => { this.setState({ annotation: e.target.value })}}
                  cols="40" rows="5"
                  style={{ minHeight: '50px',maxHeight: '150px'}}
                  placeholder={this.state.change_poetry.annotation}>
                </textarea>
            </Form.Item>

            <Form.Item name="translation" label="诗词翻译" >
              <textarea name="translation"
                  onChange={(e) => { this.setState({ translation: e.target.value })}}
                  cols="40" rows="5"
                  style={{ minHeight: '50px',maxHeight: '150px'}}
                  placeholder={this.state.change_poetry.translation}>
                </textarea>
            </Form.Item>

            <div style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', margin: '10px 0' }}>
              <Button type="primary" style={{ margin: '0 10px', backgroundColor: 'white', border: '1px solid gray', color: 'gray' }} onClick={() => {this.setState({ show_changePoetry: false })}}>
                取消
              </Button>
              <Button type="primary" htmlType="submit" >
                提交
              </Button>
            </div>
          </Form>
        </div>
      </Layout>
    )
  }
}

export default ManageVPoetry