<template>
  <div class="container">
    <!-- 加载的loading动画 -->
    <div class="loading" v-show="loader">
      <div class="loader">
        <div class="face">
          <div class="circle"></div>
        </div>

        <div class="face">
          <div class="circle"></div>
        </div>
      </div>
    </div>
    <!-- 背景图 -->
    <div class="bg"></div>
    <!-- 当前城市天气 -->
    <div class="address">
      <span class="change-city" @click="changeCity">切换城市</span>
      <p style="height: 21px">{{localTime}}</p>
      <div class="city-info">
        <dl>
          <dt class="font18">{{cityData.city}}</dt>
        </dl>
        <dl>
          <dt>{{cityData.weather}}</dt>
        </dl>
        <dl>
          <dt class="font45">{{cityData.temperature}}°c</dt>
        </dl>
        <dl>
          <dt>
            风力：{{cityData.windPower}} |
            风向：{{cityData.windDirection}} |
            空气湿度：{{cityData.humidity}}%
          </dt>
        </dl>
      </div>
    </div>
    <!-- 未来两天的天气 -->
    <div class="future">
      <div class="group" v-if="futureTem && futureTem[1]">
        明日：
        <span class="tm">
          白天：
          {{futureTem[1].dayTemp}}°c
          {{futureTem[1].dayWeather}}
          {{futureTem[1].dayWindDir}}
          {{futureTem[1].dayWindPower}}
        </span>
        <span class="tm">
          夜间：
          {{futureTem[1].nightTemp}}°c
          {{futureTem[1].nightWeather}}
          {{futureTem[1].nightWindDir}}
          {{futureTem[1].nightWindPower}}
        </span>
      </div>
      <div class="group" v-if="futureTem && futureTem[2]">
        后天：
        <span class="tm">
          白天：
          {{futureTem[2].dayTemp}}°c
          {{futureTem[2].dayWeather}}
          {{futureTem[2].dayWindDir}}
          {{futureTem[2].dayWindPower}}
        </span>
        <span class="tm">
          夜间：
          {{futureTem[2].nightTemp}}°c
          {{futureTem[2].nightWeather}}
          {{futureTem[2].nightWindDir}}
          {{futureTem[2].nightWindPower}}
        </span>
      </div>
    </div>
    <!-- 写一个div装地图, 没有实际作用但是需要 -->
    <div class="map-container" ref="mapContainer"></div>
    <!-- 曲线图容器 -->
    <div class="echart-container" ref="echartContainer"></div>
    <!-- 城市选择 级联器 -->
    <div class="select-city-box" v-show="citybox">
      <van-area 
        :area-list="areaList" 
        :columns-num="2" 
        title="选择城市"
        @cancle="cancle"
        @confirm="complete"
      />
    </div>
  </div>
</template>

<script>
// 引入省市信息
import AreaList from './area'
export default {
  data() {
    return {
      loader: true,
      localTime: "",
      cityData: {},
      // 未来天气
      futureTem: [],
      seriesData: [],
      areaList: AreaList,
      citybox: false,
    };
  },
  created() {
    setInterval(() => {
      this.localTime = this.getLocalTime();
    }, 1000);
  },
  mounted() {
    this.initMap();
  },
  methods: {
    getLocalTime() {
      return new Date().toLocaleTimeString();
    },
    initMap() {
      let _self = this;
      var map = new AMap.Map(this.$refs.mapContainer, {
        resizeEnable: true
      });
      AMap.plugin("AMap.CitySearch", function() {
        var citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function(status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            console.log(result);
            _self.getCurrentCityData(result.city);
          }
        });
      });
    },
    getCurrentCityData(cityName) {
      let _self = this;
      //加载天气查询插件
      AMap.plugin("AMap.Weather", function() {
        //创建天气查询实例
        var weather = new AMap.Weather();

        //执行实时天气信息查询
        weather.getLive(cityName, function(err, data) {
          console.log(err, data);
          _self.cityData = data;
        });
        //执行实时天气信息查询
        weather.getForecast(cityName, function(err, data) {
          console.log(err, data);
          _self.futureTem = data.forecasts;
          
          // 将每天的温度存在一个数组中, 让曲线图中的series取用
          _self.futureTem.map((item, index) => {
            _self.seriesData.push(item.dayTemp)
          })

          // 获取到天气情况后 loader图标消失(加载完毕)
          _self.loader = false;
          // 调用曲线初始化的函数
          _self.initEchart();
        });
      });
    },
    // 初始化曲线图
    initEchart() {
      // 拿到echartContainer dom结构
      let dom = this.$refs.echartContainer;

      let myChart = echarts.init(dom);
      let app = {},

        option = null;
      option = {
        xAxis: {
          // 展示x轴
          show: true,
          splitLine: {show: false},
          type: "category",
          data: ["今天", "明天", "后天", "三天后"],
          // x轴线的样式
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          // 轴上的间隔
          axisTick: {
            show: false
          }
        },
        yAxis: {
          // 不展示y轴
          show: false,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {show: true},
          splitLine: {show: false}
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            var relVal = params[0].name
            for (let i = 0, l = params.length; i < l; i++) {
              relVal += params[i].value + '°c'
            }
            return relVal
          }
        },
        legend: {
          data: ['气温']
        },
        series: [
          {
            // 数据源中的数据
            data: this.seriesData,
            type: "line",
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            }
          }
        ]
      };

      myChart.setOption(option, true)
    },
    changeCity() {
      this.citybox = true
    },
    cancle() {
      this.citybox = false
    },
    // val: 回调参数
    complete(val) {
      console.log(val) // 城市名
      // 更新折线图
      this.seriesData = []
      // 点击城市选择中的确认后获取城市的天气
      this.getCurrentCityData(val[1].name)
      this.citybox = false
      
    }
  }
};
</script>


<style>
.loading {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  width: 20em;
  height: 20em;
  font-size: 10px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader .face {
  position: absolute;
  border-radius: 50%;
  border-style: solid;
  /* 动画 3s 匀速 循环 */
  animation: animate 3s linear infinite;
}
.loader .face:nth-child(1) {
  width: 100%;
  height: 100%;
  color: gold;
  /* 下和左边框消失 */
  border-width: 0.2em 0.2em 0em 0em;
  /* 右和下的边框透明 , currentColor即继承了当前的颜色*/
  border-color: currentColor transparent transparent currentColor;
  /* from -45deg开始旋转 */
  --deg: -45deg;
  /* 正常旋转 */
  animation-direction: normal;
}
.loader .face:nth-child(2) {
  width: 70%;
  height: 70%;
  color: lime;
  /* 下和左边框消失 */
  border-width: 0.2em 0em 0em 0.2em;
  border-color: currentColor currentColor transparent transparent;
  /* from -135deg开始旋转 */
  --deg: -135deg;
  /* 相反方向旋转 */
  animation-direction: reverse;
}

.loader .face .circle {
  position: absolute;
  width: 50%;
  height: 0.1em;
  top: 50%;
  left: 50%;
  background-color: transparent;
  transform: rotate(var(--deg));
  transform-origin: left;
}
.loader .face .circle::before {
  position: absolute;
  content: "";
  top: -0.5em;
  right: -0.5em;
  width: 1em;
  height: 1em;
  background-color: currentColor;
  border-radius: 50%;
  box-shadow: 0 0 2em, 0 0 4em, 0 0 6em, 0 0 8em, 0 0 10em,
    0 0 0 0.5em rgba(255, 255, 0, 0.1);
}

@keyframes animate {
  to {
    /* 转一圈 */
    transform: rotate(1turn);
  }
}

.font18 {
  font-size: 18px;
}
.font45 {
  font-size: 45px;
}
.container {
  width: 100vw;
  height: 100vh;
  position: relative;
  padding: 10px;
  overflow: hidden;
  box-sizing: border-box;
}
.container .bg {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  filter: blur(2px);
  z-index: -1;
}
.container .address {
  color: #fff;
}
.container .address .change-city {
  position: absolute;
  right: 10px;
  top: 10px;
  color: #fff;
}
.container .address .city-info {
  text-align: center;
  line-height: 1.4;
}
.container .future {
  margin-top: 30px;
}
.container .future .group {
  height: 44px;
  line-height: 44px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.26);
  color: rgba(16, 16, 16, 1);
  font-size: 16px;
  margin-bottom: 10px;
  padding: 0 10px;
}
.container .future .group .tm {
  margin-left: 10px;
  color: #fff;
  font-size: 12px;
}
.echart-container {
  width: 100%;
  height: 50vh;
}
.select-city-box {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
}
</style>