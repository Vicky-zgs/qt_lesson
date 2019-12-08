# button.vue
  - 自己写一个i-button组件(仿i-view的button组件) 
    主页面中传size值给组件,显示不同size的button
  - validator()方法校验传到组件的值
  - 将组件中的方法抛出($emit),使得点击按钮和提交会console.log不同的值
    @on-click接收
  - 父组件如何调用子组件的方法(而且还有点击事件)
    ref获取dom结构, 在div容器中绑定点击事件
    事件中调用子组件中的方法: this.$refs.sure.sureClick()
    sureClick()是子组件中的方法
# pages/A.vue, B.vue, C.vue
  ## project 与 inject
  - A.vue中的project中的值传给B.vue中的inject里
    子组件向父组件时可使用, 但是较复杂, 官方文档不建议使用
    因为A中project的数据,B中可以拿到, C中也可以拿到, 这样不好
  - 在app.vue中project抛出 app: this
    这样其他页面都可以取到app.vue中的数据 相当于一份公共数据
    but 不能修改app.vue中的数据 它不是响应式的
