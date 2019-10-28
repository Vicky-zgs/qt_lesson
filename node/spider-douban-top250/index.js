// 使用Node爬取豆瓣网的数据，top50页面

const https = require('https');
const http = require('http');
const cheerio = require('cheerio');

//使用回调改进爬虫
// doubanSpider('https://movie.douban.com/top250?start=25', (data) => {
//   // 得到结果
//   console.log(data);
// })

function doubanSpider(url, cb) {
  https.get(url,   //发出请求
  (res) => {
    let html = '';
    //流的形式
    res.on('data',(chunk) => { //每次都返回一小段数据
      html += chunk;  //拼接
    })
    res.on('end', () => {
      console.log(html);
      // jquery
      const $ = cheerio.load(html);  //用cheerio装好html

      let movies = [];
      $('li .item').each(function() { //循环li中的每一项item,item即top中每个电影li下的类名
        //拿到每一个电影
        const picUrl = $('.pic img', this).attr('src'); //拿到限制为循环时this下的pic
        const title = $('.info .title', this).text();
        const star = $('.star .rating_num', this).text();
        const inq = $('.inq', this).text();

        // console.log({
        //   picUrl,
        //   title,
        //   star,
        //   inq

        // cb({
        //   picUrl,
        //   title,
        //   star,
        //   inq
        // })

        // 将数据push 进 movies数组
        movies.push({
          picUrl,
          title,
          star,
          inq
        })
      })
      cb(movies)
    })
  })
}


// // 不使用外层回调的基本爬虫方式
// https.get('https://movie.douban.com/top250?start=25',   //发出请求
// (res) => {
//   let html = '';
//   //流的形式
//   res.on('data',(chunk) => { //每次都返回一小段数据
//     html += chunk;  //拼接
//   })
//   res.on('end', () => {
//     console.log(html);
//     // jquery
//     const $ = cheerio.load(html);  //用cheerio装好html
//     $('li .item').each(function() { //循环li中的每一项item,item即top中每个电影li下的类名
//       //拿到每一个电影
//       const picUrl = $('.pic img', this).attr('src'); //拿到限制为循环时this下的pic
//       const title = $('.info .title', this).text();
//       const star = $('.star .rating_num', this).text();
//       const inq = $('.inq', this).text();

//       console.log({
//         picUrl,
//         title,
//         star,
//         inq
//       })
//     })
//   })
// }) 

http.createServer((req, res) => {
  doubanSpider('https://movie.douban.com/top250?start=25', 
  (data) => {
    // text/plain  纯文本
    // text/html   html ...
    // 这些都是 mime 类型
    console.log('data', data);
    res.writeHead(200, {
      'Content-type': 'application/json',  //响应给客户端的是个json
      'Access-Control-Allow-origin': '*'
    })

    // JSON.stringify可以将对象变成字符串
    res.end(JSON.stringify(data))
  })
}).listen(3000, () => {
  console.log('server is running 3000');
})