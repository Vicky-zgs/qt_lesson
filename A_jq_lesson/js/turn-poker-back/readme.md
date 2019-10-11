- 关于未定义b的报错
 var obj = { a: 1};
 console.log(obj.b);
 undefine.c
 console.log(obj.b.c);  //此时会报错
- 排序
 var arr = [1,2,3,4,5];
 arr.sort((a,b) => a - b)   //升序
 arr.sort((a,b) => b - a)   //降序
 arr.sort((a,b) => 0.5 - Math.random()); //随机排序 (伪随机，不是真正的随机)
 console.log(arr);
- getElementById、querySelectorAll括号中有无#的区别
const wrap = document.getElementById('wrap');
const allImg = document.querySelectorAll('#wrap img');