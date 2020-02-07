import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cityName: '定位中..'
  },
  mutations: {
    update (state, config) {
      Object.keys(config).map((item, key) => {
        // 将数据源中所有的key值对应的value值都替换成调用update传进来的第二个参数中的值
        state[item] = config[item]
      })
    }
  }
})

export default store;