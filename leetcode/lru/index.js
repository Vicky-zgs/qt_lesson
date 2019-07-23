/**
 * 最近最少使用原则
 * @param capacity:number 容量
 */
var LRUCache = function(capacity) {
    this.capacity = capacity;// 空间的上限
    this.arr = []; //数据结构
    this.obj = {}; // 3 , 3
    // 使用的空间 arr.length  push
    // get 
};
LRUCache.prototype.get = function(key) {
    // 调整优先级
    
    return ;
}
LRUCache.prototype.set = function() {

}
new LRUCache(2);

// []  length  push   
// [1] push
// [1,2]  在哪端是最近最常用的? push
// get(1) 读操作
// 1  所在的位置，从原来的数组里移除， push到队尾(最近最常使用)
// 不会带来空间使用量的增加
// [2,1]
// put(3) 带来空间的分配  回收空间?  最近最少使用( length>=容量 shift)  push(3) 
