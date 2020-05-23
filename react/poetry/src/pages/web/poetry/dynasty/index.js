// 古诗组件

import React, { Component } from 'react'
import Head from '../../header/index'
import List from '../../component/content-list/index.js'
import Tag from '../../component/tag/index.js'
import Tag_type from '../../component/tag/tag_type/index.js'
import axios from 'axios'
// import './index.less'

class Poetry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poetryList: [],   // 诗词页面显示的诗词列表
      poetryDynasty: [], // 朝代标签
      poetryType: []  // 类别标签
    }
  }

  componentDidMount () {
    // 这个页面显示的诗词数据是按照朝代/类别 分类后的数据
    // console.log('点击朝代后的数据aa', this.props.location.state.dynasty_list)
    let url = "http://localhost:8080/listalldynastybyid"//接口地址
    let id = this.props.match.params.id
    let that = this

    // 获得当前诗词的内容
    fetch(url, {
      method: 'post',
      body: id,
      credentials: 'include'//解决fetch跨域session丢失
    }).then(function (res) {
      return res.json();
    }).then(function (json) {
      console.log('分类后的诗词数据', json)
      that.setState({
        poetryList: json.data
      })
      console.log('诗词详情', that.state.poetryList)
    })

    axios.get('/listalldynasty').then((res) => {
      this.setState({
        poetryDynasty: res.data.data
      },() =>{
        // console.log('诗词朝代数据',this.state.poetryDynasty)
      })
    }).catch((err) => {
      console.log(err)
    })

    // 诗词类别标签数据 /listallpoetrytype
    axios.get('/listallpoetrytype').then((res) => {
      this.setState({
        poetryType: res.data.data
      },() =>{
        // console.log('诗词类别数据',this.state.poetryType)
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  render () {
    return (
      <div>
        <Head />
        <div className="wrapper">
          <List list={this.state.poetryList} />
          <Tag list={this.state.poetryDynasty}/>
          <Tag_type list={this.state.poetryType}/>
        </div>
      </div>
    )
  }
}

export default Poetry