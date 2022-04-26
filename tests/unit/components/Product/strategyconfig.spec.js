import { shallow, createLocalVue, shallowMount } from 'vue-test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ant from 'ant-design-vue'
import StrategyConfig from '@/views/StrategyConfig/StrategyConfig.vue'
import * as myModule from '@/store/modules/strategyConfig'
import routes from '@/router/router.js'
const localVue = createLocalVue()
import { storage } from '@/assets/js/util'
import Vue from 'vue'
import jest from 'jest-mock'
var sinon = require('sinon')
const actionsInjector = require('inject-loader!../../../../src/store/modules/strategyConfig')
localVue.use(ant)
localVue.use(Vuex)
const parm = { pageNo: 2, pageSize: 10 }
Vue.use(ant)
const action = actionsInjector.actions.fetchSaaTrial({
  '@/model/actions/strategyConfig.js': {
    querySaaTrial(cb) {
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
describe('viewtargetconfig.vue', () => {
  let actions
  let state
  let store
  let mutation

  beforeEach(() => {
    state = {
      saaData: {
        saaGraph: {
          scatter: [],
          optArea: {
            up: [],
            down: []
          }
        },
        saaTable: [],
        cacheKey: undefined
      },
      assetRatio: {},
      saaArgs: {},
      originSaaData: {},
      saaTrialRes: {
        expVol: 1,
        expRtn: 1
      }
    }
    actions = {
      getProductDetailFirst: jest.fn()
    }
    mutation = {
      updateTargetDetail: jest.fn()
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
  it('点击事件是否触发', () => {
    storage.set('target', JSON.stringify({ cash: {}, equity: {}, fixed: {}, alternative: {}, saaTable: {}}))
    const wrapper = shallow(StrategyConfig, {
      localVue,
      router,
      store
    })
    const button = wrapper.find('.trial-btn')
    button.trigger('click')
    const btn = wrapper.findAll('.btn-config').at(2)
    btn.trigger('click')
  })
  it('数据检验方法是否正确', () => {
    storage.set('target', JSON.stringify({ cash: {}, equity: {}, fixed: {}, alternative: {}, saaTable: {}}))
    const Cor = Vue.extend({ ...StrategyConfig, store, router })
    const vm = new Cor().$mount()
    const commit = sinon.spy()
    const data = {
      alternative: { parentMax: null, parentMin: null, privateEquity: { scaleMax: null, scaleMin: null }},
      alternativeArr: ['privateEquity'],
      cash: { parentMin: 0, parentMax: 120, cash: { scaleMax: 120, scaleMin: 0 }},
      cashArr: ['cash'],
      deviateThreshold: '12',
      equity: { parentMin: null, parentMax: null, lStocks: { scaleMax: null, scaleMin: null }},
      equityArr: ['lStocks'],
      fixed: { parentMin: null, parentMax: null, interestBond: { scaleMax: null, scaleMin: null }},
      fixedArr: ['interestBond'],
      nonStandardBad: null,
      nonStandardRec: null,
      nonStandardRtn: null,
      portfolio: '0',
      privateEquityRtn: null,
      privateEquityRtnMax: null,
      privateEquityRtnMin: null,
      riskBudget: '12',
      safetyWarnLine: '0.9',
      tarReturn: '5'
    }
    vm.buildValidateScale(data)
  })
})
describe('actions', () => {
  it('queryProducts', () => {
    const commit = sinon.spy()
    const state = {}
    const data = 11111
    // action.queryProducts({ commit,  state})
    actionsInjector.actions.fetchSaaTrial({ commit, state })
    commit('updateSaaTrial', data)
  })
})
