import { shallow, createLocalVue, shallowMount } from 'vue-test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import ant from 'ant-design-vue'
import PositionList from '@/views/PositionManage/PositionList.vue'
import * as myModule from '@/store/modules/positionManage'
import routes from '@/router/router.js'
const localVue = createLocalVue()
import { storage } from '@/assets/js/util'
import Vue from 'vue'
import jest from 'jest-mock'
var sinon = require('sinon')
const actionsInjector = require('inject-loader!../../../../src/store/modules/positionManage')
localVue.use(ant)
localVue.use(Vuex)
// localVue.use(VueRouter)
// jest.mock('@/model/actions/product.js', () => ({
//   queryProducts: jest.fn((reslove) => {
//     console.log(reslove);
//   }),
// }))
const parm = { pageNo: 2, pageSize: 10, productCode: 'B17SD0058' }

const action = actionsInjector.actions.queryPositionList({
  '@/model/actions/positionManage.js': {
    queryPositionList(cb) {
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
      positionList: {
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
      queryPositionList: jest.fn(),
      queryCreditSubjectList: jest.fn()
    }
    mutation = {
      updatePositionList: jest.fn()
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
    // const wrapper = shallow(PositionList, { store, localVue })
    // let Cor = Vue.extend({ ...PositionList, store, router });
    // let wrapper = new Cor().$mount();
    const wrapper = shallow(PositionList, {
      localVue,
      router,
      store
    })
    const button = wrapper.find('button')
    button.trigger('click')
    expect(actions.queryPositionList).toHaveBeenCalled()
    // console.log('--------');
    // console.log(wrapper.vm.positionListData);
    expect(wrapper.vm.positionListData.data[0].id).toBe(state.positionList.data[0].id)
  })
  it('关联图谱', () => {
    const $route = {
      query: {
        id: 'B17SD0058'
      }
    }
    const Cor = Vue.extend({ ...PositionList, store, router })
    const vm = new Cor().$mount()

    vm.toRelationalGraph({ creditSubjectCode: '101730993' })

    vm.toPublicOpinion({ creditSubjectCode: '101730993' })

    vm.toBottomPosition({ creditSubjectCode: '101730993' })
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
      pageNo: 2, pageSize: 10, productCode: 'B17SD0058'
    }
    const data = 11111
    // action.queryProducts({ commit,  state})
    actionsInjector.actions.queryPositionList({ commit, state })
    commit('updatePositionList', data)
    // expect(commit.args).to.deep.equal([
    //   ['updateProductList'],
    //   ['enableConfig', { data }]
    // ])
  })
})
