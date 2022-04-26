import { shallow, createLocalVue, shallowMount } from 'vue-test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ant from 'ant-design-vue'
import BottomPosition from '@/views/BottomPosition/BottomPosition.vue'
import * as myModule from '@/store/modules/positionDataImport'
import routes from '@/router/router.js'
const localVue = createLocalVue()
import { storage } from '@/assets/js/util'
import Vue from 'vue'
import jest from 'jest-mock'
var sinon = require('sinon')
const actionsInjector = require('inject-loader!../../../../src/store/modules/positionDataImport')
localVue.use(ant)
localVue.use(Vuex)
// localVue.use(VueRouter)
// jest.mock('@/model/actions/product.js', () => ({
//   queryProducts: jest.fn((reslove) => {
//     console.log(reslove);
//   }),
// }))
const parm = { pageNo: 2, pageSize: 10, productCode: 'B17SD0058' }

const action = actionsInjector.actions.fetchPositionImportInfo({
  '@/model/actions/positionDataImport.js': {
    queryPositionImportInfo(cb) {
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
      positionImportInfo: {
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
      fetchPositionImportInfo: jest.fn()
    }
    mutation = {
      handlePositionImportInfo: jest.fn()
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
    const wrapper = shallow(BottomPosition, { store, localVue })
    // let Cor = Vue.extend({ ...PositionList, store, router });
    // let wrapper = new Cor().$mount();
    // let wrapper= shallow(BottomPosition, {
    //   localVue,
    //   router,
    //   store
    // })
    const button = wrapper.find('button')
    button.trigger('click')
    expect(actions.fetchPositionImportInfo).toHaveBeenCalled()

    expect(wrapper.vm.getPositionImportInfo.data[0].id).toBe(state.positionImportInfo.data[0].id)
  })
  it('关联图谱 舆情预警', () => {
    const $route = {
      query: {
        id: 'B17SD0058'
      }
    }
    const Cor = Vue.extend({ ...BottomPosition, store, router })
    const vm = new Cor().$mount()

    vm.toRelationalGraph({ creditSubjectCode: '101730993' })

    vm.toPublicOpinion({ creditSubjectCode: '101730993' })
  })
})
describe('actions', () => {
  it('queryPositionList', () => {
    // testAction(actions.queryProducts, [], {}, [
    //   { type: 'updateProductList' },
    //   { type: 'enableConfig', payload: { /* mocked response */ } }
    // ], done)

    const commit = sinon.spy()
    const state = {
      pageNo: 2, pageSize: 10, parentLoanCode: 'AMP1712000634'
    }
    const data = 11111
    // action.queryProducts({ commit,  state})
    actionsInjector.actions.fetchPositionImportInfo({ commit, state })
    commit('handlePositionImportInfo', data)
    // expect(commit.args).to.deep.equal([
    //   ['updateProductList'],
    //   ['enableConfig', { data }]
    // ])
  })
})
