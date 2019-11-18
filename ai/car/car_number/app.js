// 使用node,baidu-aip-sdk, 看图识车

var AipImageClassifyClient = 
    require('baidu-aip-sdk').imageClassify; // 图片分类
var fs = require('fs'); // 文件模块
var APP_ID = "17798931";
var API_KEY = "yFGyM1IpaYv9YlvXjanTtHCt";
var SECRET_KEY = "DGW9hI9phfeI5zZxin2G7DtKNoBI6Q15";
// 内存  ->  I/O
var image = fs.readFileSync('./car.jpg').toString("base64"); // 同步

var client = new AipImageClassifyClient(APP_ID,API_KEY, SECRET_KEY);

client.carDetect(image)
  .then(function(result) {
    console.log(result);
  })
  .catch(function(err) {
    console.log(err);
  })
console.log(image);
