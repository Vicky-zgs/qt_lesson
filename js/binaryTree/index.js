var tree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4
    }
  },
  right: {
    value: 3,
    left: {
      value: 5,
      left: {
        value: 7
      },
      right: {
        value: 8
      }
    },
    right: {
      value: 6
    }
  }
}

// 前序遍历 + 递归
var preOrder = function (node) {
  if (node ) {
    console.log(node.value)
    preOrder(node.left)
    preOrder(node.right)
  }
}
// preOrder(tree)

// 使用非递归的方式 栈 进行遍历

// 深度优先非递归
var preOrderUnRecur = function (node) {
  if (!node) {
    throw new Error('Empty Tree')
  }
  var stack = []
  stack.push(node)
  while (stack.length !== 0) {
    // 删除数组的最后一项 那么node就拿到了tree stack变成空数组
    node = stack.pop() 
    console.log(node.value)
    if (node.right) stack.push(node.right)
    if (node.left) stack.push(node.left)
  }
}

// preOrderUnRecur(tree)

// 广度优先非递归
function BreadthFirstUnRecur(biTree) {
  let queue = []
  queue.push(biTree)
  while (queue.length !== 0) {
    // node = queue删除的第一项 就是tree
    let node = queue.shift()
    console.log(node.value)
    if (node.left) queue.push(node.left)
    if (node.right) queue.push(node.right)
  }
}
BreadthFirstUnRecur(tree)