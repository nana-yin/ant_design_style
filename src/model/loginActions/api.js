/* eslint-disable */
/**
 * @file api请求地址
 * @Author heyuze
 * @Date 2018-11-21
 * 
 * 忘记密码 type=1
修改手机号邮箱 type=2
 */


let url='user'
export default {
  QUERY_LOGIN_EMAIL:url+'/login/email',//
  QUERY_LOGIN_MOBILE:url+'/login/mobile',//
  QUERY_CAPTCHA_MOBILE:url+'/captcha/mobile',//
  QUERY_CAPTCHA_EMAIL:url+'/captcha/email',//
  QUERY_FORGET_MOBILE:url+'/forget/mobile',//
  QUERY_FORGET_EMAIL:url+'/forget/email',//
  QUERY_USER_INFO_DETAIL:'/user/infoDetail',//
  LOGIN: '/user/login',
  FIRST_MODIFY_PWD: '/user/security',
  BURIED_POINT: '/fill_point/new'
}
