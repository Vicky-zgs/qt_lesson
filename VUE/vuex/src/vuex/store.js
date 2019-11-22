import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 1
}

// vuex 中的 mutations 相当于methods
const mutations = {
  add (state, n) {
    state.count += n
  },
  reduce (state) {
    state.count--
  }
}

// 通常在actions中调用mutations中的方法,将方法整理成异步的
const actions = {
  // context参数,代表上下文
  addAction (context, status) {
    context.commit('add', status)
  },
  reduceAction ({commit}) {
    setTimeout(() => {
      commit('reduce')
    }, 3000);
    console.log('我比reduce先执行')
  }
}

// 相当于computed
const getters = {
  getCount: (state) => {
    return state.count + 100
  }
}

// 抛出  成为仓库中的数据
export default new Vuex.Store ({
  state,
  mutations,
  getters,
  actions,
})