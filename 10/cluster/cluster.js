const cluster = require("cluster");
const os = require("os");
const numCPUs = os.cpus().length;

const process = require("process");
const workers = {};
if (cluster.isMaster) {
  cluster.on("exit", (worker, code, signal) => {
    console.log("工作进程出错...重启", worker.process.pid, signal || code);
    delete workers[worker.process.pid];
    worker = cluster.fork();
    workers[worker.process.pid] = worker;
  });

  // 主进程
  for (var i = 0; i < numCPUs; i++) {
    var worker = cluster.fork();
    console.log("init ...pid", worker.process.pid);
    workers[worker.process.pid] = worker;
  }
} else {
  const app = require("./app");
  app.listen(3000);
}

// 当主进程被终⽌止时，关闭所有⼯工作进程
process.on("SIGTERM", function () {
  for (var pid in workers) {
    process.kill(pid);
  }
  process.exit(0);
});
require("./test");
