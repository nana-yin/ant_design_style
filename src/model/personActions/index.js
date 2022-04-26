/* eslint-disable */
/**
 * @file: 回测任务跑批管理
 * @Author: xuke(xuke@duxiaoman.com)
 * @Date: 2019-01-22 10:21:17
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-08-14 14:04:07
 */
import _$http from '../http'
import API from './api'

export default {
  // 
  userUpdate (param) {
    return _$http.post(API.QUERY_USER_INFOEDIT, param)
  },
  passwordChange (param) {
    return _$http.post(API.QUERY_USER_SECURITY, param)
  },
  // 
  emailChange (param) {
    return _$http.post(API.QUERY_EMAIL_CHANGE, param)
  },
  mobileChange (param) {
    return _$http.post(API.QUERY_MOBILE_CHANGE, param)
  },
  
}
