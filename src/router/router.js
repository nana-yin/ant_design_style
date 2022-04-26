/* eslint-disable */
/*
 * @file router 路由初始化文件
 * @Author: heyuze
 * @Date: 2018-11-26 15:29:46
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-09-17 18:26:35
 */
import VueRouter from 'vue-router'
import Vue from 'vue'
import routes from './routes' //风险配置
import store from '../store/store' //数据中心
import { notification } from 'ant-design-vue'
import { storage, getCookie, isNull, getUrlParam, clearCookie, addCookie } from '../assets/js/util'
import _$http from '../model/http'
import Watermark from '@/assets/js/waterMark'


const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
const router = new VueRouter({
  mode: 'hash',
  routes,
  fallback: true,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})


//页面跳转之前权限认证，访问拦截
router.beforeEach((to, from, next) => {
  
  if(to.path==='/login'){
    Watermark.set('')
  }else{
    const user = store.state.user
    let text=""
    if(user.userInfo['userName']){
      text=user.userInfo['userName']
    }
    Watermark.set(text)
    // setTimeout(()=>{
    //    Watermark.set(text)
    // },500)
  }
  if(to.path!=='/login'){
    if(!store.state.user.userInfo.userId){
      if(getCookie('Token')){
        store.dispatch('fetchUserMess',{});
      }
    }
  }
  
  next()
})
router.onError((error) => {
  
  console.log(error)
});

export default router
