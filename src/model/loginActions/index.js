/* eslint-disable */
/**
 * @file: 回测任务跑批管理
 * @Author: xuke(xuke@duxiaoman.com)
 * @Date: 2019-01-22 10:21:17
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-08-11 16:36:34
 */
import _$http from '../http'
import API from './api'

export default {
  // 
  queryLoginEmail (param) {
    return _$http.post(API.QUERY_LOGIN_EMAIL, param)
  },
  // 
  queryLoginMobile (param) {
    return _$http.post(API.QUERY_LOGIN_MOBILE, param)
  },
  queryCaptchaMobile (param) {
    return _$http.post(API.QUERY_CAPTCHA_MOBILE, param)
  },
  // 
  queryCaptchaEmail (param) {
    return _$http.post(API.QUERY_CAPTCHA_EMAIL, param)
  },
  queryForgetMobile (param) {
    return _$http.post(API.QUERY_FORGET_MOBILE, param)
  },
  queryForgetEmail (param) {
    return _$http.post(API.QUERY_FORGET_EMAIL, param)
  },
  queryUserInfo (param) {
    return _$http.get(API.QUERY_USER_INFO_DETAIL, param)
  },
  login(param) {
    return _$http.post(API.LOGIN, param)
  },
  firstModifyPwd(param) {
    return _$http.post(API.FIRST_MODIFY_PWD,param)
  },
  buiredPoint() {
    return _$http.post(API.BURIED_POINT)
  }
  
}
