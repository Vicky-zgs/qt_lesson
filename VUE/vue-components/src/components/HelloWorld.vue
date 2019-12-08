<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <i-button size="large" @on-click="btn1">
      <i slot="icon">*</i>
      按钮
    </i-button>
    <i-button size="small" @on-click="btn2">提交</i-button>
    <!-- 父组件调用子组件的方法 -->
    <!-- <div @click="oSure">
      <i-button size="default" ref="sure">确认</i-button>
    </div> -->    
    <!-- 或者如下 -->
    <i-button size="default" ref="sure" @click.native="oSure" @sendMsg="getMsg">确认</i-button>
    <div>{{msg1}}</div>
  </div>
</template>

<script>
import button from './button'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      msg1: ''
    }
  },
  components: {
    'i-button': button
  },
  methods: {
    btn1 () {
      console.log('hello')
    },
    btn2 () {
      console.log('你好')
    },
    oSure () {
      // 拿到ref了的sure dom结构,并且调用方法
      // 在此方法中调用子组件中的sureClick()
      this.$refs.sure.sureClick()
    },
    getMsg (e) {
      this.msg1 = e
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  font-weight: normal;
}
</style>
