<template>
  <!-- <div class="c-test">Ccccc{{name}}</div> -->

  <!-- 使用project inject 拿到app.vue中的数据源 -->
  <div class="c-test">
    Age: {{app.userInfo.age}}
    <button @click="changeApp"></button>
  </div>

</template>

<script>
export default {
  // inject: ['name']
  inject: ['app'],
  methods: {
    changeApp () {
      
    }
  }
}
</script>

<style>

</style>