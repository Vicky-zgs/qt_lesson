# 206 反转链表

两种解法 三种语言

## 通过前驱结点及后继结点的概念， 使用遍历 (1.js)
  当前结点的next 指向它的前驱结点
  之前的前驱结点变成当前结点
  当前结点变成原结点的后继结点
  如果为null, 完成

## 递归 (2.js)
  - 把复杂类似的变成简单的重复
  - 退出条件
    null
  简单公式   n 个结点要翻转 -> 1个结点
  当前结点cur next 指向的结点的next 指向当前结点的话, 就翻转了
  结点next 属性干掉

## 3.py 用python语言解决此算法

## go语言
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func reverseList(head *ListNode) *ListNode {
    var prev *ListNode
    for head != nil {
        temp := head.Next    // 原结点的后继结点
        head.Next = prev  // 指向前驱结点
        prev = head // 前驱结点设置为当前结点
        head = temp // 当前结点变为下一个结点
    }
    return prev
}
