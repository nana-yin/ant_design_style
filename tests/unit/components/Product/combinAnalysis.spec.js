import { shallow, createLocalVue, mount } from 'vue-test-utils'
import VueRouter from 'vue-router'
import ant from 'ant-design-vue'
import RiskManage from '@/views/CombinAnalysis/CombinAnalysis.vue'
import * as myModule from '@/store/modules/combinAnalysis'
import routes from '@/router/router.js'
const localVue = createLocalVue()
import Vue from 'vue'
import Vuex from 'vuex'
var sinon = require('sinon')
const actionsInjector = require('inject-loader!../../../../src/store/modules/combinAnalysis')
localVue.use(ant)
localVue.use(routes)
localVue.use(Vuex)
Vue.use(ant)
const parm = { productCode: 'B17SD0058' }
const action = actionsInjector.actions.fetchPositionManageData({
  '@/model/actions/combinAnalysis.js': {
    queryCombinAnalysis(cb) {
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
      positionManageData: {
        assetRatioLevel: {
          alternative: 0,
          currency: 0,
          equity: 0.0719,
          fixedIncome: 0.9281
        },
        assetRatioLevel2: {
          cash: null,
          convertBond: null,
          creditBond: 0.7608,
          hkStocks: null,
          interestBond: null,
          aShare: 0.0719,
          notStand: 0.1673,
          privateEquity: null
        }
      },
      equitData: {
        industryRatioLevel: [{
          industryType: '金融业',
          ratio: 1
        }],
        industryRatioLevel2: [{
          industryType: '其他金融业',
          ratio: 1
        }]
      },
      bondData: {
        industryRatioLevel: [{
          industryType: '租赁和商务服务业',
          ratio: 1
        }],
        industryRatioLevel2: [{
          industryType: '租赁业',
          ratio: 1
        }]
      },
      bondTermData: {
        year1: 0,
        year1_3: 1,
        year3_5: 0,
        year5_7: 0,
        year7_10: 0,
        year10: 0
      },
      riskData: {
        riskRatioLevel: [{
          equity: 0.0317,
          fixedIncome: 0.0716,
          notOccupied: 0.8968
        }],
        riskRatioLevel2: [{
          convertBond: 0,
          creditBond: 0.0716,
          hkStocks: 0,
          interestBond: 0,
          aShare: 0.0317,
          notOccupied: 0.8968
        }]
      }
    }
    actions = {
      fetchPositionManageData: jest.fn(),
      fetchEquitData: jest.fn(),
      fetchBondData: jest.fn(),
      fetchBondTermData: jest.fn(),
      fetchRiskData: jest.fn()
    }
    mutation = {
      handlePositionManage: jest.fn()
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
  it('RiskManage检查数据是否正确', () => {
    const Cor = Vue.extend({ ...RiskManage, store, router })
    const vm = new Cor().$mount()
    // let vm= shallow(RiskManage, {
    //   localVue,
    //   router,
    //   store
    // }).vm
    const commit = sinon.spy()
    myModule.actions.fetchPositionManageData(commit, { productCode: 'B17SD0058' })
    myModule.getters.getPositionManageData(state)
    expect(vm.getPositionManageData.assetRatioLevel2.notStand).toBe(state.positionManageData.assetRatioLevel2.notStand)

    myModule.actions.fetchEquitData(commit, { productCode: 'B17SD0058' })
    myModule.getters.getEquitData(state)
    expect(vm.getEquitData.industryRatioLevel[0].industryType).toBe(state.equitData.industryRatioLevel[0].industryType)

    myModule.actions.fetchBondData(commit, { productCode: 'B17SD0058' })
    myModule.getters.getBondData(state)
    expect(vm.getBondData.industryRatioLevel[0].industryType).toBe(state.bondData.industryRatioLevel[0].industryType)

    myModule.actions.fetchBondTermData(commit, { productCode: 'B17SD0058' })
    myModule.getters.getBondTermData(state)
    expect(vm.getBondTermData.year5_7).toBe(state.bondTermData.year5_7)

    myModule.actions.fetchRiskData(commit, { productCode: 'B17SD0058' })
    myModule.getters.getRiskData(state)
    expect(vm.getRiskData.riskRatioLevel[0].equity).toBe(state.riskData.riskRatioLevel[0].equity)

    // vm._watchers[0].cb(state)
    // Vue.nextTick( () => {
    //   expect(vm.positionManageData.assetRatioLevel2.notStand).to.equal(state.positionManageData.assetRatioLevel2.notStand)
    // })
    // vm._watchers[1].cb(state)
    // Vue.nextTick( () => {
    //   expect(vm.equitData.industryRatioLevel[0].industryType).toBe(state.equitData.industryRatioLevel[0].industryType)
    // })
    // vm._watchers[2].cb(state)
    // Vue.nextTick( () => {
    //   expect(vm.bondData.industryRatioLevel[0].industryType).toBe(state.bondData.industryRatioLevel[0].industryType)
    // })
    // vm._watchers[3].cb(state)
    // Vue.nextTick( () => {
    //   expect(vm.bondTermData.year5_7).toBe(state.bondTermData.year5_7)
    // })
    // vm._watchers[4].cb(state)
    // Vue.nextTick( () => {
    //   expect(vm.riskData.riskRatioLevel[0].equity).toBe(state.riskData.riskRatioLevel[0].equity)
    //   done()
    // })
    // expect(vm.riskManagement[0].available).toBe(state.riskManageData[0].available)
    // expect(vm.riskManagement[0].available).toBe(state.riskManageData[0].available)
  })
})
describe('actions', () => {
  it('fetchRiskManage', () => {
    const commit = sinon.spy()
    const data = 11111
    const state = {
      productCode: 'B17SD0058'
    }
    actionsInjector.actions.fetchPositionManageData({ commit, state })
    // action.queryProducts({ commit, state })
    commit('handlePositionManage', data)
  })
})
