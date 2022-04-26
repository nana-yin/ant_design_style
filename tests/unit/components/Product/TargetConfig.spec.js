import { shallow, createLocalVue, shallowMount } from 'vue-test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ant from 'ant-design-vue'
import TargetConfig from '@/views/TargetConfig/TargetConfig.vue'
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
const action = actionsInjector.actions.fetchSaaInitData({
  '@/model/actions/saa.js': {
    getSaaInitData(cb) {
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
      statisticsDate: '2019年07月'
    }
    actions = {
      getProductDetailFirst: jest.fn(),
      fetchMacroStra: jest.fn(),
      fetchSaaInitData: jest.fn()
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
  it('按钮是否点击', () => {
    const wrapper = shallow(TargetConfig, {
      localVue,
      router,
      store
    })

    const button = wrapper.find('.btn-config')
    button.trigger('click')
    const btn = wrapper.findAll('.btn-config').at(1)
    btn.trigger('click')
    // expect(actions.fetchSaaInitData).toHaveBeenCalled()
  })
  it('调用下一步SAA接口 校验数据规则', () => {
    const Cor = Vue.extend({ ...TargetConfig, store, router })
    const vm = new Cor().$mount()
    const commit = sinon.spy()
    vm.defaultInvestableTools = {
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
    vm.handleNext()
    storage.set('target', 111)
    const data = vm._$handleDealMul(vm.defaultInvestableTools, 0.01)

    expect(data.riskBudget).toBe(vm.defaultInvestableTools.riskBudget / 100)
    const errorMsg = vm.checkHoldPositions(vm.defaultInvestableTools)
    expect(errorMsg).toBe('每个资产大类上限应小于等于100%(100%+组合杠杆约束)')
  })
})
describe('actions', () => {
  it('queryProducts', () => {
    const commit = sinon.spy()

    const data = 11111
    // action.queryProducts({ commit,  state})
    // action.queryProducts({ commit, state })
    commit('fillSaaData', data)
  })
})
