import React from 'react';
import Header from './common/header/index'
import store from './store/index'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/home/index'
import Detail from './pages/detail/loadable.js'
import Login from './pages/login'
import Write from './pages/write'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/detail/:id" component={Detail}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/write" component={Write}></Route>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
