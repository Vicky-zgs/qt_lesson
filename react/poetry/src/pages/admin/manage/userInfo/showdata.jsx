import React, { Component } from 'react'


import {Table } from 'antd'

import '../style/showdata.css'


import openC from '../style/img/灯.png';
import closeC from  '../style/img/灯close.png'


import store  from '../redux/index.js'
  const columns = [  //标题
    {
      align:'center',
      title: 'id',
      dataIndex: 'id',  //这里dataIndex  对应dataSoucer 里面的 字段
      key: 'id',   //这里key  对应dataSoucer 里面的 字段
    },
    {
      align:'center',
      title: '地址',
      dataIndex: 'content',
      key: 'content',
    },
    {
      align:'center',
      title: '状态',
      dataIndex: 'flag',
      key: 'flag',
      render: (text, record) => {
        console.log(text,record);
      //  let objjj= text=='开'?'openC':'closeC'
      //  console.log(objjj)
        return(
         <span style={{ display:'flex', alignItems:'center',textAlign:'center' ,justifyContent:'center' }}>
          <a style={{ marginRight: 16 }}>{text}</a>
            {/* <div style={ text=='开'?'openS':'closeS' } ></div> */}
            <img className='lightI' src={ text=='开'?openC:closeC} alt=""/>
            {/* <img src={ openC } alt=""/>
            <img src={ objjj } alt=""/> */}    
        </span>
        )
        
      },
    },
  ];
class ComponentName extends Component {
        constructor(props){

            super(props);

            this.state={
              dataSource:[

                         ]
            }


            store.subscribe(this.monitor.bind(this));
     //这里store订阅一个方法 store数据改变 会执行这个方法

        }

        // static getDerivedStateFromProps(props, state){
        // }

        componentDidMount(){   
          
          
          console.log('普通axios',this.$axios)
          this.$axios.get('http://47.103.93.93:9900/show')
          .then((res) => {
             // this.qwe(res.data.data)
            console.log(res.data)
            res.data.filter((item,index)=>{
              
              if(item.flag==false){
                item.flag='关'
              }
               if(item.flag==true){
                  item.flag='开'
               }  

               this.setState(()=>{
                  return {
                    dataSource:[...this.state.dataSource,item]
                  }
               })
              // console.log('this.state.dataSource',this.state.dataSource)
              // return  this.qwe(res.data)   //这里执行了两次
            })
             // this.state.dataSource
          }).then(()=>{

          })
          .catch(() => { alert("error") })
             
      }


      qwe =(data)=>{
          console.log('0000000',data)

              const action={
                type:'dataList_type',
                value:data
                         }
          store.dispatch(action)
      }



      monitor(){  //这里涉及到store   就会有这个方法

        this.setState(store.getState())
    }


        
          
    render () {
        return (
            <div>
                    <div style={{  width:"100%" , textAlign:"center" , padding:'30px', textIndent:'-75px', fontSize:25 , fontWeight:'bold'}}>
                        数据列表总汇
                    </div>

                    <div>
                    <Table dataSource={this.state.dataSource} columns={columns} />
                    </div>

                    
                    {/* <div className='openS' /> */}
                    {/* <div  style={openS}>312</div>
                    <img src={openC} alt=""/> */}
            </div>
        )
    }
}

export default ComponentName