# Element ui 的 layout (布局)
  - 行 列
  - <el-row></el-row> 为一行
  - <el-col></el-col> 为列, :span="12" 表示占比24份中的12份

# babel
  js的语法编译器
  class 关键词 -> babel -> es5的代码
  里面有丰富的插件机制
  vue 提供了 transform-vue-jsx 负责将 template 编译为js (babel中可以添加此插件)

  ```js
  // 开发
  <el-row>
    <el-col>
      12
    </el-col>
  </el-row>
  // 使用babel网站编译了之后
  // 浏览器
  h("el-row", [h("el-col", ["12"])]);
  ```

# My-Row.vue 行 组件
  自己写了个<el-row></el-row>
  - h(tag, {}, this.$slots.default)
      (标签,属性,值)
      即 标签名，标签相关属性，标签内部的html内容
  - render()
    render方法的实质就是生成template模板
    ## 当template使用的不够便利时可以使用

# My-Row1.vue
  升级版  不需要<template></template>
  可以自己定义标签tag

# My-Col.vue 列 组件
  - 使用sass 进行循环计算(1-24的占比)
    cnpm install -D sass-loader@7.3.1  node-sass
