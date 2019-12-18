## call apply bind
都可以 绑定 this

call / apply: 调用函数
```js
function foo(a, b) {}
// foo()
// foo.call(this, a, b)
// foo.call(this, [a, b])
```

函数式编程：
柯里化 (curry) 
## 1.html bind()
  - bind()返回的是一个函数
  - 使用它可以分批传参
  - 科里化
    柯里化通常也称部分求值，其含义是给函数分步传递参数，每次传递参数后部分应用参数，并返回一个更具体的函数接受剩下的参数，这中间可嵌套多层这样的接受部分参数函数，直至返回最后结果。
    因此柯里化的过程是逐步传参，逐步缩小函数的适用范围，逐步求解的过程。
  - 1.html 举了一个例子： 测试正则表达式与指定字符串是否匹配
    先将正则符传入函数 这样之后就不需要重复传正则符
  - 1.html 中的例2： 判断数组类型是否是数组
      Object.prototype.toString.call()
      使用bind()科里化，先将'Array'传入函数 就不必重复传这个参数
## 2.html
  this指向(优先级： new > call/apply/bind)
## 3.html 如何自定义一个bind()
## 4.html, 改进3.html
    改进第二步调用
      绑定 this 没有考虑优先级
      fBound 没有 prototype.abc,要继承一下
## new.html 判断函数是否被new调用
  改进 因为 优先级 而与原生bind()不同的问题