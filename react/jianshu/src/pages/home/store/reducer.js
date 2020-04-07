import { fromJS } from 'immutable'
import * as constants from './constants'

// immutable.js
// facebook
// immutable对象   不可改变的对象

const defaultState = fromJS({
  // 首页的专题组件的数据
  topicList: [],

  // 首页的list组件中的数据
  articleList: [],

  // 首页的推荐栏组件的数据
  recommendList: [],

  // 首页列表组件页数
  articlePage: 1,

  // 是否展示 '回到顶部'
  showScroll: false
})

// 将action 从 export的函数里分离出来 (代码调优)
const changeHomeData = (state, action) => {
  return state.merge({ // 把多个对象合并成一个对象  (修改多个数据)
    topicList: fromJS(action.topicList),
    articleList: fromJS(action.articleList),
    recommendList: fromJS(action.recommendList)
  });
}

const addArticleList = (state, action) => {
  return state.merge({ // 把多个对象合并成一个对象  (修改多个数据)
    articleList: state.get('articleList').concat(action.list),
    articlePage: action.nextPage
  });
  // return state.set('articleList', state.get('articleList').concat(action.list))
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case constants.CHANGE_HOME_DATA:
      console.log('home中的reducer接收到的action:',action)
      // state.set('topicList', fromJS(action.topicList)).set ...
      return changeHomeData(state, action)
    case constants.ADD_ARTICLE_LIST:
      // 点击 阅读更多 后, 在原List后再拼接数据, 并且根据不同页码返回不同数据
      return addArticleList(state, action)
    case constants.TOGGLE_SCROLL_TOP:
      return state.set('showScroll', action.show)
    default:
      return state
  }
}