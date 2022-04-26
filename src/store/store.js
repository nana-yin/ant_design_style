/**
 * @file vuex store配置入口
 * @Author heyuze
 * @Date 2018-11-21
 */

import Vue from 'vue'
import Vuex from 'vuex'
import modules from './index'
import createPersistedState from 'vuex-persistedstate'

// import plugins from './plugins'

const isDev = process.env.NODE_ENV === 'development'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: isDev,
  modules,
  plugins: [createPersistedState({ storage: window.sessionStorage,
    reducer(val) {
      return {
        user: val.user
      }
    } })]
})

// 开启store热更替
if (module.hot) {
  module.hot.accept(['./index'], () => {
    const newModules = require('./index').default
    store.hotUpdate({
      modules: newModules
    })
  })
}

export default store
