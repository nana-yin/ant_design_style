import { shallow, createLocalVue, shallowMount } from 'vue-test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ant from 'ant-design-vue'
import ProductList from '@/views/ProductList/ProductList.vue'
import TargetConfig from '@/views/TargetConfig/TargetConfig.vue'
import ProductHistory from '@/views/ProductList/ProductList.vue'
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
// localVue.use(VueRouter)
// jest.mock('@/model/actions/product.js', () => ({
//   queryProducts: jest.fn((reslove) => {
//     console.log(reslove);
//   }),
// }))
const parm = { pageNo: 2, pageSize: 10 }

const action = actionsInjector.actions.queryProducts({
  '@/model/actions/product.js': {
    queryProducts(cb) {
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
describe('ProductList.vue', () => {
  let actions
  let state
  let store
  let mutation

  beforeEach(() => {
    state = {
      productList: {
        data: [{
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
        ]
      }
    }
    actions = {
      queryProducts: jest.fn(),
      syncProductInfo: jest.fn()
    }
    mutation = {
      updateProductList: jest.fn(),
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
  it('calls store action moduleActionClick when button is clicked', () => {
    const wrapper = shallow(ProductList, { store, localVue })
    const button = wrapper.find('button')
    button.trigger('click')
    expect(actions.queryProducts).toHaveBeenCalled()
    expect(wrapper.vm.productData[0].id).toBe(state.productList.data[0].id)
  })
  it('选择产品', () => {
    const Cor = Vue.extend({ ...ProductList, store, router })
    const vm = new Cor().$mount()
    vm.selectProduct({ productCode: 'A17SD0001' })
    expect(storage.get('productCode')).toBe('A17SD0001')

    vm.viewProduct({ productCode: 'A17SD0002' })
    expect(storage.get('productCode')).toBe('A17SD0002')

    vm.handleToHistory({ productCode: 'A17SD0003' })
    expect(storage.get('productCode')).toBe('A17SD0003')
  })
})
describe('actions', () => {
  it('queryProducts', () => {
    // testAction(actions.queryProducts, [], {}, [
    //   { type: 'updateProductList' },
    //   { type: 'enableConfig', payload: { /* mocked response */ } }
    // ], done)

    const commit = sinon.spy()
    const state = {}
    const data = 11111
    // action.queryProducts({ commit,  state})
    // action.queryProducts({ commit, state })
    commit('updateProductList', data)
    commit('enableConfig', data)
    // expect(commit.args).to.deep.equal([
    //   ['updateProductList'],
    //   ['enableConfig', { data }]
    // ])
  })
})
