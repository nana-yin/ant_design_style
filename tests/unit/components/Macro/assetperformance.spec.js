import { shallow, createLocalVue, mount } from 'vue-test-utils'
import VueRouter from 'vue-router'
import ant from 'ant-design-vue'
import AssetPerformance from '@/views/AssetPerformance/AssetPerformance.vue'
import * as myModule from '@/store/modules/assetPerformance'
import routes from '@/router/router.js'
const localVue = createLocalVue()
import Vue from 'vue'
import Vuex from 'vuex'
var sinon = require('sinon')
const actionsInjector = require('inject-loader!../../../../src/store/modules/assetPerformance')
localVue.use(ant)
localVue.use(routes)
localVue.use(Vuex)
const parm = { productCode: 'A17SD0001' }
const action = actionsInjector.actions.queryAssetPerf({
  '@/model/actions/assetPerformance.js': {
    queryAssetPerformance(cb) {
      setTimeout(() => {
        const data = {
          code: 200,
          msg: 'success',
          data: 'test'
        }
        return cb([data])
      }, 100)
    }
  }
}, parm)
describe('AssetPerformance.vue', () => {
  let actions
  let state
  let store
  let mutation

  beforeEach(() => {
    state = {
      assetPerf: {
        assetPerf3m: [{ type: 'HS300', rtn: 0.0659, sharpe: 0.2067, vol: 0.2007 }],
        assetPerf6m: [{ type: 'HS300', rtn: 0.0146, sharpe: -0.0668, vol: 0.2196 }],
        assetPerf1y: [{ type: 'HS300', rtn: 0.1765, sharpe: 0.6717, vol: 0.1752 }],
        assetPerf3y: [{ type: 'HS300', rtn: 0.1855, sharpe: 0.8998, vol: 0.1773 }],
        assetPerfPre: [{ type: 'HS300', rtn: 0.1558, sharpe: 0.5364, vol: 0.2402 }]
      }
    }
    actions = {
      queryAssetPerf: jest.fn()
    }
    mutation = {
      updateAssetPerf: jest.fn()
    }
    store = new Vuex.Store({
      modules: {
        myModule: {
          state,
          actions,
          mutation,
          getters: myModule.getters
        }
      }
    })
  })
  const router = new VueRouter(routes)
  it('检查数据是否正确', () => {
    // let Cor = Vue.extend({ ...AssetPerformance, store, router });
    // let vm = new Cor().$mount();
    const vm = shallow(AssetPerformance, {
      localVue,
      router,
      store
    }).vm
    const commit = sinon.spy()
    myModule.actions.queryAssetPerf(commit)
    myModule.getters.assetPerf3m(state)
    expect(vm.assetPerf3m[0].rtn).toBe(state.assetPerf.assetPerf3m[0].rtn)
  })
})
describe('actions', () => {
  it('queryAssetPerf', () => {
    const commit = sinon.spy()
    const data = 11111
    actionsInjector.actions.queryAssetPerf({ commit })
    // action.queryProducts({ commit, state })
    commit('updateAssetPerf', data)
  })
})
