// Hook(钩子函数)  它可以在不编写class的情况下使用state内部的状态和React其他的特性

import React, { useState, useEffect } from 'react'

// 使用state Hook

// class HooksTest extends Component {
//   constructor (props) {
//     super(props)

//     this.state = {
//       count:0
//     }
//   }

//   render () {
//     return (
//       <div>
//         <p>You clicked {this.state.count} times</p>
//         {/* 调用setCount来修改状态count */}
//         <button onClick={() => setCount(this.state.count + 1)}>click me</button>
//       </div>
//     )
//   }
// }
//   以上注释代码相当于使用Hook :
export default function HookTest () {
  // useState(initialState), 接收初始状态, 返回一个状态变量和它的更新函数, 属性名可以自定义
  // 声明一个新的叫做 "count" 的 state 变量
  const [count, setCount] = useState(0)

  // useEffect可以让你在函数组件中执行副作用操作
  // 数据获取, 设置订阅, 以及手动更改React组件中的DOM ---- 副作用
  useEffect(() => {
    document.title = `你点击了${count}次`
  })

  return (
    <div>
      <p>You clicked {count} times</p>
      {/* 调用setCount来修改状态count */}
      <button onClick={() => setCount(count + 1)}>click me</button>
    </div>
  )
}