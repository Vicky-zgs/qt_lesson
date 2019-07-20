- 伪元素
    不用标签，在css中使用:before :after 来声明，可以像真正的标签一样用。
    在做分割线， > 箭头，不用标签很方便
    - :before
        元素内容开始之前，本例中是class=baymax 的div 中的内容之前
    - :after
        元素内容结束之后，本例中是class=baymax 的div 中的内容之后
    都需要设置content属性

- css3 带来炫酷
    radial(环形) / linear(线性) -gradient(渐变) (渐变的开始位置 circle at center, color stops...#fff 50%,)

- 相对单位
    em 相对单位 自身的字体大小 (如果原本没有设置字体大小，那么默认16px?)

- 伪元素 天生是行内元素，不可以设置width*height
    可以改变 display: block;  position:absolute