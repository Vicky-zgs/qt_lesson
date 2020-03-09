const { mysql } = require('../../mysql')

// 获取搜索历史和热门搜索
async function indexAction(ctx) {
  const openId = ctx.query.openId
  // 默认关键字
  const defaultKeyword = await mysql('nideshop_keywords').where({
    is_default: 1
  }).limit(1).select()
  // 取出 热门关键字
  const hotKeywordList = await mysql('nideshop_keywords').distinct('keyword').column('keyword', 'is_hot').limit(10).select()

  const historyData = await mysql('nideshop_search_history').where({
    'user_id': openId
  }).limit(10).select()
  ctx.body = {
    // 显示到页面上的数据
    'defaultKeyword': defaultKeyword[0],
    'hotKeywordList': hotKeywordList,
    'historyData': historyData
  }
}

// 搜索时匹配搜索相关内容
async function helperAction(ctx) {
  const keyword = ctx.query.keyword
  // console.log(keyword)
  var order = ctx.query.order
  if (!order) {
    order = ''
    orderBy = 'id'
  } else {
    orderBy = 'retail_price'
  }
  // keywords是 十条包含keyword的搜索匹配数据
  const keywords = await mysql('nideshop_goods').orderBy(orderBy, order)
  .column('id', 'name', 'list_pic_url', 'retail_price')
  .where('name', 'like', '%' + keyword + '%').limit(10).select()
  if (keywords) {
    ctx.body = {
      keywords
    }
  } else {
    ctx.body = {
      keywords: []
    }
  }
}

// 添加搜索历史
async function addHistoryAction(ctx) {
  const {openId, keyword} = ctx.request.body // 需要安装 npm i koa-bodyparser
  const oldData = await mysql('nideshop_search_history').where({
    // 先检索一下 搜索历史的表 是否已经有当前搜索的内容
    'user_id': openId,
    'keyword': keyword
  })
  if (oldData.length == 0) {
    // 当前搜索的内容不在已有的搜索历史记录表中, 将这条搜索内容插入搜索历史的表中
    const data = await mysql('nideshop_search_history').insert({
      'user_id': openId,
      'keyword': keyword,
      'add_time': parseInt(new Date().getTime() / 1000) // 时间
    })
    if (data) {
      // 插入成功
      ctx.body = {
        data: 'success'
      }
    } else {
      ctx.body = {
        data: 'fail'
      }
    }
  } else {
    ctx.body = {
      data: '已经有记录了'
    }
  }
}

// 清除搜索历史记录
async function clearHistoryAction(ctx) {
  const openId = ctx.request.body.openId
  // console.log(openId)
  const data = await mysql('nideshop_search_history').where({
    'user_id': openId
  }).del()
  console.log(data) // 删除的所有数据的长度
  if (data) {
    ctx.body = {
      'data': '清除成功'
    }
  } else {
    ctx.body = {
      'data': null
    }
  }
}

module.exports = {
  addHistoryAction,
  indexAction,
  clearHistoryAction,
  helperAction
}