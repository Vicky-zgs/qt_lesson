// useContext 让父子组件传值变得更加简单
import React, { useState, createContext, useContext } from 'react'

// 上下文变量
const CountContext = createContext()

function Example () {
  const [count, setCount ] = useState(0)
  return (
    <div>
      <p>你点了{count}次</p>
      <button onClick={() => {setCount(count + 1)}}>click me</button>
      <CountContext.Provider value={count}>
        <Counter />
      </CountContext.Provider>
    </div>
  )
}

function Counter () {
  // 子组件
  const count = useContext(CountContext)
  return (
    <h2>{count}</h2>
  )
}

export default Example