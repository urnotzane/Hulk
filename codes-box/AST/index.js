const parser = require('@babel/parser')

const code = `async function sum(a, b) {
  await setTimeout(() => {
    return a + b
  }, 300)
}`

const ast = parser.parse(code, {tokens: true})
const tokens = ast.tokens
const tokenFinder = tokens.find(item => {
  return item.value === 'await'
})

console.log(tokenFinder)
