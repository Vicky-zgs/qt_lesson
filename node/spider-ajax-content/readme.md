# Map
  - 有什么用？
  - 为什么es6要增加一个Map
  1. 以前的key 只支持字符串
  2. 以前的ket 无序的
  3. 优化if else
  4. 可以传任意类型的key:value

  - 语法：
    map1.set('key1', 'value1');
    map1.set(() => {}, 'function');
    map1.get('key');
    map1.entries() [key,value]
    map1.keys()     查看map1中的key
    map1.values()