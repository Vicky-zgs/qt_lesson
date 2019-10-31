// 介绍pipe

const fs = require('fs');

// 读取一个文件
fs.readFile('./index.html', (err, data) => { // data 一次性读完了放入内存
  // 写一个文件 (复制index.html文件)
  fs.writeFile('./index-copy.html', data, (err, res) => {
    if (!err ) {
      console.log('writed!!');
    }
  })
})

// stream  使用pipe复制文件
// 读一点 写一点 
fs.createReadStream('./music.js')
.pipe(
  // 复制music.js文件
  fs.WriteStream('./music-copy.js')
)