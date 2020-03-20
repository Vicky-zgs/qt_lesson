// 独立对象, 创建2个 一个是xiaowang 一个是xiaoli
// 让xiaoli 跟 xiaowang 通过门铃进行通信
// 先看xiaowang家有没有门, 如果有门, 直接敲门didi, 如果没有门, 先建门
// 两个单例开始通信

var xiaowang = (function(argument) {
  var xiaowangHome = function(message) {
    this.menling = message   // 门铃
  }
  var door; // 门
  var info = {
    sendMessage: function(message) {
      if (!door) {
        door = new xiaowangHome(message)
      }
      return door
    }
  }
  return info
})()

var xiaoli = {
  callXiaowang: function() {
    var _xw = xiaowang.sendMessage()
    alert(_xw)
  }
}
