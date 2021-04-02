(async () => {
  const Sequelize = require('sequelize')

  const sequelize = new Sequelize('kaikeba', 'kaikeba_admin', 'admin', {
    host: 'localhost',
    dialect: 'mysql'
  })

  // 定义模型
  const Fruit = sequelize.define('Fruit', {
    name: {type: Sequelize.STRING(20), allowNull: false},
    price: {type: Sequelize.FLOAT, allowNull: false},
    stock: {type: Sequelize.INTEGER, defaultValue: 0}
  })
  let ret = await Fruit.sync()

  ret = await Fruit.create({
    name: 'banana',
    price: 3.5,
  })

  // console.log('create: ', ret)

  ret = await Fruit.update({
    price: 4
  }, {
    where: {name: 'banana'}
  })

  const Op = Sequelize.Op
  ret = await Fruit.findAll({
    where: {price: {[Op.lt]:5, [Op.gt]: 2}}
  })
  console.log('select ', JSON.stringify(ret))
  
})()