import axios from 'axios'
import * as constants from './constants'

const changeDetail = (title, content ) => ({
  type: constants.CHANGE_DETAIL,
  title,
  content
})

// 请求详情页面的数据 的 action
export const getDetail = (id) => {
  return (dispatch) => {
    axios.get('/api/detail.json?id=' + id).then((res) => {
      // 获得前端传过来的id, 并且返回相应id的数据
      // console.log('detail数据：',res.data.data)
      const result = res.data.data
      dispatch(changeDetail(result.title, result.content))
    })
  }
}