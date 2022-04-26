import { shallow, createLocalVue, shallowMount } from 'vue-test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ant from 'ant-design-vue'
import ProductInfo from '@/views/Product/ProductInfo.vue'
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
const parm = { pageNo: 2, pageSize: 10 }
Vue.use(ant)
const action = actionsInjector.actions.fetchProductInfo({
  '@/model/actions/product.js': {
    queryProductInfo(cb) {
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
describe('ProductInfo.vue', () => {
  let actions
  let state
  let store
  let mutation

  beforeEach(() => {
    state = {
      productInfo: {
        assetTypeRatio: null,
        cleanAssetSize: '300,000,000',
        cleanPrice: '1.0564',
        createdTime: 1545406772000,
        deleted: 0,
        deviateWarn: '预警',
        dueDate: '2020-08-19',
        id: 3,
        portfolio: null,
        productCode: 'A17SD0001',
        productName: 'TestData',
        productShare: null,
        safematWarn: '安全',
        statisticsDate: '2018-12-20',
        survivalStatus: '存续中',
        targetStatus: '已测算',
        toalAssetSize: '600,000,000',
        trialDate: '2019-07-31',
        trialTime: Object,
        updatedTime: 1564549662000,
        trialTime: { hour: 13, minute: 7, second: 30, nano: 0 }

      }
    }
    actions = {
      fetchProductInfo: jest.fn(),
      syncProductInfo: jest.fn()
    }
    mutation = {
      updateProductInfo: jest.fn(),
      syncProductInfo: jest.fn()
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
  it('跳转到别的页面', () => {
    const Cor = Vue.extend({ ...ProductInfo, store, router })
    const vm = new Cor().$mount()
    vm.handleRoute()
    vm.handleHistory()
    storage.set('productCode', 'A17SD0001')
    const commit = sinon.spy()
    myModule.actions.fetchProductInfo(commit, 'A17SD0001')

    // expect(storage.get('productCode')).toBe(vm.productInfo('A17SD0001'));
    expect(vm.productInfo.deviateWarn).toBe(state.productInfo.deviateWarn)
  })
})
describe('actions', () => {
  it('queryProducts', () => {
    const commit = sinon.spy()

    const data = 11111
    // action.queryProducts({ commit,  state})
    // action.queryProducts({ commit, state })
    commit('updateProductInfo', data)
  })
})
