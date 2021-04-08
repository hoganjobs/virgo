module.exports = {
  "get /": async app => {
    // ctx.body = "用户⾸页";
    const name = await app.$service.user.getName()
    app.ctx.body = "用户:" + name;
  },
  "get /info": (ctx) => {
    // ctx.body = "用户详情⻚面";
    app.ctx.body = "用户年龄:" + app.$service.user.getAge();
  },
};
