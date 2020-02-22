// {
//   tag: 'div',
//   children: [
//     {
//       tag: 'a',
//       text: 'click me'
//     }
//   ]
// }

// <div>
//   <a>click me</a>
// </div>

// 为什么要依赖收集
new Vue({
  template: 
          `<div>
            <span>{{text1}}</span>
            <span>{{text2}}</span>
          </div>`,
  data: {
    text1: 'text1',
    text2: 'text2',
    text3: 'text3',
  }
})

this.text3 = 'lalala'
// text3不发生变化,render()不需要发生作用, 因为dep能辨别是哪个数据发生改变 