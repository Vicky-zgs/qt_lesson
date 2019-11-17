<template>
  <div class="wrapper">
    <!-- 轮播 -->
    <swiper :options="swiperOption">
      <swiper-slide v-for="item of list" :key="item.id">
        <img class="swiper-img" :src="item.imgUrl" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  },
  data() {
    return {
      swiperOption: {
        pagination: {
            el: '.swiper-pagination'
          },
          loop: true,
          // 轮播图三秒播放一次
          autoplay: 3000,
          autoplayDisableOnInteraction: false
        }
    }
  }
}
</script>

<style lang="scss" scoped>
// .wrapper /deep/ .swiper-pagination-bullet-active {
//   background: #fff;
// }
.wrapper /deep/ .swiper-pagination-bullet-active {
  background: #fff;
}
.swiper-pagination-bullet-active {
  background: #fff;
}
.wrapper {
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 31.25%;
  background: #eee;
  .swiper-img{
    width: 100%;
  }
}
</style>