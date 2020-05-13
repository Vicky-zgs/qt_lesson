import React, { Component } from 'react';

import { PageHeader, Button, Form, Input, Radio } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

import './style/home.css'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios'

const { confirm } = Modal;

class home extends Component {
    constructor(props) {
        super(props);

        this.state = {

            radioFlag: 0,
            radioFlagV: 0,
            userValue: '',
            pwdValue: '',
            levelValue: '',
            emailInput: '',


            visible: false
        }
    }



    componentDidMount() {


    }



    render() {


        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 16,
            },
        };
        const validateMessages = {
            required: '${label} is required!',
            types: {
                email: '${label} is not validate email!',
                number: '${label} is not a validate number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };

        // const Demo = () => {
        //   const onFinish = values => {
        //     console.log(values);
        //   };
        // }

        return (
            <div>


                <div className='mainBox'>
                    <div>

                        <div className="site-page-header-ghost-wrapper">
                            <PageHeader
                                ghost={true}
                                //onBack={() => window.history.back()}
                                backIcon={
                                    <PlusCircleOutlined />
                                }
                                title={
                                    <div>
                                        <div style={{ display: 'flex', alignItems: "center" }}>
                                            <div style={{ marginRight: '20px' }}>
                                                <PlusCircleOutlined />
                                            </div>
                                            <div>
                                                用户添加</div>
                                        </div>
                                    </div>
                                }
                                extra={[
                                    <Button type="primary" key="2" onClick={this.add.bind(this)}>添加</Button>,

                                ]}
                            >


                                <div style={{ display: "flex", justifyContent: "center", marginTop: '20px' }}>

                                    <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
                                        <Form.Item
                                            name={['user', 'name']}
                                            label="用户名"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input onChange={this.userInput.bind(this)} />
                                        </Form.Item>

                                        <Form.Item
                                            name={['pwd', 'name']}
                                            label="密码"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input onChange={this.pwdInput.bind(this)} />
                                        </Form.Item>

                                        <Form.Item
                                            name={['email', 'name']}
                                            label="电子邮件"
                                            rules={[
                                                {
                                                    required: true,
                                                },
                                            ]}
                                        >
                                            <Input onChange={this.emailInput.bind(this)} />
                                        </Form.Item>



                                        <Form.Item
                                            label="性别"

                                        >
                                            <Radio.Group onChange={this.radioChange} value={this.state.radioFlag}>
                                                <Radio value={0}>男</Radio>
                                                <Radio value={1}>女</Radio>
                                            </Radio.Group>
                                        </Form.Item>



                                        <Form.Item
                                            label="用户等级"

                                        >

                                            <Input onChange={this.levelInput.bind(this)} />
                                        </Form.Item>


                                        <Form.Item
                                            label="是否为VIP"
                                        >
                                            <Radio.Group onChange={this.radioChangeV} value={this.state.radioFlagV}>
                                                <Radio value={0}>是</Radio>
                                                <Radio value={1}>否</Radio>
                                            </Radio.Group>
                                        </Form.Item>


                                    </Form>
                                </div>

                            </PageHeader>
                        </div>,

                            </div>

                    <Modal
                        title="Modal"
                        visible={this.state.visible}
                        onOk={this.srueModal}
                        onCancel={this.hideModal}
                        okText="确认"
                        cancelText="取消"
                    >
                        <p style={{ fontWeight: 'bold', textAlign: 'center' }}>确认提交？</p>
                    </Modal>
                </div>
            </div>
        );



    } //render


    radioChange = (e) => {


        this.setState({
            radioFlag: e.target.value,
        });


    }


    radioChangeV = (e) => {


        this.setState({
            radioFlagV: e.target.value,
        });


    }



    //  userValue:'',
    //                 pwdValue:'',
    //                 levelValue:'',
    //                 emailInput:''
    userInput = (e) => {

        this.setState({
            userValue: e.target.value,
        });

    }


    pwdInput = (e) => {

        this.setState({
            pwdValue: e.target.value,
        });
    }

    emailInput = (e) => {

        this.setState({
            emailInput: e.target.value,
        });
    }

    levelInput = (e) => {
        this.setState({
            levelValue: e.target.value,
        });

    }


    add = () => {

        console.log(this.state.radioFlag)
        console.log(this.state.radioFlagV)
        console.log(this.state.userValue)
        console.log(this.state.pwdValue)
        console.log(this.state.levelValue)
        console.log(this.state.emailInput)


        this.setState({
            visible: true
        });

        //   confirm(
        //       //  console.log(this.state.userValue)
        //   {
        //     title: '确认提交？',
        //     icon: <ExclamationCircleOutlined />,
        //     content: 'Confirm submission',
        //     onOk(){

        //       this.suerAdd()

        //     },
        //     onCancel() {
        //       console.log('Cancel');
        //     },
        //   });

        // radioFlag:'男',
        //         radioFlagV:'是',
        //         userValue:'',
        //         pwdValue:'',
        //         levelValue:'',
        //         emailInput:''
    }


    hideModal = () => {

        this.setState({
            visible: false
        });

    }

    srueModal = () => {
        console.log(12321312)

        //  const instance = this.$axios.create({
        //     headers: { 'content-type': 'application/json' }  //application/json 这里不行 application/x-www-form-urlencoded
        // }
        // );
        
        const obj={
        username:this.state.userValue,
        password:this.state.pwdValue,
        email:this.state.emailInput,
        isManager:this.state.levelValue,
        isVIP:this.state.radioFlagV,
        grade:this.state.radioFlag,
     }
        console.log(obj,'obj')

     axios.post(`http://localhost:8080/saveuser`,{
        username:this.state.userValue,
        password:this.state.pwdValue,
        email:this.state.emailInput,
        isManager:this.state.levelValue,
        isVIP:this.state.radioFlagV,
        grade:this.state.radioFlag,
     })
            .then((res) => {
                console.log(res)
                if (res.data.code==200) {

                    this.setState({
                        visible: false
                    });
                    alert('添加成功')


                } else {
                    this.setState({
                        visible: false
                    });
                    alert('添加失败')
                }

            })

    }



}



export default home;
