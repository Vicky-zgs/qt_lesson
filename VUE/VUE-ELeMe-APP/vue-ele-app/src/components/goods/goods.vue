<template>
  <div>
    <div class="goods">
      <!-- ref 获取dom 结构 -->
      <div class="menu-wrapper" ref="menuWrapper">
        <!-- 菜单 -->
        <ul>
          <li
            v-for="(item, index) in goods"
            :key="index"
            class="menu-item"
            @click="selectMenu(index)"
            :class="{'current' : currentIndex === index}"
          >
            <!--点击菜单的每个菜品时，加个current高亮效果-->
            <span class="text border-1px">
              <span v-if="item.type > 0" class="icon" :class="classMap[item.type]"></span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <!-- 菜品 -->
        <ul>
          <li class="food-list" v-for="(item, index) in goods" :key="index" ref="foodList">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li class="food-item border-1px" v-for="(food, index) in item.foods" :key="index">
                <div class="icon">
                  <img :src="food.icon" alt="" >
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>

                  <div class="cartcontrol-wrapper">
                    <!-- + -  -->
                    <!-- 调用子组件并且父组件的数据给子组件-->
                    <!-- 绑定了cartcontrol中抛出的事件add -->
                    <cartcontrol :food="food" @add="addFood"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- 购物车 -->
    <shopcart
      ref="shopcart"
      :selectFoods = "selectFoods"
      :deliveryPrice = "seller.deliveryPrice"
      :minPrice = "seller.minPrice"
    ></shopcart>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from '@/components/shopCart/shopcart'
import cartcontrol from '@/components/cartcontrol/cartcontrol'
export default {
  name: 'Goods',
  props: {
    // 接收数据
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      // 图标
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      // currentIndex: 0,
      // 计算出的每个li的高度
      listHeight: [],
      // 右边菜品栏移动的y轴高度
      scrollY: 0
    }
  },
  components: {
    shopcart,
    cartcontrol
  },
  created () {
    this.$http.get('http://localhost:8080/static/goods.json').then((res) => {
        console.log(res)
        if (res.data.errno === 0) {
          this.goods = res.data.data
          this.$nextTick(() => {
          // $nextTick方法里的内容一定在页面的html结构渲染后执行
          // 有数据后加滚动效果
          this._initScroll()
          this._calculateHeight()
        })
      }
    })
  },
  computed: {
    // 在computed属性中写的方法相当于在数据源里写数据 会实时执行
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        // height1 是当前菜系
        let height1 = this.listHeight[i]
        // height2 是当前菜系的高度
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          // 到底部了||右边页面滚动了且滚动的高度小于当前菜系的高度
          // 此时左边菜单不动
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      // goods就是菜单数据 res.data.data
      // push 选中的菜品
      for (let good of this.goods) {
        if (good.foods) {
          for (let food of good.foods) {
            // count: cartcontrol.vue中addCart() 添加的属性
            if (food.count) {
              foods.push(food)
            }
          }
        }
      }
      return foods
    }
  },
  methods: {
    _initScroll () {
      // 使用better-scroll 给左侧菜单加一个滑动效果
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      // 给右边的菜品添加滑动效果
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      })
      // 监听右边页面的滑动
      this.foodsScroll.on("scroll", pos => {
        // console.log(pos)  // 打印了x:0,y:-... 移动的距离
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    selectMenu (idx) {
      // 菜单的点击事件
      // console.log(idx)
      // this.currentIndex = idx

      // 点哪个菜单就到哪个菜系
      let foodList = this.$refs.foodList
      let el = foodList[idx]
      // 使菜品滚动到指定的dom结构 300mm
      // console.log(el)
      this.foodsScroll.scrollToElement(el, 300)
    },
    // 右边页面到了哪个菜系 左边菜单就自动滑到哪个菜系
    _calculateHeight () {
      // 计算高度
      let foodList = this.$refs.foodList
      let height = 0
      // 往listHeight中先push 0 ,再push第一个模块的高度,即第二个模块要滚动的高度
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
      // console.log(this.listHeight)
    },
    addFood (target) {
      // console.log(target)
      this._drop(target)
    },
    _drop (target) {
      // 体验优化，异步执行下落动画
      this.$nextTick(() => {
        // 父组件直接调用子组件中的方法
        this.$refs.shopcart.drop(target)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin'

.goods
  display flex
  position absolute
  top 174px
  bottom 46px
  width 100%
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
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
  .foods-wrapper
    flex 1
    // overflow scroll
    .title
      padding-left 14px
      height 26px
      line-height 26px
      border-left 2px solid #d9dde1
      font-size 12px
      color rgb(147, 153, 159)
      background #f3f5f7
    .food-item
      display flex
      margin 18px
      padding-bottom 18px
      border-1px(rgba(7, 17, 27, 0.1))
      &:last-child
        border-none()
        margin-bottom 0
      .icon
        flex 0 0 57px
        margin-right 10px
        img
          width 100%
      .content
        flex 1
        .name
          margin 2px 0 8px 0
          height 14px
          line-height 14px
          font-size 14px
          color rgb(7, 17, 27)
        .desc,.extra
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
        .desc
          line-height 12px
          margin-bottom 8px
        .extra
          .count
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          .now
            margin-right 8px
            font-size 14px
            color rgb(240, 20, 20)
          .old
            text-decoration line-through
            font-size 10px
            color rgb(147, 153, 159)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 12px
</style>
