# 渲染
- js
- console.log(1);
  setTimeout(() => {
    console.log(2)
  }, 0);
  console.log(3);
  打印结果：
  1
  3
  2
  因为 console.log 是同步的，直接执行了，而setTimeout是异步的
- document.body.style.backgroundColor = 'red';
  setTimeout(() => {
  document.body.style.backgroundColor = 'blue';
  }, 0);
  先看到 red 再看到 blue
  说明： 在setTimeout 之前 会发生一次 样式计算 浏览器并渲染它