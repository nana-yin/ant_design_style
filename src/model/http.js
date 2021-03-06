/* eslint-disable */
/**
 * @file http请求脚本
 * @Author heyuze
 * @Date 2018-11-21
 */

import { notification } from 'ant-design-vue'
import { clearCookie,getCookie, storage,clearProductMess } from '../assets/js/util'
import axios from 'axios'
import CryptoJS from "crypto-js";
import qs from 'qs'
import router from "../router/router";
axios.defaults.baseURL = '/dev-api'
// axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URL
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
let headers= {}
axios.defaults.crossDomain = true
axios.defaults.timeout = 12000000
axios.defaults.withCredentials = true

axios.interceptors.request.use( (config) => {
  let timestamp = Date.parse(new Date())/1000;
  let Redirect=window.location.href;
  let arge=qs.stringify(config.data)+'&Timestamp='+timestamp+'&Salt='+getCookie('Salt')
  let data=CryptoJS.MD5(arge);
  if(getCookie('Token')){
    config.headers = {
      "Content-Type": "application/json;charset=UTF-8",
      'Access-Token': getCookie('Token'),
      'Timestamp': timestamp,
      'Sign':data,
      'Redirect':Redirect,
    }
    headers= config.headers
    return config
  }else{
    config.headers = {
          "Content-Type": "application/json;charset=UTF-8",
          'Timestamp': timestamp,
          'Sign':data,
          'Redirect':Redirect
      }
    headers= config.headers
    return config
  }
})
const createError = (respCode, msg) => {
  const err = new Error(msg)
  // if(err.respCode === )
  // console.log(msg)
  err.respCode = respCode
  notification.warning({
    message: '提示',
    description: msg || '访问超时，请稍候重新尝试！',
    duration: 3
  })
  return err
}

function reLogin(status) {
  clearCookie()
  createError(403, '登录超时，请重新登录！')
}

const handleRequest = (request) => {
  // console.log('请求有问题', request)
  return new Promise((resolve, reject) => {
    request.then(resp => {
      const data = resp.data
      if (resp.status === 403) {
        reject(reLogin(resp.status))
      } else if (!data) {
        reject(createError(400, '请求异常，请稍候重新尝试！'))
      } else if (data.respCode !== 200) {
        if(data.respCode === 13005 || data.respCode === 13007) { // 策略详情对于13005状态码的特殊处理
          resolve(data)
        }else if(data.respCode === 1021){
          router.push('login')
        } else if(data.respCode === 200010) {
          router.push('/login')
        } else if (data.respCode === 200012) {
          router.push('/login?type=resetPwd')
        } else {
          // checkState(resp)
          if(resp.data.respCode === 302){
            router.push('login')
            resolve(data)
          }else{
            // console.log('这里有问题', data.respCode, data.respMsg)
            reject(createError(data.respCode, data.respMsg))
          }
          
        }
      } else {
        // data.respCode='00'
        resolve(data)
      }
    })
    .catch(err => {
      const resp = err.response
      if (resp.status === 403) {
        reject(reLogin(resp.status))
      } else if (resp.data) {
        reject(createError(resp.data.respCode, resp.data.respMsg))
      } else {
        reject(createError(null, '请求异常，请稍候重新尝试！'))
      }
    })
  })
}

export default {
  get (url, params) {
    return handleRequest(axios({
      method: 'get',
      headers:headers,
      url: `${url}${params ? `?${qs.stringify(params)}` : ''}`
    }))
  },
  post (url, params) {
    return handleRequest(axios({
      method: 'post',
      url: url,
      headers:headers,
      data: params
    }))
  },
  _get (url, params) {
    return axios({
      method: 'get',
      url: `${url}${params ? `?${qs.stringify(params)}` : ''}`
    })
  },
  upload (url, params) {
    return axios({
      method: 'post',
      url: url,
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}


function checkState(response){
  if (response.data.respCode === 10000) {
  //  //this.$Message.error(response.data.respMsg);
  //   var myDate = new Date();
  //   myDate.setTime(-1000); //设置时间
  //   document.cookie =  "userMess=''; expires=" + myDate.toGMTString();
  //   window.location.href=api.returnUrl+'login?returnUrl='+window.location.href; 
  }else if(response.data.respCode === 1004 || response.data.respCode === 10310){ 
    //产品失效 跳转到 产品列表页  清除产品的  session信息
    // clearProductMess()
    // storage.remove('optimal')
    // router.push('/product/productlist')
  }else if(response.data.respCode === 10002){
    // publicFun.clearCookie();
    // window.location.href=api.returnUrl+'login?returnUrl='+window.location.href;
  }else if(response.data.respCode === 302){ //sso 跳转到登录授权页面  如果有返回的deleteKeys和setKeys  就清楚和保存相应的数据
      clearCookie();
      if(response.data.result.deleteKeys.length===0 && response.data.result.setKeys.length===0){
          clearCookie();
      }
      if(response.data.result.deleteKeys.length>0){
        var date=new Date();
        date.setTime(date.getTime()-10000);
        response.data.result.deleteKeys.map((item)=>{
            document.cookie=item.key+"='';expires="+date.toGMTString();
            //document.cookie = item.key+'=0;expires=' + new Date(0).toUTCString() + ";path=/;";

        })
      }
      if(response.data.result.setKeys.length>0){
        response.data.result.setKeys.map((item)=>{
            var date=new Date();
            //将date设置为过去的时间 删除cookie
            date.setTime(date.getTime()+item.maxAge*1000);
            if(item.domain){
                document.cookie=item.key+"="+item.value+';expires='+date.toGMTString()+';path='+item.path+';domain='+item.domain;
                //document.cookie = item.key+'=0;expires=' + new Date(0).toUTCString() + ";path="+item.path+';domain='+item.domain;

            }else{
                document.cookie=item.key+"="+item.value+';expires='+date.toGMTString()+';path='+item.path;
                //document.cookie = item.key+'=0;expires=' + new Date(0).toUTCString() + ";path=/;";

            }
        })
      }
     window.location.href=response.data.result.redirectUrl;
     return false;
  }else if(response.data.respCode === 522){
    Message.error(response.data.respMsg);
    setTimeout(() => {
        // window.location.href=api.returnUrl;
    }, 1500);
  }
}