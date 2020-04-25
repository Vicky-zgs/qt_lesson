// import './index.css'

// 对于css进行热更新(代码演示)：
// var btn = document.createElement("button")
// btn.innerHTML="新增";
// document.body.appendChild(btn)

// btn.onclick = function() {
//   var div = document.createElement("div")
//   div.innerHTML= "item"
//   document.body.appendChild(div)
// }

import a from './a'
import b from './b'

a()
b()

if (module.hot) { // 是否开启HMR
  // 监听a.js的变化
  // a.js更新了之后重新执行一遍并且替换原来的数据, 这样就实现了js的热更新
  module.hot.accept("./a", () => {
    console.log("有更新了")
    document.body.removeChild(document.getElementById("number"))
    a()
  })
}