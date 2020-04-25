# redux
1. TodoList.js          用react实现todolist
2. index.js reducer.js  加入redux
3. actionTypes          整合
4. actionCreators.js    使用 actionCreator 统一创建 action

# 总结 redux的设计使用原则
1. ** store 是唯一的 **
2. 只有store能改变自己的内容 (而不是由reducer改变)
3. reducer 是一个纯函数

# redux中核心的API
1. createStore     创建store
2. store.dispatch  派发action
3. store.getState  获取store里面所有的数据
4. store.subscribe 监听/订阅store数据的改变


# UI组件与容器组件的拆分 (将渲染页面的部分和功能实现的部分拆分)
  - UI组件：  TodoListUI.js 
  - 容器组件： TodoList.js 

# 无状态组件 (没有自己的状态(this.state))

# Redux中发送异步请求获取数据

# redux-thunk 中间件  实现ajax数据请求
- 官方文档：在github搜索 redux-thunk
  - npm i --save redux-thunk
  - 要在src/store/index.js中声明
  - 使用中间件 就可以不把接口请求放在TodoList.js的生命周期中
    而是把接口请求当成一句话写在actionCreator.js中

# 到底什么是Redux中间件
  - 相当于dispatch的一个升级 : 
    本来dispatch传的数据是能是对象, 用了中间件后, 就可以传函数, 例actionCreators.js中的getTodoList() 接口请求方法

# redux-saga 中间件   实现ajax数据请求
  - npm install --save redux-saga
  - 原本dispatch的action给的是reducer去处理
    但是使用saga后 saga.js也能通过自己的方法获取dispatch派发的内容 (TodoList.js/45行)

# ps： 这个文件夹(react-redux-learn) 是学习redux的 不是react-redux