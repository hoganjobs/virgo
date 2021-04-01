const express = require("express");
const app = express();
// const proxy = require("http-proxy-middleware");
const { createProxyMiddleware } = require("http-proxy-middleware"); // http-proxy-middleware官方文档，最新的1.0.0版本引用方式
app.use(express.static(__dirname + "/"));
app.use(
  "/api",
  createProxyMiddleware({ target: "http://localhost:4000", changeOrigin: false })
);

app.listen(3000);
// module.exports = app