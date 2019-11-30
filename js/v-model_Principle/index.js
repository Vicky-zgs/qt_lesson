const a = {
  b: 1
}

function fn () {
  console.log('a的值发生改变了', a.b)
}

function bindData() {
  Object.keys(a).map(key => {
    let v = a[key]

    // 监听对象属性 三个参数   (监听对象, 监听对象的属性, {})
    Object.defineProperty(a, key, {
      get() { // 读取属性后调用的方法
        console.log('正在读取a里面的值')
        return v
      },
      set(newVal) { // 写入属性时调用的方法
        v = newVal
        fn()
      }
    })
  })
}

bindData()

// console.log(a.b)
a.b = 123