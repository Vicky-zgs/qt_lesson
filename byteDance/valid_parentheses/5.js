function longestValidParentheses(s) {
  if (!s || s.length < 1) return 0; //如果为空
  var left = right = max = 0; // 用两个变量代替模拟栈的意义
  // left 是当前还在匹配的左括号的数量， right 是当前右括号的数量
  for (var i = 0 ; i < s.length; i++) { //时间复杂度O(n)
    if (s[i] == '(') {
      left++; // 入栈, 有多少个入栈
    } else {
      right++; // 右括号
    }
    // ()
    if (left == right) {
      max = Math.max(max, 2*right); // 2*right 就是有效匹配的长度
    } else if (right > left) { // 后面就无效了
      left = right = 0; // 重新开始
    }
  }

  // 但是只有以上代码的话 如果((()) 类似这样的左括号不会等于右括号 就会有问题，所以需要倒着遍历一遍

  left = right = 0;
  for (var i = s.length-1; i >= 0; i--) { // 倒着遍历一遍, stack 来概念化的匹配
    if(s[i] == '(') {
      left++;
    } else {
      right++;
    }
    if (left == right) {
      max = Math.max(max, 2*left);
    }else if (left > right) {
      left = right = 0;
    }
  }
  return max;
}

console.log(longestValidParentheses(')()())'));
console.log(longestValidParentheses('((())'));