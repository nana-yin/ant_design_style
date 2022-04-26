import { shallow, createLocalVue, mount } from 'vue-test-utils'
import VueRouter from 'vue-router'
import ant from 'ant-design-vue'
import MacroEnv from '@/views/MacroEnv/macroEnv.vue'
import * as myModule from '@/store/modules/macroEnv'
import routes from '@/router/router.js'
const localVue = createLocalVue()
import Vue from 'vue'
import Vuex from 'vuex'
var sinon = require('sinon')
const actionsInjector = require('inject-loader!../../../../src/store/modules/macroEnv')
localVue.use(ant)
localVue.use(routes)
localVue.use(Vuex)
const parm = { productCode: 'A17SD0001' }
const action = actionsInjector.actions.fetchMacroEnv({
  '@/model/actions/macroEnv.js': {
    queryMacroEnv(cb) {
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
describe('macroEnv.vue', () => {
  let actions
  let state
  let store
  let mutation

  beforeEach(() => {
    state = {
      MacroEnv: {
        macroChina: [
          { attAdvice: -1, riseProb: -0.7, tradeDate: '2019-09-01', recordType: 'TOTAL_DEMAND' },
          { attAdvice: -1, riseProb: -0.7, tradeDate: '2019-09-01', recordType: 'COMPRE_PRICE' },
          { attAdvice: 1, riseProb: 0.67, tradeDate: '2019-09-01', recordType: 'CREDIT_PRICE' },
          { attAdvice: -1, riseProb: null, tradeDate: '2019-09-01', recordType: 'CREDIT_AMOUNT' },
          { attAdvice: -1, riseProb: -1, tradeDate: '2019-09-01', recordType: 'SHORT_INTEREST' },
          { attAdvice: 1, riseProb: 0.55, tradeDate: '2019-09-01', recordType: 'EMER_FINA_CONDITION' },
          { attAdvice: 1, riseProb: 0.63, tradeDate: '2019-09-01', recordType: 'POWER_INDEX' }
        ],
        macroAmerica: [
          { attAdvice: -1, riseProb: -1, tradeDate: '2019-09-01', recordType: 'KICHIN_CYCLE' },
          { attAdvice: -1, riseProb: -0.65, tradeDate: '2019-09-01', recordType: 'COMPRE_PRICE' },
          { attAdvice: 1, riseProb: 0.55, tradeDate: '2019-09-01', recordType: 'CREDIT_PRICE' },
          { attAdvice: -1, riseProb: -0.925, tradeDate: '2019-09-01', recordType: 'ZGL_CYCLE' },
          { attAdvice: -1, riseProb: -0.98, tradeDate: '2019-09-01', recordType: 'SHORT_INTEREST' }
        ]
      },
      macroEcharts: {
        attAdvise: [],
        userIndex: [],
        outattractorState: [],
        cusattractorState: [],
        outStatisticsDate: [],
        milldeTradeDate: [],
        basicStateData: [],
        externalDemandData: [],
        transportationData: [],
        outputData: [],
        investmentData: []
      }
    }
    actions = {
      fetchMacroEnv: jest.fn(),
      fetchMacroEcharts: jest.fn()
    }
    mutation = {
      handleMacroEnv: jest.fn(),
      handleMacroEcharts: jest.fn()
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
    const vm = shallow(MacroEnv, {
      localVue,
      router,
      store
    }).vm
    const commit = sinon.spy()
    myModule.actions.fetchMacroEnv(commit)
    myModule.getters.macroEnv(state)
    // console.log(vm.Store)
    // expect(vm.macroEnv[0].riseProb).toBe(state.MacroEnv.macroChina[0].riseProb);
  })
})
describe('actions', () => {
  it('fetchMacroEnv', () => {
    const commit = sinon.spy()
    const data = 11111
    actionsInjector.actions.fetchMacroEnv({ commit })
    // action.queryProducts({ commit, state })
    commit('handleMacroEnv', data)
  })
})
