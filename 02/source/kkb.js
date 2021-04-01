const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");
class KKB {

  // 初始化中间件数组
  constructor() {
    this.middlewares = []
  }

  listen(...args) {
    const server = http.createServer(async (req, res) => {
      // this.callback(req, res);
      // 创建上下文
      const ctx = this.createContext(req,res)
      // this.callback(ctx)
      
      // 中间件组合
      const fn = this.compose(this.middlewares)

      // 执行
      await fn(ctx)

      // 响应
      res.end(ctx.body)
    });
    server.listen(...args);
  }

  // use(callback) {
  //   this.callback = callback;
  // }
  use(middlewares) {
    this.middlewares.push(middlewares);
  }

  // 构建上下文
  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);

    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;

    return ctx;
  }

  // 中间件组合
 compose(middlewares) {
    return function(ctx) { // 上下文
      return dispatch(0)
      function dispatch(i) {
        let fn = middlewares[i]
        if(!fn) {
          return Promise.resolve()
        }
        return Promise.resolve(
          fn(ctx, function next() {
            // promise完成后再执行下一个
            return dispatch(i + 1)
          })
        )
      }
    }
  }
}

module.exports = KKB;
