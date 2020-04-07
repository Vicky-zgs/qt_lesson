// componentWillUnmount()  组件卸载之前
// 使用 useEffect 实现 componentWillUnmount  (解绑副作用)
// 一般页面发生变化了,所有useEffect都会执行, 所以需要解绑(第二个参数)

import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

function Example () {
  const [ count, setCount ] = useState(0)

  useEffect(() => {
    console.log(`useEffect => 你点击了 ${count} 次`)
    return () => {
      console.log('------------')
    }
  }, [count]) // 解绑后, 只与count的状态变化相关联

  return (
    <div>
      <p>你点了{count}次</p>
      <button onClick={() => {setCount(count + 1)}}>click me</button>

      <Router>
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/list">列表</Link>
          </li>
        </ul>
        <Route exact path="/" component={Index}></Route>
        <Route path="/list" component={List}></Route>
      </Router>
    </div>
  )
}

function Index () {
  useEffect(() => {
    console.log('useEffect => 这里是Index页面')
    return () => {
      // 相当于一个componentWillUnmount生命周期的作用
      console.log('你离开了Index页面')
    }
  }, []) // 放上第二个参数为[] => 当组件即将销毁时才进行解绑, 相当于componentWillUnmount
  return <h2>旅梦开发团</h2>
}

function List () {
  useEffect(() => {
    console.log('useEffect => 这里是list页面')
  })
  return <h2>List-page</h2>
}

export default Example