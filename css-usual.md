-   display: flex;   弹性居中：
    justify-content: center;   水平居中
    align-items: center;   垂直居中
-   居中 其他空白填充
    text-align center
    display flex
    align-items center
    justify-content space-between
-   居中，网格布局 
    display: grid;
    place-items: center;
-   居中,
    position: absolute;
    left: 50%;
    top: 50%;
    transform:translate(-50%, -50%);
-   transform: scale(0.75);  缩放0.75倍
-   white-space: nowrap;  不换行
-   transform-origin: 100% 0;
-   vertical-align: middle;    中线对齐
-   text-overflow: ellipsis //超出打点
    -webkit-line-clamp: 3        限制行数为3
    -webkit-box-orient: vertical    
    word-break: break-all        自动换行
-   overflow: hidden;   超出隐藏
    white-space: nowrap;  不换行
    text-overflow: ellipsis;   超出打点
-   outline: none;     取消按钮点击时的蓝框
-   font-size: 0;  写在需要弄掉间隙的节点的父容器里
-   清除被(浮动)影响的布局
    .clearfix::after {
      content: '';
      clear: left;
      display: table;
    }
-   将默认样式都弄掉
      border: none;
      outline: none;
      -webkit-appearance: none;
- 加动画
      animation: animate 3s linear infinite; 3s 匀速 循环
- letter-spacing: .1em;
      每个字母间设置间隙