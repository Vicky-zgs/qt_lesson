<template>
  <div>
    <div class="goods">
      <!-- ref 获取dom 结构 -->
      <div class="menu-wrapper" ref="menuWrapper">
        <!-- 菜单 -->
        <ul>
          <li v-for="(item, index) in goods"
          :key="index"
          class="menu-item"
          @click="selectMenu(index)"
          :class="{'current' : currentIndex === index}"
          >
            <span class="text border-1px">
              <span v-if="item.type > 0" class="icon" :class="classMap[item.type]"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <!-- 菜品 -->

      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Goods',
  data () {
    return {
      goods: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      currentIndex: 0
    }
  },
  created () {
    this.$http.get('http://localhost:8080/static/goods.json')
      .then((res) => {
        console.log(res)
        if (res.data.errno === 0) {
          this.goods = res.data.data
          this.$nextTick(() => {
            // $nextTick方法里的内容一定在页面的html结构渲染后执行
            // 有数据后加滚动效果
            this._initScroll()
          })
        }
      })
  },
  methods: {
    _initScroll () {
      // 使用better-scroll 给菜单加一个滑动效果
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
    },
    selectMenu (idx) {
      console.log(idx)
      this.currentIndex = idx
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin'
  .goods
    display flex
    position absolute
    top 175px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px // 只占80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        width 56px
        height 54px
        padding 0 12px
        line-height 14px
        &.current
          position relative
          z-index 10
          margin-top -1px
          background #fff
          font-weight 700
          .text
            border-none()
        .icon
          display inline-block
          vertical-align top
          width 12px
          height 12px
          margin-right 2px
          background-size 12px 12px
          background-repeat no-repeat
          // 给有不同类名的icon添加背景图
          &.decrease
            bg-image('decrease_3')
            // background-image url(./decrease_3@2x.png)
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size 12px
</style>
