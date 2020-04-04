// 专门写action

import axios from 'axios'
import * as constants from './constants'
import { fromJS } from 'immutable'

const changeHomeData = (result) => ({
  // 将这块代码从getHomeInfo中分离出来了
  type: constants.CHANGE_HOME_DATA,
  topicList: result.topicList,
  articleList: result.articleList,
  recommendList: result.recommendList
})

// 在原List后再加数据
const addHomeList = (list) => ({
  type: constants.ADD_ARTICLE_LIST,
  list: fromJS(list)
})

export const getHomeInfo = () => {
  return (dispatch) => {
    // 请求首页上的数据
    axios.get('/api/home.json').then((res) => {
      console.log(res)
      const result = res.data.data
      // const action = changeHomeData(result)
      dispatch(changeHomeData(result))
    })
  }
}

// 点击 阅读更多 后, 在原List后再加数据
export const getMoreList = () => {
  return (dispatch) => {
    axios.get('/api/homeList.json').then((res) => {
      // console.log(res)
      const result = res.data.data
      // console.log(result)
      dispatch(addHomeList(result))
    })
  }
}