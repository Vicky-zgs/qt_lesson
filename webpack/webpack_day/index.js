//  tree shaking示例

// import { add } from './a.js'
// // import "./index1.css"

// add(1, 2)


// // lodash示例  (视频webpack8)
// import _ from 'lodash'   // 10Mb
// console.log(_.join(["a", "b", "c"], "***"))  // 1Mb


// 代码分割示例  (webpack9)
document.addEventListener('click', () => {
  import("./click.js").then(({default: func}) => {
    
  })
})

// click.js
// function click() {

// }