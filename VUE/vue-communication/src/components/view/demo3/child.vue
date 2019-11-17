<template>
  <div class="child">
      <h3>子组件</h3>
      <div>子组件要发送的消息：{{msg}}</div>
      <button @click="sendMsg">send message</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            msg:'我是子组件当中的数据'
        }
    },
    methods: {
        sendMsg() {
            //第一个参数是自己定义的方法，第二个是要发送的数据
            this.$emit('message',this.msg)
        }
    }
}
</script>

<style>

</style>