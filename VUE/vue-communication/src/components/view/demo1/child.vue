<template>
  <div class="child">
    <h2>子组件</h2>
    <p>The msg from father is: </p>
    <strong>{{sendMsg}}</strong>

    <p class="hr"></p>

    <!-- 用computed属性 可以响应式的传值-->
    <p>The msg from father is:</p>
    <strong>{{changeMsg}}</strong>
  </div>
</template>

<script>
export default {
  // 接收父组件传的值, send-msg变为sendMsg
  props: ['sendMsg'],
  // 可以将可能发生变化的值放入computed属性中
  computed: {
    changeMsg () {
      return this.sendMsg.toUpperCase()
    }
  }
}
</script>

<style>

</style>