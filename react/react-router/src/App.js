import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

// react router 其中包含三种类型， 1. 路由组件 2. 路由匹配组件 3. 导航组件
// 路由组件： BrowserRouter 、 HashRouter
// 路由匹配组件： Route 、 Switch
// 导航组件： Link

function Home() {
  return <h2>Home</h2>
}

function About() {
  return <h2>About</h2>
}

function Topic ({ match }) {
  console.log(match.params.id)
  return <h3>Requested Param: { match.params.id }</h3>
}

function Topics(props) {
  console.log(props)
  const { match } = props

  // react 中的二级路由
  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      {/* 路由匹配 */}
      {/* Topics 的一个二级组件,id 传给了子路由Topic 这里传的id就是components或者props-v-state*/}
      <Route path={`${match.path}/:id`} component={Topic}  />

      {/* Topics 的另一个二级组件 */}
      <Route exact path={match.path} render={() => <h3>Please select a topic.</h3> } />
    </div>
  )
}

function Header() {
  // 导航栏组件
  return (
    <ul>
      <li>
        {/* Link组件用来修改地址栏的路径 Home变成了a标签 */}
        <Link to="/">Home</Link>  
      </li>
      <li>
        <Link to="/about">About</Link>  
      </li>
      <li>
        <Link to="/topics">Topics</Link>  
      </li>
    </ul>
  )
}

function App() {
  // 使用Router路由组件 说明这里是与路由相关的组件
  return (
    <Router>
      <div>
        <Header />

        {/* 使用Route  匹配路由 */}
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </div>
    </Router>
  )
}

export default App;