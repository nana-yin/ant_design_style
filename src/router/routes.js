/*eslint-disable*/
/*
 * @file routes 路由配置文件
 * @Author: heyuze
 * @Date: 2018-11-26 15:28:59
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-09-27 14:36:29
 */
import login from './login'
import test from './test'
const Login = () => import(/* webpackChunkName: "LoginIndex" */ '../views/login/login.vue') 

export default [
  {
    path: '/',
    name: 'Login',
    component: Login,
    // meta: {
    //   keepAlive: true // 需要被缓存
    // }
  },
  ...login,
  ...test
]