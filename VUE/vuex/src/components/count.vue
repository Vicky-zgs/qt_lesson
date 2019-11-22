<template>
  <div class="count">
    <!-- $store是store.js中vuex自己的store -->
    {{count}}
    <!-- 调用仓库中的add方法 -->
    <!-- <button @click="add(5)">+</button> -->
    <button @click="addAction(10)">+</button>
    <!-- <button @click="reduce">-</button> -->
    <button @click="reduceAction">-</button>

    {{getCount}}
  </div>
</template>

<script>
// vuex自带的方法mapState解构state,mapMutations解构方法,
//      mapGetters相当于computed,mapActions
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      // myCount: null
    }
  },
  // mounted () {
  //   this.myCount = this.$store.state.count
  // },

  // 取vuex中数据源的各种写法, ...mapState在取多组数据时最常用
  // computed: {
  //   myCount () {
  //     return this.$store.state.count
  //   }
  // },

  // computed: mapState({
  //   myCount: state => state.count
 // or :
    // myCount (state) {
    //   return state.count
    // }
  // }),   or:

  // computed: mapState(['count']),
  // or :
  computed: {
    ...mapState([
      'count'
    ]),
    ...mapGetters([
      'getCount'
    ])
  },

  methods: {
    ...mapMutations([
      'add',
      'reduce'
    ]),
    ...mapActions([
      'addAction',
      'reduceAction'
    ])
    // test () {
    //   this.myCount++
    // }
  }
}
</script>

<style>

</style>