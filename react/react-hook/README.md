# hooks 本质上就是一类特殊的函数
  - 它可以在不编写class的情况下使用state内部的状态和React其他的特性
  ## useState 是一个hook 关于数据
    - const [ count, setCount ] = useState(0)
    - useState(initialState), 接收初始状态, 返回一个状态变量和它的更新函数, 属性名可以自定义
  ## useEffect 副作用
    - hooks模式下状态 (state) 发生变更的时候提供给我们做额外操作的地方
    - 可以说相当于hooks模式下的componentDidMount、componentDidUpdate生命周期
  ## makeUnmount.js
    - 使用 useEffect 实现 componentWillUnmount  (解绑副作用)
  ## useContext 让父子组件传值变得更加简单
  ## useReducer 整合组件中 操作同一状态 的各种方法
  ## useMemo    优化React Hooks 程序的性能
  ## useRef     获取dom元素