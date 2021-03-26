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

test('generator', done => {
  const {generator} = require('../index')
  generator()
  setTimeout(done, 1000);
})

test('Async/Await', done => {
  const {asynsAwait} = require('../index')
  asynsAwait()
  setTimeout(done, 1000);
})

test('Event', done => {
  const {event} = require('../index')
  event()
  setTimeout(done, 1000);
})