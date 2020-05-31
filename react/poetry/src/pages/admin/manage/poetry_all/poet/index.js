import React, { Component } from 'react'
import { Layout, Menu, Input, Button, Table, Select, Form } from 'antd';
import './index.less'
import SiderMenu from '../../Sider/index.js'
import axios from 'axios'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class ManagePoet extends Component {
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
          title: '诗人名',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: '字',
          dataIndex: 'name_zi',
          key: 'name_zi',
        },
        {
          title: '号',
          dataIndex: 'name_hao',
          key: 'name_hao',
        },
        {
          title: '朝代id',
          dataIndex: 'dynastyid',
          key: 'dynastyid',
        },
        {
          title: '出生日期',
          dataIndex: 'birthday',
          key: 'birthday',
        },
        {
          title: '逝世日期',
          dataIndex: 'deathday',
          key: 'deathday',
        },
        {
          title: '简介',
          dataIndex: 'intro',
          key: 'intro',
        },
        {
          title: '主要作品',
          dataIndex: 'masterwork',
          key: 'masterwork',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <span>
              <Button style={{ marginRight: 10 }} onClick={(e) => this.changePoet(record)} >编辑 </Button>
              <Button onClick={(e) => this.deleteCollection(record.id)}>删除</Button>
            </span>
          ),
        },
      ],

      show_addPoet: false, // 是否显示添加诗人表单 
      id: '',
      name: '',
      name_zi: '',
      name_hao: '',
      gender: '',
      birthday: '',
      deathday: '',
      dynastyid: '',
      intro: '',
      masterwork: '',

      show_changePoet: false,
      change_poet: '',  // 进行编辑的诗人数据
    }
  }

  componentDidMount() {
    axios.get('/admin/listpoet').then((res) => {
      this.setState({
        data: res.data.data
      })
      // console.log('管理员管理诗人页面Data', this.state.data)
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
    let url = "http://localhost:8080/admin/listpoet";//接口地址
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
    let url = "http://localhost:8080/admin/deletepoet";//接口地址
    fetch(url, {
      method: 'post',
      body: id,
      credentials: 'include'//解决fetch跨域session丢失
    }).then(function(res) {
      alert('删除成功！')
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

  // 添加诗人后 点击 "提交"
  handleAddPoet = (e) => {
    let url = "http://localhost:8080/admin/addpoet";//接口地址
    let data = new FormData();
    let that = this
    let msg = {
      name: this.state.name,
      name_zi: this.state.name_zi,
      name_hao: this.state.name_hao,
      gender: this.state.gender,
      birthday: this.state.birthday,
      deathday: this.state.deathday,
      dynastyid: this.state.dynastyid,
      intro: this.state.intro,
      masterwork: this.state.masterwork
    }
    console.log('添加诗人的信息：', msg)
    for (const key in msg) {
      data.append(key, msg[key])
    }
    fetch(url, {
      method: 'post',
      body: data,
      credentials: 'include'
    }).then(function () {
      alert('提交成功')
      that.setState({
        show_addPoet: false
      })
    }).catch(function (err) {
      alert('提交失败, 报错', err)
    })
  }

  // 点击 编辑 
  changePoet = (data) => {
    this.setState({
      change_poet: data,
    }, () => {
      this.setState({
        show_changePoet: true
      })
      // console.log('编辑用户的信息', this.state.change_user)
    })
  }
  // 编辑 后 点击 "提交"
  handleChangePoet = (e) => {
    let url = "http://localhost:8080/admin/modifypoet";//接口地址
    const result = this.state
    const temp_data = []
    const temp_gender = result.change_poet.gender === '男' ? 1 : 0;

    //push数据
    temp_data.push({
      gender: temp_gender,
    })

    let data = new FormData();
    let that = this
    // 传到后端的值 ， 如果没输入即不需要修改，就传原来的值
    let msg = {
      id: this.state.change_poet.id,
      name: this.state.change_poet.name,
      name_zi: this.state.name_zi ? this.state.name_zi : this.state.change_poet.name_zi,
      name_hao: this.state.name_hao ? this.state.name_hao : this.state.change_poet.name_hao,
      gender: this.state.gender ? this.state.gender : temp_data[0].gender,
      birthday: this.state.birthday ? this.state.birthday : this.state.change_poet.birthday,
      deathday: this.state.deathday ? this.state.deathday : this.state.change_poet.deathday,
      dynastyid: this.state.dynastyid ? this.state.dynastyid : this.state.change_poet.dynastyid,
      intro: this.state.intro ? this.state.intro : this.state.change_poet.intro,
      masterwork: this.state.masterwork ? this.state.masterwork : this.state.change_poet.masterwork
    }
    // console.log('编辑诗人的信息：', msg)
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
        show_changePoet: false
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
            诗人管理
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
                  <Button onClick={() => { this.setState({ show_addPoet: true }) }}>添加</Button>
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
        <div className={this.state.show_addPoet ? 'addPoet' : 'close_addPoet'}>
          <Form onFinish={this.handleAddPoet} {...this.state.layout} name="nest-messages" validateMessages={this.state.validateMessages} className="form">
            <Form.Item name="name" label="诗人名" rules={[{ required: true }]} >
              <Input name="name" defaultValue={this.state.email} onChange={this.handleChange} />
            </Form.Item>

            <Form.Item name="name_zi" label="字" rules={[{ required: true }]}>
              <Input name="name_zi" onChange={this.handleChange} />
            </Form.Item>
            <Form.Item name="name_hao" label="号" rules={[{ required: true }]}>
              <Input name="name_hao" onChange={this.handleChange} />
            </Form.Item>
            <Form.Item name="gender" label="性别" rules={[{ required: true }]}>
              <Select
                onChange={(e) => { this.setState({ gender: e }) }}
                allowClear
              >
                <Option value="1">男</Option>
                <Option value="0">女</Option>
              </Select>
            </Form.Item>

            <Form.Item name="birthday" label="出生日期" rules={[{ required: true }]}>
              <Input name="birthday" onChange={this.handleChange} />
            </Form.Item>

            <Form.Item name="deathday" label="去世日期" rules={[{ required: true }]} >
              <Input name="deathday" onChange={this.handleChange} />
            </Form.Item>

            <Form.Item name="dynastyid" label="朝代id" rules={[{ required: true }]}>
              <Input name="dynastyid" onChange={this.handleChange} />
            </Form.Item>

            <Form.Item name="intro" label="简介" rules={[{ required: true }]} >
              <textarea name="intro"
                onChange={(e) => { this.setState({ intro: e.target.value }) }}
                cols="40" rows="5"
                style={{ minHeight: '50px', maxHeight: '150px' }}
                placeholder="请输入诗人简介">
              </textarea>
            </Form.Item>

            <Form.Item name="masterwork" label="主要作品" rules={[{ required: true }]} >
              <Input name="masterwork" onChange={this.handleChange} />
            </Form.Item>

            <div style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', margin: '10px 0' }}>
              <Button type="primary" style={{ margin: '0 10px', backgroundColor: 'white', border: '1px solid gray', color: 'gray' }} onClick={() => { this.setState({ show_addPoet: false }) }}>
                取消
              </Button>
              <Button type="primary" htmlType="submit" >
                提交
              </Button>
            </div>
          </Form>
        </div>

        {/* 点击编辑后弹出来 */}
        <div className={this.state.show_changePoet ? 'changePoet' : 'close_changePoet'}>
          <Form onFinish={this.handleChangePoet} {...this.state.layout} name="nest-messages" validateMessages={this.state.validateMessages} className="form">
            <Form.Item name="name" label="诗人名" >
              {this.state.change_poet.name}
            </Form.Item>

            <Form.Item name="name_zi" label="字" >
              <Input name="name_zi" onChange={this.handleChange} placeholder={this.state.change_poet.name_zi} />
            </Form.Item>
            <Form.Item name="name_hao" label="号" >
              <Input name="name_hao" onChange={this.handleChange} placeholder={this.state.change_poet.name_hao} />
            </Form.Item>
            <Form.Item name="gender" label="性别" >
              <Select
                onChange={(e) => { this.setState({ gender: e }) }}
                allowClear
                placeholder={(this.state.change_poet.gender === 1) ? '男' : '女'}
              >
                <Option value="1">男</Option>
                <Option value="0">女</Option>
              </Select>
            </Form.Item>

            <Form.Item name="birthday" label="出生日期" >
              <Input name="birthday" onChange={this.handleChange} placeholder={this.state.change_poet.birthday} />
            </Form.Item>

            <Form.Item name="deathday" label="去世日期" >
              <Input name="deathday" onChange={this.handleChange} placeholder={this.state.change_poet.deathday} />
            </Form.Item>

            <Form.Item name="dynastyid" label="朝代id" >
              <Input name="dynastyid" onChange={this.handleChange} placeholder={this.state.change_poet.dynastyid} />
            </Form.Item>

            <Form.Item name="intro" label="简介" >
              <textarea name="intro"
                onChange={(e) => { this.setState({ intro: e.target.value }) }}
                cols="40" rows="5"
                style={{ minHeight: '50px', maxHeight: '150px' }}
                placeholder={this.state.change_poet.intro}>
              </textarea>
            </Form.Item>

            <Form.Item name="masterwork" label="主要作品" >
              <Input name="masterwork" onChange={this.handleChange} placeholder={this.state.change_poet.masterwork} />
            </Form.Item>

            <div style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', margin: '10px 0' }}>
              <Button type="primary" style={{ margin: '0 10px', backgroundColor: 'white', border: '1px solid gray', color: 'gray' }} onClick={() => { this.setState({ show_changePoet: false }) }}>
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

export default ManagePoet