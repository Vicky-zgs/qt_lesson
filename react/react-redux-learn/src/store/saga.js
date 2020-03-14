// 使用中间件 redux-saga 实现异步接口请求

import { takeEvery, put } from 'redux-saga/effects'
import { GET_INIT_LIST } from './actionTypes'
import axios from 'axios'
import { initListAction } from './actionCreators'

function* getInitList() {
  try {
    // 执行成功
    const res = yield axios.get('http://musicapi.leanapp.cn/comment/music?id=186016&limit=1')
    const action = initListAction(Object.keys(res.data.hotComments[0]))
    yield put(action)
  } catch(e) {
    // try中的代码执行失败
    console.log('网络请求失败')
  }

  // 在generator函数中不建议使用promise的方法(.then)
  // axios.get('http://musicapi.leanapp.cn/comment/music?id=186016&limit=1').then((res) => {
  //     // console.log('接口请求成功得到的res',res)
  //     const data = res.data
  //     const action = initListAction(Object.keys(data.hotComments[0]))
  //     put(action)
  //     // store.dispatch(action)
  //     console.log('action:', action)
  //   })
}

function* mySaga() { // sagas必须要是generator函数
  // 如果拿到了TodoList.js中派发的GET_INIT_LIST, 就执行getInitList
  yield takeEvery(GET_INIT_LIST, getInitList)
}

export default mySaga;