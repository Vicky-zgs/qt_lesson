import { fromJS } from 'immutable'
import * as constants from './constants'

// immutable.js
// facebook
// immutable对象   不可改变的对象

const defaultState = fromJS({
  login: false
})

export default (state = defaultState, action) => {
  switch(action.type) {
    // 登录成功后改login的值
    case constants.CHANGE_LOGIN:
      return state.set('login', action.value)
    // 退出登录后也要修改login的值
    case constants.LOGOUT:
      return state.set('login', action.value)
    default:
      return state
  }
}