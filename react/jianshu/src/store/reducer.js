import { combineReducers } from 'redux'
import { reducer as headerReducer } from '../common/header/store'
import { reducer as homeReducer } from '../pages/home/store'

// 合并所有不同组件上的reducer
const reducer = combineReducers({
  header: headerReducer,
  home: homeReducer
})

export default reducer