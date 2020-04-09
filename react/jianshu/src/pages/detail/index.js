// 详情页面

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import { withRouter } from 'react-router-dom'
import {
  DetailWrapper,
  Header,
  Content
} from './style.js'

class Detail extends Component {
  componentDidMount() {
    // 将上级传过来的detail的id传给getDetail()
    this.props.getDetail(this.props.match.params.id)
  }
  render() {
    return (
      <DetailWrapper>
        <Header>{this.props.title}</Header>
        <Content dangerouslySetInnerHTML={{__html: this.props.content}}>
          {/* 使得拿到的content字符串中的标签成为真正的标签, 而不仅仅是字符串 */}
        </Content>
      </DetailWrapper>
    )
  }
}

const mapState = (state) => ({
  title: state.detail.get('title'),
  content: state.detail.get('content')
})

const mapDispatch = (dispatch) => ({
  getDetail(id) { // id: 不同detail的id
    let action = actionCreators.getDetail(id)
    action(dispatch)
  }
})

export default connect(mapState, mapDispatch)(withRouter(Detail))