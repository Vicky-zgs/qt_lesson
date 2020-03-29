// 首页的专题组件

import React, { Component } from 'react'
import { connect } from 'react-redux'   // 使用store
import { TopicWrapper, TopicItem } from '../style'

class Topic extends Component {
  render() {
    return (
      <TopicWrapper>
        {
          this.props.list.map((item) => {
            return (
              <TopicItem key={item.get('id')}>
                <img className="topic-pic" src={item.get('imgUrl')} alt="" />
                {item.get('title')}
              </TopicItem>
            )
          })
        }
      </TopicWrapper>
    )
  }
}

const mapState = (state) => ({
  // 因为state中的数据是immutable对象 所以要get
  list: state.home.get('topicList')
})

// 与store建立连接, 仅仅取数据 不需要存数据
export default connect(mapState, null)(Topic)