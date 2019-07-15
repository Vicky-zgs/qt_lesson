css 烦 浪费时间？
{
    key:value;
}
css 编译 stylus

- stylus 是css 预编译
    用 stylus 语法来写css 快多了，其他一些高级功能
    写的是.styl 文件， 浏览器要的是css

- stylus common.styl -o common.css  在终端打开并输入本语句 则可以使.styl文件转化生成.css文件
    stylus -w common.styl -o common.css

- 界面第一步是写结构， 最重要的
    1. 脱离分析标签表面的低级趣味 从内到外
    2. 盒子 从外到内
    main.container>ul.tag-list>li.item>div.tag>.info-box+.action-box
    3. 写结构 不要去管css
    4. 语义化, 用合适的标签