// 咖啡机
// OO 面向对象 属性和方法
var Coffee = function() { //首字母大写的函数就是一个类

}
Coffee.prototype.boilWater = function() { //用prototype添加方法
    console.log('把水烧开');
}
Coffee.prototype.brewCoffeeGriends = function() {
    console.log('用水泡咖啡');
}
Coffee.prototype.pourInCup = function() {
    console.log('把咖啡倒进杯子里');
}
Coffee.prototype.addSugarAndMilk = function() {
    console.log('加糖和牛奶');
}
Coffee.prototype.cook = function() {
    this.boilWater();
    this.brewCoffeeGriends();
    this.pourInCup();
    this.addSugarAndMilk();
}

var coffee = new Coffee();
coffee.cook();