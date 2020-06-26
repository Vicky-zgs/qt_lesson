import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index.js'
import Login from './pages/admin/login'
import 'antd/dist/antd.css'
import routes from './Router/web'

import ForgetPwd from './pages/admin/forgetPwd/index.js'
import SetNewPwd from './pages/admin/modifyPwd/index.js'
import WebLayout from './pages/web/recommend/index'
import PersonalInfo from './pages/web/personalInfo/index.js'

import CollectionManage from './pages/web/manage/collection/index.js'
import CommentManage from './pages/web/manage/comment/index.js'
import LookNotice from './pages/web/manage/notice/index.js'
import PoetInfo from './pages/web/component/poetInfo/index.js'
import PoetryInfo from './pages/web/component/poetryInfo/index.js'

import ManagerColl from './pages/admin/manage/collection/index.js'
import ManagerMyInfo from './pages/admin/manage/myInfo/index.js'
import ManageNotice from './pages/admin/manage/notice/index.js'
import PubNotice from './pages/admin/manage/notice/pubNotice/index.js'
import ManageComment from './pages/admin/manage/comment/index.js'
import ManageUser from './pages/admin/manage/userInfo/index.js'
import ManagePoetry from './pages/admin/manage/poetry_all/poetry/index.js'
import ManagePoetryDynasty from './pages/admin/manage/poetry_all/poetryDynasty/index.js'
import ManagePoetryType from './pages/admin/manage/poetry_all/poetryType/index.js'
import ManagePoet from './pages/admin/manage/poetry_all/poet/index.js'
import ManageUpload from './pages/admin/manage/upload/index.js'

import DynastyPoetry from './pages/web/poetry/dynasty/index.js'
// import DynastyPoetry from './pages/web/poetry/dynasty/index.js'
import TypePoetry from './pages/web/poetry/type/index.js'

import Search from './pages/web/poetry/search_after/index.js'

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
          <Route path="/forgetPwd" component={ForgetPwd} />
          <Route path="/setNewPassword" component={SetNewPwd} />

          {/* 用户的管理 */}
          <Route path="/personalInfo" component={PersonalInfo}></Route>
          <Route path="/collectionManage" component={CollectionManage}></Route>
          <Route path="/commentManage" component={CommentManage}></Route>

          {/* 诗人、诗词详情页 */}
          <Route path="/poetInfo/:id" component={PoetInfo}></Route>
          <Route path="/poetryInfo/:id/:poetryname" component={PoetryInfo}></Route>

          {/* 管理员的管理 */}
          <Route path="/admin/collection" component={ManagerColl}></Route>
          <Route path="/admin/myInfo" component={ManagerMyInfo}></Route>
          <Route path="/admin/notice" component={ManageNotice}></Route>
          <Route path="/admin/pubNotice" component={PubNotice}></Route>
          <Route path="/admin/manageComment" component={ManageComment}></Route>
          <Route path="/admin/manageUser" component={ManageUser}></Route>
          {/* 管理员管理 -> 古诗词管理 */}
          <Route path="/admin/managePoetry" component={ManagePoetry}></Route>
          <Route path="/admin/managePoetryDynasty" component={ManagePoetryDynasty}></Route>
          <Route path="/admin/managePoetryType" component={ManagePoetryType}></Route>
          <Route path="/admin/managePoet" component={ManagePoet}></Route>
          <Route path="/admin/manageUpload" component={ManageUpload}></Route>

          {/* 点击不同朝代后跳转的诗词页面 */}
          <Route path="/poetry/dynasty/:id" component={DynastyPoetry}></Route>
          <Route path="/poetry/type/:id" component={TypePoetry}></Route>

          {/* 点击搜索后跳转的页面 */}
          <Route path="/web/search/:id" component={Search}></Route>

        </div>
      </Router>
      </Provider>
    )
  }
}

export default App;
