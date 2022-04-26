import { shallow, createLocalVue, shallowMount } from 'vue-test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ant from 'ant-design-vue'
import Producthistory from '@/views/ProductList/ProductHistory.vue'
import * as myModule from '@/store/modules/product'
import routes from '@/router/router.js'
const localVue = createLocalVue()
import { storage } from '@/assets/js/util'
import Vue from 'vue'
import jest from 'jest-mock'
var sinon = require('sinon')
const actionsInjector = require('inject-loader!../../../../src/store/modules/product')
localVue.use(ant)
localVue.use(Vuex)
localVue.use(routes)
Vue.use(ant)
const parm = { pageNo: 2, pageSize: 10 }

const action = actionsInjector.actions.fetchProductHistory({
  '@/model/actions/product.js': {
    queryProductHistory(cb) {
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
describe('ProductHistory.vue', () => {
  let actions
  let state
  let store
  let mutation

  beforeEach(() => {
    state = {
      productHistory: { data: [{
        cash: 0,
        convertBond: null,
        creditBond: null,
        hkStocks: 0.35,
        interestBond: 0,
        aShare: 0.26,
        notStand: 0,
        privateEquity: 0,
        productCode: 'A17SD0001',
        rtn: 0.1243,
        saaCode: '89528811-e157-4aaf-8880-36a95a2d8715',
        sharpe: 0.5058,
        trialDate: 1564502400000,
        trialTime: { hour: 13, minute: 7, second: 29, nano: 0 },
        volatility: 0.1743
      }]
      }
    }
    actions = {
      fetchProductHistory: jest.fn()
    }
    mutation = {
      updateProductHistory: jest.fn()
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
    const Cor = Vue.extend({ ...Producthistory, store, router })
    const vm = new Cor().$mount()
    vm.viewDetail(state.productHistory)
    const commit = sinon.spy()
    myModule.actions.fetchProductHistory(commit, { pageNo: 1, pageSize: 5, productCode: 'A17SD0001' })
    myModule.getters.productHistoryData(state)
    // expect(vm.productHistoryData.data[0].lStocks).toBe(state.productHistory.data[0].lStocks)
    expect(vm.productHistoryData.data[0].aShare).toBe(state.productHistory.data[0].aShare)
  })
})
describe('actions', () => {
  it('queryProducts', () => {
    const commit = sinon.spy()

    const data = 11111
    // action.queryProducts({ commit,  state})
    // action.queryProducts({ commit, state })
    commit('updateProductHistory', data)
  })
})
