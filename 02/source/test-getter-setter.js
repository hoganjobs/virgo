const kaikeba = {
  info: {name: '优雅'},
  get name() {
    return this.info.name
  },
  set name (val) {
    this.info.name = val;
  }
}

console.log(kaikeba.name)

kaikeba.name = 'kaikeba'
console.log(kaikeba.name)