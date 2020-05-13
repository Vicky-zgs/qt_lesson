import React, { Component } from 'react';

import store   from  './redux/index.js'

import { PageHeader, Button, Table, Input ,Modal , Radio ,Form  } from 'antd';
import { BankOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
import axios from 'axios' ;
import './style/home.css'
const { Search } = Input;

function   indexDeleta(data){

    console.log(9999)

 const instance = axios.create({
            headers: { 'content-type': 'application/json' }  //application/json 这里不行 application/x-www-form-urlencoded
        }
        );

       instance.get(`http://localhost:8080/deleteuser/${data}`)
            .then((res) => {
                        console.log(res)

                        alert("删除成功!")

            })
}


  function  changeTable(data){

  console.log(data)

          const  action={
             type:'changeModel_type',
             value:data
          }
          console.log(8888)
    
          store.dispatch(action)

   const instance = axios.create({
            headers: { 'content-type': 'application/json' }  //application/json 这里不行 application/x-www-form-urlencoded
        }
        );


    //    instance.post(`http://localhost:8088/saveuser`,{
    //             id:data,

    //    })
    //         .then((res) => {
    //                     console.log(res)

    //                     alert("删除成功!")

    //         })
  }

const columns = [
    {
        title: '用户名',
        dataIndex: 'username',
        align: 'center'
    },
    {
        title: '密码',
        dataIndex: 'password',
        align: 'center'
    },
    {
        title: '性别',
        dataIndex: 'grade',
        align: 'center'
    },
    {
        title: '电子邮件',
        dataIndex: 'email',
        align: 'center'
    },
    {
        title: '是否为VIP',
        dataIndex: 'isVIP',
        align: 'center'
    },
    {
        title: '等级',
        dataIndex: 'isManager',
        align: 'center'
    },
    {
        title: 'Action',
        dataIndex: 'action',
        align: 'center',
        key: 'x',
        render:(text, record) => {
          return(  <span>                                      
         <a style={{color:'#e0e013',marginRight:'10px'    }}  onClick={()=>{
        //  onClick 直接写函数 会被自动执行   要写箭头函数
                changeTable(record)
         }} >修改</a>
         <a style={{color:'red',}} onClick={(e)=> {
            console.log(e , text , record)
                    indexDeleta(record.id)
            //  axios.post(`http://localhost:8088/deleteuser/${record.id}`)
            // .then((res) => {
            //             console.log(res)
            // })   
         } }  >删除</a>
      </span>)

           }               // () => <a style={{color:'red',}}  >Delete</a>,
    },

     
];

// const data = [];
// for (let i = 0; i < 5; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
//   });
// }


class home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchInput: '',
            currentPage:1,
            visible:false,
            totalElements:'',


            radioFlag: 0,
            radioFlagV: 0,
            userValue: '',
            pwdValue: '',
            levelValue: '',
            emailInput: '',



            pageData: [
                //    {
                //     id: 2,
                //     username: "user",
                //     password: "1",
                //     email: "123456789@qq.com",
                //     isManager: 0,
                //     isVIP: 0,
                //     grade: 0,
                //     grander: null
                //       },
                //            {
                //     id: 2,
                //     username: "user",
                //     password: "1",
                //     email: "123456789@qq.com",
                //     isManager: 0,
                //     isVIP: 0,
                //     grade: 0,
                //     grander: null
                //       },
            ],
            selectedRowKeys: [], // Check here to configure the default column

            // paginationProps:''
        }



          store.subscribe(this.monitor.bind(this));
    }



    componentDidMount() {

        axios.post('http://localhost:8080/listusers')
            .then((res) => {
                console.log(res.data.data.totalElements)
                    this.setState({
                      totalElements:res.data.data.totalElements
                    })
                res.data.data.content.filter((item, index) => {
                        if(item.grage==0){
                                item.grade='男'
                        }else{
                         item.grade='女'
                        }

                         if(item.isVIP==0){
                                item.isVIP='是'
                        }else{
                         item.isVIP='否'
                        }

                    this.setState(() => {
                        return {
                            pageData: [...this.state.pageData, item]
                          
                        }

                    })
                })
            })

    }


    //框
    onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
        this.setState({ selectedRowKeys });
    }
    render() {

        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            selections: [
                Table.SELECTION_ALL,
                Table.SELECTION_INVERT,
                {
                    key: 'odd',
                    text: 'Select Odd Row',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return false;
                            }
                            return true;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
                {
                    key: 'even',
                    text: 'Select Even Row',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return true;
                            }
                            return false;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
            ],
        };  //rowSelection

        // const { paginationProps } = this.state;

        const paginationProps = {
            // showSizeChanger: true,
            showQuickJumper: false,
            showTotal: () => `共${this.state.totalElements}条`,
            pageSize: 5, //每页
            current: this.state.currentPage,  //当前
            total: this.state.totalElements, //总条数
            onShowSizeChange: (current, pageSize) => this.changePageSize(pageSize, current),
            onChange: (current) => this.changePage(current),
        };


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

        return (
            <div>

            <Modal
          title="修改资料"
          visible={store.getState().initialState.visble}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
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
                                            <Input defaultValue={store.getState().initialState.userValue} onChange={this.userInput.bind(this)} />
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
                                            <Input defaultValue={store.getState().initialState.pwdValue} value='123123' onChange={this.pwdInput.bind(this)} />
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
                                            <Input disabled='disabled' defaultValue={store.getState().initialState.emailInput}  onChange={this.emailInput.bind(this)} />
                                        </Form.Item>



                                        <Form.Item
                                            label="性别"
                                        >
                                            <Radio.Group onChange={this.radioChange} value={store.getState().initialState.radioFlag}>
                                                <Radio value={0}>男</Radio>
                                                <Radio value={1}>女</Radio>
                                            </Radio.Group>
                                        </Form.Item>



                                        <Form.Item
                                            label="用户等级"

                                        >

                                            <Input  defaultValue={store.getState().initialState.levelValue}  onChange={this.levelInput.bind(this)} />
                                        </Form.Item>


                                        <Form.Item
                                            label="是否为VIP"
                                        >
                                            <Radio.Group onChange={this.radioChangeV} value={store.getState().initialState.radioFlagV}>
                                                <Radio value={0}>是</Radio>
                                                <Radio value={1}>否</Radio>
                                            </Radio.Group>
                                        </Form.Item>


                                    </Form>
        </Modal>


                <div className='mainBox'>
                    <div>

                        <div className="site-page-header-ghost-wrapper">
                            <PageHeader
                                ghost={true}
                                //onBack={() => window.history.back()}
                                backIcon={
                                    <BankOutlined />
                                }
                                title={
                                    <div>
                                        <div style={{ display: 'flex', alignItems: "center" }}>
                                            <div style={{ marginRight: '20px' }}>
                                                <BankOutlined />
                                            </div>
                                            <div>
                                                用户管理</div>
                                        </div>
                                    </div>
                                }
                                subTitle={<Search
                                    style={{ marginLeft: "50px" }}
                                    placeholder="输入关键字进行搜索...    "
                                    onChange={this.getInputValue}
                                    onSearch={this.submitInputValue}
                                    style={{ width: 200 }}
                                />}
                                extra={[
                                    <Button type="primary" onClick={this.submitInputValue.bind(this)} key="3">搜索</Button>,
                                    <Button type="primary" key="2"  onClick={this.goAdd} >添加</Button>,
                            
                                ]}
                            >
                                <Table
                                    loading="true"
                                    pagination={paginationProps}
                                    rowSelection={rowSelection}
                                    rowKey={record => record.id}
                                    //  :rowSelection="{type:'radio',onChange:onSelectChange,selectedRowKeys}"
                                    columns={columns}
                                    dataSource={this.state.pageData}

                                />
                            </PageHeader>
                        </div>,

                            </div>
                </div>
            </div>
        );



    } //render


      monitor(){  //这里涉及到store   就会有这个方法

        this.setState(store.getState())
    }


    getInputValue = (e) => {
        console.log(e.target.value)
        // this.searchInput
        const value = e.target.value

        this.setState(() => {
            return {
                searchInput: value
            }
        })
    }


    submitInputValue = (data) => {
        console.log(123312)

        if (this.state.searchInput != '') {

            axios.post(`http://localhost:8080/listusers?kw=${this.state.searchInput}`)
                .then((res) => {

                    this.setState(() => {
                        return {
                            pageData: []
                        }
                    })
                    console.log(res.data.data.content)
                    res.data.data.content.filter((item, index) => {

                     if(item.grage==0){
                            item.grade='男'
                            console.log("000")
                        }else{
                         item.grade='女'
                        }
                          if(item.isVIP==0){
                                item.isVIP='是'
                        }else{
                         item.isVIP='否'
                        }

                        this.setState(() => {
                            return {
                                pageData: [...this.state.pageData, item]
                            }
                        })
                    })
                })

        }
    }


    handleCancel =()=>{

    console.log("yongc")

      const  action={
             type:'hiddenModel_type',
             value:false
          }
          console.log(8888)
    
          store.dispatch(action)

    }


    submitDetele = ()=>{

         console.log("删除")

                const obj={
                  ids:this.state.selectedRowKeys
                }
                console.log(obj)

            axios.post(`http://localhost:8080/deleteusers`,{
                id:this.state.selectedRowKeys
            })
                .then((res) => {

                    console.log(res.data.description)
                })


    }

   
goAdd=  ()=>{

 const { history } = this.props;
   
                  const name ='qwe'
                  const obj={
                      a:123
                  }
                  history.push(
                          { pathname:"/add/123|abc?y=1?x=abc"
                           ,query : { name : 'sunny' ,name1:"sunny1" }
                          }
                      );
}



    ///分页


    changePageSize =(pageSize, current)=>{
               // console.log(pageSize, current)  ///pageSize  点击数
    }

    changePage=(pageSize, current)=>{
          console.log(pageSize, current)  //pageSize  点击数 

          this.setState(()=>{
            return{
                    currentPage:pageSize
            }
          },()=>{
          
           axios.post(`http://localhost:8080/listusers?page=${this.state.currentPage-1}`)
                .then((res) => {

                    this.setState(() => {
                        return {
                            pageData: []
                        }
                    })
                    console.log(res.data)
                    res.data.data.content.filter((item, index) => {

                        if(item.grage==0){
                            item.grade='男'
                            console.log("000")
                        }else{
                         item.grade='女'
                        }
                          if(item.isVIP==0){
                                item.isVIP='是'
                        }else{
                         item.isVIP='否'
                        }
                        this.setState(() => {
                            return {
                                pageData: [...this.state.pageData, item]
                            }
                        })
                    })
                })


          })
    }




    //
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
        // this.setState({
        //     userValue: e.target.value,
        // });
    console.log( e.target.value)
        const  action={
             type:'changeuser_type',
             value: e.target.value
          }
          console.log(8888)
    
          store.dispatch(action)
    }


    pwdInput = (e) => {

        // this.setState({
        //     pwdValue: e.target.value,
        // });

        console.log( e.target.value)
        const  action={
             type:'changepwd_type',
             value: e.target.value
          }
          console.log(8888)
    
          store.dispatch(action)
    }

    emailInput = (e) => {

        this.setState({
            emailInput: e.target.value,
        });
    }

    levelInput = (e) => {
      
        console.log( e.target.value)
        const  action={
             type:'levelpwd_type',
             value: e.target.value
          }
          console.log(8888)
    
          store.dispatch(action)

    }



    handleOk=()=>{



      const instance = axios.create({
            headers: { 'content-type': 'application/json' }  //application/json 这里不行 application/x-www-form-urlencoded
        }
        );
            const obj=
              {
         username: store.getState().initialState.userValue,
         password: store.getState().initialState.pwdValue,
         email:  store.getState().initialState.emailInput,
         isVIP: store.getState().initialState.radioFlagV,
         grade: store.getState().initialState.radioFlag,
         isManager: store.getState().initialState.levelValue,
            }
            console.log(obj)

       instance.post(`http://localhost:8080/saveuser`,{
          id: store.getState().initialState.changeId,
         username: store.getState().initialState.userValue,
         password: store.getState().initialState.pwdValue,
         email:  store.getState().initialState.emailInput,
         isVIP: store.getState().initialState.radioFlagV,
         grade: store.getState().initialState.radioFlag,
         isManager: store.getState().initialState.levelValue,
       })
            .then((res) => {
                        console.log(res)

                     
    const  action={
             type:'hiddenModel_type',
             value:false
          }
          console.log(8888)
    
          store.dispatch(action)


            })

          
    }


    



}

// const {
//       lutList:{ data, page },
//       loading,
//     } = this.state;

//     // 表格数据的总条数
//     const totals = page.total;


//  const {
//      pageData
//     } = this.state;

//console.log(this.state.pageData)
// 表格分页属性

export default home;
