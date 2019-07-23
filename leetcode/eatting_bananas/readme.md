Koko loves to eat bananas.  There are N piles of bananas, the i-th pile has piles[i] bananas.  The guards have gone and will come back in H hours.

Koko can decide her bananas-per-hour eating speed of K.  Each hour, she chooses some pile of bananas, and eats K bananas from that pile.  If the pile has less than K bananas, she eats all of them instead, and won't eat any more bananas during this hour.

Koko likes to eat slowly, but still wants to finish eating all the bananas before the guards come back.

Return the minimum integer K such that she can eat all the bananas within H hours.

- H 时间
- K   K * H
- K   min       1 吃不完
      20   H 就吃完了
      1 -> N (尝试)     20(max)

1. 把香蕉表达一下 数据结构处理速度数据  .length H 
[3,6,7,11], H = 8
max = 11 min = 4
[30,11,23,4,20], H = 5
30
2. Max  规则 Max(arr)
3. Max--    正好在H小时内吃完
   >H   这个就找到
4. 怎么可以高效一点 二分查找

- JS数据类型
    基础数据类型：  整型 Number String Boolean Undefined Null
    Symbol 
    复杂数据类型：  Object
    [Array,Function,Math,Regexp,Date]
    Math.max()

- ... spread    展开数组
    ... reset   收起数组

- koko 
    while(1-> Math.max(...piles))
    每把香蕉花的小时数加起来
    piles=>pile=>Match.ceil(pile/low)
- 减少写尝试
    1-> Max     二分查找