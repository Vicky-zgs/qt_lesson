Page({
  data: {
    markers: [],
    longitude: 116.329495,  //经度
    latitude: 39.98148,  //纬度
    scale: 18
  },

  // 生命周期函数
  onLoad () {
    // 微信赋予小程序可以调用的API
    wx.showLoading({ //将地图从北京更改到本地时出现的loding图标
      title: '获取坐标中'
    });
    // 手机的GPS
    wx.getLocation({
      type: 'gcj02', //看文档
      success: (res) => {
        // console.log(res);
        let { longitude, latitude} = res;
        this.tocreateMarkers(longitude, latitude)  //通过经纬度显示markers
        // console.log(longitude, latitude);
        this.setData({
          longitude,
          latitude
        }, () => {
          wx.hideLoading(); //去掉loding图标
        })
      }
    });
  },
  onReady() {
    // 地图上下文环境
    this.mapCtx = wx.createMapContext('myMap');
  },
  toVisit (e) { //点击小单车时的事件
    console.log(e);
  },
  toScan () {
    return wx.scanCode({  //弹出扫码页面
      success: (res) => {
        // console.log(res);
        //调试
        wx.showModal({
          title: 'scan',
          content: JSON.stringify(res)
        })
      }
    })
  },
  toUser () {},
  toMsg () {},
  toReset() {
    // 当使用地图来来去去时， 再回到当初的起点
    console.log('----')
    this.mapCtx.moveToLocation();
    this.setData({
      scale:18
    })
  },
  tocreateMarkers (longitude, latitude) {
    let markers = [
      {
        "id": 1,
        "iconPath": "../../images/map-bicycle.png",
        "latitude": latitude,
        "longitude": longitude,
        "width" : 52.5,
        "height": 30,
        "callout": {}
      }
    ]
    this.setData({
      markers
    });
  }
})