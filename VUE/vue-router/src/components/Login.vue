<template>
  <div class="login">
    <h2>登录页面</h2>
    <div class="login-wrap">
      <p>
        <span>账号</span>
        <input type="text">
      </p>
      <p>
        <span>密码</span>
        <input type="text">
      </p>
      <div class="btn">{{btn}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      btn: '登录'
    }
  }
}
</script>

<style scoped>
  .login {
    width: 100%;
  }
  h2 {
    font-size: 20px;
  }
  .login-wrap {
    width: 200px;
    height: 200px;
    background: #eee;
    border: 1px solid #aaa;
    border-radius: 5px;
    margin: 0 auto;
  }
</style>