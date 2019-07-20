- 先写html结构
    正确且完整的结构
    良好的类名
- 用section 代替div 完成区块的语义化
- <!-- BEM Element -->
        <div class="billboard_bd">
            <!-- table 不是为了结构， 语义 -->
            <table>
                <tbody>
                    (tr>td{$}+td.title>a{狮子王})*10   
                </tbody>
            </table>
        </div>
- stylus 嵌套
    tab 缩进解决的是效率
    嵌套 css规则按区块来嵌套在一起，函数作用域，css类名补全
    伪类，伪元素 ，&引用上级的选择器
    便于修改和重构
- &:first-child 第一个
  &:last-child 最后一个
  &:nth-child(2n+1) 第奇数个
- 子元素选择器
    