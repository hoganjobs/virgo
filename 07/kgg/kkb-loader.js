const fs = require("fs");

const path = require("path");

const Router = require("koa-router");

// 读取指定目录
function load(dir, cb) {
  // 获取绝对路径
  const url = path.resolve(__dirname, dir);

  // 读文件
  const files = fs.readdirSync(url);

  files.forEach((filename) => {
    filename = filename.replace(".js", "");
    const file = require(url + "/" + filename);

    //处理逻辑
    cb(filename, file);
  });
}

function initRouter(app) {
  const router = new Router();
  load("routes", (filename, routes) => {
    const prefix = filename === "index" ? "" : `/${filename}`;

    routes = typeof routes == "function" ? routes(app) : routes;

    // 遍历对象
    Object.keys(routes).forEach((key) => {
      const [method, path] = key.split(" ");
      console.log(
        `正在映射地址： ${method.toLocaleLowerCase()} ${prefix}${path}`
      );

      // router[method](prefix + path, routes[key]);
      router[method](prefix + path, async ctx =>{
        // 挂载上下文到app
        app.ctx = ctx
        // 路由处理接收app
        await routes[key](app)
      })
    });
  });
  return router;
}

function initController(app) {
  const controllers = {};
  // 读取ctrl
  load("controller", (filename, controller) => {
    controllers[filename] = controller(app);
  });
  return controllers;
}

function initService() {
  const services = {};
  load("service", (filename, service) => {
    services[filename] = service;
  });
  return services;
}

module.exports = { initRouter, initController, initService };
