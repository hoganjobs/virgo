// const { Controller } = require("egg");
const Controller = require("egg").Controller;

/**
 * @Controller 用户管理
 */
class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  /**
   * @summary 创建⽤用户
   * @description 创建⽤用户，记录⽤用户账户/密码/类型
   * @router post /api/user
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx } = this;
    ctx.body = "user ctrl";
  }
}

module.exports = UserController;
