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
export const login = (url, user) => {
  return (dispatch) => {
    axios.post(url, {
      body: user,
    }).then(function (res) {
      return res.json();
    }).then(function (json) {
      alert(json.description)
      window.location.href = json.nextAction;
      dispatch(changeLogin())
    })
  }
}
