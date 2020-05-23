// 古诗组件

import React, { Component } from 'react'
import Head from '../header/index'
import List from '../component/content-list/index.js'
import Tag from '../component/tag/index.js'
import Tag_type from '../component/tag/tag_type/index.js'
import axios from 'axios'
import './index.less'

class Poetry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      poetryList: [],
      poetryDynasty: [],
      poetryType: [],
      // 分类后的数据
      dynasty_list: []
    }
  }

  componentDidMount () {

    axios.get('/listallpoetrys').then((res) => {
      this.setState({
        poetryList: res.data.data
      },() =>{
        // console.log('诗词列表数据',this.state.poetryList)
      })
    }).catch((err) => {
      console.log(err)
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
        console.log('诗词类别数据',this.state.poetryType)
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
          
            {/* (this.props.list )
            : <List list={this.props.list} />
            ? <List list={this.state.poetryList} /> */}
          <List list={this.state.poetryList} />
          <Tag list={this.state.poetryDynasty} />
          <Tag_type list={this.state.poetryType}/>
        </div>
      </div>
    )
  }
}

export default Poetry