<template>
  <div class="search">
    <!-- 搜索页面的头部搜索框 -->
    <div class="head">
      <div>
        <img src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/search2-2fb94833aa.png" alt="">
        <input type="text" confirm-type="search" focus="true" v-model="words" @focus="inputFocus" @input="tipsearch" @confirm="searchWords" placeholder="商品搜索">
        <img @click="clearInput" class="del" src="http://nos.netease.com/mailpub/hxm/yanxuan-wap/p/20150730/style/img/icon-normal/clearIpt-f71b83e3c2.png" alt="">
      </div>
      <div @click="cancel">取消</div>
    </div>
    <!-- 输入内容后出现的dom -->
    <div class="searchtips" v-if="words">
      <div>
        牙刷
      </div>
      <div class="nogoods">数据库暂无此类商品</div>
    </div>
    <!-- 历史记录 -->
    <div class="history">
      <div class="t">
        <div>历史记录</div>
        <div @click="clearHistory"></div>
      </div>
      <div class="cont">
        <div>日式</div>
      </div>
    </div>
    <!-- 热门搜索 -->
    <div class="history hotsearch">
      <div class="t">
        <div>热门搜索</div>
      </div>
      <div class="cont">
        <div class="active">日式</div>
        <div>韩式</div>
        <div>456</div>
        <div>啊啊</div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post } from '../../utils/index'
export default {
  data () {
    return {
      words: '',
      openid: '',
      hotData: [],
      historyData: []
    }
  },
  mounted () {
    // 获取每个人自己的openid
    this.openid = wx.getStorageSync('openid') || '';
    this.getHotData()
  },
  methods: {
    clearInput () {
      this.words = ''
    },
    cancel () {},
    clearHistory () {},
    inputFocus () {},
    tipsearch() {},
    async searchWords (e) {
      // 输入了要搜索的内容,点击自己键盘上的'搜索'后执行的方法  需要接口请求
      // console.log(e)
      let value = e.currentTarget.dataset.value
      this.words = value || this.words
      const data = await post('/search/addhistoryaction', {
        // 这个接口: 在搜索框输入内容后 将内容插入 到数据库中的搜索历史记录表中
        // 传参数
        openId: this.words,
        keyword: value || this.words
      })
      // console.log(data)
      // 将搜索内容存入后要 取出 , 即 获取历史数据
      this.getHotData()
    },
    async getHotData (first) {
      // 此接口 获取历史数据和热门数据
      const data = await get('/search/indexaction?openId=' + this.openid)
      this.historyData = data.historyData
      this.hotData = data.hotData
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
@import './style';
</style>