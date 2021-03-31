const add = (x, y) => x + y
const square = z => z*z

// const compose = (fn1, fn2) => (...args) => fn2(fn1(...args))
const compose = (...[first, ...other]) => (...args) => {
  let ret = first(...args)
  other.forEach(fn => {
    ret = fn(ret)
  })
  return ret
}

// const fn = (x, y) => square(add(x, y))
const fn = compose(add, square, square)

console.log(fn(1, 2))