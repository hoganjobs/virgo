const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

/**
 * 分析模块
 * @param {*} file 文件路径
 */
function getModuleInfo(file) {
  // 代码字符串进行解析，编译ast
  const body = fs.readFileSync(file, "utf-8");

  //
  const ast = parser.parse(body, {
    sourceType: "module",
  });

  const deps = {};
  // 查找依赖 import
  traverse(ast, {
    // visitor访问者
    ImportDeclaration({ node }) {
      const dirname = path.dirname(file);
      const absPath = "./" + path.join(dirname, node.source.value);
      deps[node.source.value] = absPath;
    },
  });

  // ES6转ES5
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });

  const moduleInfo = {
    file,
    deps,
    code,
  };
  return moduleInfo;
}

// const info = getModuleInfo('./src/index.js')
// console.log('info:', info)

/**
 * 模块解析
 * @param {*} file
 */
function parseModules(file) {
  const entry = getModuleInfo(file);
  const temp = [entry];
  const depsGraph = {};

  // 递归调用过程
  getDeps(temp, entry);

  temp.forEach((moduleInfo) => {
    depsGraph[moduleInfo.file] = {
      deps: moduleInfo.deps,
      code: moduleInfo.code,
    };
  });
  return depsGraph;
}

/**
 * 获取依赖
 * @param {*} temp
 * @param {*} param1
 */
function getDeps(temp, { deps }) {
  Object.keys(deps).forEach((key) => {
    const child = getModuleInfo(deps[key]);
    temp.push(child);
    getDeps(temp, child);
  });
}

// const content = parseModules('./src/index.js')
// console.log('content: ', content)

function bundle(file) {
  const depsGraph = JSON.stringify(parseModules(file));
  return `(function (graph) {
        function require(file) {
            function absRequire(relPath) {
                return require(graph[file].deps[relPath])
            }
            var exports = {};
            (function (require,exports,code) {
                eval(code)
            })(absRequire,exports,graph[file].code)
            return exports
        }
        require('${file}')
    })(${depsGraph})`;
}
const content = bundle("./src/index.js");

!fs.existsSync("./dist") && fs.mkdirSync("./dist");
fs.writeFileSync("./dist/bundle.js", content);
