/*eslint-disable*/
/*
 * @file routes 路由配置文件
 * @Author: heyuze
 * @Date: 2018-11-26 15:28:59
 * @Last 
 * @Last Modified time: 2020-07-21 18:38:03
 */

const Login = () => import(/* webpackChunkName: "LoginIndex" */ '../views/login/login.vue') 
const Forget = () => import(/* webpackChunkName: "ForgetIndex" */ '../views/login/forget.vue') 
const Person = () => import(/* webpackChunkName: "PersonIndex" */ '../views/person/person.vue') 






export default [
    {
        path: '/login',
        name: 'login',
        component: Login  // 登录
    }, 
    {
        path: '/forget',
        name: 'forget',
        component: Forget  // 登录
    }, 
    {
        path: '/person',
        name: 'person',
        component: Person  // 登录
    }, 
]
