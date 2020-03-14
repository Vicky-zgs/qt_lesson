// Redux = flux + Reduce
import React, { Component } from 'react'
import 'antd/dist/antd.css';
import store from './store/index.js'
// import {CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM} from './store/actionTypes'
import { getInputChangeAction, getAddItemAction, getDeleteItemAction, initListAction, getTodoList, getInitList } from './store/actionCreators'
import TodoListUI from './TodoListUI.js'
import axios from 'axios'

// store 的创建

class TodoList extends Component {
  constructor(props) {
    super(props)

    this.state = store.getState()  // store中获取数据的方法
    // console.log(this.state)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.handleItemDelete = this.handleItemDelete.bind(this)
    store.subscribe(this.handleStoreChange) //只要store里面的数据发生变化实时获取
  }

  componentDidMount () {
    // Redux中发送异步请求获取数据

    // 未使用中间件的接口请求：
    // axios.get('http://musicapi.leanapp.cn/comment/music?id=186016&limit=1').then((res) => {
    //   console.log(res)
    //   const data = res.data
    //   const action = initListAction(Object.keys(data.hotComments[0]))
    //   store.dispatch(action)
    //   console.log('action:', action)
    // })

    // 使用了redux-thunk中间件(操作写在了actionCreators.js)：
    // const action = getTodoList()
    // store.dispatch(action) // 因为此刻的store已经集成了thunk的功能，所以支持dispatch一个函数，这个函数会自动执行
    // console.log('接口请求的action' ,action)

    // 使用redux-saga 中间件 (saga.js)
    const action = getInitList()
    console.log('使用redux-saga中间件时创建的action:' ,action)
    store.dispatch(action)
  }

  handleInputChange (e) {
    // const action = {
    //   type: CHANGE_INPUT_VALUE,
    //   value: e.target.value
    // }
    const action = getInputChangeAction(e.target.value)
    store.dispatch(action) // 让管理员听到这句话
  }

  handleStoreChange() {
    // 这个方法用来看仓库的数据是否发生变化
    console.log('store changed')
    this.setState(store.getState())
  }

  handleBtnClick() {
    // 点击提交后将输入框中输入的值保存到数据源中
    // const action = {
    //   type: ADD_TODO_ITEM
    // }
    const action = getAddItemAction()
    store.dispatch(action)
  }

  handleItemDelete(index) {
    console.log('删除的下标：',index)
    // const action = {
    //   type: DELETE_TODO_ITEM,
    //   index
    // }
    const action = getDeleteItemAction(index)
    store.dispatch(action)
  }

  render() {
    return (
      <TodoListUI 
        inputValue={this.state.inputValue}
        handleInputChange={this.handleInputChange}
        handleBtnClick={this.handleBtnClick}
        list={this.state.list}
        handleItemDelete={this.handleItemDelete}
      />
    )
  }
}

export default TodoList