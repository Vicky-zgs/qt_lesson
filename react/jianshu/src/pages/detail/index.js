import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import {
  DetailWrapper,
  Header,
  Content
} from './style.js'

class Detail extends Component {
  componentWillMount() {
    this.props.getDetail()
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
  getDetail() {
    let action = actionCreators.getDetail()
    action(dispatch)
  }
})

export default connect(mapState, mapDispatch)(Detail)