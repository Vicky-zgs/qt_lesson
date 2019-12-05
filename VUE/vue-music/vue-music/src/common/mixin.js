import { mapActions, mapGetters } from 'vuex'

export const searchMixin = {
  data () {
    return {
      query: ''
    }
  },
  methods: {
    onQueryChange (query) {
      this.query = query.trim()
    },
    blurInput () {
      this.$refs.searchBox.blur()
    },
    saveSearch (song) {
      // 点搜索历史中的内容时将内容放入input框
      // this.$refs.searchBox.setQuery(song)
      this.saveSearchHistory(this.query)
      this.selectPlaySong(song)
      // 为了看效果
      this.addPlayList(song)
    },
    ...mapActions([
      'addPlayList',
      'selectPlaySong',
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ])
  }
}

export const playerMixin = {
  computed: {
    ...mapGetters([
      'currentSong',
      'playList'
    ])
  },
  methods: {

  }
}