import * as glob from "glob";
import * as Koa from "koa";
import * as KoaRouter from "koa-router";
type HTTPMethod = "get" | "put" | "del" | "post" | "patch";
type LoadOptions = {
  /**
   * 路由⽂件扩展名，默认值是`.{js,ts}`
   */
  extname?: string;
};
type RouteOptions = {
  /**
   * 适⽤于某个请求⽐较特殊，需要单独制定前缀的情形
   */
  prefix?: string;
  /**
   * 给当前路由添加⼀个或多个中间件
   */
  middlewares?: Array<Koa.Middleware>;
};

const router = new KoaRouter();
const decorate = (
  method: HTTPMethod,
  path: string,
  options: RouteOptions = {},
  router: KoaRouter
) => {
  return (target, property) => {
    // 晚一拍执行
    process.nextTick(() => {
      const middlewares = [];
      if (target.middlewares) {
        middlewares.push(...target.middlewares);
      }

      // 添加中间件数组

      if (options.middlewares) {
        middlewares.push(...options.middlewares);
      }

      middlewares.push(target[property]);

      const url = options.prefix ? options.prefix + path : path;
      router[method](url, ...middlewares);
    });
  };
};

export const middlewares = function middlewares(middlewares: Koa.Middleware[]) {
  return function (target) {
    target.prototype.middlewares = middlewares;
  };
};

export const method = (method) => (path: string, options?: RouteOptions) =>
  decorate(method, path, options, router);
export const get = method("get");
export const post = method("post");
export const put = method("put");
export const del = method("del");
export const patch = method("patch");

export const load = (folder: string, options: LoadOptions = {}): KoaRouter => {
  const extname = options.extname || ".{js,ts}";
  glob
    .sync(require("path").join(folder, `./**/*${extname}`))
    .forEach((item) => require(item));
  return router;
};
