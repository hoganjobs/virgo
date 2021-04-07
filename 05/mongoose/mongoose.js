const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true})

const conn = mongoose.connection
conn.on('error', () => console.error('连接失败'))

conn.once('open', async () => {
  const Schema = mongoose.Schema({
    category: String,
    name: String
  })

  const Model = mongoose.model('fruit', Schema)

  let r = await Model.create({
    category: '温带水果',
    name: '苹果',
    price: 5
  })

  console.log('插入数据', r)
})