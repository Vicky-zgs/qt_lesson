// 相当于图书管理员
// applyMiddleware 使用中间件要引入这个
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import TodoSagas from './saga'

// 使用 redux-saga  中间件
const sagaMiddleware = createSagaMiddleware()

// 使用 redux-thunk 中间件
const composeEnhanders = 
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? 
   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhanders(
  // applyMiddleware(thunk)       // redux-thunk中间件
  applyMiddleware(sagaMiddleware) // redux-saga中间件
)

const store = createStore(
  reducer,
  enhancer
  ) // store 已经能知道笔记本中记过两个笔记

sagaMiddleware.run(TodoSagas)

// store.state = {
//   inputValue: '',
//   list: []
// }

export default store;