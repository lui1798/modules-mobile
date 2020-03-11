const chalk = require('chalk')

exports.resultLog = function (type = 'success', msg = '') {
  const color = type === 'success' ? 'greenBright' : (type==='error' ? 'redBright' : 'blueBright')
  const bgColor = type === 'success' ? 'bgGreenBright' : (type==='error' ? 'bgRedBright': 'bgBlueBright')
  const output = msg.split('**').reduce((value, part, index) => {
    if (index % 2 === 1) {
      return value += chalk[color].bold(part)
    } else {
      return value += chalk[color](part)
    }
  }, '')
  console.log(
    '\n'
    + chalk[bgColor].bold(` ${type.toUpperCase()} `)
    + ' '
    + output
    + '\n'
  )
} 