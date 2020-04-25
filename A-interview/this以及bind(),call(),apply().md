# this是什么？
  this是指包含它的函数作为方法被调用时所属的对象

# 修改this指向
JavaScript 为我们专门提供了一些函数方法来帮助我们更优雅的处理函数内部this的指向问题，常用的有bind()、call()、apply() 三种方法。

## call方法
  call() 方法 调用 一个对象，简单理解为调用函数的方法，但是它可以改变函数的 this指向。
    ```
    var obj = {
      name:'张三'
    }
    function fn(x,y) {
        console.log('我的this指向为：'+this);
        console.log(x + y);
    }
    fn.call();  //如果什么参数都不写，相当于调用函数执行。此时函数内this 还是指向window 
    fn.call(obj); //我们把对象obj传进去，此时 函数内的this就指向了 obj 对象
    fn.call(obj,10,20); //这个 10 20 就是我们之前普通函数的实参，可以传到 函数内进行运行等操作
    ```

  - 当然了 call 还有一个很重要的作用就是实现继承


## apply() 方法
apply 方法 调用 一个对象，简单理解为调用函数的方法，但是它可以改变函数的 this指向。 这个方法跟 call() 非常相似，但是有一点不同大家记住就行了，那就是apply的参数采用数组形式
  - thisArg：再 函数运行时指定的this值
  - argsArray：传递的值，必须包含再 数组 里面
  - 返回值就是函数的返回值，因为apply() 也会调用函数
  ```
  var obj = {
    name:'Hello'
  }
  function fn() {
      console.log('我的this指向：'+this);

  }
  fn.apply();  //经过前面的栗子我们知道不传递参数就相对于调用函数，此时this指向window
  fn.apply(obj);  //这时候我们把obj对象传入 apply方法内 this就指向了 obj对象
  ```

  - call() 的主要作用可以实现继承，那apply呢，它的作用就是可以让我们借助于js内置对象对数组进行运算，因为它的参数就是数组或者伪数组


## bind() 方法
  bind() 方法不会调用函数，但是也可以改变函数内 this 的指向
  - 语法
  fun.bind(thisArg,arg1,arg2,..);
    - thisArg：再fun函数运行时指定的 this
    - arg1,arg2：传递的实参
    - 返回由指定的this值和初始化参数改造的 原函数拷贝

  ``` 
  var obj = {
    name:'Hello'
  }
  function fn(x,y) {
      console.log('我的this指向：'+this);
      console.log(x + y);


  }
  var f = fn.bind(obj,10,20);
  f();
  /* 
    1. 不会调用原函数，但是可以修改原函数的 this指向
    2. 返回的是原函数改变了this之后产生的新函数，所以需要一个变量去接收
    3. 使用情况：如果有的函数不需要我们立即调用，但是又想改变这个函数内部的 this 用bind最合适
  */
  ```