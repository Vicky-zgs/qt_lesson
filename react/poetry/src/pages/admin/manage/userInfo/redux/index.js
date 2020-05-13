import { createStore , applyMiddleware } from 'redux';  //  引入store
//applyMiddleware  可以让我们使用中间件
//import  thunk  from 'redux-thunk'

import  reducer  from './reducer'

const store = createStore(
    reducer,     //将reducers 传给 store
  //  applyMiddleware(thunk)     //   applyMiddleware([thunk ,  ...])  
  );


  export   default store ;