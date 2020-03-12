// function countReducer (state, action) {
//   switch (action) {
//     case 'add':
//       return state + 1
//     case 'sub':
//       return state - 1
//     default:
//       return state
//   }
// }
import React, { useReducer } from 'react'

function ReducerDemo () {
  // const count = 0
  // function add () {
  //   count--
  // }
  // function cut () {
  //   count--
  // }

  // useReducer 帮助我们整合组件中操作同一的各种方法
  // useReducer()的第一个参数是一个函数,第二个参数是state的初始值, 而dispath相当于一个触发器
  const [count, dispath ] = useReducer((state, action) => {
    switch (action) {
      case 'add':
        return state + 1
      case 'sub':
        return state - 1
      default:
        return state
    }
  }, 0)
  return (
    <div>
      <h2>现在的分数是{count}</h2>
      <button onClick={() => dispath('add')}>add</button>
      <button onClick={() => dispath('sub')}>cut</button>
    </div>
  )
}

export default ReducerDemo