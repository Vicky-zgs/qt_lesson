# 预编译 四部曲 发生在函数执行之前 **很重要**
  - (这是发生在函数体内的预编译)
  1. 创建AO对象
  2. 找形参和变量声明，将形参和变量声明作为AO属性名，值为undefined
  3. 将实参值和形参值统一
  4. 在函数体里找函数声明，将函数名作为AO对象的属性名，值赋予函数体

  以index.html 中的预编译例子为例
  1. 
  AO {

  }

  2. 
  AO {
    a: undefined,       a既是形参，也是变量声明，只写一个
    b: undefined        var b是变量声明
  }

  3. 
  AO {
    a: 1,            用实参值代替了形参值
    b: undefined        
  }

  4. 
  AO {
    a: function () {},            
    b: undefined    
    d: function () {}  
  }

  本来function a () {} 也是函数名, 但是a已经存在, 所以仅将函数体赋值给a,不能再写一个a

  所以console.log 如我的注释那般打印
  第一个console.log(a)时，a 为函数体
  第二个console.log之前赋值了, so  a 变成123
  第三个console.log之前的function a() {} 不执行 它只是个声明
  第四个console.log之前b赋值了

# 预编译也发生在全局 (无函数体预编译的第三步)
  1. 创建GO对象
  2. 找形参和变量声明，将形参和变量声明作为GO属性名，值为undefined
  3. 在函数体里找函数声明，将函数名作为GO对象的属性名，值赋予函数体

  GO {

  }  GO === window
