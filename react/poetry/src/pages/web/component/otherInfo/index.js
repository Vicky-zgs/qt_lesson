// 诗词详情页中的除诗歌外的其他信息 
import React, { Component } from 'react'
import './index.less'

class OtherInfo extends Component {
  // 换行要用到的方法
  autoSize() {
    let textarea1 = document.getElementById('reward-text1');
    let textarea2 = document.getElementById('reward-text2');
    textarea1.style.height = (textarea1.scrollHeight + 10) + 'px';
    textarea2.style.height = (textarea2.scrollHeight + 10) + 'px';
  }

  componentDidUpdate() {
    this.autoSize();
  }
  render() {
    const { list } = this.props

    return (
      <div className="wrapper" style={{ width: '50vw' }}>
        <div className="content-item" >

          <span className="title" >
            注释
            </span>
          <textarea id="reward-text1" className="content" style={{
            width: '100%',
            overflow: 'auto',
            wordBreak: 'break-all',
            color: '#000000',
            fontSize: '1.1em',
            fontWeight: '300',
            border: 'none',
            bodyStyle: 'solid',
            backgroundColor: '#aec6caf6'
          }} value={list.annotation} readOnly></textarea>
        </div>

        <div className="content-item" >

          <span className="title" >
            译文
            </span>
          <textarea id="reward-text2" className="content" style={{
            width: '100%',
            overflow: 'auto',
            wordBreak: 'break-all',
            color: '#000000',
            fontSize: '1.1em',
            fontWeight: '300',
            border: 'none',
            bodyStyle: 'solid',
            backgroundColor: '#aec6caf6'
          }} value={list.translation} readOnly></textarea>
        </div>
      </div>
    )
  }
}

export default OtherInfo