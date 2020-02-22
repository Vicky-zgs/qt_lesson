# react中的组件
  - Lifecycle.js         六个生命周期介绍
  - CommentVs.js         常规组件
  - PureComponentTest.js react中另一种类型的组件
    PureComponent        会自动判断更新的数据和原来的数据是否一样，不一样即更新,一样就不更新
  - ButtonTest.js        使用antd UI框架看button效果
  - Hoc.js               react的高阶组件
  - ContextSample.js     组件跨层级的上下文通信(钉钉2.20视频)
    - React.createContext：创建一个上下文的容器(组件), defaultValue可以设置共享的默认数据
    - Provider(生产者): 和他的名字一样。用于生产共享数据的地方。生产什么呢？ 那就看value定义的是什么了。value:放置共享的数据。
    - Consumer(消费者):这个可以理解为消费者。 他是专门消费供应商(Provider 上面提到的)产生数据。Consumer需要嵌套在生产者下面。才能通过回调的方式拿到共享的数据源。当然也可以单独使用，那就只能消费到上文提到的defaultValue
