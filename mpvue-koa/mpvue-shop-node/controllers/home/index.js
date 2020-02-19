// 首页的数据

const { mysql } = require('../../mysql')

module.exports = async (ctx) => {
  // 轮播图数据
  const banner = await mysql('nideshop_ad').where({
    ad_position_id: 1
  }).select()

  // tab类型数据
  const channel = await mysql('nideshop_channel').select()

  // 品牌列表数据  只获取is_new为1的数据
  const brandList = await mysql('nideshop_brand').where({
    is_new: 1
  }).orderBy('new_sort_order', 'asc').limit(4).select()

  // 新品首发的数据 只获取id为四个之一并且为新品的数据
  const newGoods = await mysql('nideshop_goods').whereIn('id',[1181000, 1135002, 1134030, 1134032]).andWhere('is_new', 1).select()

  // 人气推荐
  const hotGoods = await mysql('nideshop_goods').column('id', 'name', 'list_pic_url', 'retail_price', 'goods_brief').where({
    is_hot: 1
  }).limit(5).select()

  // 专题精选 展示id最大的三个
  const topicList = await mysql('nideshop_topic').limit(3).select()

  // 好物类别列表
  const categoryList = await mysql('nideshop_category').where({
    parent_id: 0
  }).select()

  // 不同好物类别中的好物
  const newCategoryList = []
  for (let i = 0; i < categoryList.length; i++) {
    let item = categoryList[i]
    // 拿到parent_id=自己的id时的id的数组
    let childCategoryIds = await mysql('nideshop_category').where({
      parent_id: item.id
    }).column('id').select()
    // 变成数组的形式 [102000, 1035002]
    childCategoryIds = childCategoryIds.map((item) => {
      return item.id
    })
    // 在商品中找到在childCategroyIdschild里的7条数据(parent_id=自己id的数据)
    const categoryGoods = await mysql('nideshop_goods').column('id', 'name', 'list_pic_url', 'retail_price').whereIn('category_id',childCategoryIds).limit(7).select()
    newCategoryList.push({
      'id': item.id,
      'name': item.name,
      'goodsList': categoryGoods
    })
  }

  ctx.body = {
    'banner': banner,
    'channel': channel,
    'brandList': brandList,
    'newGoods': newGoods,
    'hotGoods': hotGoods,
    'topicList': topicList,
    'newCategoryList': newCategoryList
  }
}