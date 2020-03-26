const shell = require('shelljs')
const moment = require('moment') // 引入时间模块
const current = moment().format('YYYY-MM-DD-hh-mm-ss') // 20191226102330
const folder = `src_${current}`
const schedule = require('node-schedule')

// 先创建一个时间信息的文件夹，为了防止覆盖同一个文件
shell.mkdir('-p', './bak/' + folder)
// shell 复制文件或者文件夹
shell.cp('-rf', './test', './bak/' + folder)

// node定时任务模块node-schedule
function copy() {
  const current = moment().format('YYYY-MM-DD-hh-mm-ss')
  const folder = `src_${current}`
  // 先创建一个时间信息的文件夹，为了防止覆盖同一个文件
  shell.mkdir('-p', './bak/' + folder)
  // shell 复制文件或者文件夹
  shell.cp('-rf', './test', './bak/' + folder)
}

// 每天零点
schedule.scheduleJob('00 00 00 * * *', () => {
  copy()
})

// 自动执行命令
// shell.exec('cls') // 执行windows下的清空
// shell.exec('npm run bak')
shell.exec('node --version', {
  silent: true, // 执行过程中命令提示符不会显示过程信息
  async: false, // 不要异步执行
}, (code, stdout, stderr) => {
  // 执行完毕后继续执行这里的回调函数
  // 自动修改内容
  // -i表示不创建备份,version:需要替换的内容,aa:替换的新内容,最后:文件路径
  // shell.sed('-i', 'version', 'aa', './version.js')
  // 
  shell.sed('-i', /version\s=/, 'v =', './version.js')
  const content = shell.cat('./version.js')

  // 最后一位每次打包自动加一
  const rep = content.stdout.split('.')

  // 接受控制台输入
  process.stdout.write("需要变更版本号吗(y/n)?")
  process.stdin.on('data', (input) => {
    input = input.toString().trim()
    if (['Y', 'y', 'YES', 'yes'].indexOf(input) > -1) {
      rep[rep.length - 1] = parseInt(rep[rep.length - 1]) + 1 + "'"
      shell.sed('-i', content, rep.join('.'), './version.js')
    }
    if (['N', 'n', 'NO', 'no'].indexOf(input) > -1) {
      process.exit(0)
    }
  })
})