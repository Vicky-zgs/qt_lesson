// 相当于图书管理员

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer) // store 已经能知道笔记本中记过两个笔记

export default store;