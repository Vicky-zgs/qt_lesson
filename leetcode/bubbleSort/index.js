// 冒泡排序

var test = [5, 4, 3, 2, 1]

function bubbleSort(arr) {
  // 轮数
  for (let i = 0; i < arr.length - 1; i++) {
    // 次数
    for (let j = 0; j < arr.length - 1 -i; j++) {
      if (arr[j] > arr[j+1]) {
        // 借助第三个变量进行交换值
        let temp = arr[j]
        arr[j] = arr[j+1]
        arr[j+1] = temp
      }
    }
  }
}

bubbleSort(test)
console.log(test) // 1, 2, 3, 4, 5