// babel示例

// import "@babel/polyfill"   // 以全局变量的方式注入进来的, window.Promise, 它会造成全局变量的污染
// @ babel / plugin-transform-runtime 以插件的形式引入, 它不会污染全局变量, 因此它也不会对类似的Array.proptotype.includes()进行polyfill

// let obj = {}
// const str = ""
// const arr = [new Promise(() => {}), new Promise(() => {})]
// arr.map(item => {
//   console.log(item)
// })

import React, { Component } from 'react'
import ReactDom from 'react-dom'
import Child from './index.jsx'

class App extends Component {
  render() {
    return (
      <div>
        <Child />
       </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById("app"))