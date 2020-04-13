# react中的Context:
  https://www.jianshu.com/p/eba2b76b290b?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation

  https://www.jianshu.com/p/65b348bf86ad

  你不想在组件树中通过逐层传递props或者state的方式来传递数据时，可以使用Context来实现跨层级的组件数据传递。

  ## 如何使用Context
    如果要Context发挥作用，需要用到两种组件，一个是Context生产者(Provider)，通常是一个父节点，另外是一个Context的消费者(Consumer)，通常是一个或者多个子节点。所以Context的使用基于生产者消费者模式。
    - 通过静态方法React.createContext()创建一个Context对象，这个Context对象包含两个组件，<Provider />和<Consumer />。