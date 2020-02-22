// 入口

import React from 'react'
import ReactDOM from 'react-dom'
import Lifecycle from './components/Lifecycle'
import CommentVs from './components/CommentVs'
import PureComponentTest from './components/PureComponentTest'
import ButtonTest from './components/ButtonTest'
import Hoc from './components/Hoc'
import ContextSample from './components/ContextSample'
// import App from './App'

// class App extends React.Component {
//   render() { 
//     // props
//     return  <div>
//               hello {this.props.name}, I am {9 + 9} years old
//             </div>
//   }
// }


// state
// 生命周期
// class Counter extends React.Component {
//   constructor (props) {
//     super(props)
//     // 初始化构造器时设置内部状态 num值为1
//     this.state = {
//       num: 1
//     }
//     // 将this作用域绑定一下(相当于将handleClick方法绑定到了Counter类上)
//     this.handleClick = this.handleClick.bind(this)
//   }
//   // 生命周期方法, 组件渲染完成
//   componentDidMount() {
//     console.log('componentDidMount 函数触发')
//   }
//   // 生命周期方法, 避免组件重复或者无意义的渲染
//   shouldComponentUpdate(nextProps, nextState) {
//     console.log(nextProps, nextState) // {} {num: 更新后最新的值}
//     if (nextState.num%2) {
//       return true // 组件更新 '3'
//     }
//     return false // 组件不更新 '2'
//   }
//   handleClick() {
//     console.log(123)
//     this.setState ({
//       // 这个方法用来修改数据源
//       num: this.state.num + 1
//     })
//   }
//   render () {
//     return (
//       // 绑定函数,方法写在同级,所以要this.
//       <div>
//         <p>{this.state.num}</p>
//         <button onClick={this.handleClick}>click</button>
//       </div>
//     )
//   }
// }

// 表单
// 渲染列表
// class TodoList extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       text: '帅气的蜗牛',
//       todos: ['Learn React', 'Learn-Ant-design', 'Learn Koa']
//     }
//     this.handleChange = this.handleChange.bind(this)
//     this.handleClick = this.handleClick.bind(this)
//   }
//   handleChange (e) {
//     console.log(e.target.value) // 输入框中输入的值
//     this.setState({
//       text: e.target.value
//     })
//   }
//   handleClick () {
//     if (this.state.text) {
//       // this.setState({
//       //   // 将text值追加到todos数组中
//       //   todos: [...this.state.todos, this.state.text],
//       //   text: ''
//       // })
//       // 优化一下：
//       this.setState(state => ({
//           // 将text值追加到todos数组中
//           todos: [...state.todos, state.text],
//           text: ''
//       }))
//     }
//   }
//   render () { // jsx
//     return (
//       <div>
//         {/* 数据的双向绑定 */}
//         {this.state.text}
//         <input type="text" value={this.state.text} onChange={this.handleChange} />
//         <button onClick={this.handleClick}>add</button>
//         {/* 在页面上显示数据中的数据(遍历) */}
//         <ul>
//           {this.state.todos.map( v => {
//             return <li key={v} >{v}</li>
//           })}
//         </ul>
//       </div>
//     )
//   }
// }

// React 16 新增
class React16 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      hasError: false
    }
  }
  render () {
    return (
      <div>
        {this.state.hasError ? <div>出错了</div> : null}
        <ClickWriteError />
        <FeatureReturnFraments />
      </div>
    )
  }
}

// ClickWriteError 是一个组件
class ClickWriteError extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      error: false
    }
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick () {
    this.setState({
      error: true
    })
  }
  render () {
    if (this.state.error) {
      throw new Error ('出错了!')
    }
    return <button onClick={this.handleClick}>抛出错误</button>
  }
}

// FeatureReturnFraments 是一个组件
class FeatureReturnFraments extends React.Component {
  render () {
    return [
      <p key="key1">React 很不错</p>,
      '文本1',
      <p key="key2">Antd也很赞</p>,
      '文本2'
    ]
  }
}

// ReactDOM.render(<PureComponentTest body='vue is very good' author='youyuxi' />, document.querySelector('#root'))
// ReactDOM.render(<Hoc state="React" />, document.querySelector('#root'))
ReactDOM.render(<ContextSample />, document.querySelector('#root'))