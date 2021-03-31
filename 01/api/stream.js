const fs = require('fs')
const rs = fs.createReadStream('./01.jpeg')
const ws = fs.createWriteStream('./02.jpeg')
rs.pipe(ws)