const chalk = require('chalk') //命令行颜色
const ora = require('ora') // 加载流程动画
const spinner_style = require('./spinner_style') //加载动画样式
const shell = require('shelljs') // 执行shell命令
const path = require('path') // nodejs内置路径模块
const CONFIG = require('./config') // 配置
const co = require('co')
const OSS = require('ali-oss')
const glob = require('glob')
const OssonfigPrarm = require('./ossConfig')

let ossConfig = {}
// const env = 'development'
const env = process.argv[2].split('--')[1]

//logs
const defaultLog = log => console.log(chalk.blue(`---------------- ${log} ----------------`))
const errorLog = log => console.log(chalk.red(`---------------- ${log} ----------------`))
const successLog = log => console.log(chalk.green(`---------------- ${log} ----------------`))

//项目打包代码 npm run build
const compileDist = async() => {
  const loading = ora(defaultLog('项目开始打包')).start()
  loading.spinner = spinner_style.arrow4
  shell.cd(path.resolve(__dirname, '../'))
  const res = await shell.exec(process.argv[2] === '--development' ? 'npm run build:dev' : 'npm run build:prod') //执行shell 打包命令
  loading.stop()
  if (res.code === 0) {
    successLog('项目打包成功!')
  } else {
    errorLog('项目打包失败, 请重试!')
    process.exit() //退出流程
  }
}

// 前端静态资源上传到阿里云oss
const uploadFiles = async() => {
  glob(ossConfig.localPath, { nodir: true }, (er, files) => {
    const index = 0
    put(files, index)
  })
}

async function put(files, index) {
  // eslint-disable-next-line require-yield
  co(function * () {
    const ossPath = ossConfig.ossPath.substr(ossConfig.ossPath.length - 1, 1) === '/' ? ossConfig.ossPath.slice(0, -1) : ossConfig.ossPath
    const name = ossPath + files[index].slice(6)
    const client = new OSS({
      region: ossConfig.region,
      accessKeyId: ossConfig.accessKeyId,
      accessKeySecret: ossConfig.accessKeySecret,
      bucket: ossConfig.bucket,
      timeout: 240000 // 毫秒为单位
    })
    try {
      //object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
      client.put(name, files[index]).then((result) => {
        if (result.res.status !== 200) {
          multipartUpload(name, files[index])
        } else {
          index += 1
          put(files, index)
          if (index === files.length) {
            consoleStr(files.length)
          }
        }
      })
    } catch (e) {
      console.log(e)
      defaultLog('进入分片上传')
      multipartUpload(name, files[index])
    }
  }).catch(function(err) {
    console.error(err)
  })
}
async function multipartUpload(name, file) {
  const client = new OSS({
    region: ossConfig.region,
    accessKeyId: ossConfig.accessKeyId,
    accessKeySecret: ossConfig.accessKeySecret,
    bucket: ossConfig.bucket,
    timeout: 120000 // 毫秒为单位
  })
  try {
    //object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
    await client.multipartUpload(name, file, {
      timeout: 240000,
      headers: {
        Expires: 240000
      }
    //meta是用户自定义的元数据，通过head接口可以获取到object的meta数据。
    })
    await client.head(name)
  // console.log(head);
  } catch (e) {
    // 捕获超时异常。
    if (e.code === 'ConnectionTimeoutError') {
      console.log('TimeoutError')
    }
    console.log(e)
  }
}
const consoleStr = (length) => {
  successLog(`全部上传成功~,总共${length}个文件`)
  successLog('大吉大利, 部署成功!')
  process.exit() //退出流程
}
//------------发布程序---------------
const runUploadTask = async() => {
  console.log(chalk.yellow(`--------->  欢迎使用 2020年自动部署工具  <---------`))
  //打包
  await compileDist()
  // 上传文件
  await uploadFiles()
}

// 启动发布程序
CONFIG[env]
ossConfig = OssonfigPrarm[env]
runUploadTask() // 发布
