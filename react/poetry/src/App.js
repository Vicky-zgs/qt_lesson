import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index.js'
import Login from './pages/admin/login'
import 'antd/dist/antd.css'
import routes from './Router/web'
import WebLayout from './pages/web/layout/index'
import HeaderCustom from './pages/web/header/index'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <HeaderCustom />
          <div>
            <Route exact path="/" component={WebLayout}></Route>
            <Route path="/login" component={Login} />
            {
              routes.map((route, i) => (
                <Route key={i} path={route.path} component={route.component} />
              ))
            }
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App;
