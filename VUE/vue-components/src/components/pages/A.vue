<template>
  <div class="a-test">
    A
    <testb></testb>
  </div>
</template>

<script>
import B from './B'
export default {
  provide: {
    name: '蜗牛',
  },
  components: {
    'testb': B
  },
  data () {
    return {
      // name: '蜗牛'
    }
  }
}
</script>

<style>

</style>