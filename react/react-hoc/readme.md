# HOC
higher order Component

# 组件
是对 公共 html css state 的一个抽象

# 高阶组件
是对 各个组件中 公共逻辑的一个抽象 
1. 防止重复的代码 (页面复用)
2. 条件渲染, 控制组件的渲染逻辑 (渲染劫持)
3. 捕获|劫持 被处理的生命周期

  - 高阶组件不是组件 是一个函数 返回的是一个组件
  - 高阶组件接收一个组件参数，进行加工后返回这个组件

  ## component/example1  简述高阶组件用法(old)

  ## component/example2  高阶组件HOC用法 (new)
    - cnpm i @babel/plugin-proposal-decorators 安装装饰器的依赖
    - npm run eject 放出隐藏了的配置文件
    - 在package.json最后的babel添加一个配置

  ## component/example3  高阶组件如何获取并操作下面组件的ref