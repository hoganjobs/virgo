test('test hello world',  () => {
  const ret = require('../index')
  // console.log('helloWorld', ret)
  expect(ret).toBe('Hello World')
})