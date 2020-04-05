# 简书 web项目
- npm start
- npm add styled-components  方便做各个组件的私有样式 例如style.js
- npm install react-transition-group --save  在react中写动画
- npm install redux
- npm install --save react-redux
- 使用 redux-devtools-extension 便于使用react-redux
- npm install immutable 使得store中的数据不可被修改
- npm i react-router-dom
- npm install axios   请求接口

# src/common文件夹 -> 每个页面都有的header 

# src/statics文件夹 -> 静态资源文件
  - iconfont 使用了iconfont的图标,并将其设置成全局的

# public/api
  接口请求的json文件

# src/pages
  - detail/index.js
    使用了dangerouslySetInnerHTML={{__html: this.props.content}}, 这样可以使得拿到的content字符串中的标签成为真正的标签, 而不仅仅是字符串