<template>
<!-- 放大图片 -->
  <div class="zoom">
    <!-- 小图片 -->
    <div class="small-box"
    @mouseover="handOver"
    @mousemove="handMove"
    @mouseout="handleOut"
    >
      <img :src="src" alt="" />
      <!-- 蒙层 -->
      <div class="mask"></div>
    </div>
    <!-- 大图片 -->
    <div class="layer">
      <div class="big-box">
        <img :src="bigSrc" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bigSrc: {
      type: String
    },
    src: {
      type: String
    }
  },
  methods: {
    handOver() {},
    handMove(e) {
      let objx = e.clientX;
      let objy = e.clientY;
      // 获得小图片左上角的定位
      let imgClientObj = this.$el.querySelector('.small-box').getBoundingClientRect();
      // 蒙层左上角的坐标即 鼠标的坐标 - 小图片左上角坐标 - 蒙层的一半
      let maskx = objx - imgClientObj.x -210 / 2;
      let masky = objy - imgClientObj.y - 210 / 2;
      // 这个组件的 实例
      maskx = maskx < 0 ? 0 : maskx;
      masky = masky < 0 ? 0 : masky;
      if (maskx + 210 >= 430) {
        maskx = 430 - 210;
      }
      if (masky + 210 >= 430) {
        masky = 430 - 210;
      }
      let maskNode = this.$el.querySelector('.mask');
      maskNode.style.transform = `translate(${maskx}px, ${masky}px)`
      // 蒙层移动时大图片也跟着动 比例:
      let percent = (800 - 430) / (430 - 210);
      // 大图片移动的距离
      let bx = - maskx * percent,by = - masky * percent
      let bigimage = this.$el.querySelector('.big-box')
      bigimage.style.transform = `translate(${bx}px, ${by}px)`
    },
    handleOut() {}
  }
}
</script>

<style scoped>
.zoom {
  position: relative;
  width: 430px;
  height: 430px;
}
.small-box {
  position: relative;
  display: inline-block;
}
.mask {
  position: absolute;
  left: 0;
  top: 0;
  background-color: #666;
  width: 210px;
  height: 210px;
  opacity: .6;
}
.layer {
  position: absolute;
  border: 1px solid #000;
  width: 390px;
  height: 390px;
  overflow: hidden;
}
</style>