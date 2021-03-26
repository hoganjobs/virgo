test('callback', done => {
  const {callback} = require('../index')
  callback()
  setTimeout(done, 1000);
})


test('promise', done => {
  const {promise} = require('../index')
  promise()
  setTimeout(done, 1000);
})
