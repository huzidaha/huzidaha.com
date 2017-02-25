import Promise from 'bluebird'
import { join } from 'path'
const fs = Promise.promisifyAll(require('fs'))

const error = (message) => {
  console.log(message)
  process.exit()
}

export default class Commander {
  constructor () {
    this.commands = new Map()
    this.directives = new Map()
  }

  registerCommand ({ command, templatePath, targetDir }) {
    this.commands.set(command, { templatePath, targetDir })
  }

  registerDirective (directive, command) {
    this.directives.set(directive, command)
  }

  async run (command, name) {
    if (!this.commands.has(command)) {
      error(`并不存在命令 ${command}`)
    } else {
      const commandInfo = this.commands.get(command)
      try {
        /**
         * 替换模版中的占位符
         * @param  {String} toReplace 占位符 <%REPLACE|xxx|xxx...%>
         * @return {String}           替换后的结果
         */
        const replaceFunc = (toReplace) => {
          const directives = toReplace
            .replace(/<%|%>|REPLACE/g, '')
            .split('|')
          // 执行字符串处理，支持管道方式 word | method1 | method2
          return directives.reduce((str, key) => {
            if (!key) return str
            if (!this.directives.has(key)) {
              error(`方法并不存在${key}`)
            } else {
              return this.directives.get(key)(str)
            }
          }, name)
        }
        // 读取模版吧
        const template = await fs.readFileAsync(
          commandInfo.templatePath,
          'utf-8'
        )
        // 把替换以后的结果写入目标目录的文件当中
        await fs.writeFileAsync(
          join(commandInfo.targetDir, `${name}.js`),
          template.replace(/<%REPLACE[|\w\d]*?%>/g, replaceFunc),
          'utf-8'
        )
      } catch (e) {
        error('错误：' + e.message)
      }
    }
  }
}
