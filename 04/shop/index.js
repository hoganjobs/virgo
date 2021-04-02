const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
app.use(require("koa-static"(__dirname + "/")));
app.use(bodyParser());

// 引用模型
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

// 定义关系
Product.belongTo(user, {
  constraints: true,
  onDelete: "CASCADE",
});

User.hasMany(Product);
User.hasOne(Cart);
Cart.belongTo(User);

Cart.belongsToMany(Product, {
  through: CartItem,
});
Product.belongsToMany(Cart, {
  through: CartItem,
});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {
  through: OrderItem,
});
Product.belongsToMany(Order, {
  through: OrderItem,
});

// 同步数据库
sequelize.sync().then(async (result) => {
  let user = await User.findByPk(1);
  if (!user) {
    user = await User.create({
      name: "laoxia",
      email: "xxx@qq.com",
    });
    await user.createCart();
  }
  app.listen(3000, () => console.log("listen to port 3000"));
});

// 模拟鉴权
app.use(async (ctx, next) => {
  const user = await User.findByPk(1);
  ctx.user = user;
  await next();
});

const router = require("koa-router")();

// 查询商品
router.get("/admin/products", async (ctx, next) => {
  const products = await Product.findAll();
  ctx.body = { prods: products };
});

// 创建商品
router.post("/admin/product", async (ctx, next) => {
  const body = ctx.request.body;
  const res = await ctx.user.createProduct(body);
  ctx.body = { success: true };
});

// 删除商品
router.delete("/admin/product/:id", async (ctx, next) => {
  const id = ctx.params.id;
  const res = await Product.destroy({ where: { id } });
  ctx.body = { success: true };
});

app.use(router.routes());
