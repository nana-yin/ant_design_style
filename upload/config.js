module.exports = Object.freeze({
  development: {//测试
    SERVER_PATH: '47.99.119.208', // ssh地址 服务器地址
    SSH_USER: 'root', // ssh 用户名
    PASSWORD: 'Jiaao1509',
    PATH: '/home/work/www/www/web'
  },
  production: {//正式
    SERVER_PATH: '47.99.193.184',
    SSH_USER: 'root',
    PRIVATE_KEY: 'Attractor1509',
    PATH: '/home/work/www/www/web'
  }
})
