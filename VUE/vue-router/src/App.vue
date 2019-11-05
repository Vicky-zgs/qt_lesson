<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-link to="/">首页</router-link>
    <router-link to="/mine">我的</router-link>
    <router-link to="/detail">详情</router-link>
    <br/>
    <router-link to="/mine/mine2">我的页面的子页面</router-link>
    <router-view/>  <!-- 这是一个路由路口，要在App.vue中显示其他页面 要有这个 -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
