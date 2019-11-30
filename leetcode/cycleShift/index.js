var arr = [-1, -100, 3, 99], k = 2

// 方法1
// 使用模运算  0(n)
// function RShift (list, k) {
//   const copy = [...list]
//   const n = list.length
//   if (k % n === 0) {return list}
//   for (let i = 0; i < n; i++) { 
//     list[i] = copy[(k + i) % n] // 取余
//     // [3, -1, -100, 9] -> [3, 99, -1, -100]
//   }
//   return list
// }
// console.log(RShift(arr,k))


// 方法2
// [-1, -100, 3, 99]
// 使空间复杂度为1(不能开辟出新的空间)
// 这个方法的空间是可以预见的
// 但是时间复杂度为0(n * k)
// function RShift (list, k) {
//   const n = list.length
//   if (k % n === 0) {return list}

//   let cnt = Math.abs(k > 0 ? k % n : n + (k % n))
//   let t = null
//   while (cnt--) { // 循环了六次 2 * 3
//     console.log('cnt',cnt)
//     t = list[n-1] // 最后一项
//     // 右移一位
//     for (let i = n - 1; i > 0; i--) {
//       // [-1, -100, 3, 99] -> [-1, -100, 99, 3]
//       list[i] = list[i-1]
//       console.log(list)
//     }
//     list[0] = t
//   }
//   return list
// }
// console.log(RShift(arr,k))


// 方法3
// 时间复杂度是n, 空间复杂度为1
// 三次翻转法
// [0, n-k-1]
// [n-k, n-1]
// [0, n-1]
// var arr = [-1, -100, 3, 99], k = 2
function reverse(list, start, end) {
  let t = null
  while (start < end) {
    t = list[start]
    list[start] = list[end]
    list[end] = t
    start++
    end--
  }
}

function RShift(list, k) {
  const n = list.length
  if (k % n === 0) {return list}
  reverse(list, 0, n-k-1)
  reverse(list, n-k, n-1)
  reverse(list, 0, n-1)
  return list
}
console.log(RShift(arr,k))