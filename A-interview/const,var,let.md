# const
1. const定义的变量不可以修改，而且必须初始化。
2. let和const声明形成块作用域
3. 如果声明的是复合类型数据，可以修改其属性
  const a = 100; 

  const list = [];
  list[0] = 10;
  console.log(list);　　// [10]

  const obj = {a:100};
  obj.name = 'apple';
  obj.a = 10000;
  console.log(obj);　　// { a:10000,name:'apple' }


# var
1. var定义的变量可以修改，如果不初始化会输出undefined，不会报错。
2. var声明的变量会挂载在window上，而let和const声明的变量不会
3. var声明变量存在变量提升，let和const不存在变量提升
  console.log(a); // undefined  ===>  a已声明还没赋值，默认得到undefined值
  var a = 100;
  console.log(b); // 报错：b is not defined  ===> 找不到b这个变量
  let b = 10;
  console.log(c); // 报错：c is not defined  ===> 找不到c这个变量
  const c = 10;



# let
1. let是块级作用域，函数内部使用let定义后，对函数外部无影响。


https://blog.csdn.net/Web_J/article/details/99591116

# var、let 和 const 区别的实现原理

## 声明过程
- var：遇到有var的作用域，在任何语句执行前都已经完成了声明和初始化，也就是变量提升而且拿到undefined的原因由来
- function： 声明、初始化、赋值一开始就全部完成，所以函数的变量提升优先级更高
- let：解析器进入一个块级作用域，发现let关键字，变量只是先完成声明，并没有到初始化那一步。此时如果在此作用域提前访问，则报错xx is not defined，这就是暂时性死区的由来。等到解析到有let那一行的时候，才会进入初始化阶段。如果let的那一行是赋值操作，则初始化和赋值同时进行
- const、class都是同let一样的道理
