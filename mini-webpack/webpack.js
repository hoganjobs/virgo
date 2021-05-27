const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

/**
 * 分析模块
 * @param {*} file 文件路径
 */
function getModuleInfo(file) {
  // 代码字符串进行解析，编译ast
  const body = fs.readFileSync(file, "utf-8");

  // 
  const ast = parser.parse(body, {
    sourceType: 'module'
  }) 

  const deps = {}
  // 查找依赖 import
  traverse(ast , {
    // visitor访问者
    ImportDeclaration({node}) {
      const dirname = path.dirname(file)
      const absPath = './' + path.join(dirname, node.source.value)
      deps[node.source.value] = absPath
    }
  })

  // ES6转ES5
  const {code} = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  })

  const moduleInfo = {
    file,
    deps,
    code
  }
  return moduleInfo
}

const info = getModuleInfo('./src/index.js')
console.log('info:', info)