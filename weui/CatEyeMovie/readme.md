- vertical-align middle     居中
- #toast
    diplay none
  .active
    display block !important //权重最高，本来id权重比class高则active无法覆盖toast
- attr
    $('#movie-watch img').attr('src','./images/heart1.png')
    本行代码 attr可修改img (白心变红心)

- text-overflow ellipsis 内容超出则打省略号
- word-break break-all   自动换行
  white-space nowrap /*若设置了超出范围则打省略号，一定要设置不能换行*/