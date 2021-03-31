const KKB = require("./kkb");
const Router = require('./router') 
const app = new KKB();

const router = new Router();
router.get("/index", async (ctx) => {
  ctx.body = "index page";
});
router.get("/post", async (ctx) => {
  ctx.body = "post page";
});
router.get("/list", async (ctx) => {
  ctx.body = "list page";
});
router.post("/index", async (ctx) => {
  ctx.body = "post page";
});
// 路路由实例例输出⽗父中间件 router.routes()
app.use(router.routes());

// app.use((req,res) => {
//   res.writeHead(200)
//   res.end('hi kkb')
// })

// app.use(ctx => {
//   ctx.body = 'hehe'
// })

// const delay = () => new Promise((resolve) => setTimeout(() => resolve(), 2000));

// app.use(async (ctx, next) => {
//   ctx.body = "1";
//   await next();
//   ctx.body += "5";
// });

// app.use(async (ctx, next) => {
//   ctx.body += "2";
//   await delay();
//   await next();
//   ctx.body += "4";
// });

// app.use(async (ctx, next) => {
//   ctx.body += "3";
// });

app.listen(3000, () => {
  console.log("listen at 3000");
});
