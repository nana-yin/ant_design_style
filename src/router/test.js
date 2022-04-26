/*eslint-disable*/
/*
 * @file routes 路由配置文件
 * @Author: heyuze
 * @Date: 2018-11-26 15:28:59
 * @Last 
 * @Last Modified time: 2020-07-21 18:38:03
 */

const Test = () => import(/* webpackChunkName: "testStyle" */ '../views/testStyle/index.vue') 


export default [
    {
        path: '/assetStrategy',
        name: 'test',
        component: Test  // 样式二次封装测试页面
    }
]
