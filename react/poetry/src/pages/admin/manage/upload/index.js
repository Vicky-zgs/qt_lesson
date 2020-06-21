// 管理员管理上传资源的组件

import React, { Component } from 'react'
import {Layout, Menu, Input, Button, Table, Form} from 'antd';
import './index.less'
import SiderMenu from '../Sider/index.js'
import axios from 'axios'
import { Link } from 'react-router-dom'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class ManageUpload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],  // 表格显示的内容
            searchData: null,
            layout: {
                labelCol: { span: 5 },
                wrapperCol: { span: 16 },
            },
            columns: [
                // {
                //     title: '上传资源id',
                //     dataIndex: 'id',
                //     key: 'id',
                //     render: text => <a>{text}</a>,
                // },

                {
                    title: '上传用户',
                    dataIndex: 'useremail',
                    key: 'useremail',
                    render: text => <a>{text}</a>,
                },
                {
                    title: '诗名',
                    dataIndex: 'name',
                    key: 'name',
                    // render: text => <a>{text}</a>,
                },
                {
                    title: '朝代',
                    dataIndex: 'dynasty',
                    key: 'dynasty',
                },
                {
                    title: '作者',
                    dataIndex: 'author',
                    key: 'author',
                },
                {
                    title: '诗文内容',
                    dataIndex: 'content',
                    key: 'content',
                },
                {
                    title: '标签类型',
                    dataIndex: 'type',
                    key: 'type',
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (text, record) => (
                        <span>
                          <Button style={{ marginRight: 10 }} onClick={(e) => this.changeUpload(record)}>编辑 </Button>
                          <Button style={{ marginRight: 10 }} onClick={(e) => this.deleteUpload(record.id)}>删除</Button>
                          {record.status  === '已审核' ?
                          <Button onClick={(e) => this.cancelCheckUpload(record)}>取消审核</Button> :
                          <Button onClick={(e) => this.checkUpload(record)}>审核</Button>}
                        </span>
                    ),
                },
            ],
            show_addUpload: false,
            show_changeUpload: false,
            id:'',
            useremail:'',
            name: '',
            dynasty: '',
            author: '',
            content: '',
            type: '',
            status:'',
            change_upload: ''
        }
    }

    componentDidMount() {
        // 获取当前所有已审核的资源
        axios.get('/listalluploads').then((res) => {
            console.log('从后端获取的通知',res.data.data)
            const result = res.data.data;
            const temp_data = []
            for (let i = 0; i < result.length; i++) {
                const temp_status = result[i].status === true ? '已审核' : '未审核';
                //push数据
                temp_data.push({
                id: result[i].id,
                useremail: result[i].useremail,
                name: result[i].name,
                dynasty: result[i].dynasty,
                author: result[i].author,
                content: result[i].content,
                status:temp_status,
                type: result[i].type,
                })
            }
            this.setState({
                data: temp_data,
            })
            console.log('已审核资源:', temp_data)
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

    handleChange = (e) => {
        // 获取输入框中输入的值
        let inputValue = e.target.value
        let inputName = e.target.name
        this.setState({
            [inputName]: inputValue
        })
    }
    handleSelectFalse= (e) => {
        var state = this
        // 点击 搜索 触发的方法
        let url = "http://localhost:8080/listalluploadsbyfalse";//接口地址
        fetch(url, {
            method: 'get',
            credentials: 'include',//解决fetch跨域session丢失
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            console.log(json.data)
            const result = json.data
            const temp_data = []
            for (let i = 0; i < result.length; i++) {
                const temp_status = result[i].status === true ? '已审核' : '未审核';
                //push数据
                temp_data.push({
                id: result[i].id,
                useremail: result[i].useremail,
                name: result[i].name,
                dynasty: result[i].dynasty,
                author: result[i].author,
                content: result[i].content,
                status:temp_status,
                type: result[i].type,
                })
            }
            state.setState({
                data: temp_data
            })
            console.log('Data', temp_data)
        })
    }
    handleSelectTrue= (e) => {
        var state = this
        // 点击 搜索 触发的方法
        let url = "http://localhost:8080/listallcheckuploads";//接口地址
        fetch(url, {
            method: 'get',
            credentials: 'include',//解决fetch跨域session丢失
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            console.log(json.data)
            const result = json.data
            const temp_data = []
            for (let i = 0; i < result.length; i++) {
                const temp_status = result[i].status === true ? '已审核' : '未审核';
                //push数据
                temp_data.push({
                id: result[i].id,
                useremail: result[i].useremail,
                name: result[i].name,
                dynasty: result[i].dynasty,
                author: result[i].author,
                content: result[i].content,
                status:temp_status,
                type: result[i].type,
                })
            }
            state.setState({
                data: temp_data
            })
            console.log('Data', temp_data)
        })
    }
    handleSelectAll= (e) => {
        var state = this
        // 点击 搜索 触发的方法
        let url = "http://localhost:8080/listalluploads";//接口地址
        fetch(url, {
            method: 'get',
            credentials: 'include',//解决fetch跨域session丢失
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            console.log(json.data)
            const result = json.data
            const temp_data = []
            for (let i = 0; i < result.length; i++) {
                const temp_status = result[i].status === true ? '已审核' : '未审核';
                //push数据
                temp_data.push({
                id: result[i].id,
                useremail: result[i].useremail,
                name: result[i].name,
                dynasty: result[i].dynasty,
                author: result[i].author,
                content: result[i].content,
                status:temp_status,
                type: result[i].type,
                })
            }
            state.setState({
                data: temp_data
            })
            console.log('Data', temp_data)
        })
    }
    handleSubmit = (e) => {
        var state = this
        // 点击 搜索 触发的方法
        let url = "http://localhost:8080/listalluploadsbykw";//接口地址
        let kw = this.state.searchData;
        fetch(url, {
            method: 'post',
            body: kw,
            credentials: 'include',//解决fetch跨域session丢失
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            console.log(json.data)
            const result = json.data
            const temp_data = []
            for (let i = 0; i < result.length; i++) {
                const temp_status = result[i].status === true ? '已审核' : '未审核';
                //push数据
                temp_data.push({
                id: result[i].id,
                useremail: result[i].useremail,
                name: result[i].name,
                dynasty: result[i].dynasty,
                author: result[i].author,
                content: result[i].content,
                status:temp_status,
                type: result[i].type,
                })
            }
            state.setState({
                data: temp_data
            })
            console.log('Data', temp_data)
        })
    }

    deleteUpload = (id) => {
        // 点击删除触发的方法
        // console.log('删除的id',id)
        var state = this
        let url = "http://localhost:8080/deleteupload";//接口地址
        fetch(url, {
            method: 'post',
            body: id,
            credentials: 'include'//解决fetch跨域session丢失
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            console.log(json.data)
            alert(json.description)
            state.setState({
                data: json.data
            })
            console.log('Data', state.state.data)
        })
    }

    // 点击 "提交"
    handleAddUpload = (e) => {
        let url = "http://localhost:8080/addupload";//接口地址
        let data = new FormData();
        let that = this
        let msg = {
            name: this.state.name,
            dynasty: this.state.dynasty,
            author: this.state.author,
            content: this.state.content,
            type:this.state.type,
            status:this.state.status
        }
        console.log('添加上传资源的信息：',msg)
        for (const key in msg) {
            data.append(key,msg[key])
        }
        fetch(url,{
            method: 'post',
            body: data,
            credentials: 'include'
        }).then(function () {
            alert('提交成功')
            that.setState({
                show_addUpload: false
            })
        }).catch(function (err) {
            alert('提交失败, 报错',err)
        })
    }

    // 点击 编辑
    changeUpload = (data) => {
        console.log('点击的数据', data)
        this.setState({
            change_upload: data,
        }, () => {
            this.setState({
                show_changeUpload: true
            })
            // console.log('编辑用户的信息', this.state.change_user)
        })
    }
    // 编辑 后 点击 "提交"
    handleChangeUpload = (e) => {
        let url = "http://localhost:8080/modifyupload";
        const result = this.state
        const temp_data = []
        const temp_status = result.change_upload.status === '已审核' ? true : false;
        temp_data.push({
            status: temp_status
        })
        let data = new FormData();
        var state = this;
        // 传到后端的值 ， 如果没输入即不需要修改，就传原来的值
        let msg = {
            'id': this.state.id? this.state.id : this.state.change_upload.id,
            'useremail':this.state.useremail? this.state.useremail : this.state.change_upload.useremail,
            'name': this.state.name? this.state.name : this.state.change_upload.name,
            'dynasty': this.state.dynasty ? this.state.dynasty : this.state.change_upload.dynasty,
            'author': this.state.author ? this.state.author : this.state.change_upload.author,
            'content': this.state.content ? this.state.content : this.state.change_upload.content,
            'status': this.state.status ? this.state.status : temp_data[0].status,
            'type': this.state.type ? this.state.type : this.state.change_upload.type
        }
        // console.log('编辑上传资源的信息---：', msg)
        for (const key in msg) {
            data.append(key, msg[key])
        }      
        fetch(url, {
            method: 'post',
            body: data,
            credentials: 'include'
        }).then(function (res) {
            return res.json();
        }).then(function (json) {
            console.log('编辑后的资源信息',json.data)
            alert(json.description)
            // state.setState({
            //     data: json.data,
            //     show_changeUpload: false
            // })

            const result = json.data
            const temp_data = []
            for (let i = 0; i < result.length; i++) {
                const temp_status = result[i].status === true ? '已审核' : '未审核';
                //push数据
                temp_data.push({
                id: result[i].id,
                useremail: result[i].useremail,
                name: result[i].name,
                dynasty: result[i].dynasty,
                author: result[i].author,
                content: result[i].content,
                status:temp_status,
                type: result[i].type,
                })
            }
            state.setState({
                data: temp_data,
                show_changeUpload: false
            })
            console.log('Data:', state.state.data)
        })
    }

    checkUpload = (id) => {
        let url = "http://localhost:8080/checktrue";
        fetch(url, {
            method: 'post',
            body: id.id,
            credentials: 'include'//解决fetch跨域session丢失
        }).then(function(res) {
            alert('审核已通过！')
            window.location.reload(true)
        })
    }

    cancelCheckUpload = (id) => {
        let url = "http://localhost:8080/checkfalse";
        fetch(url, {
            method: 'post',
            body: id.id,
            credentials: 'include'//解决fetch跨域session丢失
          }).then(function(res) {
            alert('审核已撤销！')
            window.location.reload(true)
          })
    }

    render() {
        return (
            <Layout>
                <SiderMenu />
                <Layout>
                    <Header className="site-layout-sub-header-background" style={{ padding: 0 }} >
                        上传资源管理
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
                                    <Button onClick={this.handleSelectAll}>查看全部</Button>
                                    <Button onClick={this.handleSelectTrue}>查看已审核</Button>
                                    <Button onClick={this.handleSelectFalse}>查看未审核</Button>
                                    {/* <Button onClick={() => { this.setState({ show_addUpload: true }) }}>添加</Button> */}
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
                <div className={this.state.show_addUpload ? 'addUpload' : 'close_addUpload'}>
                    <Form onFinish={this.handleAddUpload} {...this.state.layout} name="nest-messages" validateMessages={this.state.validateMessages} className="form">

                        <Form.Item name="name" label="诗名" rules={[{ required: true }]} >
                            <Input name="name" onChange={this.handleChange} placeholder="例：关雎" />
                        </Form.Item>

                        <Form.Item name="dynasty" label="朝代" rules={[{ required: true }]}>
                            <Input name="dynasty" onChange={this.handleChange} placeholder="例：唐朝" />
                        </Form.Item>
                        <Form.Item name="author" label="作者" rules={[{ required: true }]}>
                            <Input name="author" onChange={this.handleChange} placeholder="例：张三" />
                        </Form.Item>

                        <Form.Item name="content" label="诗文内容" rules={[{ required: true }]} >
                          <textarea name="content"
                                    onChange={(e) => { this.setState({ content: e.target.value }) }}
                                    cols="40" rows="5"
                                    style={{ minHeight: '50px', maxHeight: '150px' }}
                                    placeholder="请输入诗文内容">
                          </textarea>
                        </Form.Item>
                        <Form.Item name="type" label="标签类型" rules={[{ required: true }]}>
                            <Input name="type" onChange={this.handleChange} placeholder="例：哀悼" />
                        </Form.Item>
                        <div style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', margin: '10px 0' }}>
                            <Button type="primary" style={{ margin: '0 10px', backgroundColor: 'white', border: '1px solid gray', color: 'gray' }} onClick={() => { this.setState({ show_addUpload: false }) }}>
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit" >
                                提交
                            </Button>
                        </div>
                    </Form>
                </div>

                {/* 点击编辑后弹出来 */}
                <div className={this.state.show_changeUpload ? 'changeUpload' : 'close_changeUpload'}>
                    <Form onFinish={this.handleChangeUpload} {...this.state.layout} name="nest-messages" validateMessages={this.state.validateMessages} className="form">
                        <Form.Item name="name" label="诗名" >
                            {this.state.change_upload.name}
                        </Form.Item>

                        <Form.Item name="dynasty" label="朝代" >
                            <Input name="dynasty" onChange={this.handleChange} placeholder={this.state.change_upload.dynasty} />
                        </Form.Item>
                        <Form.Item name="author" label="作者" >
                            <Input name="author" onChange={this.handleChange} placeholder={this.state.change_upload.author} />
                        </Form.Item>

                        <Form.Item name="content" label="诗文内容" >
                          <textarea name="content"
                                    onChange={(e) => { this.setState({ content: e.target.value }) }}
                                    cols="40" rows="5"
                                    style={{ minHeight: '50px', maxHeight: '150px' }}
                                    placeholder={this.state.change_upload.content}>
                          </textarea>
                        </Form.Item>
                        <Form.Item name="type" label="标签类型" >
                            <Input name="type" onChange={this.handleChange} placeholder={this.state.change_upload.type} />
                        </Form.Item>
                        <div style={{ position: 'absolute', left: '50%', transform: 'translate(-50%, 0)', margin: '10px 0' }}>
                            <Button type="primary" style={{ margin: '0 10px', backgroundColor: 'white', border: '1px solid gray', color: 'gray' }} onClick={() => { this.setState({ show_changeUpload: false }) }}>
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

export default ManageUpload