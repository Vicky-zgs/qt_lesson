const tree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: {
        val: 5
      },
      right: {
        val: 6,
        left: {
          val: 8
        }
      }
    },
    right: {
      val: 7,
      right: {
        val: 9
      }
    }
  },
  right: {
    val: 3
  }
}

// 前序遍历
let arr = [];
// 爆栈
// 手动维护一个栈
const preOrder = function(tree) {
  if (tree) {
    arr.push(tree.val);
    preOrder(tree.left);
    preOrder(tree.right);
  }
  return arr
}
preOrder(tree)
console.log(arr)
// function foo() {
//   foo()
// }
// foo();

function loopPreOrder(tree) {
  let stack = [];
  let res = [];
  let current = tree;
  stack.push(current);
  while (stack.length > 0) {
    while (current) {
      // 一直push 直到最左边
      res.push(current.val);
      stack.push(current);
      current = current.left;
    }
    current = stack.pop();
    current = current.right;
  }
  return res
}
console.log(loopPreOrder(tree))

