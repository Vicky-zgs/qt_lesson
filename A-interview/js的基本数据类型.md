# 数据类型简介：
ECMAScript中有5钟简单数据类型（也称为基本数据类型）: Undefined、Null、Boolean、Number和String。还有1中复杂的数据类型————Object，Object本质上是由一组无序的名值对组成的。

其中Undefined、Null、Boolean、Number都属于基本类型。Object、Array和Function则属于引用类型，String有些特殊，具体的会在下面展开分析。

## 变量
ECMAScript中用var关键字来定义变量，因为js是弱类型的，所以无法确定变量一定会存储什么值，也就不知道变量到底会是什么类型，而且变量的类型可以随时改变。

这就是ECMAScript是松散类型的来由，所谓松散类型就是可以用来保存任何类型的数据。

ps:
es6中新增了let命令来声明变量、const命令声明一个只读的常量。

let的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。

const一旦声明，常量的值就不能改变。
