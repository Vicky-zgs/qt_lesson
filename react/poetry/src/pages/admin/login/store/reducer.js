import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
  isLogin: true
})

export default (state = defaultState, action) => {
  switch(action.type) {
    // 登录成功后改isLogin的值
    case constants.CHANGE_LOGIN:
      return state.set('isLogin', action.value)
    // 退出登录后也要修改login的值
    case constants.LOGOUT:
      return state.set('isLogin', action.value)
    default:
      return state
  }
}