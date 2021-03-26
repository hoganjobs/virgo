// /api/index.js
const moduleFiles = require.context("./modules", false, /\.js$/);
let apis = {};

moduleFiles.keys().forEach((key) => {
  // 获取文件名，将 ./ 和 .js 替换为空， 最终格式  common
  const fileName = key.replace(/(\.\/|\.js)/g, "");
  // 填充数据
  apis[fileName] = moduleFiles(key);
});

export default {
  ...apis,
};
