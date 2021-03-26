// /mock/index.js
const Mock = require("mockjs");
const mockFiles = require.context("./modules", false, /\.js$/);
let mocks = [];

mockFiles.keys().forEach((key) => {
  mocks.push(...mockFiles(key));
});

mocks.forEach((item) => {
  console.log(item);
  Mock.mock("http://localhost:3000" + item.url, item.type, item.response);
});
