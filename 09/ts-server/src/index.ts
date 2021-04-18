import * as Koa from "koa";
import * as bodify from "koa-body";
import * as serve from "koa-static";


const app = new Koa();
app.use(serve(`${__dirname}/public`));

app.use(
  bodify({
    multipart: true,
    // 使用非严格模式 允许delete
    strict: false,
  })
);

import { load } from './utils/decors';
import {resolve} from 'path'
const router = load(resolve(__dirname, './routes'));
app.use(router.routes())

// app.use((ctx: Koa.Context) => {
//   ctx.body = 'Hello koa'
// })

app.listen(3000, () => {
  console.log("服务器启动");
});
