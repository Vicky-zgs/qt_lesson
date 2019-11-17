<template>
  <div class="container">
      <h2>父组件</h2>
      <p>从子组件传来的消息为：
          <span class="pink">{{msg}}</span>
          <!-- 使用数据 -->
      </p>

      <child @message="getMsg"></child> 
      <!-- 收到子组件传来的方法，并定义一个方法 -->
  </div>
</template>

<script>
import child from './child'
export default {
    components: {
        child
    },
    data() {
        return {
            msg:'' //在数据源中定义
        }
    },
    methods: {
        getMsg(e) {   //e就是子组件传来的数据
            this.msg = e //赋值给数据源
        }
    }
}
</script>

<style>
.pink {
    color: pink
}
</style>