'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    const { username } = ctx.query;  // 拿到请求/user时给的参数 (/user?username=蜗牛)
    ctx.body = username;
  }

  async getId() {
    const { ctx } = this;
    const { id } = ctx.params;  // 通过params拿到参数 (/getid/123)
    ctx.body = id
  }

  async add() {
    const { ctx } = this;
    const { title, content } = ctx.request.body
    ctx.body = {
      title,
      content
    }
  }
}

module.exports = UserController;
