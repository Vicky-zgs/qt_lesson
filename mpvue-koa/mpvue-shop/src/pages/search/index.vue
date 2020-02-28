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
    <!-- input框中 输入内容后出现的dom -->
    <div class="searchtips" v-if="words">
      <div v-if="tipsData.length !== 0">
        <div v-for="(item, index) in tipsData" :key="index">
          {{item.name}}
        </div>
      </div>
      <div class="nogoods" v-else>数据库暂无此类商品...</div>
    </div>
    <!-- 历史记录 -->
    <div class="history" v-if="historyData.length!==0">
      <div class="t">
        <div>历史记录</div>
        <div @click="clearHistory"></div>
      </div>
      <div class="cont">
        <div v-for="(item, index) in historyData" :key="index" @click="searchWords" :data-value="item.keyword">
          {{item.keyword}}
        </div>
      </div>
    </div>
    <!-- 热门搜索 -->
    <div class="history hotsearch">
      <div class="t">
        <div>热门搜索</div>
      </div>
      <div class="cont">
        <div v-for="(item, index) in hotData" :key="index" :class="{active: item.is_hot === 1}" @click="searchWords" :data-value="item.keyword">
          {{item.keyword}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get, post } from '../../utils/index'
export default {
  data () {
    return {
      words: '',  // input框中输入的内容
      openid: '', // 每个人的身份标识
      hotData: [],    // 热门搜索
      historyData: [], // 搜索历史记录
      tipsData: []  // 搜索匹配的数据
    }
  },
  mounted () {
    // 获取每个人自己的openid
    this.openid = wx.getStorageSync('openId') || '';
    this.getHotData()
  },
  methods: {
    clearInput () {
      this.words = ''
    },
    cancel () {},
    async clearHistory () {
      const data = await post('/search/clearhistoryAction', {
        openId: this.openid
      })
      if (data) {
        // data存在  即删除成功
        this.historyData = []
      }
    },
    inputFocus () {},
    async tipsearch() {
      // @input="tipsearch" 搜索框中的值一发生变化  就实时做接口请求
      const data = await get('/search/helperaction', {
        keyword: this.words
      })
      // console.log(data)
      this.tipsData = data.keywords
    },
    async searchWords (e) {
      // 输入了要搜索的内容,点击自己键盘上的'搜索'后执行的方法  需要接口请求
      // console.log(e)
      let value = e.currentTarget.dataset.value
      this.words = value || this.words
      const data = await post('/search/addhistoryaction', {
        // 这个接口: 在搜索框输入内容后 将内容插入 到数据库中的搜索历史记录表中
        // 传参数
        openId: this.openid,
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
      this.hotData = data.hotKeywordList
      // console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
@import './style';
</style>