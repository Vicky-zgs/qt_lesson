// es6新特性
const distributeCandies = function (candies) {
  var count = 0; // 总类数 unique
  let obj = {};
  // 糖果总类数
  candies.forEach(function(item) {
    // 如果没有出现过
    if (!obj[item]) {
      obj[item] = 1; // 标记为出现过了
      count++; // 总类数+1
    }
  });

  return count >= ( candies.length/2 ) ? (candies.length >> 1) :count;
}

console.log(distributeCandies([1,1,2,2,3,3]));