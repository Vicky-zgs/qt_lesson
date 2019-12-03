// 回顾一下defineProperty()方法

(function () {
  var o = { a: 1}
  Object.defineProperty(o, 'b', {
    get () {
      return this.a
    },
    set (newVal) {
      this.a = newVal
    },
    configurable: true // b 是否可以被再次配置
  })
  
  console.log(o.b) // 1
  o.b = 2
  console.log(o.b) // 2
})()