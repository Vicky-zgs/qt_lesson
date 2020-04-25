https://www.cnblogs.com/shikaka/p/10576531.html

# Map是一组键值对的结构，具有极快的查找速度。
  1. set(key, value): 向其中加入一个键值对
  2. get(key): 若不存在 key 则返回 undefined
  3. has(key):返回布尔值
  4. delete(key): 删除成功则返回 true, 若key不存在或者删除失败会返回 false
  5. clear(): 将全部元素清除

# Set数据容器，这是一个能够存储 无重复值 的有序列表
  Set 和 Map 最大的区别是只有键 key 而没有 value, 所以一般用来判断某个元素(key)是否存在于其中.
  1. add(key): 往set添加一个元素, 如果传入多个参数, 则只会把第一个加入进去
  2. has(key)
  3. delete(key)
  4. clear()

##  Map 集合可以保存多个键-值对(key-value), Set 集合可以保存多个元素.

# WeakSet 和 WeakMap
这两个集合比之前的两个集合在名字之前都加上了 Weak, 这个 Weak 可以直译成弱, 这个弱指的是弱引用, 那么前面不带Weak的 Set 和 Map就不弱, 就是强了, 这个强指的是强引用.