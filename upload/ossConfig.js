module.exports = Object.freeze({
  development: {//测试
    'region': 'oss-cn-hangzhou',
    'accessKeyId': '',
    'accessKeySecret': '',
    'localPath': './dist/**',
    'bucket': '',
    'ossPath': '/',
    'callbackUrl': 'http://nodejs.org/dist/index.json'
  },
  production: {//正式
    'region': 'oss-cn-hangzhou',
    'accessKeyId': '',
    'accessKeySecret': '',
    'localPath': './dist/**',
    'bucket': '',
    'ossPath': '/',
    'callbackUrl': 'http://nodejs.org/dist/index.json'
  }
})
