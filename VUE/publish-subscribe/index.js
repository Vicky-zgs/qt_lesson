let selesOffices = {}  // 售楼部
selesOffices.books = [] // 缓存列表, 花名册, 存放订阅者的回调函数

// 增加订阅者的方法
selesOffices.listen = function(fn) {
  this.books.push(fn)  // 订阅的消息添加到缓存列表
}

selesOffices.trigger = function() {
  // 发布消息
  // for (let i = 0, fn; (fn = selesOffices.books[i++]);) {}
  for (let i = 0; i < selesOffices.books.length; i++) {
    let fn = selesOffices.books[i]
    fn.apply(this, arguments)
  }
}

selesOffices.listen(function(price, squareMeter) {
  // 购买者a
  console.log(`价格：${price}`)
  console.log(`面积：${squareMeter}`)
})
selesOffices.listen(function(price, squareMeter) {
  // 购买者b
  console.log(`价格：${price}`)
  console.log(`面积：${squareMeter}`)
})

selesOffices.trigger(2000000, 100)