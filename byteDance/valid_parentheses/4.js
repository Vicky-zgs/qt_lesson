function longestValidParentheses(s) {
  // 时间复杂度O(n)
  var max = 0; // 最大长度初始化为0
  if (s.length == 0 || s.length == 1) return
  // 下标减法就是长度
  var stack = [-1]; // 使用栈来服务于有效括号匹配 0 刚开始匹配的
  for (var i = 0; i < s.length; i++) { // 下标法, 只要一次遍历，时间复杂度O(n)
    if (s[i] == '(') { // 左括号 下标入栈
      stack.push(i); // i就是下标
    } else {
      stack.pop(); // 右括号, 下标出栈
      if (stack.length < 1) { // 如果栈中只剩下-1
        stack.push(i); 
        // 栈顶元素没有了(出栈了), 那么前面的有效匹配都结束了, 新一轮匹配开始
        // 此时就要减去当前下标(-1), 然后push当前的下标
      } else {
        // 更新max , 即 i - 栈顶元素
        max = Math.max(max, i - stack[stack.length - 1]) // 有效的括号匹配
      }
    }
  }
  return max;
}

console.log(longestValidParentheses(')()())'))