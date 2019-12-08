<template>
  <div class="b-test">
    B{{name}}
    <div>
      <testc></testc>
    </div>
  </div>
</template>

<script>
import C from './C'
export default {
  inject: ['name'],
  components: {
    'testc': C
  },
  mounted () {
    console.log(this.name)
  }
}
</script>

<style>

</style>