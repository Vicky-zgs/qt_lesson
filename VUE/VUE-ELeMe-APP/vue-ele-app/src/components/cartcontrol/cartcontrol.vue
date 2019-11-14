<template>
<!-- + - 号 -->
  <div class="cartcontrol">
    <!-- 出现 - 的动画 -->
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <!-- 阻止点击事件的冒泡 -->
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart (event) {
      // console.log(event)
      if (!this.food.count) {
        // count数据原本不存在 要加 count: 1
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      // 发散器 往外发散一个add出去 
      // 父组件(goods.vue)接收的多少次add,num(购物车角标数)就+多少
      // $emit抛出的第二个参数 event.target 会作为参数传给抛出的方法
      this.$emit('add', event.target)
    },
    decreaseCart () {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.cartcontrol
  font-size 0
  .cart-decrease
    display inline-block
    padding 6px
    opacity 1
    transform translate3d(0, 0, 0)
    .inner
      display inline-block
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)
      transition all .4s linear
      transform rotate(0)
    &.move-enter-active, &.move-leave-active
      transition all 0.4s linear
    &.move-enter, &.move-leave-to
      opacity 0
      transform translate3d(24px, 0, 0)
      .inner
        transform rotate(180deg)
  .cart-count
    display inline-block
    padding-top 6px
    line-height 24px
    text-align center
    font-size 10px
    color rgb(147, 153, 159)
    vertical-align top
  .cart-add
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color rgb(0, 160, 220)
</style>
