https://www.jianshu.com/p/2e5973fe1223

# VueX是适用于在Vue项目开发时使用的状态管理工具。试想一下，如果在一个项目开发中频繁的使用组件传参的方式来同步data中的值，一旦项目变得很庞大，管理和维护这些值将是相当棘手的工作。为此，Vue为这些被多个组件频繁使用的值提供了一个统一管理的工具——VueX。在具有VueX的Vue项目中，我们只需要把这些值定义在VueX中，即可在整个Vue项目的组件中使用。

## 成员列表：
  - state 存放状态
  - mutations state成员操作
  - getters 加工state成员给外界
  - actions 异步操作
  - modules 模块化状态管理

1. Mutations
  mutations是操作state数据的方法的集合，比如对该数据的修改、增加、删除等等。
  - mutations方法都有默认的形参：
    ([state] [,payload])
    - state是当前VueX对象中的state
    - payload是该方法在被调用时传递参数使用的

2. Getters
  可以对state中的成员加工后传递给外界
  - Getters中的方法有两个默认参数
    - state 当前VueX对象中的状态对象
    - getters 当前getters对象，用于将getters下的其他getter拿来用

3. Actions
  由于直接在mutation方法中进行异步操作，将会引起数据失效。所以提供了Actions来专门进行异步操作，最终提交mutation方法。
  - Actions中的方法有两个默认参数
  - context 上下文(相当于箭头函数中的this)对象
  - payload 挂载参数

4. Models
  当项目庞大，状态非常多时，可以采用模块化管理模式。Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。
  - 模块中mutations和getters中的方法接受的第一个参数是自身局部模块内部的state
  - getters中方法的第三个参数是根节点状态
  - actions中方法获取局部模块状态是context.state,根节点状态是context.rootState