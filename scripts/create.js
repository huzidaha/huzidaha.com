import Commander from './commander'
import { join } from 'path'

const absPath = (path) => join(__dirname, path)
const [command, name, targetPath] = process.argv.slice(2)
const commander = new Commander()

// 生成 Model 文件
commander.registerCommand({
  command: 'model',
  templatePath: absPath('./templates/model.js'),
  targetDir: absPath('../server/models')
})

// http://blog.vjeux.com/2009/javascript/dangerous-bracket-notation-for-strings.html
commander.registerDirective(
  'capitalize',
  (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`
)

commander.run(command, name, targetPath)
