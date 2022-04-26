/**
 * @file demo module (state, getter, action, mutation)
 * @Author zhangxu
 * @Date 2020-06-16
 *
 * 新闻资讯
 */
// import { accMul, isNull, dateFormat, storage } from '@/assets/js/util'
// import Vue from 'vue'
import model from '@/model/loginActions/index.js'
import { getCookie, isEmpty } from '@/assets/js/util'
import router from '@/router/router'
import Watermark from '@/assets/js/waterMark'

export const state = {
  userMess: isEmpty(getCookie('userMess')) === true ? {} : JSON.parse(getCookie('userMess')),
  accessList: isEmpty(getCookie('access_list')) === true ? [] : getCookie('access_list').split(','),
  userInfo: {}
}
export const mutations = {
  updataUserMess(state, data) {
    state.userMess = data
  },
  updataAccessList(state, data) {
    state.accessList = data
  },
  updateUserInfo(state, data) {
    state.userInfo = data
  }

}
export const getters = {
  getUserMess(state) {
    return state.userMess
  },
  getAccessList(state) {
    return state.accessList
  },
  getUserInfo(state, data) {
    return state.userInfo
  }

}

export const actions = {
  fetchUserMess({ commit, dispatch }, param) {
    if (!getCookie('Token')) {
      router.push('/login')
      return
    }
    return model.queryUserInfo(param)
      .then(data => {
        if (data.respCode === 302) {
          dispatch('fetchUserMess', {})
          router.push('login')
        } else {
          const userInfo = data.result
          // userInfo.realName = data.result.realName
          // userInfo.userId = data.result.userId
          // userInfo.nickName = data.result.nickName
          Watermark.set(userInfo.userName)
          commit('updateUserInfo', userInfo)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

}
