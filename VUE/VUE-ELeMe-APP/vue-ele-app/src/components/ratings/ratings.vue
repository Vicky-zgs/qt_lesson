<template>
  <div class="wrapping" ref="wrapping">
      <div class="ratings-wrapper" ref="ratingsWrapper">
        <!-- star评分 -->
        <div class="score-wrapper">
          <div class="score-left">
            <span class="score">{{seller.score}}</span>
            <p>综合评分</p>
            <span class="compare">高于周边商家{{seller.rankRate}}%</span>
          </div>
          <div class="score-right">
            <div class="score-content">
              <p>服务态度</p>
              <div class="star">
                <img src="./star-on.png" alt />
                <img src="./star-on.png" alt />
                <img src="./star-on.png" alt />
                <img src="./star-on.png" alt />
                <img src="./star-on.png" alt />
              </div>
              <span>{{seller.serviceScore}}</span>
            </div>
            <div class="score-content">
              <p>商品评分</p>
              <div class="star">
                <img src="./star-on.png" alt />
                <img src="./star-on.png" alt />
                <img src="./star-on.png" alt />
                <img src="./star-on.png" alt />
                <img src="./star-on.png" alt />
              </div>
              <span>{{seller.foodScore}}</span>
            </div>
            <div class="deliveryTime">
              <p>送达时间</p>
              <span>{{seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <div class="split"></div>
        <!-- 评论 -->
        <div class="rating-wrapper">
          <div class="rating-type">
            <span class="block positive active">
              全部
              <span class="count">{{seller.ratingCount}}</span>
            </span>
            <span class="block positive">
              满意
              <span class="count">20</span>
            </span>
            <span class="block negative active">
              不满意
              <span class="count">10</span>
            </span>
          </div>
          <div class="switch">
            <span class="icon-check_circle on"></span>
            <span class="text">只看有内容的评价</span>
          </div>
          <div class="rating-content">
            <ul>
              <li
                class="rating-item"
                v-for="(item, index) in ratings"
                :key="index"
                ref="ratingItem"
              >
                <div class="avatar">
                  <img
                    width="28"
                    height="28"
                    src="http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
                  />
                </div>
                <div class="content">
                  <!-- 评论的右边详细信息 -->
                  <div class="name">{{item.username}}</div>
                  <div class="star-rating">
                    <img src="./star-on.png" alt />
                    <img src="./star-on.png" alt />
                    <img src="./star-on.png" alt />
                    <img src="./star-on.png" alt />
                    <img src="./star-on.png" alt />
                  </div>
                  <span class="rating-deliveryTime">{{item.deliveryTime}}</span>
                  <p class="text">{{item.text}}</p>
                  <div class="recommend">
                    <span class="icon-thumb_up" v-show="item.recommend != ''"></span>
                    <span
                      class="item"
                      v-for="(recommend, index) in item.recommend"
                      :key="index"
                    >{{recommend}}</span>
                  </div>
                  <div class="time">{{item.rateTime}}</div>
                </div>
              </li>
            </ul>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  name: "Ratings",
  props: {
    // 接收数据
    seller: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [1, 2, 3, 4, 5, 6]
    }
  },
  created() {
    // 获取数据
    this.$http.get("http://localhost:8080/static/ratings.json").then(res => {
      console.log(res)
      if (res.data.errno === 0) {
        this.ratings = res.data.data
        this.$nextTick(() => {
          // $nextTick方法里的内容一定在页面的html结构渲染后执行
          // 有数据后加滚动效果
          this._initScroll()
        })
      }
    })
  },
  methods: {
    _initScroll() {
      // 使用better-scroll 给评论加一个滑动效果
      this.ratingScroll = new BScroll(this.$refs.wrapping, {
        click: true,
      })
    },
    starCount(e) {
      let num = Math.floor(e) //Math.floor 向下取整
      let white = Math.floor(5 - e) //不亮的星星个数
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin'

.wrapping
  position absolute
  top 174px
  bottom 0
  left 0
  width 100%
  overflow hidden
  .ratings-wrapper
    width 100%
    .score-wrapper
      display flex
      height 120px
      border-1px(rgba(7, 17, 27, 0.1))
      text-align center
      align-items center
      font-weight 500
      p
        font-size 14px
        margin 4px 0
        line-height 15px
        color #07111b
      .score-left
        flex 0 0 140px
        position relative
        // 左右分区的 |
        &::after
          display block
          position absolute
          transform rotate(90deg)
          top 10px
          bottom 10px
          width 90px
          left 70px
          content ''
          border-top 1px solid rgba(7, 17, 27, 0.1)
        .score
          font-size 24px
          margin-bottom 10px
          line-height 28px
          color #ff9900
        .compare
          font-size 12px
          color #93999f
      .score-right
        flex 1
        position relative
        .score-content, .deliveryTime
          font-size 14px
          width 100%
          padding 1px 5px
          line-height 18px
          position relative
          p
            width 70px
            display inline-block
            left 25px
            vertical-align middle
          .star
            display inline-block
            vertical-align middle
            img
              height 15px
              width 15px
              margin-right 2px
        .deliveryTime
          left -40px
          span
            color #93999f
    .split
      width 100%
      height 16px
      border-top 1px solid rgba(7, 17, 27, 0.1)
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      background #f3f5f7
    .rating-wrapper
      width 100%
      .rating-type
        padding 18px 0
        margin 0 18px
        position relative
        border-1px(rgba(7, 17, 27, 0.1))
        font-size 0
        .block
          display inline-block
          padding 8px 12px
          margin-right 8px
          line-height 16px
          border-radius 1px
          font-size 12px
          color #4d555d
          font-weight 500
          &.positive
            background rgba(0, 160, 220, 0.2)
            &.active
              background #00a0dc
              color white
          &.negative
            background rgba(77, 85, 93, 0.2)
            &.active
              background #4d555d
              color white
      .switch
        padding 12px 18px
        line-height 24px
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        color #93999f
        font-size 0
        .icon-check_circle
          display inline-block
          vertical-align top
          margin-right 4px
          font-size 24px
          &.on
            color #00c850
        .text
          display inline-block
          vertical-align top
          font-size 12px
      .rating-content
        padding 0 18px
        .rating-itemafter
          // 用伪类写浅灰色的分割线
          content ''
          display block
          position absolute
          left 0
          bottom 0
          width 100%
          border-top 1px solid rgba(7, 17, 27, 0.1)
        .rating-item
          display flex
          padding 18px 0
          position relative
          .avatar
            flex 0 0 28px
            width 28px
            margin-right 12px
            img
              border-radius 50%
          .content
            flex 1
            font-weight 400
            .name
              margin-bottom 4px
              line-height 12px
              color #07111b
              font-size 10px
            .star-rating
              display inline-block
              margin-right 6px
              vertical-align top
              img
                width 10px
                height 10px
                margin-right 3px
                background-size 10px 10px
            .rating-deliveryTime
              color #93999f
              font-size 12px
            .text
              font-size 12px
              margin-bottom 8px
              line-height 18px
              color #07111b
            .recommend
              line-height 16px
              .icon-thumb_up
                color #00a0dc
              .item
                display inline-block
                margin 0 8px 4px 0
                font-size 9px
                padding 0 6px
                border 1px solid rgba(7, 17, 27, 0.1)
                border-radius 1px
                color #93999f
                background #ffffff
            .time
              position absolute
              top 10px
              right 0
              line-height 12px
              font-size 10px
              color #93999f
</style>
