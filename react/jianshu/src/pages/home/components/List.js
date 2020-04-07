// 首页的列表组件

import React, { Component } from 'react'
import {
  ListItem,
  ListInfo,
  LoadMore
} from '../style.js'
import { connect } from 'react-redux'
import { actionCreators } from '../store'
import { Link } from 'react-router-dom'

class List extends Component {
  render() {
    // 将this.props中的方法解析出来
    const { list, getMoreList, page } = this.props
    return (
      <div>
        {
          list.map((item, index) => {
            return (
              // 点击不同的列表item, 跳转到不同的详情页面, 需要传id
              <Link key={index} to={'/detail/' + item.get('id')}>
                <ListItem key={index}>
                  <img className="pic" src={item.get('imgUrl')} alt="" />
                  <ListInfo>
                    <h3 className="title">{item.get('title')}</h3>
                    <p className="desc">{item.get('desc')}</p>
                  </ListInfo>
                </ListItem>
              </Link>
            )
          })
        }
        <LoadMore onClick={() => getMoreList(page)}>阅读更多</LoadMore>
      </div>
    )
  }
}

const mapState = (state) => ({
  list: state.home.get('articleList'),
  page: state.home.get('articlePage')
})

const mapDispatch = (dispatch) => ({
  getMoreList(page) {
    // 一般来说如果要dispatch一个函数 必须要用中间件 但这里为了方便就直接这样写了
    const action = actionCreators.getMoreList(page)
    action(dispatch)
  }
})

export default connect(mapState, mapDispatch)(List)