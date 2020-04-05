import { combineReducers } from 'redux'
import { reducer as headerReducer } from '../common/header/store'
import { reducer as homeReducer } from '../pages/home/store'
import { reducer as detailReducer } from '../pages/detail/store'

// 合并所有不同组件上的reducer
const reducer = combineReducers({
  header: headerReducer,
  home: homeReducer,
  detail: detailReducer
})

export default reducer