const koa = require('koa')
const {initRouter, initController} = require('./kkb-loader')

class kkb {
  constructor (conf) {
    this.$app = new koa(conf)
    this.$ctrl = initController()
    this.$router = initRouter(this)
    this.$app.use(this.$router.routes())
  }

  start(port) {
    this.$app.listen(port, () => {
      console.log('服务器启动 端口' + port)
    })
  }
}

module.exports = kkb