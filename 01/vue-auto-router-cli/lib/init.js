const { promisify} = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const log = content => console.log(chalk.green(content))
const {clone} = require('./download')

module.exports = async name => {
  // 打印欢迎界面
  clear()
  const data = await figlet('KKB Welcome')
  log(data)

  // 克隆项目
  await clone('github:hoganjobs/hogan', name)
}