# vue的父子组件通信
  - 先在index.js配置路由
  - 在App.vue   router-link

# demo1 父子组件通信1
  ## 在父组件中引入子组件
  - father中import child from './child'
  - 组件声明 components: {child}
  - 在template中 <child></child>
  ## 传数据
  - father中:
    - data(){}中写数据myMsg: 'This is father msg!'
    - 传值给子组件 <child v-bind:send-msg="myMsg"></child>
  - child中:
    - 接收父组件传的值: props: ['sendMsg']    驼峰式命名

# demo2 父子组件通信2
  ## 传数据
  - 传的方法与demo1差不多
  - 绑定多个属性(传多个值)
    <child :sendMsg="myMsg" :sendNum="myNum" :sendObj="myObj"></child>
  - 接收时可以这样写: props:{sendMsg:{type:String,required:true},... }
  - 传数组时, 在child.vue中
    - 在child.vue中
      - <li v-for="item in sendObj" :key="item.id">{{item.name}}</li>
      - 在props中的写法要声明验证类型
        Object.prototype.toString.call()  方法可以确认类型

# demo3 子父组件通信
  ## 传数据
  - child.vue中传数据
    - 在child.vue中的template中绑定事件:click="sendMsg"
    - 在methods中写一个sendMsg方法 this.$emit('message',this.msg)  第一个参数是自己定义的方法，第二个是发散的数据
    - msg是在data 里写的数据
  - father.vue中接收数据
    - 在template中接收数据 <child @message="getMsg"></child>  message是接收child的方法,在此再命名为getMsg方法
    - 在data中定义接收的数据   msg:''
    - 在methods中写getMsg方法  getMsg(e) {this.msg = e}  e就是child中$emit传来的数据(this.msg),将e赋值给数据源中的msg

# demo4 兄弟组件通信 ()
  ## 传数据 (兄弟传值方法1, child2传给father,father再传给child1)
  -  具体方法见上, 差不多
  ## 传数据 (兄弟传值方法2, 直接child2传给child1)