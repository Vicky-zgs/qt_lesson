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
  console.log(obj);　　// {a:10000,name:'apple'}


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