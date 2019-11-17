// bus.js是为了兄弟之间直接通信 (创建一个公用变量)

import Vue from 'vue'

// 抛出一个vue的实例当做全局变量
export default new Vue()