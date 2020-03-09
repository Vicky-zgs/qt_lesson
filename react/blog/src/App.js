import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import Login from './pages/admin/login'
import routes from './Router'
import requireLogin from './requireLogin'

class App extends Component {
  // Redirect 路由重定向
  render () {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => <Redirect to="/web/index" />} ></Route>
          <Route path="/login" component={Login} />
          {
            routes.map((route, i) => (
              <Route key={i} path={route.path} component={
                // 如果去的页面路径不包含admin的可以不登录直接看
                route.path.includes('/admin') ? requireLogin(route.component) : route.component
              } />
            ))
          }
        </div>
      </Router>
    )
  }
}

export default App