// 组件跨层级的上下文通信 可以使用context, 这种模式下会有两个角色: Provider, Consumer
// Provider为外层组件,用来提供数据; 当内部需要数据时用Consumer来获取
import React, { Component } from 'react';

// 1. 创建上下文
const Context = React.createContext()

const store = {
  name: '恭喜你中了一等奖',
  sayHi () {
    console.log(this.name)
  }
}

// (Comp) => {
//   (props) => {

//   }
// }
const withProvider = Comp => props => (
  // Provider模式
  <Context.Provider value={store}>
    {/* 调用这个模式下的子组件Comp 并且Comp接收到了值 */}
    <Comp {...props}/>
  </Context.Provider>
)

const withConsumer = Comp => props => (
  <Context.Consumer>
    {/* 必须内嵌一个函数 */}
    {value => <Comp {...props} value={value}/>}
  </Context.Consumer>
)

@withConsumer  // wichConsumer(Inner)
class Inner extends Component {
  render () {
    console.log('Inner')
    return (
      // 原本这里的值需要父组件(ContextSample)传值,但是父组件没有传值
      // 此时是组件跨层级的上下文通信
      <div>{this.props.value.name}</div>
    )
  }
}

@withProvider // withProvider(ContextSample)
class ContextSample extends Component {
  render () {
    console.log('ContextSample')
    // 将Inner作为ContextSample的子组件
    return (
      <div>
        <Inner></Inner>
      </div>
    )
  }
}

export default ContextSample