import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from './pages/admin/login'
import 'antd/dist/antd.css'
import routes from './Router/web'
import WebLayout from './pages/web/layout/index'
import PersonalInfo from './pages/web/personalInfo/index.js'
import CollectionManage from './pages/web/manage/collection/index.js'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={WebLayout}></Route>
          <Route path="/login" component={Login} />
          {
            routes.map((route, i) => (
              <Route key={i} path={route.path} component={route.component} />
            ))
          }
          <Route path="/personalInfo" component={PersonalInfo}></Route>
          <Route path="/collectionManage" component={CollectionManage}></Route>
        </div>
      </Router>
    )
  }
}

export default App;
