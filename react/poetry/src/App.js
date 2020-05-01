import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index.js'
import Login from './pages/admin/login'
import 'antd/dist/antd.css'
import routes from './Router/web'
import WebLayout from './pages/web/layout/index'
import PersonalInfo from './pages/web/personalInfo/index.js'
import CollectionManage from './pages/web/manage/collection/index.js'
import Manager from './pages/admin/manage/index.js'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
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
          <Route path="/admin/manager" component={Manager}></Route>
        </div>
      </Router>
      </Provider>
    )
  }
}

export default App;
