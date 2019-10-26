# Promise
  - Promise 是异步编程的一种解决方案
  - Promise的构造函数接收一个参数，是函数，并且传入两个参数：resolve，reject，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数
  - 执行了resolve('ok') 就要执行.then