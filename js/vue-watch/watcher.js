class watcher {
  constructor (opts) {
    // 这里的opts就是index.html中new时传过来的对象
    this.$data = opts.data
    this.$watch = opts.watch

    for (let key in opts.data) {
      // data的key value值
      this.setData(key, opts.data[key])
    }
  }

  setData (_key, _val) {
    // Object.defineProperty(this, ) this把上下文指向当前的对象
    Object.defineProperty(this, _key, {
      get: function () {
        return this.$data[_key]
      },
      set: function (val) {
        const oldVal = this.$data[_key] // inner的值
        if (oldVal === val) return val
        this.$data[_key] = val
        this.$watch[_key] && typeof this.$watch[_key] === 'function' && (
          // this.$watch[_key]就是测试例子中的watch:中的a方法
          this.$watch[_key].call(this, val, oldVal)
        )
        return val
      }
    })
  }
}

// 测试
// let vm = new watcher({
//   data: {
//     a: 0,
//     b: 'hello'
//   },
//   watch: {
//     a(newVal, oldVal) {
//       console.log(oldVal, newVal)
//     }
//   }
// })

// setTimeout(() => {
//   vm.a = 1
// },1000 )