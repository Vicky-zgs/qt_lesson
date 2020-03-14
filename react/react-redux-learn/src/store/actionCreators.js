// 整合TodoList.js 中的各种action

import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_LIST_ACTION, GET_INIT_LIST } from './actionTypes'
import axios from 'axios'

export const getInputChangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value: value
})

export const getAddItemAction = () => ({
  type: ADD_TODO_ITEM
})

export const getDeleteItemAction = (index) => ({
  type: DELETE_TODO_ITEM,
  index
})

export const initListAction = (data) => ({
  type: INIT_LIST_ACTION,
  data
})

// export const getTodoList = () => {
//   // 使用redux-thunk中间件后 可以接收一个dispatch, 并且返回一个方法
//   return (dispatch) => {
//     axios.get('http://musicapi.leanapp.cn/comment/music?id=186016&limit=1').then((res) => {
//       console.log(res)
//       const data = res.data
//       const action = initListAction(Object.keys(data.hotComments[0]))
//       // store.dispatch(action)
//       // console.log('从接口获取的data:', data)
//       console.log('获取接口的action:', action)
//       dispatch(action)
//     })
//   }
// }

export const getInitList = () => ({
  type: GET_INIT_LIST
})