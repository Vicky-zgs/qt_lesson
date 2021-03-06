# 2020春招名企前端准备课

## 算法核心  leetcode  剑指offer

参考链接： https://juejin.im/post/5ddfa3def265da05ef59fe6e

- 开始 有效括号简单算法题
leetcode 20
  有效括号， 使用栈， 左括号入栈， 右括号出栈， 最后判断栈是否为空
  当右边括号， 栈中没有左括号， 提前判断不是有效的括号
  (()) ) ()

- 优化一下?
  时间复杂度， **空间复杂度**
  O (n)       stack 数组栈 O(n)

面试官的出题的想法是什么？
考算法， 了解同学的基础算法能力， 以及思维很重要
valid_parentheses , 时间复杂度， 空间复杂度的理解， 空间复杂度O(1) 计数

- 最长有效括号匹配长度
32题 hard
动态规划思想
1. 暴力法
使用嵌套循环 每位符号 (外层循环)，它的最大有效括号 (内层循环) 长度是多少？ tmpMax
求一个max 
时间复杂度为O(n^2)
2. 将**时间复杂度**降一降
tmpMax 来计算， 左右括号， 下标之间做减法， 得出长度
())(())
一次遍历  i  下标
栈中先放一个-1 ： -1(哨兵元素)  0-(-1)
) 消不掉? 栈为空时, 提前退出 2  前面的匹配的长度
省循环的根本  重新再来

面试官 从有效括号 到最大有效长度 
学习算法， 有没有专门思考或训练  easy->hard
空间复杂度， 时间复杂度
有水分？ 自然成长  刚度

- 最后
优化?   存下标,  时间复杂度O(n) 不太可能再优化
**空间复杂度**  ? stack O(n) -> O(1) 
left right O(1)
  1. () 2*right max
  2. left < right ()) 有效匹配结束  left = right = 0
  3. 倒着遍历一遍