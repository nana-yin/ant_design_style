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
import api from "./const"
import router from "../router/router";
import { fromCodePoint } from 'core-js/fn/string';
axios.defaults.baseURL = api.axiosApi
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
let headers= {}
axios.defaults.crossDomain = true
axios.defaults.timeout = 12000000
axios.defaults.withCredentials = true
let mch_secret='fWm3qQZqwclVw91Q8Z8sGqxSFyBscxyM'
const typeArr=['aes','des','rabbit','rc4','tripledes']
var myDate = new Date();
let date=myDate.getDate();
mch_secret=encrypt(mch_secret,date.toString(),typeArr[date%5])

axios.interceptors.request.use( (config) => {
  let timestamp = Date.parse(new Date())/1000;
  let Redirect=window.location.href;
  const noncestr=randomString(16)
  if(config.method!=='get'){
    config.url= config.url+'?noncestr='+noncestr
  }else{
    config.url= config.url+'&noncestr='+noncestr
  }
  const signature=GenerateSignature(config)
  console.log(signature)

  if(getCookie('Token')){
    config.headers = {
      "Content-Type": "application/json;charset=UTF-8",
      'Token': getCookie('Token'),
      'Timestamp': timestamp,
      'Sign':' mch_id=fc1CeCMGGCENyX1R'+','+signature,
      'Redirect':Redirect,
    }
    headers= config.headers
    return config
  }else{
    config.headers = {
          "Content-Type": "application/json;charset=UTF-8",
          'Timestamp': timestamp,
          'Sign':' mch_id=fc1CeCMGGCENyX1R'+','+signature,
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
        data.respCode='00'
        if(data.cipherText){
          const nonce=data.nonce.toUpperCase()
          const cipherText=data.cipherText
          let mchSecret=decrypt(mch_secret,date.toString(),typeArr[date%5])
          let result=aesDecrypt(cipherText,mchSecret,nonce)
          data.result=result
        }
        console.log(data)
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
        window.location.href=api.returnUrl;
    }, 1500);
  }
}

//加密的签名方法
function GenerateSignature(config){

  let postData=''
  let getData=qs.parse(config.url.split('?')[1])
  if(config.data){
    postData= JSON.parse(JSON.stringify(config.data))
    for (const key in getData) {
      postData[key]=getData[key]
    }
  }
  let timestamp = Date.parse(new Date())/1000;
  let signature=''
  let param=''
  if(config.method==='get'){
    param=config.url.split('?')[1]
  }else{
    if(config.data){
      param=JSON.stringify(config.data)
      param=CryptoJS.MD5(param).toString();
      param=param.toUpperCase()
    }
  }
  let mchSecret=decrypt(mch_secret,date.toString(),typeArr[date%5])
  console.log('------')
  console.log(mchSecret)

  let secret=mchSecret.split('').reverse().join('');
  if(getCookie('Token')){
    signature=config.method.toUpperCase()+'\n'+'/'+config.url+'\n'+timestamp+'\n'+
    secret+'\n'+getCookie('Token')+'\n'+param+'\n\n'
  }else{
    signature=config.method.toUpperCase()+'\n'+'/'+config.url+'\n'+timestamp+'\n'+
    secret+'\n'+param+'\n\n'
  }
  console.log(signature)
  signature=CryptoJS.MD5(signature).toString();
  signature=signature.toUpperCase();
  signature="signature="+signature
  return signature

}

// 生成16位随机字符串
function randomString(length) {
  const chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

// 递归遍历所有的参数

function recursionParam(param){
   let str=''
   let keyArr=(Object.keys(param)).sort()
   keyArr.map(item=>{
     if((typeof param[item])!=='object'){
      str=str+item+'='+ param[item]+'&'
     }else{
      str=CryptoJS.MD5( str+ item+'='+ CryptoJS.MD5(recursionParam(param[item])).toString()).toString();
     }
   })
   return str
}
//解密的加密数据的方法
function aesDecrypt(crypted,key,iv){
  let ciphertext=CryptoJS.enc.Base64.parse(crypted);
  key=key.substring(key.length-4)+key.substring(0,key.length-4)
  var decrypted = CryptoJS.AES.decrypt({ciphertext: ciphertext},CryptoJS.enc.Utf8.parse(key),{ 
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding:CryptoJS.pad.Pkcs7 
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

/* 加密,解密函数,接受与输出都是utf-8 */
  /* 加密函数,参数为:明文,密码,加密类型,返回加密结果 */
  function encrypt(src, pw, encryptType){
    var encryptFunction;
    console.log(src, pw, encryptType)
    switch(encryptType){ 
      case "aes":
        encryptFunction = CryptoJS.AES.encrypt;
        break;
      case "des":
        encryptFunction = CryptoJS.DES.encrypt;
        break;
      case "rabbit":
        encryptFunction = CryptoJS.Rabbit.encrypt;
        break;
      case "rc4":
        encryptFunction = CryptoJS.RC4.encrypt;
        break;
      case "tripledes":
        encryptFunction = CryptoJS.TripleDES.encrypt;
        break;
    }
    return encryptFunction(src, pw).toString();
  }
  
  /* 解密函数,参数: 密文,密码,解密类型,返回解密结果 */
  function decrypt(code, pw, decryptType){
    var decryptFunction=null
    switch(decryptType){ 
      case "aes":
        decryptFunction = CryptoJS.AES.decrypt;
        break;
      case "des":
        decryptFunction = CryptoJS.DES.decrypt;
        break;
      case "rabbit":
        decryptFunction = CryptoJS.Rabbit.decrypt;
        break;
      case "rc4":
        decryptFunction = CryptoJS.RC4.decrypt;
        break;
      case "tripledes":
        decryptFunction = CryptoJS.TripleDES.decrypt;
        break;
    }
    return decryptFunction(code, pw).toString(CryptoJS.enc.Utf8);
  }