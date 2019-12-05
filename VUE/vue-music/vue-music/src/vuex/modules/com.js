// 搜索相关
import * as types from '../types'

const state = {
  showSidebar: false,
  searchHistory: ['123', 'dada']
}

const mutations = {
  [types.COM_SHOW_SIDE_BAR] (state, status) {
    state.showSidebar = status
  },
  [types.COM_SAVE_SEARCH_HISTORY] (state, status) {
    state.searchHistory = status
  },
  [types.COM_DELETE_SEARCH_HISTORY] (state, index) {
    state.searchHistory.splice(index, 1)
  },
  [types.COM_CLEAR_SEARCH_HISTORY] (state) {
    state.searchHistory = []
  }
}

const actions = {
  setShowSidebar ({commit}, status) {
    commit(types.COM_SHOW_SIDE_BAR, status)
  },
  saveSearchHistory ({commit,state}, query) {
    let searchHistory = [query, ...state.searchHistory.slice()]
    searchHistory = [...new Set(searchHistory)]
    commit(types.COM_SAVE_SEARCH_HISTORY, searchHistory)
  },
  deleteSearchHistory ({commit}, index) {
    console.log(index)
    commit(types.COM_DELETE_SEARCH_HISTORY, index)
  },
  clearSearchHistory ({commit}) {
    commit(types.COM_CLEAR_SEARCH_HISTORY)
  }
}

const getters = {
  showSidebar: state => state.showSidebar,
  searchHistory: state => state.searchHistory
}

export default {
  state,
  getters,
  mutations,
  actions
}