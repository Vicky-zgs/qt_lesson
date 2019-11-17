<template>
  <div class="child">
    <h3>兄弟组件1(监听兄弟组件2)</h3>
    <div>
      这是从child2拿来的数据：{{msg}}
    </div>
  </div>
</template>

<script>
import Bus from '@/assets/bus'

export default {
  // 接收父组件传来的数据
  // props: ['title']

  // 直接接收child2传的数据
  data () {
    return {
      msg: ''
    }
  },
  mounted () {
    // 在声明周期中接收child2传来的数据
    Bus.$on('test', (data) => {
      this.msg = data
    })
  }
}
</script>

<style>

</style>