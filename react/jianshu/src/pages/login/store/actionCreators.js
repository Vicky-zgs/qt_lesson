import axios from 'axios'
import * as constants from './constants'

const changeLogin = () => ({
  type: constants.CHANGE_LOGIN,
  value: true
})

// 退出登录的action
export const logout = () => ({
  type: constants.LOGOUT,
  value: false
})

// 登录的action
export const login = (account, password) => {
  return (dispatch) => {
    axios.get('api/login.json?account=' + account + '&password=' + password).then ((res) => {
      // 请求后端的账号密码数据
      console.log(res)
      const result = res.data.data
      if (result) {
        // 如果登录成功则改store中的login数据为true
        dispatch(changeLogin())
      } else {
        alert('登录失败')
      }
    }) 
  }
}
