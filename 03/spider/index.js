const originRequest = require("request");
const iconv = require('iconv-lite')
const cheerio = require('cheerio')

function request(url, callback) {
  const option = {
    encoding: null
  }
  originRequest(url, option, callback)
  
}

for (let i = 100553; i < 100554; i++) {
  const url = `https://www.dy2018.com/i/${i}.html`
  request(url, function(err, res, body) {
    console.log('body: ', body)
    const html = iconv.decode(body, 'gb2312')
    const $ = cheerio.load(html)
    console.log($('.title_all h1').text())
  })
}