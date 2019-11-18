var fs = require('fs');

// 图片识别? 从图片中提取文字
var AipOcrClient = require('baidu-aip-sdk').ocr;

// 文件本身就是二进制文本
var image = fs.readFileSync('./car2.jpg').toString('base64');

var APP_ID = "17799054";
var API_KEY = "iwqzyAUj5aGenttnFP6jFs83";
var SECRET_KEY = "oNc1OC45BopY9MEXS3vDoZgbTwOWRpaM";
var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
var options = {};
client.licensePlate(image, options)
  .then(function(result) {
    console.log(result)
  })
  .catch(function(err) {
    console.log(err);
  })