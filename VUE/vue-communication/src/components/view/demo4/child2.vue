<template>
  <div class="child">
    <h3>兄弟组件2(传递状态给兄弟组件1)</h3>
    <div>
      <button @click="sendMsg">send message</button>
    </div>
  </div>
</template>

<script>
import Bus from '@/assets/bus'

export default {
  data () {
    return {
      title: '我是child2的数据'
    }
  },
  methods: {
    sendMsg () {
      // 发给father
      // this.$emit('test', this.title)

      // 直接兄弟之间通信
      Bus.$emit('test', this.title)
    }
  }
}
</script>

<style>

</style>