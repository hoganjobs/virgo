const fs = require("fs");
const http = require("http");
http
  .createServer((request, response) => {
    // console.log('there is a request')
    // console.log('response: ', getPrototypeChain(response))
    // response.end('hello node')

    const { url, method, headers } = request;
    console.log("url", url);
    if (url === "/" && method === "GET") {
      fs.readFile("index.html", (err, data) => {
        if (err) {
          response.writeHead(500, {
            "Content-Type": "text/plain;charset=utf-8",
          });
          response.end("server error");
          return;
        }
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/html");
        response.end(data);
      });
    } else if(url === '/users' && method === 'GET') {
      response.writeHead(200, {'Content-Type': 'application/json'})
      response.end(JSON.stringify([{name: 'atom'}]))
    } else if(method === 'GET' && headers.accept.indexOf('image/*') !== -1) {
      fs.createReadStream('.'+url).pipe(response);
    }
  })
  .listen(3000);

// 打印原型链
// function getPrototypeChain(obj) {
//   const protoChain = []
//   while (obj = Object.getPrototypeOf(obj)) {
//     protoChain.push(obj)
//   }
//   return protoChain
// }
