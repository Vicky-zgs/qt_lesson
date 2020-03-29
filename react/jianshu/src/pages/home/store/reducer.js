import { fromJS } from 'immutable'
// immutable.js
// facebook
// immutable对象   不可改变的对象

const defaultState = fromJS({
  // 首页的专题组件的数据
  topicList: [],

  // 首页的list组件中的数据
  articleList: [],

  // 首页的推荐栏组件的数据
  recommendList: []
})

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'change_home_data':
      console.log('home中的reducer接收到的action:',action)
      // state.set('topicList', fromJS(action.topicList)).set ...
      return state.merge({ // 把多个对象合并成一个对象  (修改多个数据)
        topicList: fromJS(action.topicList),
        articleList: fromJS(action.articleList),
        recommendList: fromJS(action.recommendList)
      })
    default:
      return state
  }
  return state
}