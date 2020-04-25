https://www.jianshu.com/p/b331d0e4b398

1. 挂载卸载过程
1.1. constructor()
  constructor()中完成了React数据的初始化，它接受两个参数：props和context，当想在函数内部使用这两个参数时，需使用super()传入这两个参数。
  注意：只要使用了constructor()就必须写super(),否则会导致this指向错误。

1.2. componentWillMount()
  componentWillMount()一般用的比较少，它更多的是在服务端渲染时使用。它代表的过程是组件已经经历了constructor()初始化数据后，但是还未渲染DOM时。

1.3. componentDidMount()
  组件第一次渲染完成，此时dom节点已经生成，可以在这里调用ajax请求，返回数据setState后组件会重新渲染

1.4. componentWillUnmount ()
  在此处完成组件的卸载和数据的销毁。
  clear你在组建中所有的setTimeout,setInterval
  移除所有组建中的监听 removeEventListener

2. 更新过程
2.1. componentWillReceiveProps (nextProps)
  在接受父组件改变后的props需要重新渲染组件时用到的比较多
  接受一个参数nextProps
  通过对比nextProps和this.props，将nextProps的state为当前组件的state，从而重新渲染组件

2.2. shouldComponentUpdate(nextProps,nextState)
  主要用于性能优化(部分更新)
  唯一用于控制组件重新渲染的生命周期，由于在react中，setState以后，state发生变化，组件会进入重新渲染的流程，在这里return false可以阻止组件的更新
  因为react父组件的重新渲染会导致其所有子组件的重新渲染，这个时候其实我们是不需要所有子组件都跟着重新渲染的，因此需要在子组件的该生命周期中做判断

2.3. componentWillUpdate (nextProps,nextState)
  shouldComponentUpdate返回true以后，组件进入重新渲染的流程，进入componentWillUpdate,这里同样可以拿到nextProps和nextState。

2.4.componentDidUpdate(prevProps,prevState)
  组件更新完毕后，react只会在第一次初始化成功会进入componentDidmount,之后每次重新渲染后都会进入这个生命周期，这里可以拿到prevProps和prevState，即更新前的props和state。

2.5.render()
  render函数会插入jsx生成的dom结构，react会生成一份虚拟dom树，在每一次组件更新时，在此react会通过其diff算法比较更新前后的新旧DOM树，比较以后，找到最小的有差异的DOM节点，并重新渲染。
