/**
 * 
 * @param {string} s 
 * @return {boolean}
 */

var isValid = function(s) {
  if (!s || s.length < 1) return true; // 字符串为空
  var n = s.length; // 字符串长度
  var stack = []; // 数组栈
  // stack 栈  push pop 只在数组的(尾)顶部插入或删除元素 栈 First In Last Out
  // 在数组的尾部位置插入 push , 数组的头部移除 shift() FIFO
  for (var i = 0; i < n; i++) { // 时间复杂度O(n)
    var c = s[i];
    // console.log(c)
    // ( )
    if (c == '(') { // 如果是 ( , 则入栈 等着 ) 来抵消
      stack.push(c); // 入栈, 数组的最后一个元素, 即栈顶元素
    } else {
      // )  将栈里的元素抵消一个 
      if (stack.length < 1) { // 第一个就是 )
        return false // 无效
      }
      stack.pop(); // 出栈
    }
  }
  return stack.length > 0 ? false : true; //如果栈里还有( , 则返回false, 如果没有了即抵消完了 返回true
}

console.log(isValid('()'));  //true