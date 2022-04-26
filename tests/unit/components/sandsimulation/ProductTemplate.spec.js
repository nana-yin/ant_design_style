import { shallow, createLocalVue, mount } from 'vue-test-utils'
import VueRouter from 'vue-router'
import ant from 'ant-design-vue'
import ProductTemplate from '@/views/ProductTemplate/ProductTemplate.vue'
import * as myModule from '@/store/modules/riskManage'
import routes from '@/router/router.js'
const localVue = createLocalVue()
// import Vue from 'vue'
import Vuex from 'vuex'
// var sinon = require('sinon')
const actionsInjector = require('inject-loader!../../../../src/store/modules/riskManage')
localVue.use(ant)
localVue.use(routes)
localVue.use(Vuex)
const parm = { productCode: 'A17SD0001' }
const action = actionsInjector.actions.fetchRiskManage({
  '@/model/actions/riskManage.js': {
    queryRiskManage(cb) {
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
describe('ProductTemplate.vue', () => {
  let actions
  let state
  let store
  let mutation

  beforeEach(() => {
    state = {
      riskManageData: [
        {
          available: 54893979,
          cash: null,
          convertBond: 7007782,
          creditBond: 1149009,
          hkStocks: 3692922,
          interestBond: 1461435,
          lStocks: 5763460,
          notStand: null,
          privateEquity: null,
          smStocks: 6962176,
          state: 1,
          statisticsDate: '2018/12/20',
          thickness: 73191972,
          total: 26036784
        }
      ]
    }
    actions = {
      fetchRiskManage: jest.fn()
    }
    mutation = {
      handleRiskManage: jest.fn()
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
    // let Cor = Vue.extend({ ...RiskManage, store, router });
    // let vm = new Cor().$mount();
    const wrapper = shallow(ProductTemplate, {
      localVue,
      router,
      store
    })
    const button = wrapper.find('.save')
    button.trigger('click')
    expect(wrapper.vm.handleAdd()).toBe(false)
  })
})
