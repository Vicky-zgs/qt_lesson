import { combineReducers } from 'redux'
import { reducer as loginReducer } from '../pages/admin/login/store/index.js'

// 合并所有不同组件上的reducer
const reducer = combineReducers({
  login: loginReducer,
})

export default reducer