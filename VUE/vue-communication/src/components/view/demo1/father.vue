<template>
  <div class="container">
    <!-- 传值给子组件 -->
    <child v-bind:send-msg="myMsg"></child>
  </div>

</template>

<script>
import child from './child'
export default {
  data () {
    return {
      myMsg: 'This is father msg!'
    }
  },
  components: {
    child
  }
}
</script>

<style>

</style>