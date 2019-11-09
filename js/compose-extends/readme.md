## 组合-继承

- ES5 的继承(寄生组合式继承)步骤：
  1. 浅复制
    BIN.prototype = Object.create(Btn.prototype);
  2. 继承属性
    Btn.call(this, color); // super()
  3. 修正 constructor
    BIN.prototype.constructor = BIN;