// 相当于图书管理员的笔记本
// return state相当于返回组件需要的数据

import {CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION } from './actionTypes'

const defaultState = {
  inputValue: '',
  list: []
}
// state 指的是store里面上次一存储的数据
// action 用户传过来的那句话
// 纯函数 指的是, 给定固定的输入, 就一定会有固定的输出, 且不会有任何副作用
export default (state = defaultState, action) => {
  // 修改input框的值
  if (action.type === CHANGE_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.inputValue = action.value
    return newState // reducer 有一个限制， 可以接受state，但是绝对不能修改state
  }
  if (action.type === ADD_TODO_ITEM) {
    // 点击提交后储存input框中输入的值
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    return newState
  }
  if (action.type === DELETE_TODO_ITEM) {
    // 删除
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.index, 1)
    return newState
  }

  if (action.type === INIT_LIST_ACTION) {
    // Redux中发送异步请求获取数据,并且更新list数据
    const newState = JSON.parse(JSON.stringify(state))
    newState.list = action.data
    return newState
  }
  
  console.log(state, action)
  return state
}