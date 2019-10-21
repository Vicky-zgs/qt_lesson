// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      address: {
          name: '',
          phone: '',
          address: ''
      }
  },
  bindName(e) {
      this.setData({
        //若是data中没有的函数，可以直接添加
          'address.name': e.detail.value
      })
  },
  bindPhone(e) {
      this.setData({
          'address.phone': e.detail.value
      })
  },
  bindDetail(e) {
      this.setData({
          'address.detail': e.detail.value
      })
  },
  formSubmit() { 
      //若填写完全则返回上一级
      if (this.data.address.name && this.data.address.phone && this.data.address.detail) {
          wx.setStorage({
              key: 'address',
              data: this.data.address,
              success: () => {
                  wx.navigateBack();
              },
              fail: () => {},
              complete: () => {}
          })
      } else {
          //信息未填写完整则提示
          wx.showModal({
              title: '提示',
              content: '请完整填写资料',
              showCancel: false,
              confirmText: '确定',
              confirmColor: '#3CC51F',
              success: (result) => {
                  if (result.confirm) {

                  }
              },
              fail: () => {},
              complete: () => {}
          });
      }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})